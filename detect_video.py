from ultralytics import YOLO
import cv2
import time

# Load trained model
model = YOLO("best.pt")

# Load input video
cap = cv2.VideoCapture("road_video.mp4")

# Video properties
width = int(cap.get(3))
height = int(cap.get(4))
fps_input = int(cap.get(cv2.CAP_PROP_FPS))

# Output video writer
out = cv2.VideoWriter(
    "output_detected.mp4",
    cv2.VideoWriter_fourcc(*'mp4v'),
    fps_input,
    (width, height)
)

prev_time = 0

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame, conf=0.15)

    pothole_count = 0

    for result in results:
        for box in result.boxes:
            pothole_count += 1

            x1, y1, x2, y2 = map(int, box.xyxy[0])
            confidence = float(box.conf[0]) * 100

            cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 255), 3)

            label = f"Pothole {confidence:.1f}%"
            cv2.putText(
                frame,
                label,
                (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (255, 255, 255),
                2
            )

    if pothole_count > 0:
        cv2.putText(
            frame,
            "WARNING: POTHOLE DETECTED!",
            (20, 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 0, 255),
            3
        )

    cv2.putText(
        frame,
       f"Visible Potholes: {pothole_count}",
        (20, 100),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 0),
        3
    )

    curr_time = time.time()
    fps = 1 / (curr_time - prev_time) if prev_time != 0 else 0
    prev_time = curr_time

    cv2.putText(
        frame,
        f"FPS: {int(fps)}",
        (20, 150),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (255, 255, 0),
        3
    )

    out.write(frame)

    cv2.imshow("Pothole Detection System", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
out.release()
cv2.destroyAllWindows()   