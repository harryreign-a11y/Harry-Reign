    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    let particlesArray = [];
    const numberOfParticles = 80; // Adjust for more/less (higher = heavier on performance)

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height * 0.5; // Start above screen
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.glow = Math.random() * 15 + 10;
      }
      update() {
        this.y += this.speedY;
        this.opacity -= 0.002; // Slow fade
        if (this.y > canvas.height || this.opacity <= 0) {
          this.reset();
        }
      }
      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = this.glow;
        ctx.shadowColor = '#10b981'; // Neon emerald glow
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
    }

    animate();

    const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY < window.innerHeight * 0.6) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }
});
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});
