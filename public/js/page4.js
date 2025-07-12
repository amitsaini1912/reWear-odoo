
// Scroll-based Zoom Carousel functionality
const carousel = document.getElementById('carousel');
const cards = carousel.querySelectorAll('.card');

function updateZoomEffect() {
  const carouselRect = carousel.getBoundingClientRect();
  const centerX = carouselRect.left + carouselRect.width / 2;
  let activeIndex = 0;
  let minDistance = Infinity;

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(centerX - cardCenter);

    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }

    // More stable zoom detection - card must be very close to center
    if (distance < cardRect.width / 3.5) {
      card.classList.add('zoom');
    } else {
      card.classList.remove('zoom');
    }
  });

  // Update scroll indicator dots
  updateScrollIndicator(activeIndex);
}

function updateScrollIndicator(activeIndex) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    if (index === activeIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextCard() {
  const isMobile = window.innerWidth <= 768;
  const cardWidth = isMobile ? 160 + 12 : 180 + 20; // card width + gap
  const currentScroll = carousel.scrollLeft;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  
  if (currentScroll >= maxScroll) {
    // If at the end, go to beginning
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    // Scroll to next card
    const nextPosition = currentScroll + cardWidth;
    carousel.scrollTo({ left: nextPosition, behavior: 'smooth' });
  }
}

function prevCard() {
  const isMobile = window.innerWidth <= 768;
  const cardWidth = isMobile ? 160 + 12 : 180 + 20; // card width + gap
  const currentScroll = carousel.scrollLeft;
  
  if (currentScroll <= 0) {
    // If at the beginning, go to end
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
  } else {
    // Scroll to previous card
    const prevPosition = Math.max(currentScroll - cardWidth, 0);
    carousel.scrollTo({ left: prevPosition, behavior: 'smooth' });
  }
}

// Auto-scroll functionality
let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 160 + 12 : 180 + 20; // card width + gap
    const currentScroll = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    if (currentScroll >= maxScroll) {
      // If at the end, go to beginning
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      // Scroll to next card, centering it
      const currentIndex = Math.round(currentScroll / cardWidth);
      const nextIndex = Math.min(currentIndex + 1, cards.length - 1);
      const nextPosition = nextIndex * cardWidth;
      carousel.scrollTo({ left: nextPosition, behavior: 'smooth' });
    }
  }, 3000); // Auto-scroll every 3 seconds
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Animated counter for metrics
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + (element.textContent.includes('+') ? '+' : '');
    }
  }
  
  updateCounter();
}

// Initialize auto-scroll when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Ensure carousel section is visible
  const carouselSection = document.querySelector('.carousel-section');
  if (carouselSection) {
    carouselSection.style.opacity = '1';
    carouselSection.style.transform = 'translateY(0)';
  }
  
  // Initialize zoom carousel and scroll indicator
  updateZoomEffect();
  
  // Force update scroll indicator on load
  setTimeout(() => {
    updateZoomEffect();
  }, 100);
  
  // Debug: Log carousel info
  console.log('Carousel initialized with', cards.length, 'cards');
  console.log('Card width:', 200, 'Gap:', 20, 'Total card width:', 220);
  
  // Disable auto-scroll by default for better user control
  // startAutoScroll();
  
  // Add scroll event listener for smooth zoom effect
  let lastZoomIndex = -1;
  
  carousel.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      const carouselRect = carousel.getBoundingClientRect();
      const centerX = carouselRect.left + carouselRect.width / 2;
      let currentZoomIndex = -1;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(centerX - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          currentZoomIndex = index;
        }

        // Smooth zoom detection
        const zoomThreshold = cardRect.width / 2.5;
        
        if (distance < zoomThreshold) {
          card.classList.add('zoom');
        } else {
          card.classList.remove('zoom');
        }
      });

      // Update indicator
      if (currentZoomIndex !== lastZoomIndex) {
        updateScrollIndicator(currentZoomIndex);
        lastZoomIndex = currentZoomIndex;
      }
    });
  });
  
  // Pause auto-scroll on hover
  carouselSection.addEventListener('mouseenter', stopAutoScroll);
  carouselSection.addEventListener('mouseleave', () => {
    // Only restart auto-scroll if user hasn't interacted recently
    setTimeout(() => {
      // startAutoScroll();
    }, 1000);
  });
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevCard();
    } else if (e.key === 'ArrowRight') {
      nextCard();
    }
  });
  
  // Add click navigation
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 768;
      const cardWidth = isMobile ? 160 + 12 : 180 + 20; // card width + gap
      const scrollPosition = index * cardWidth;
      carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    });
  });

  // Add dot navigation
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      const isMobile = window.innerWidth <= 768;
      const cardWidth = isMobile ? 160 + 12 : 180 + 20; // card width + gap
      const scrollPosition = index * cardWidth;
      carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    });
  });
  
  // Set animation delays for cards
  cards.forEach((card, index) => {
    card.style.setProperty('--item-index', index);
  });
  
  // Initialize zoom effect on window load
  window.addEventListener('load', updateZoomEffect);
  
  // Initialize counter animation when impact section is revealed
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const metrics = entry.target.querySelectorAll('.metric h4');
        metrics.forEach(metric => {
          const text = metric.textContent;
          const number = parseInt(text.replace(/[^0-9]/g, ''));
          if (!isNaN(number)) {
            animateCounter(metric, number);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const impactSection = document.querySelector('.impact');
  if (impactSection) {
    observer.observe(impactSection);
  }
});

// Enhanced scroll with keyboard support
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft') {
    scrollCarousel(-1);
  } else if (e.key === 'ArrowRight') {
    scrollCarousel(1);
  }
});

// Enhanced Scroll Progress Indicator with smooth animation
function updateScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
  
  // Add smooth animation to progress bar
  scrollProgress.style.width = scrollPercent + '%';
  
  // Add glow effect based on scroll position
  const glowIntensity = Math.min(scrollPercent / 20, 1);
  scrollProgress.style.boxShadow = `0 0 20px rgba(40, 167, 69, ${glowIntensity * 0.5})`;
  
  // Update progress bar color based on scroll position
  if (scrollPercent > 80) {
    scrollProgress.style.background = 'linear-gradient(90deg, #dc3545, #fd7e14)';
  } else if (scrollPercent > 50) {
    scrollProgress.style.background = 'linear-gradient(90deg, #ffc107, #fd7e14)';
  } else {
    scrollProgress.style.background = 'linear-gradient(90deg, #28a745, #20c997)';
  }
}

// Throttle scroll events for better performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

window.addEventListener('scroll', throttle(updateScrollProgress, 16)); // ~60fps

// Parallax scroll effect for hero section
function parallaxScroll() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroImg = document.querySelector('.hero-img');
  
  if (hero && heroContent && heroImg) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate * 0.3}px)`;
    heroImg.style.transform = `translateY(${rate * 0.1}px)`;
  }
}

window.addEventListener('scroll', throttle(parallaxScroll, 16));

// Smooth reveal animation for sections
function revealOnScroll() {
  const sections = document.querySelectorAll('.carousel, .impact');
  const metrics = document.querySelectorAll('.metric');
  const windowHeight = window.innerHeight;
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 150;
    
    if (sectionTop < windowHeight - revealPoint) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
      
      // Animate metrics with staggered delay
      if (section.classList.contains('impact')) {
        metrics.forEach((metric, index) => {
          metric.style.setProperty('--delay', index);
          setTimeout(() => {
            metric.classList.add('revealed');
          }, index * 100);
        });
      }
    }
  });
}

window.addEventListener('scroll', throttle(revealOnScroll, 16));