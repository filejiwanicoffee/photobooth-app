import { useState, useEffect } from "react";

export default function Countdown({ onComplete }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <h1 style={{ fontSize: "60px", color: "#213B2A" }}>
      {count}
    </h1>
  );
}
