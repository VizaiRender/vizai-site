export function LoginBg({ dark = true }: { dark?: boolean }) {
  const bg = dark ? "#000" : "#fafafa";

  const blob1 = dark
    ? "radial-gradient(circle, rgba(180,180,180,0.35) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(9,64,210,0.12) 0%, transparent 70%)";

  const blob2 = dark
    ? "radial-gradient(circle, rgba(200,200,200,0.3) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(9,64,210,0.08) 0%, transparent 70%)";

  const blob3 = dark
    ? "radial-gradient(circle, rgba(160,160,160,0.2) 0%, transparent 70%)"
    : "radial-gradient(circle, rgba(9,64,210,0.06) 0%, transparent 70%)";

  const vignette = dark
    ? "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,0,0,0.6) 0%, transparent 100%)"
    : "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(250,250,250,0.5) 0%, transparent 100%)";

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: bg, transition: "background 300ms" }}>
      <div className="lb1" style={{
        position: "absolute", top: -160, right: -160,
        width: 700, height: 700, borderRadius: "50%",
        background: blob1, filter: "blur(60px)", transition: "background 300ms",
      }} />
      <div className="lb2" style={{
        position: "absolute", bottom: -160, left: -160,
        width: 650, height: 650, borderRadius: "50%",
        background: blob2, filter: "blur(70px)", transition: "background 300ms",
      }} />
      <div className="lb3" style={{
        position: "absolute", bottom: 0, right: "25%",
        width: 500, height: 500, borderRadius: "50%",
        background: blob3, filter: "blur(80px)", transition: "background 300ms",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: vignette, transition: "background 300ms",
      }} />
    </div>
  );
}
