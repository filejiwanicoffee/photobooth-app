import Webcam from "react-webcam";
import { useRef } from "react";

export default function Camera({ onCapture }) {
  const webcamRef = useRef(null);

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    onCapture(image);
  };

  return (
    <div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{ facingMode: "user" }}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <button className="capture-hidden" onClick={capture} style={{ display: "none" }} />
    </div>
  );
}
