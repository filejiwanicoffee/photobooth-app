import { useRef, useState } from "react";
import Webcam from "react-webcam";
import Frame from "./components/Frame";
import Result from "./components/Result";
import "./styles.css";

const filters = {
  normal: "none",
  grayscale: "grayscale(1)",
  warm: "sepia(0.5) saturate(1.2)"
};

export default function App() {
  const webcamRef = useRef(null);

  const [photos, setPhotos] = useState([]);
  const [step, setStep] = useState("camera");
  const [count, setCount] = useState(null);
  const [filter, setFilter] = useState("normal");
  const [frame, setFrame] = useState("/frames/frame1.png");

  const shutterSound = new Audio("https://www.soundjay.com/camera/camera-shutter.mp3");

  const startAutoShoot = async () => {
    let shots = [];

    for (let i = 0; i < 4; i++) {
      await countdown();

      const image = webcamRef.current.getScreenshot();
      shutterSound.play();
      shots.push(image);
      setPhotos([...shots]);
    }

    setStep("result");
  };

  const countdown = () => {
    return new Promise((resolve) => {
      let c = 3;
      setCount(c);

      const interval = setInterval(() => {
        c--;
        if (c === 0) {
          clearInterval(interval);
          setCount(null);
          resolve();
        } else {
          setCount(c);
        }
      }, 1000);
    });
  };

  return (
    <div className="app">
      <h1 className="title">JIWANI PHOTOBOOTH</h1>

      <div className="booth">

        {step === "camera" && (
          <>
            <div className="camera-wrapper">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                className="camera"
                style={{ filter: filters[filter] }}
              />

              {count !== null && <div className="countdown">{count}</div>}
            </div>

            <div className="controls">
              <select onChange={(e) => setFilter(e.target.value)}>
                <option value="normal">Normal</option>
                <option value="grayscale">B&W</option>
                <option value="warm">Warm</option>
              </select>

              <select onChange={(e) => setFrame(e.target.value)}>
                <option value="/frames/frame1.png">Frame 1</option>
                <option value="/frames/frame2.png">Frame 2</option>
              </select>
            </div>

            <button className="button" onClick={startAutoShoot}>
              Start Session
            </button>
          </>
        )}

        {step === "result" && (
          <Result images={photos} frame={frame} filter={filters[filter]} />
        )}

      </div>
    </div>
  );
}
