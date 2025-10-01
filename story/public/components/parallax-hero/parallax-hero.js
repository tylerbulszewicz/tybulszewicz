/**
 * Parallax Effect Component
 * A clean, reusable parallax effect using GSAP ScrollTrigger
 */

class ParallaxEffect {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.options = {
            depths: [0.10, 0.30, 0.60],
            images: [
                './assets/background.webp',
                './assets/bacground-middle.webp', 
                './assets/background-middle-2.webp'
            ],
            ...options
        };
        
        this.timeline = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupParallax());
        } else {
            this.setupParallax();
        }
    }

    setupParallax() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            console.error('GSAP and ScrollTrigger are required for parallax effect');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);
        this.createStructure();
        setTimeout(() => this.initParallax(), 100);
    }

    createStructure() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        container.className = 'parallax-container';
        container.innerHTML = '';

        this.options.depths.forEach((depth, index) => {
            const div = document.createElement('div');
            div.className = `parallax-layer layer-${index} parallax`;
            div.setAttribute('data-depth', depth);
            
            if (this.options.images && this.options.images[index]) {
                div.style.backgroundImage = `url(${this.options.images[index]})`;
            }
            
            container.appendChild(div);
        });
    }

    initParallax() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: `#${this.containerId}`,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        const parallaxElements = gsap.utils.toArray(`#${this.containerId} .parallax`);
        
        parallaxElements.forEach((layer) => {
            const depth = layer.dataset.depth;
            const movement = -(layer.offsetHeight * depth);
            this.timeline.to(layer, {y: movement, ease: "none"}, 0);
        });
    }

    addContent(content) {
        const container = document.getElementById(this.containerId);
        if (container) {
            const contentDiv = document.createElement('div');
            contentDiv.className = 'parallax-content';
            contentDiv.innerHTML = content;
            container.appendChild(contentDiv);
        }
    }

    destroy() {
        if (this.timeline) {
            this.timeline.kill();
        }
        
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.trigger && trigger.trigger.closest(`#${this.containerId}`)) {
                trigger.kill();
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ParallaxEffect;
} else if (typeof window !== 'undefined') {
    window.ParallaxEffect = ParallaxEffect;
}
