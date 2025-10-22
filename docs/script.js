// 🎉 Confetti and subtle icon motion
document.addEventListener("DOMContentLoaded", () => {
  // Confetti
  const duration = 1500;
  const end = Date.now() + duration;
  const colors = ["#58a6ff", "#ffd166", "#ef476f", "#06d6a0", "#a27cff"];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.style.position = "fixed";
  canvas.style.left = 0;
  canvas.style.top = 0;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const confetti = Array.from({ length: 70 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    vy: Math.random() * 4 + 2,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.vy;
      if (p.y > canvas.height) p.y = 0;
    });
    if (Date.now() < end) requestAnimationFrame(draw);
    else canvas.remove();
  }
  draw();

  // Subtle parallax on skill icons
  const icons = document.querySelectorAll(".spin");
  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX - innerWidth / 2) / innerWidth;
    const y = (e.clientY - innerHeight / 2) / innerHeight;
    icons.forEach((icon, i) => {
      icon.style.transform = `rotate(${(x + y) * 40}deg) scale(1.05)`;
    });
  });
  document.addEventListener("mouseleave", () => {
    icons.forEach((icon) => (icon.style.transform = ""));
  });
});
