const slides= document.querySelectorAll(".slides img");
let slideIndex=0;
let intervalID=null;

gsap.registerPlugin(ScrollTrigger);

const button = document.getElementById('favourite-btn');

// GSAP timeline for the glow animation
const glowTimeline = gsap.timeline({ paused: true });

// Define the animation for the pseudo-element
glowTimeline.to(button, {
    boxShadow: "0 0 15px 5px rgba(255, 99, 71, 0.7)",
    duration: 0.3,
    ease: "power2.inOut"
})
.to(button.querySelector('::before'), {
    scale: 1,
    opacity: 1,
    duration: 0.3,
    ease: "power2.inOut"
}, "<"); // The '<' makes this animation start at the same time as the previous one

// Add event listeners for the hover effect
button.addEventListener('mouseenter', () => {
    glowTimeline.play();
});

button.addEventListener('mouseleave', () => {
    glowTimeline.reverse();
});

gsap.to("#s1 .fade-up", {
	duration: 1,
	y: 0,
	opacity: 1,
	stagger: 0.3,
	ease: "power2.out"
});

gsap.to("#s2 .fade-up", {
		duration: 1,
		y: 0,
		opacity: 1,
		stagger: 1,
		ease: "power2.out",
		delay:0.3,

		scrollTrigger: {
				trigger: "#s2 .fade-up", 
				start: "top 80%", 
				toggleActions: "play none none none" 
		}
});

gsap.to(".left", {
		x: 0, 
		opacity: 1, 
		duration: 1.5, 
		scrollTrigger: {
				trigger: ".left", 
				start: "top center", 
				toggleActions: "play none none none",
		}
});

gsap.to(".right", {
	x: 0, 
	opacity: 1, 
	duration: 1.5,
	scrollTrigger: {
		trigger: ".right", 
		start: "top center", 
		toggleActions: "play none none none"
	}
},"<+6");

gsap.to(".glow-btn", {
	boxShadow: "0 0 25px #ff6347, 0 0 20px #ff6347",
	duration: 1.5,
	repeat: -1,
	yoyo: true,
	ease: "power1.inOut"
});

document.querySelector(".glow-btn").addEventListener("mousedown", () => {
	gsap.to(".glow-btn", { scale: 0.99, duration: 0.1 });
});
document.querySelector(".glow-btn").addEventListener("mouseup", () => {
	gsap.to(".glow-btn", { scale: 1, duration: 0.1 });
});