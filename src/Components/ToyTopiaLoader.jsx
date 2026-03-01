import { useEffect, useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600&display=swap');

  .loader-wrap {
    font-family: 'Nunito', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: radial-gradient(ellipse at 60% 20%, #f3e8ff 0%, #fdf4ff 50%, #ffffff 100%);
    overflow: hidden;
    position: relative;
    gap: 0;
  }

  .sparkle {
    position: absolute;
    border-radius: 50%;
    animation: floatSparkle linear infinite;
    pointer-events: none;
  }

  @keyframes floatSparkle {
    0%   { transform: translateY(0px) rotate(0deg); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 0.6; }
    100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
  }

  .star-ring {
    position: relative;
    width: 160px;
    height: 160px;
    margin-bottom: 28px;
  }

  .orbit {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    animation: spin linear infinite;
  }
  .orbit-1 { animation-duration: 3s; }
  .orbit-2 { animation-duration: 5s; animation-direction: reverse; }
  .orbit-3 { animation-duration: 7s; }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .orbit-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
  }
  .orbit-dot-2 { bottom: -5px; top: auto; }

  .center-icon {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-bg {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7C3AED, #C026D3);
    box-shadow: 0 0 0 6px rgba(168,85,247,0.25), 0 0 40px rgba(192,38,211,0.4), inset 0 0 20px rgba(255,255,255,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulseBg 2s ease-in-out infinite;
  }

  @keyframes pulseBg {
    0%, 100% { box-shadow: 0 0 0 6px rgba(168,85,247,0.25), 0 0 40px rgba(192,38,211,0.4), inset 0 0 20px rgba(255,255,255,0.15); transform: scale(1); }
    50%       { box-shadow: 0 0 0 14px rgba(168,85,247,0.12), 0 0 70px rgba(192,38,211,0.6), inset 0 0 30px rgba(255,255,255,0.2); transform: scale(1.06); }
  }

  .icon-emoji {
    font-size: 2.4rem;
    animation: wobble 1.8s ease-in-out infinite;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));
  }

  @keyframes wobble {
    0%,100% { transform: rotate(-8deg) scale(1); }
    25%     { transform: rotate(8deg) scale(1.12); }
    50%     { transform: rotate(-4deg) scale(1); }
    75%     { transform: rotate(6deg) scale(1.08); }
  }

  .brand-name {
    font-family: 'Fredoka One', cursive;
    font-size: 2.6rem;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #E879F9, #A855F7, #60A5FA, #FCD34D, #E879F9);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerText 2.5s linear infinite;
    margin-bottom: 6px;
    line-height: 1;
  }

  @keyframes shimmerText {
    0%   { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  .dots-row {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 16px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    animation: dotBounce 1.2s ease-in-out infinite;
  }
  .dot:nth-child(1) { background: #E879F9; animation-delay: 0s; }
  .dot:nth-child(2) { background: #A855F7; animation-delay: 0.15s; }
  .dot:nth-child(3) { background: #60A5FA; animation-delay: 0.3s; }
  .dot:nth-child(4) { background: #FCD34D; animation-delay: 0.45s; }
  .dot:nth-child(5) { background: #F472B6; animation-delay: 0.6s; }

  @keyframes dotBounce {
    0%, 80%, 100% { transform: scale(0.7) translateY(0); opacity: 0.5; }
    40%           { transform: scale(1.3) translateY(-8px); opacity: 1; }
  }

  .progress-track {
    width: 200px;
    height: 6px;
    background: rgba(168,85,247,0.15);
    border-radius: 999px;
    margin-top: 20px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #7C3AED, #E879F9, #60A5FA);
    animation: progressAnim 2.2s ease-in-out infinite;
  }

  @keyframes progressAnim {
    0%   { width: 0%;  margin-left: 0%; }
    50%  { width: 70%; margin-left: 15%; }
    100% { width: 0%;  margin-left: 100%; }
  }

  .tagline {
    font-family: 'Nunito', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(109, 40, 217, 0.55);
    margin-top: 10px;
  }
`;

const sparkles = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 6 + 6,
  color: ["#A855F7","#E879F9","#FCD34D","#60A5FA","#F472B6","#E9D5FF"][Math.floor(Math.random()*6)],
}));

export default function ToyTopiaLoader() {
  const [tick, setTick] = useState(0);
  const icons = ["🧸","🎮","🚀","🎨","🧩","🪀"];

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{style}</style>
      <div className="loader-wrap">

        {sparkles.map(s => (
          <div key={s.id} className="sparkle" style={{
            width: s.size, height: s.size,
            left: `${s.left}%`,
            bottom: "-10px",
            background: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }} />
        ))}

        <div className="star-ring">
          <div className="orbit orbit-1" style={{ inset: "4px", border: "1.5px dashed rgba(168,85,247,0.35)" }}>
            <div className="orbit-dot" style={{ background: "#E879F9", boxShadow: "0 0 8px #E879F9" }} />
            <div className="orbit-dot orbit-dot-2" style={{ background: "#A855F7", boxShadow: "0 0 8px #A855F7" }} />
          </div>
          <div className="orbit orbit-2" style={{ inset: "14px", border: "1.5px dashed rgba(96,165,250,0.3)" }}>
            <div className="orbit-dot" style={{ background: "#60A5FA", boxShadow: "0 0 8px #60A5FA", width: 7, height: 7 }} />
          </div>
          <div className="orbit orbit-3" style={{ inset: "24px", border: "1.5px dashed rgba(252,211,77,0.3)" }}>
            <div className="orbit-dot" style={{ background: "#FCD34D", boxShadow: "0 0 8px #FCD34D", width: 6, height: 6 }} />
          </div>
          <div className="center-icon">
            <div className="icon-bg">
              <span className="icon-emoji">{icons[tick % icons.length]}</span>
            </div>
          </div>
        </div>

        <div className="brand-name">ToyTopia</div>

        <div className="dots-row">
          {[1,2,3,4,5].map(d => <div key={d} className="dot" />)}
        </div>

        <div className="progress-track">
          <div className="progress-fill" />
        </div>

        <p className="tagline">Loading the fun...</p>

      </div>
    </>
  );
}