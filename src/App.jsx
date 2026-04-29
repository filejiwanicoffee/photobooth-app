import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Frame from "./components/Frame";
import Result from "./components/Result";
import "./styles.css";

export default function App() {
  const webcamRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [current, setCurrent] = useState(null);
  const [step, setStep] = useState("camera");
  const [count, setCount] = useState(null);

  const startCapture = () => {
    let c = 3;
    setCount(c);

    const interval = setInterval(() => {
      c--;
      if (c === 0) {
        clearInterval(interval);

        const image = webcamRef.current.getScreenshot();
        setCurrent(image);
        setStep("preview");
        setCount(null);
      } else {
        setCount(c);
      }
    }, 1000);
  };

  const savePhoto = () => {
    const updated = [...photos, current];
    setPhotos(updated);

    if (updated.length >= 4) {
      setStep("result");
    } else {
      setStep("camera");
    }
  };

  return (
    <div className="app">
      <h1 className="title">JIWANI PHOTOBOOTH</h1>

      <div className="booth">

        {(step === "camera" || count !== null) && (
          <div className="camera-wrapper">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/png"
              videoConstraints={{ facingMode: "user" }}
              className="camera"
            />

            {count !== null && (
              <div className="countdown">
                {count}
              </div>
            )}
          </div>
        )}

        {step === "camera" && count === null && (
          <button className="button" onClick={startCapture}>
            Start Photo
          </button>
        )}

        {step === "preview" && (
          <>
            <Frame image={current} />
            <button className="button" onClick={savePhoto}>
              Next
            </button>
          </>
        )}

        {step === "result" && (
          <Result images={photos} />
        )}

      </div>
    </div>
  );
}
