import html2canvas from "html2canvas";
import { useRef } from "react";

export default function Result({ images }) {
  const ref = useRef();

  const download = async () => {
    const canvas = await html2canvas(ref.current);
    const link = document.createElement("a");
    link.download = "jiwani-photostrip.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <div
        ref={ref}
        style={{
          width: "200px",
          margin: "auto",
          background: "white",
          padding: "10px",
          borderRadius: "10px"
        }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            style={{ width: "100%", marginBottom: "8px", borderRadius: "10px" }}
          />
        ))}
      </div>

      <button className="button" onClick={download}>
        Download
      </button>
    </div>
  );
}
