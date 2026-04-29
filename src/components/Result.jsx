import html2canvas from "html2canvas";
import { useRef, useEffect, useState } from "react";
import QRCode from "qrcode";

export default function Result({ images, frame, filter }) {
  const ref = useRef();
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    const canvas = await html2canvas(ref.current);
    const dataUrl = canvas.toDataURL();

    const qrCode = await QRCode.toDataURL(dataUrl);
    setQr(qrCode);
  };

  useEffect(() => {
    generateQR();
  }, []);

  const download = async () => {
    const canvas = await html2canvas(ref.current);
    const link = document.createElement("a");
    link.download = "jiwani-photostrip.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <div ref={ref} className="strip">
        {images.map((img, i) => (
          <div key={i} className="frame-wrap">
            <img src={img} style={{ filter }} />
            <img src={frame} className="frame-overlay" />
          </div>
        ))}
      </div>

      <button className="button" onClick={download}>
        Download
      </button>

      {qr && (
        <div>
          <p>Scan to Download</p>
          <img src={qr} style={{ width: "120px" }} />
        </div>
      )}
    </div>
  );
}
