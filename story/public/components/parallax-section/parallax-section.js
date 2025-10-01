/**
 * Section Parallax Effect Component
 * Based on the old GSAP ScrollTrigger pattern with background position animation
 */

class SectionParallax {
    constructor(options = {}) {
        this.options = {
            sectionSelector: '.parallax-section',
            bgSelector: '.parallax-bg',
            images: [
                'https://assets.codepen.io/16327/portrait-pattern-2.jpg',
                'https://assets.codepen.io/16327/portrait-pattern-3.jpg',
                'https://assets.codepen.io/16327/portrait-pattern-4.jpg'
            ],
            ...options
        };
        
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

        let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

        gsap.utils.toArray(this.options.sectionSelector).forEach((section, i) => {
            section.bg = section.querySelector(this.options.bgSelector);
            
            if (!section.bg) {
                console.warn(`No background element found in section ${i}`);
                return;
            }

            if (this.options.images[i]) {
                section.bg.style.backgroundImage = `url(${this.options.images[i]})`;
            }
            
            gsap.fromTo(section.bg, {
                backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px"
            }, {
                backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom", 
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });
    }

    destroy() {
        ScrollTrigger.getAll().forEach(trigger => {
            trigger.kill();
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SectionParallax;
} else if (typeof window !== 'undefined') {
    window.SectionParallax = SectionParallax;
}
