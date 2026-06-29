  const marqueeInner = document.querySelector(".marquee__inner");
  const span = marqueeInner.querySelector("span");

 
  const clone = span.cloneNode(true);
  marqueeInner.appendChild(clone);

  const contentWidth = span.offsetWidth + parseFloat(getComputedStyle(span).marginRight);

  gsap.to(".marquee__inner", {
    x: -contentWidth,
    duration: 10,
    ease: "none",
    repeat: -1,
  });

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      // markers: true,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});

gsap.set(".billboard-text", { y: "100%" }); 

gsap.to(".billboard-text", {
  y: 0,
  duration: 1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#content",
    start: "top top",
    end: "+=1000",
    scrub: true,
    pin: ".billboard-mask",  
    onLeave: () => {
      gsap.to(".billboard-text", {
        y: "10%",
        duration: 1,
        ease: "power4.in"
      });
    }
  }
});

//animation for the caption under the image
document.addEventListener("DOMContentLoaded", () => {
    const target = document.querySelector(".slide-hidden");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-visible");
        } else {
          entry.target.classList.remove("slide-visible");
        }
      });
    }, { threshold: 0.2 }); 

    observer.observe(target);
  });
  

