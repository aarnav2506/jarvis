document.addEventListener("DOMContentLoaded", () => {

  /* ================= BACKGROUND PARTICLES ================= */
  const bg = document.getElementById("bg");
  if (!bg) return;
  const ctx = bg.getContext("2d");

  function resizeCanvas() {
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = Array.from({ length: 150 }, () => ({
    x: Math.random() * bg.width,
    y: Math.random() * bg.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, bg.width, bg.height);
    for (const p of particles) {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x <= 0 || p.x >= bg.width) p.dx *= -1;
      if (p.y <= 0 || p.y >= bg.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,246,255,0.7)";
      ctx.fill();
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ================= COUNTER ANIMATION ================= */
  const counters = document.querySelectorAll(".value");
  counters.forEach(el => {
    const target = Number(el.dataset.target);
    if (isNaN(target)) return;

    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = current;
    }, 20);
  });

  /* ================= JARVIS TYPING EFFECT ================= */
  const jt = document.getElementById("jarvis-text");
  if (jt) {
    const messages = [
      "Good day, Aarnav.",
      "Mission parameters loaded.",
      "NDA and Air Force trajectory optimal.",
      "JEE Advanced preparation stable.",
      "Maintain discipline. Success probability rising."
    ];

    let msgIndex = 0;
    let charIndex = 0;

    function typeJarvis() {
      if (msgIndex >= messages.length) return;

      if (charIndex < messages[msgIndex].length) {
        jt.innerHTML += messages[msgIndex][charIndex];
        charIndex++;
      } else {
        jt.innerHTML += "<br>";
        charIndex = 0;
        msgIndex++;
      }
      setTimeout(typeJarvis, 35);
    }
    typeJarvis();
  }

  /* ================= ANALYTICS CHART ================= */
  const chart = document.getElementById("chart");
  if (chart) {
    const c = chart.getContext("2d");

    function resizeChart() {
      chart.width = chart.clientWidth;
      chart.height = 220;
    }
    resizeChart();
    window.addEventListener("resize", resizeChart);

    const data = [35, 48, 60, 72, 82, 91];

    function drawChart() {
      c.clearRect(0, 0, chart.width, chart.height);
      c.strokeStyle = "#00f6ff";
      c.lineWidth = 3;
      c.beginPath();

      data.forEach((v, i) => {
        const x = (i / (data.length - 1)) * chart.width;
        const y = chart.height - (v / 100) * chart.height;
        i === 0 ? c.moveTo(x, y) : c.lineTo(x, y);
      });
      c.stroke();
    }
    drawChart();
  }

  /* ================= 3D TILT EFFECT ================= */
  document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        `rotateX(${ -y * 10 }deg) rotateY(${ x * 10 }deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });

});
