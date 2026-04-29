export default function Frame({ image }) {
  return (
    <div style={{ position: "relative" }}>
      <img src={image} style={{ width: "100%", borderRadius: "15px" }} />
      <img
        src="/frames/frame1.png"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
        }}
      />
    </div>
  );
}
