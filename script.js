// Heart particles generator and CTA interaction
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('heart-particles');
  const cta = document.getElementById('unfold-cta');

  if (!container) return;

  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';

    // Randomize size (12px - 28px)
    const size = Math.random() * 16 + 12;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';

    // Position randomly but more concentrated in the middle
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 30 + 20;
    const startX = 50 + Math.cos(angle) * radius;
    heart.style.left = startX + '%';
    heart.style.bottom = '-50px';

    // Random animation duration (2-4 seconds)
    const duration = Math.random() * 2 + 2;
    heart.style.setProperty('--duration', duration + 's');

    // Random drift and rotation
    const drift = (Math.random() - 0.5) * 100;
    const rotate = (Math.random() - 0.5) * 60;
    heart.style.setProperty('--drift', drift + 'px');
    heart.style.setProperty('--rotate', rotate + 'deg');

    // Add to container and force reflow
    container.appendChild(heart);
    heart.offsetHeight;

    // Add animation class after reflow
    heart.classList.add('float-up');

    // Remove after animation
    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    // Backup cleanup
    setTimeout(() => {
      if (container.contains(heart)) {
        heart.remove();
      }
    }, (duration + 0.1) * 1000);
  }

  // Create initial batch of hearts
  for (let i = 0; i < 5; i++) {
    setTimeout(() => createHeart(), Math.random() * 1000);
  }

  // Spawn hearts at a natural rate
  let spawnInterval = setInterval(createHeart, 600);

  // Pause when page not visible to save CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(spawnInterval);
      spawnInterval = null;
    } else if (!spawnInterval) {
      spawnInterval = setInterval(createHeart, 600);
    }
  });  // Smooth scroll function
  function smoothScroll(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smooth acceleration and deceleration
      const ease = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      
      window.scrollTo(0, startPosition + distance * ease(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // CTA click handler with smooth scroll and pulse animation
  if (cta) {
    cta.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Pulse animation
      cta.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(1.06)'},
        {transform: 'scale(1)'}
      ], {duration: 300, easing: 'ease-out'});

      // Smooth scroll to poem section
      smoothScroll('#poem-section', 1200);
    });
  }  // Poem section decorative elements
  function initPoemDecorations() {
    const stars = document.querySelector('.stars');
    const hearts = document.querySelector('.hearts');
    const cuteIcons = document.querySelector('.cute-icons');
    
    if (!stars || !hearts || !cuteIcons) return;

    // Add stars
    for (let i = 0; i < 30; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      stars.appendChild(star);
    }

    // Add floating hearts to sides
    const icons = ['♥', '✧', '♡', '✿', '❀'];
    for (let i = 0; i < 15; i++) {
      const icon = document.createElement('div');
      icon.className = 'cute-icon';
      icon.textContent = icons[Math.floor(Math.random() * icons.length)];
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.setProperty('--rotate', `${Math.random() * 360}deg`);
      cuteIcons.appendChild(icon);
    }
  }

  // Image hover heart effect
  function initImageHeartEffect() {
    const images = document.querySelectorAll('.poem-image');
    
    images.forEach(image => {
      const overlay = image.querySelector('.heart-overlay');
      if (!overlay) return;

      image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const heart = document.createElement('div');
        heart.className = 'heart float-up';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.setProperty('--drift', '0px');
        heart.style.animationDuration = '1s';
        heart.style.width = '12px';
        heart.style.height = '12px';
        
        overlay.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
      });
    });
  }

  // Initialize footer hearts
  function initFooterHearts() {
    const footerHearts = document.querySelector('.footer-hearts');
    if (!footerHearts) return;

    // Create initial hearts
    for (let i = 0; i < 5; i++) {
      createFooterHeart(footerHearts);
    }

    // Periodically create new hearts
    setInterval(() => {
      createFooterHeart(footerHearts);
    }, 2000);
  }

  function createFooterHeart(container) {
    const heart = document.createElement('span');
    heart.className = 'heart-icon';
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';
    
    // Add the heart to the container
    container.appendChild(heart);
    
    // Force a reflow to ensure the animation triggers
    heart.offsetHeight;
    
    // Remove heart after animation completes
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
    
    // Backup cleanup in case animation event doesn't fire
    setTimeout(() => {
        if (container.contains(heart)) {
            heart.remove();
        }
    }, 3100);
  }

  // Initialize poem section effects
  if (document.querySelector('.poem-section')) {
    initPoemDecorations();
    initImageHeartEffect();
  }

  // Initialize footer effects
  if (document.querySelector('.letter-footer')) {
    initFooterHearts();
  }

  // Mouse trail hearts
  function createHeartTrail(e) {
    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    heart.innerHTML = '♥';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    
    heart.addEventListener('animationend', () => heart.remove());
  }

  // Throttle the heart creation
  let lastHeart = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastHeart >= 50) {  // Create heart every 50ms
      createHeartTrail(e);
      lastHeart = now;
    }
  });

  // Love quotes
  const loveQuotes = [
    "Every moment with you is a blessing.",
    "You are my answered prayer.",
    "Your love makes my world complete.",
    "With you, every day feels like a dream.",
    "You are my heart's favorite person.",
    "In your eyes, I found my home.",
    "Your smile lights up my world.",
    "You make my heart skip a beat.",
    "Forever feels too short with you.",
    "You are my most beautiful adventure."
  ];

  let quoteElement = null;
  function showLoveQuote(e) {
    if (!quoteElement) {
      quoteElement = document.createElement('div');
      quoteElement.className = 'love-quote';
      document.body.appendChild(quoteElement);
    }

    const quote = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    quoteElement.textContent = quote;
    quoteElement.style.left = (e.clientX + 20) + 'px';
    quoteElement.style.top = (e.clientY + 20) + 'px';
    quoteElement.classList.add('visible');
  }

  function hideQuote() {
    if (quoteElement) {
      quoteElement.classList.remove('visible');
    }
  }

  // Show quotes on poem text hover
  const poemParagraphs = document.querySelectorAll('.poem-text p');
  poemParagraphs.forEach(p => {
    p.addEventListener('mouseenter', showLoveQuote);
    p.addEventListener('mouseleave', hideQuote);
  });

  // Music player
  const musicControl = document.createElement('div');
  musicControl.className = 'music-control';
  musicControl.innerHTML = '<i class="fas fa-music"></i>';
  document.body.appendChild(musicControl);

  const bgMusic = document.getElementById('bgMusic');
  let isMusicPlaying = false;

  if (bgMusic) {
    bgMusic.preload = 'auto';
    bgMusic.volume = 0.35; // gentle starting volume

    // Try autoplay with a slight delay to let the page load
    setTimeout(() => {
      bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
      }).catch((err) => {
        // Autoplay blocked - wait for user interaction
        console.log('Autoplay blocked:', err);
        const startOnInteraction = () => {
          bgMusic.play().then(() => {
            isMusicPlaying = true;
            musicControl.innerHTML = '<i class="fas fa-pause"></i>';
          }).catch(() => {});
          document.removeEventListener('click', startOnInteraction);
          document.removeEventListener('keydown', startOnInteraction);
        };
        document.addEventListener('click', startOnInteraction, { once: true });
        document.addEventListener('keydown', startOnInteraction, { once: true });
      });
    }, 150);
  }

  musicControl.addEventListener('click', () => {
    if (!bgMusic) return;
    if (isMusicPlaying) {
      bgMusic.pause();
      musicControl.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      bgMusic.play().then(() => {
        musicControl.innerHTML = '<i class="fas fa-pause"></i>';
      }).catch(() => {
        // still blocked; nothing to do until user gesture
        console.log('Play blocked; waiting for user gesture');
      });
    }
    isMusicPlaying = !isMusicPlaying;
  });

  // Memory bubbles
  const memories = [
    // Left side bubbles
    { x: 8, y: 25, image: 'img/1.jpg', text: 'Your eyes sparkle like the morning stars 💫', side: 'left' },
    { x: 12, y: 50, image: 'img/2.jpg', text: 'Your smile lights up my entire world ✨', side: 'left' },
    { x: 8, y: 75, image: 'img/3.jpg', text: 'Your grace and elegance take my breath away 💖', side: 'left' },
    
    // Right side bubbles
    { x: 85, y: 25, image: 'img/4.jpg', text: 'Your natural beauty radiates from within 🌟 ✨', side: 'right' },
    { x: 82, y: 50, image: 'img/5.jpg', text: 'Your presence makes everything more beautiful 💝 ✨', side: 'right' },
    { x: 85, y: 75, image: 'img/6.jpg', text: 'Your beauty is timeless and enchanting ❤️', side: 'right' }
  ];

  function createMemoryBubbles() {
    const container = document.querySelector('.poem-section');
    if (!container) return;

    // Create a container for the bubbles
    const bubblesContainer = document.createElement('div');
    bubblesContainer.className = 'bubbles-container';
    bubblesContainer.style.position = 'absolute';
    bubblesContainer.style.inset = '0';
    bubblesContainer.style.overflow = 'hidden';
    bubblesContainer.style.pointerEvents = 'none';
    container.appendChild(bubblesContainer);

    memories.forEach(memory => {
      const bubble = document.createElement('div');
      bubble.className = `memory-bubble memory-${memory.side}`;
      bubble.style.left = memory.x + '%';
      bubble.style.top = memory.y + '%';
      bubble.style.pointerEvents = 'auto';

      const img = document.createElement('img');
      img.src = memory.image;
      img.alt = memory.text;
      bubble.appendChild(img);

      const content = document.createElement('div');
      content.className = 'memory-content';
      content.textContent = memory.text;
      bubble.appendChild(content);

      bubble.addEventListener('click', () => {
        if (bubble.classList.contains('expanded')) {
          bubble.classList.remove('expanded');
        } else {
          document.querySelectorAll('.memory-bubble.expanded')
            .forEach(b => b.classList.remove('expanded'));
          bubble.classList.add('expanded');
          
          // Adjust position if expanded bubble would go off-screen
          requestAnimationFrame(() => {
            const rect = bubble.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            if (rect.right > viewportWidth) {
              bubble.style.left = `calc(${memory.x}% - ${rect.width}px)`;
            }
            if (rect.left < 0) {
              bubble.style.left = '20px';
            }
            if (rect.bottom > viewportHeight) {
              bubble.style.top = `calc(${memory.y}% - ${rect.height}px)`;
            }
            if (rect.top < 0) {
              bubble.style.top = '20px';
            }
          });
        }
      });

      bubblesContainer.appendChild(bubble);
    });
  }

  createMemoryBubbles();
});
