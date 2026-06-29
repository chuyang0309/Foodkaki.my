// main.js
document.addEventListener("DOMContentLoaded", function () {
  // ===== Load header and footer =====
  function loadHTML(elementId, filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.status}`);
        return response.text();
      })
      .then(data => {
        document.getElementById(elementId).innerHTML = data;

        // Dispatch event when content is loaded
        document.dispatchEvent(new CustomEvent("contentLoaded", {
          detail: { elementId, filePath }
        }));
      })
      .catch(error => {
        console.error(error);
        document.getElementById(elementId).innerHTML =
          `<div style="color: red; padding: 10px;">Error loading ${filePath}</div>`;
      });
  }
  loadHTML("header", "./header.html");
  loadHTML("footer", "./footer.html");

  // ===== THEME SWITCH (Cookie example) =====
  const themeToggle = document.getElementById("theme-toggle");

  function setTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year
  }

  // Load theme from cookie
  const cookieTheme = document.cookie.split("; ").find(row => row.startsWith("theme="));
  if (cookieTheme) {
    const theme = cookieTheme.split("=")[1];
    document.body.setAttribute("data-theme", theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      setTheme(next);
    });
  }

  // ===== FAVORITE DISH (localStorage example) =====
  const favBtn = document.getElementById("save-favorite");
  const favOutput = document.getElementById("favorite-output");

  if (favBtn && favOutput) {
    favBtn.addEventListener("click", () => {
      const favDish = document.getElementById("fav-dish").value;
      localStorage.setItem("favoriteDish", favDish);
      favOutput.textContent = `Your favorite dish is saved: ${favDish}`;
    });

    const savedDish = localStorage.getItem("favoriteDish");
    if (savedDish) favOutput.textContent = `Last time you saved: ${savedDish}`;
  }

  // ===== SESSION NAME (sessionStorage example) =====
  const nameInput = document.getElementById("session-name");
  const nameOutput = document.getElementById("session-output");

  if (nameInput && nameOutput) {
    nameInput.addEventListener("input", () => {
      sessionStorage.setItem("username", nameInput.value);
      nameOutput.textContent = `Hello, ${nameInput.value}`;
    });

    const storedName = sessionStorage.getItem("username");
    if (storedName) nameOutput.textContent = `Hello, ${storedName}`;
  }

  // ===== API CALL (with jQuery) =====
  if (window.jQuery) {
    $.get("https://api.quotable.io/random?tags=food", function (data) {
      const quoteBox = $("#food-quote");
      if (quoteBox.length) {
        quoteBox.text(`🍜 "${data.content}" — ${data.author}`);
      }
    });
  }

  // ===== SHARE BUTTONS =====
  document.addEventListener("click", function (e) {
    if (e.target.matches(".share-btn")) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("Check out this amazing Malaysian Street Food site!");
      const type = e.target.dataset.platform;

      let shareUrl = "";
      if (type === "facebook") shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      if (type === "twitter") shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      if (type === "whatsapp") shareUrl = `https://wa.me/?text=${text} ${url}`;

      window.open(shareUrl, "_blank");
    }
  });

  // ===== NEWSLETTER FUNCTIONALITY =====
  // Newsletter functionality with session storage and API simulation
  const newsletterBtn = document.getElementById('newsletterBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');
  const newsletterMsg = document.getElementById('newsletterMsg');
  const newsletterPreferences = document.getElementById('newsletterPreferences');
  const newsletterFrequency = document.getElementById('newsletterFrequency');
  const subscriptionDetails = document.getElementById('subscriptionDetails');
  const detailEmail = document.getElementById('detailEmail');
  const detailFrequency = document.getElementById('detailFrequency');
  const detailDate = document.getElementById('detailDate');
  const unsubscribeBtn = document.getElementById('unsubscribeBtn');

  // Check if user previously subscribed or has preferences saved
  function loadNewsletterPreferences() {
    const savedEmail = sessionStorage.getItem('newsletterEmail');
    const savedPreference = sessionStorage.getItem('rememberPreference');
    const savedFrequency = sessionStorage.getItem('newsletterFrequency');
    const subscriptionStatus = sessionStorage.getItem('subscribed');
    
    if (savedEmail && savedPreference === 'true') {
      newsletterEmail.value = savedEmail;
      newsletterPreferences.checked = true;
    }
    
    if (savedFrequency) {
      newsletterFrequency.value = savedFrequency;
    }
    
    if (subscriptionStatus === 'true') {
      showSubscriptionDetails();
    }
  }

  // Show subscription details
  function showSubscriptionDetails() {
    const email = sessionStorage.getItem('newsletterEmail');
    const frequency = sessionStorage.getItem('newsletterFrequency');
    const date = sessionStorage.getItem('subscriptionDate');
    
    detailEmail.textContent = email;
    detailFrequency.textContent = frequency.charAt(0).toUpperCase() + frequency.slice(1);
    detailDate.textContent = new Date(date).toLocaleDateString();
    
    subscriptionDetails.style.display = 'block';
    newsletterEmail.disabled = true;
    newsletterFrequency.disabled = true;
    newsletterPreferences.disabled = true;
    newsletterBtn.textContent = 'Subscribed';
    newsletterBtn.disabled = true;
  }

  // Hide subscription details
  function hideSubscriptionDetails() {
    subscriptionDetails.style.display = 'none';
    newsletterEmail.disabled = false;
    newsletterFrequency.disabled = false;
    newsletterPreferences.disabled = false;
    newsletterBtn.textContent = 'Subscribe';
    newsletterBtn.disabled = false;
  }

  // Initialize newsletter preferences
  if (newsletterEmail && newsletterPreferences && newsletterFrequency) {
    loadNewsletterPreferences();
  }

  // Subscribe button click handler
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', function() {
      const email = newsletterEmail.value.trim();
      const frequency = newsletterFrequency.value;
      
      if (!email || !email.includes('@')) {
        newsletterMsg.textContent = 'Please enter a valid email address';
        newsletterMsg.style.color = '#ffcc00';
        return;
      }
      
      // Save preferences to session storage
      if (newsletterPreferences.checked) {
        sessionStorage.setItem('newsletterEmail', email);
        sessionStorage.setItem('rememberPreference', 'true');
        sessionStorage.setItem('newsletterFrequency', frequency);
      } else {
        sessionStorage.removeItem('newsletterEmail');
        sessionStorage.removeItem('rememberPreference');
        sessionStorage.removeItem('newsletterFrequency');
      }
      
      // Simulate API call to newsletter service
      simulateNewsletterSubscription(email, frequency)
        .then(response => {
          newsletterMsg.textContent = response.message;
          newsletterMsg.style.color = response.success ? '#90EE90' : '#ff6b6b';
          
          if (response.success) {
            // Save subscription to session storage
            sessionStorage.setItem('subscribed', 'true');
            sessionStorage.setItem('subscriptionDate', new Date().toISOString());
            showSubscriptionDetails();
          }
        })
        .catch(error => {
          newsletterMsg.textContent = 'Subscription failed. Please try again later.';
          newsletterMsg.style.color = '#ff6b6b';
          console.error('Newsletter subscription error:', error);
        });
    });
  }

  // Unsubscribe button click handler
  if (unsubscribeBtn) {
    unsubscribeBtn.addEventListener('click', function() {
      const email = sessionStorage.getItem('newsletterEmail');
      
      // Simulate API call to unsubscribe
      simulateNewsletterUnsubscription(email)
        .then(response => {
          newsletterMsg.textContent = response.message;
          newsletterMsg.style.color = response.success ? '#90EE90' : '#ff6b6b';
          
          if (response.success) {
            // Remove subscription from session storage
            sessionStorage.removeItem('subscribed');
            sessionStorage.removeItem('subscriptionDate');
            hideSubscriptionDetails();
            
            // Clear form
            if (sessionStorage.getItem('rememberPreference') !== 'true') {
              newsletterEmail.value = '';
            }
          }
        })
        .catch(error => {
          newsletterMsg.textContent = 'Unsubscription failed. Please try again later.';
          newsletterMsg.style.color = '#ff6b6b';
          console.error('Newsletter unsubscription error:', error);
        });
    });
  }

  // Simulate API call to newsletter service
  function simulateNewsletterSubscription(email, frequency) {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Simulate successful subscription 80% of the time
        const success = Math.random() > 0.2;
        
        if (success) {
          resolve({
            success: true,
            message: 'Thank you for subscribing to our food journey!'
          });
          
          // In a real implementation, you would send data to your server
          console.log(`Subscribing ${email} with ${frequency} frequency`);
        } else {
          reject({
            success: false,
            message: 'Subscription service temporarily unavailable'
          });
        }
      }, 1000); // Simulate 1 second API call
    });
  }

  // Simulate API call to unsubscribe
  function simulateNewsletterUnsubscription(email) {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Simulate successful unsubscription 90% of the time
        const success = Math.random() > 0.1;
        
        if (success) {
          resolve({
            success: true,
            message: 'You have been unsubscribed from our newsletter.'
          });
          
          // In a real implementation, you would send data to your server
          console.log(`Unsubscribing ${email}`);
        } else {
          reject({
            success: false,
            message: 'Unsubscription service temporarily unavailable'
          });
        }
      }, 1000); // Simulate 1 second API call
    });
  }
});

