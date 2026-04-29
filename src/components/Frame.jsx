export default function Frame({ image, frame }) {
  return (
    <div style={{ position: "relative" }}>
      <img src={image} style={{ width: "100%" }} />
      <img
        src={frame}
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
