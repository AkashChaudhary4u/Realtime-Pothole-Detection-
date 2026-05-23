import { Upload, Camera } from "lucide-react";
import { useState } from "react";

/* ---------------- SECTION HEADER EXPORT ---------------- */
export const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="text-center mb-10">
    <h2 className="text-4xl font-bold">{title}</h2>
    <p className="text-gray-400 mt-2">{subtitle}</p>
  </div>
);

/* ---------------- MAIN DASHBOARD ---------------- */
const DetectionDashboard = () => {
  const [outputFile, setOutputFile] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const [liveMode, setLiveMode] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    setLiveMode(false);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/detect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setOutputFile(data.output_url);
      setFileType(data.file_type);
    } catch (err) {
      console.error(err);
      alert("Backend Connection Failed");
    }

    setLoading(false);
  };

  const toggleLiveDetection = () => {
    setLiveMode(!liveMode);

    if (!liveMode) {
      setOutputFile("");
      setFileType("");
    }
  };

  return (
    <section id="detection" className="relative py-24">
      <div className="container mx-auto px-4">

        <SectionHeader
          title="Smart Detection Dashboard"
          subtitle="Upload pothole images/videos or use live webcam detection"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Upload Panel */}
          <div className="space-y-4">

            <label className="p-6 border rounded-xl cursor-pointer block">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-10 h-10 mx-auto mb-3 text-blue-400" />
                <p>Upload Image / Video for Detection</p>

                <input
                  type="file"
                  accept="image/*,video/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </label>

            <button
              onClick={toggleLiveDetection}
              className="w-full p-4 border rounded-xl flex gap-3"
            >
              <Camera className="text-cyan-400" />
              <span>
                {liveMode ? "Stop Live Detection" : "Start Live Detection"}
              </span>
            </button>

          </div>

          {/* Output Panel */}
          <div className="lg:col-span-2 border rounded-xl p-4">

            {liveMode ? (
              <img
                src="http://127.0.0.1:8000/live"
                alt="Live Detection"
                className="rounded-lg w-full"
              />
            ) : loading ? (
              <div className="aspect-video flex items-center justify-center">
                Detecting Potholes...
              </div>
            ) : outputFile ? (
              fileType === "video" ? (
                <video controls className="rounded-lg w-full">
                  <source src={outputFile} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={outputFile}
                  alt="Detection Result"
                  className="rounded-lg w-full"
                />
              )
            ) : (
              <div className="aspect-video flex items-center justify-center text-gray-400">
                Upload Image / Video or Start Live Detection
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default DetectionDashboard;