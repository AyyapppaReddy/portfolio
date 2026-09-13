// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, revealOptions);

revealElements.forEach(el => {
  revealOnScroll.observe(el);
});

// ==========================================
// THE QUANTUM SINGULARITY (FUTURE BACKGROUND)
// ==========================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 400; // High particle count for nebula effect

// Mouse acts as the gravity well
let mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  isActive: false
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
  mouse.isActive = true;
});

window.addEventListener('mouseout', () => {
  mouse.isActive = false;
});

// Resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Center gravity well if mouse inactive
  if (!mouse.isActive) {
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
  }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const colors = ['#22d3ee', '#a855f7', '#0ea5e9', '#d946ef'];

class SwirlParticle {
  constructor() {
    this.radius = Math.random() * (canvas.width / 1.5) + 50; // Distance from center
    this.angle = Math.random() * Math.PI * 2; // Starting angle
    this.speed = (Math.random() * 0.02) + 0.005; // Rotation speed
    this.size = Math.random() * 2.5 + 0.5; // Particle size
    this.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Position
    this.x = mouse.x + Math.cos(this.angle) * this.radius;
    this.y = mouse.y + Math.sin(this.angle) * this.radius;
  }
  
  update() {
    // Determine the gravity center (smooth transition to mouse)
    let targetX = mouse.isActive ? mouse.x : canvas.width / 2;
    let targetY = mouse.isActive ? mouse.y : canvas.height / 2;
    
    // Rotate angle
    this.angle += this.speed;
    
    // Calculate new position based on swirling around the gravity center
    const nextX = targetX + Math.cos(this.angle) * this.radius;
    const nextY = targetY + Math.sin(this.angle) * this.radius;
    
    // Add a slight "pull" towards the center for a 3D depth effect
    this.radius += Math.sin(this.angle * 5) * 0.5;
    
    // Store old position for drawing lines (trails)
    this.lastX = this.x;
    this.lastY = this.y;
    
    // Move to next position
    this.x += (nextX - this.x) * 0.1;
    this.y += (nextY - this.y) * 0.1;
  }
  
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size;
    ctx.lineCap = 'round';
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new SwirlParticle());
  }
}

function animateParticles() {
  // Use a semi-transparent black fill to create light trails!
  ctx.fillStyle = 'rgba(10, 10, 10, 0.15)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ==========================================
// SPOTLIGHT VFX (LIGHTING MODE)
// ==========================================
// Apply spotlight to project cards
const projectCards = document.querySelectorAll('.project-card');
const workSection = document.getElementById('work');

if (workSection) {
  workSection.addEventListener('mousemove', (e) => {
    projectCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Apply spotlight to skill categories
const skillCards = document.querySelectorAll('.skill-category');
const skillsSection = document.getElementById('skills');

if (skillsSection) {
  skillsSection.addEventListener('mousemove', (e) => {
    skillCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ==========================================
// VANILLA TILT FALLBACK INIT
// ==========================================
// VanillaTilt automatically initializes elements with data-tilt,
// but we ensure it binds properly just in case DOM loaded late.
document.addEventListener('DOMContentLoaded', () => {
  // Elements are already initialized via data-tilt attributes and the CDN script.
  // The preserve-3d and translateZ CSS handles the pop-out effects!
});

// ==========================================
// SCROLL PROGRESS & BACK TO TOP LOGIC
// ==========================================
const scrollProgress = document.getElementById('scroll-progress');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  // Calculate scroll percentage
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const winHeight = window.innerHeight;
  const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
  
  if (scrollProgress) {
    scrollProgress.style.width = scrollPercent + '%';
  }
  
  // Show/hide back to top button
  if (backToTop) {
    if (scrollTop > winHeight * 0.5) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
});

// ==========================================
// MAGNETIC BUTTONS (CREATIVE VFX)
// ==========================================
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    // Calculate distance from center of the button
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Apply transform to pull button towards cursor
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  el.addEventListener('mouseleave', () => {
    // Reset transform when mouse leaves
    el.style.transform = `translate(0px, 0px)`;
  });
});

// ==========================================
// MATRIX SCRAMBLE DECODER (ADVANCED CREATIVITY)
// ==========================================
class ScrambleText {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud" style="color: #22d3ee;">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const sectionTitles = document.querySelectorAll('.section-title');
const scrambleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      if (!el.dataset.scrambled) {
        const originalText = el.innerText;
        el.dataset.scrambled = "true"; // Prevent re-triggering
        const fx = new ScrambleText(el);
        fx.setText(originalText);
      }
    }
  });
}, { threshold: 0.5 });

sectionTitles.forEach(title => scrambleObserver.observe(title));
