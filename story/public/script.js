// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Simple parallax effect for hero section
gsap.utils.toArray(".parallax-layer").forEach(layer => {
	const depth = layer.dataset.depth;
	gsap.to(layer, {
		y: -(window.innerHeight * depth),
		ease: "none",
		scrollTrigger: {
			trigger: "#hero",
			start: "top top",
			end: "bottom top",
			scrub: true
		}
	});
});

// Content section scrolls normally - no animation

// Simple parallax sections - only animate backgrounds, no section movement
gsap.utils.toArray(".parallax-section").forEach((section, index) => {
	const bg = section.querySelector('.parallax-bg');
	
	// Smooth background parallax only
	gsap.to(bg, {
		scale: 1.1,
		ease: "none",
		scrollTrigger: {
			trigger: section,
			start: "center bottom",
			end: "top top",
			scrub: 1
		}
	});
});