// Carousel and other functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel with auto-rotation
  var dishesCarousel = document.getElementById('dishesCarousel');
  if (dishesCarousel) {
    var myCarousel = new bootstrap.Carousel(dishesCarousel, {
      interval: 3000,
      wrap: true,
      pause: false
    });
  }
  
  // Session Storage Survey
  if (!sessionStorage.getItem('surveyShown')) {
    // Show survey modal after a short delay
    setTimeout(function() {
      const surveyModalElement = document.getElementById('surveyModal');
      if (surveyModalElement) {
        const surveyModal = new bootstrap.Modal(surveyModalElement);
        surveyModal.show();
      }
    }, 3000);
  }

  // Handle survey submission
  const submitButton = document.getElementById('submitSurvey');
  if (submitButton) {
    submitButton.addEventListener('click', function() {
      const foodPreference = document.getElementById('foodPreference').value;
      const frequency = document.querySelector('input[name="frequency"]:checked');
      
      // Validate form
      if (!foodPreference || !frequency) {
        alert('Please complete the survey before submitting.');
        return;
      }
      
      // Store in sessionStorage
      sessionStorage.setItem('foodPreference', foodPreference);
      sessionStorage.setItem('eatingFrequency', frequency.value);
      sessionStorage.setItem('surveyShown', 'true');
      
      // Close modal
      const surveyModalElement = document.getElementById('surveyModal');
      if (surveyModalElement) {
        const surveyModal = bootstrap.Modal.getInstance(surveyModalElement);
        if (surveyModal) {
          surveyModal.hide();
        }
      }
      
      // Show thank you message
      alert('Thank you for your feedback!');
    });
  }

  // Close button should also set survey as shown
  const surveyModalElement = document.getElementById('surveyModal');
  if (surveyModalElement) {
    surveyModalElement.addEventListener('hidden.bs.modal', function () {
      sessionStorage.setItem('surveyShown', 'true');
    });
  }
  
  // Share buttons functionality
  document.querySelectorAll('.btn-share').forEach(button => {
    button.addEventListener('click', function() {
      const platform = this.getAttribute('data-platform');
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent('FOODKAKI.my - Authentic Malaysian Street Food');
      const text = encodeURIComponent('Check out this amazing Malaysian food website!');
      
      let shareUrl;
      
      if (platform === 'facebook') {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        window.open(shareUrl, '_blank');
      } else if (platform === 'email') {
        shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
        window.location.href = shareUrl;
      }
    });
  });
  
  // API Call with jQuery - Food Facts
  function fetchFoodFact() {
    // Using a food facts API (example)
    $.ajax({
      url: 'https://www.themealdb.com/api/json/v1/1/random.php',
      method: 'GET',
      success: function(response) {
        if (response.meals && response.meals.length > 0) {
          const meal = response.meals[0];
          $('#foodFact').html(`
            <h4>${meal.strMeal}</h4>
            <p>${meal.strInstructions.substring(0, 150)}...</p>
            <small>Category: ${meal.strCategory}</small>
          `);
        }
      },
      error: function() {
        // Fallback facts if API fails
        const facts = [
          "Nasi Lemak is considered Malaysia's national dish!",
          "Malaysian cuisine uses over 100 different types of herbs and spices!",
          "Teh Tarik ('pulled tea') is made by 'pulling' the tea to create froth!",
          "Satay is believed to have originated from Indonesian Java but is popular across Malaysia!"
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        $('#foodFact').html(`<p>${randomFact}</p>`);
      }
    });
  }

  // Fetch initial fact
  fetchFoodFact();

  // New fact button
  $('#newFactBtn').on('click', fetchFoodFact);
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
    // Heritage items
    const heritageItems = document.querySelectorAll('.heritage-item');
    heritageItems.forEach((item, index) => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(itemPosition < screenPosition) {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 200);
      }
    });
    
    // Collage items
    const collageItems = document.querySelectorAll('.collage-item');
    collageItems.forEach((item, index) => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(itemPosition < screenPosition && !item.classList.contains('animate')) {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 100);
      }
    });
    
    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      const itemPosition = item.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(itemPosition < screenPosition && !item.classList.contains('animate')) {
        setTimeout(() => {
          item.classList.add('animate');
        }, index * 100);
      }
    });
  };
  
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});