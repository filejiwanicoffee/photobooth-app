import { useState } from "react";
import Camera from "./components/Camera";
import Countdown from "./components/Countdown";
import Frame from "./components/Frame";
import Result from "./components/Result";

export default function App() {
  const [step, setStep] = useState("camera");
  const [photos, setPhotos] = useState([]);
  const [current, setCurrent] = useState(null);
  const [countdown, setCountdown] = useState(false);

  const handleStart = () => {
    setCountdown(true);
  };

  const handleCapture = (img) => {
    setCurrent(img);
    setStep("preview");
    setCountdown(false);
  };

  const savePhoto = () => {
    const newPhotos = [...photos, current];
    setPhotos(newPhotos);

    if (newPhotos.length >= 4) {
      setStep("result");
    } else {
      setStep("camera");
    }
  };

  return (
    <div className="app">
      <div className="booth">

        {step === "camera" && !countdown && (
          <>
            <Camera onCapture={handleCapture} />
            <button className="button" onClick={handleStart}>
              Start
            </button>
          </>
        )}

        {countdown && (
          <Countdown onComplete={() => {
            document.querySelector("button.capture-hidden")?.click();
          }} />
        )}

        {step === "preview" && (
          <>
            <Frame image={current} />
            <button className="button" onClick={savePhoto}>
              Next
            </button>
          </>
        )}

        {step === "result" && <Result images={photos} />}

      </div>
    </div>
  );
}
