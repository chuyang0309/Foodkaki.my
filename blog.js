const STATE_INFO = {
  "perlis": { 
    title: "Perlis", 
    desc: "The smallest state in Malaysia, known for its serene paddy fields and peaceful rural life." 
  },
  "Kedah": { 
    title: "Kedah", 
    desc: "Often called the 'Rice Bowl of Malaysia', home to beautiful paddy fields and the Langkawi Islands." 
  },
  "Pulau Pinang": { 
    title: "Penang", 
    desc: "Famous as Malaysia’s food paradise. George Town is a UNESCO World Heritage Site with a rich cultural blend." 
  },
  "Perak": { 
    title: "Perak", 
    desc: "Known for limestone hills, cave temples, and the royal town of Kuala Kangsar." 
  },
  "Selangor": { 
    title: "Selangor", 
    desc: "The most developed state, surrounding Kuala Lumpur. It features Batu Caves, theme parks, and vibrant cities." 
  },
  "Negeri Sembilan": { 
    title: "Negeri Sembilan", 
    desc: "Famous for its Minangkabau culture, traditional architecture, and tranquil beaches like Port Dickson." 
  },
  "Melaka": { 
    title: "Malacca (Melaka)", 
    desc: "A historic port city, recognized as a UNESCO World Heritage Site for its colonial heritage and cultural fusion." 
  },
  "Johor": { 
    title: "Johor", 
    desc: "Located at the southern tip of Malaysia, known for theme parks, beaches, and close proximity to Singapore." 
  },
  "Pahang": { 
    title: "Pahang", 
    desc: "The largest state in Peninsular Malaysia, home to Cameron Highlands, Taman Negara, and pristine beaches." 
  },
  "Kelantan": { 
    title: "Kelantan", 
    desc: "Known as the 'Cradle of Malay Culture', with traditional arts, crafts, and delicious local cuisine." 
  },
  "Terengganu": { 
    title: "Terengganu", 
    desc: "Famous for its islands such as Redang and Perhentian, plus traditional boat-making and batik." 
  }
};

const map = document.querySelector('.malaysia-map');
const infoBox = document.getElementById('map-info');

function bindMapEvents() {
  const states = map.querySelectorAll("path");
  states.forEach(el => {
    const name = el.getAttribute('name') || el.getAttribute('id');

    el.addEventListener('click', () => {
  const info = STATE_INFO[name];
  if (infoBox && info) {
    // clear old message
    infoBox.innerHTML = "";

    // create a new div container
    const content = document.createElement("div");
    content.classList.add("info-content");

    // insert the content
    content.innerHTML = `
      <h2>${info.title}</h2>
      <p>${info.desc}</p>
      <a href="vendors.html" class="info-btn">Explore Vendors</a>
    `;

    infoBox.appendChild(content);

    requestAnimationFrame(() => {
      content.classList.add("animate");
    });
  }
});

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const info = STATE_INFO[name] || { title: name, desc: "No information available." };
        if (infoBox) {
          infoBox.innerHTML = `
            <h2>${info.title}</h2>
            <p>${info.desc}</p>
          `;
        }
      }
    });
  });
}

    map.addEventListener('touchstart', (e) => { tooltip.style.display='block'; }, {passive:true});
    map.addEventListener('touchend',   () => { tooltip.style.display='none'; });

    
bindMapEvents();
  