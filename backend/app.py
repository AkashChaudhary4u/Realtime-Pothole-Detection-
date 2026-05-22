from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from ultralytics import YOLO
import shutil
import os
import uuid
import cv2
import subprocess

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- PATHS ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------------- MODEL ----------------
model = YOLO(os.path.join(BASE_DIR, "best.pt"))

# ---------------- STATIC ----------------
app.mount("/outputs", StaticFiles(directory=OUTPUT_DIR), name="outputs")

# ---------------- SEVERITY ----------------
def get_severity(box_area):
    if box_area < 5000:
        return "Minor", (0, 255, 0)
    elif box_area < 15000:
        return "Moderate", (0, 255, 255)
    else:
        return "Severe", (0, 0, 255)

# ---------------- IMAGE / VIDEO DETECT ----------------
@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    unique_name = f"{uuid.uuid4()}_{file.filename}"
    input_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    ext = file.filename.split(".")[-1].lower()

    # ---------- IMAGE ----------
    if ext in ["jpg", "jpeg", "png"]:

        image = cv2.imread(input_path)
        results = model(image, conf=0.25)

        pothole_count = 0
        minor_count = 0
        moderate_count = 0
        severe_count = 0

        for result in results:
            for box in result.boxes:
                pothole_count += 1

                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0]) * 100

                box_area = (x2 - x1) * (y2 - y1)
                severity, color = get_severity(box_area)

                if severity == "Minor":
                    minor_count += 1
                elif severity == "Moderate":
                    moderate_count += 1
                else:
                    severe_count += 1

                cv2.rectangle(image, (x1, y1), (x2, y2), color, 3)

                cv2.putText(
                    image,
                    f"{severity} | {conf:.1f}%",
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (255, 255, 255),
                    2
                )

        if pothole_count > 0:
            cv2.putText(image, "WARNING: POTHOLE DETECTED!", (20, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 3)

        cv2.putText(image, f"Visible Potholes: {pothole_count}", (20, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)

        cv2.putText(image, f"Minor: {minor_count}", (20, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)

        cv2.putText(image, f"Moderate: {moderate_count}", (20, 190),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,255), 2)

        cv2.putText(image, f"Severe: {severe_count}", (20, 230),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,0,255), 2)

        output_filename = f"detected_{unique_name}"
        output_path = os.path.join(OUTPUT_DIR, output_filename)

        cv2.imwrite(output_path, image)

        return {
            "file_type": "image",
            "output_url": f"http://127.0.0.1:8000/outputs/{output_filename}"
        }

    # ---------- VIDEO ----------
    elif ext in ["mp4", "avi", "mov", "mkv"]:

        raw_output = os.path.join(OUTPUT_DIR, f"raw_{unique_name}.avi")
        final_output = os.path.join(OUTPUT_DIR, f"final_{unique_name}.mp4")

        cap = cv2.VideoCapture(input_path)

        width = int(cap.get(3))
        height = int(cap.get(4))
        fps = int(cap.get(cv2.CAP_PROP_FPS))

        out = cv2.VideoWriter(
            raw_output,
            cv2.VideoWriter_fourcc(*'XVID'),
            fps,
            (width, height)
        )

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            results = model(frame, conf=0.25)

            pothole_count = 0
            minor_count = 0
            moderate_count = 0
            severe_count = 0

            for result in results:
                for box in result.boxes:
                    pothole_count += 1

                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    conf = float(box.conf[0]) * 100

                    box_area = (x2 - x1) * (y2 - y1)
                    severity, color = get_severity(box_area)

                    if severity == "Minor":
                        minor_count += 1
                    elif severity == "Moderate":
                        moderate_count += 1
                    else:
                        severe_count += 1

                    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 3)

                    cv2.putText(frame, f"{severity} | {conf:.1f}%",
                                (x1, y1 - 10),
                                cv2.FONT_HERSHEY_SIMPLEX,
                                0.7, (255,255,255), 2)

            if pothole_count > 0:
                cv2.putText(frame, "WARNING: POTHOLE DETECTED!", (20, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 3)

            cv2.putText(frame, f"Visible Potholes: {pothole_count}", (20, 100),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 3)

            cv2.putText(frame, f"Minor: {minor_count}", (20, 150),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)

            cv2.putText(frame, f"Moderate: {moderate_count}", (20, 190),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,255), 2)

            cv2.putText(frame, f"Severe: {severe_count}", (20, 230),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,0,255), 2)

            out.write(frame)

        cap.release()
        out.release()

        subprocess.run([
            r"C:\ffmpeg\bin\ffmpeg.exe",
            "-y",
            "-i", raw_output,
            "-vcodec", "libx264",
            "-acodec", "aac",
            final_output
        ], stdin=subprocess.DEVNULL)

        os.remove(raw_output)

        return {
            "file_type": "video",
            "output_url": f"http://127.0.0.1:8000/outputs/{os.path.basename(final_output)}"
        }

    return {"error": "Unsupported File"}

# ---------------- LIVE ----------------
def generate_live_frames():
    cap = cv2.VideoCapture(1)

    while True:
        success, frame = cap.read()
        if not success:
            break

        results = model(frame, conf=0.25)

        pothole_count = 0
        minor_count = 0
        moderate_count = 0
        severe_count = 0

        for result in results:
            for box in result.boxes:
                pothole_count += 1

                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0]) * 100

                box_area = (x2 - x1) * (y2 - y1)
                severity, color = get_severity(box_area)

                if severity == "Minor":
                    minor_count += 1
                elif severity == "Moderate":
                    moderate_count += 1
                else:
                    severe_count += 1

                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 3)

                cv2.putText(frame, f"{severity} | {conf:.1f}%",
                            (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.7, (255,255,255), 2)

        if pothole_count > 0:
            cv2.putText(frame, "WARNING: POTHOLE DETECTED!", (20, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 3)

        cv2.putText(frame, f"Visible Potholes: {pothole_count}", (20, 100),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 3)

        cv2.putText(frame, f"Minor: {minor_count}", (20, 150),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)

        cv2.putText(frame, f"Moderate: {moderate_count}", (20, 190),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,255), 2)

        cv2.putText(frame, f"Severe: {severe_count}", (20, 230),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,0,255), 2)

        ret, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\r\nContent-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.get("/live")
def live():
    return StreamingResponse(generate_live_frames(),
                             media_type="multipart/x-mixed-replace; boundary=frame")