// Remove the import since it's not working properly
// import { foods } from './foodDetailsData.js';

let foodCardList = document.getElementById('foodCardList');
let emptyFavorites = document.getElementById('emptyFavorites');
let favoritesCount = document.getElementById('favoritesCount');

// Define foods array locally to avoid import issues
const foods = [
    {
        id: 1,
        name: "Ipoh Bean Sprout Chicken",
        location: "Ipoh, Perak",
        foodBannerImage: "images/ipohChicken2.jpg"
    },
    {
        id: 2,
        name: "Line Clear Nasi Kandar",
        location: "George Town, Penang",
        foodBannerImage: "images/ID2(1).jpg"
    },
    {
        id: 3,
        name: "Siam Road Char Kway Teow",
        location: "George Town, Penang",
        foodBannerImage: "images/ID3(2).jpg"
    },
    {
        id: 4,
        name: "Air Itam Assam Laksa",
        location: "Ayer Itam, Penang",
        foodBannerImage: "images/ID4(1).jpg"
    },
    {
        id: 5,
        name: "Gurney Drive Curry Mee",
        location: "Pulau Tikus, Penang",
        foodBannerImage: "images/ID5(1).jpg"
    },
    {
        id: 6,
        name: "888 Hokkien Mee",
        location: "George Town, Penang",
        foodBannerImage: "images/ID6(1).jpg"
    },
    {
        id: 7,
        name: "Seng Thor Oyster Omelette",
        location: "George Town, Penang",
        foodBannerImage: "images/ID7(1).jpg"
    },
    {
        id: 8,
        name: "Penang Lok Lok",
        location: "Padang Brown, Penang",
        foodBannerImage: "images/ID8(1).jpg"
    },
    {
        id: 9,
        name: "Penang Road Chendul",
        location: "George Town, Penang",
        foodBannerImage: "images/ID9(1).jpg"
    },
    {
        id: 10,
        name: "Seow Fong Lye Wan Tan Mee",
        location: "George Town, Penang",
        foodBannerImage: "images/ID10(1).jpg"
    },
    {
        id: 11,
        name: "Kajang Satay",
        location: "Kajang, Selangor",
        foodBannerImage: "images/ID11(1).png"
    },
    {
        id: 12,
        name: "Nasi Ambeng",
        location: "Kajang, Selangor",
        foodBannerImage: "images/ID12(1).jpg"
    },
    {
        id: 13,
        name: "Mee Rebus & Begedil",
        location: "Shah Alam, Selangor",
        foodBannerImage: "images/ID13(1).png"
    },
    {
        id: 14,
        name: "Masak Lemak Cili Api",
        location: "Seremban, Negeri Sembilan",
        foodBannerImage: "images/ID14(1).jpg"
    },
    {
        id: 15,
        name: "Rendang Minang",
        location: "Kuala Pilah, Negeri Sembilan",
        foodBannerImage: "images/ID15(1).jpg"
    },
    {
        id: 16,
        name: "Asam Pedas Melaka",
        location: "Melaka",
        foodBannerImage: "images/ID16(1).jpg"
    },
    {
        id: 17,
        name: "Chung Wah Rice Balls",
        location: "Melaka",
        foodBannerImage: "images/ID17(1).jpg"
    },
    {
        id: 18,
        name: "Haji Wahid Mee Rebus",
        location: "Johor Bahru",
        foodBannerImage: "images/ID19(1).jpg"
    },
    {
        id: 19,
        name: "Din Laksa Telok Kechai",
        location: "Alor Setar, Kedah",
        foodBannerImage: "images/ID20(1).jpg"
    },
    {
        id: 20,
        name: "Mami Rozi Nasi Ulam",
        location: "Sungai Petani, Kedah",
        foodBannerImage: "images/ID21(1).jpg"
    },
    {
        id: 21,
        name: "Puding DiRaja",
        location: "Pekan, Pahang",
        foodBannerImage: "images/ID22(1).jpg"
    },
    {
        id: 22,
        name: "Fatt Gor Hor Fun",
        location: "Ipoh, Perak",
        foodBannerImage: "images/ID23(2).jpg"
    },
    {
        id: 23,
        name: "Aun Kheng Lim Salt Chicken",
        location: "Ipoh, Perak",
        foodBannerImage: "images/ID24(1).jpg"
    },
    {
        id: 24,
        name: "Keropok Lekor",
        location: "Kuala Terengganu",
        foodBannerImage: "images/ID25(1).jpg"
    },
    {
        id: 25,
        name: "Lieniey Nasi Kerabu",
        location: "Kota Bharu, Kelantan",
        foodBannerImage: "images/ID26(1).jpg"
    },
    {
        id: 26,
        name: "Ayam Percik",
        location: "Kota Bharu, Kelantan",
        foodBannerImage: "images/ID27(2).jpg"
    }
];

// Load favorites when page loads
window.onload = loadFavorites;

function loadFavorites() {
    // Clear existing content
    foodCardList.innerHTML = '';
    
    // Get favorite food IDs from localStorage
    const favoriteIds = getFavoriteIds();
    
    if (favoriteIds.length === 0) {
        // Show empty state
        emptyFavorites.style.display = 'block';
        favoritesCount.textContent = '';
        return;
    }
    
    // Hide empty state
    emptyFavorites.style.display = 'none';
    
    // Update favorites count
    favoritesCount.textContent = `${favoriteIds.length} favorite${favoriteIds.length !== 1 ? 's' : ''}`;
    
    // Get favorite foods and create cards
    const favoriteFoods = getFavoriteFoods(favoriteIds);
    
    favoriteFoods.forEach(food => {
        createFoodCard(food);
    });
}

function getFavoriteIds() {
    // Get favorite food IDs from localStorage
    const favorites = localStorage.getItem('favouriteFoods');
    return favorites ? JSON.parse(favorites) : [];
}

function getFavoriteFoods(favoriteIds) {
    // Filter foods array to only include favorited items.
    // We convert both the food.id and the IDs in the favorites array to strings
    // to ensure a reliable, type-insensitive comparison. This prevents issues
    // where one is a number (e.g., 5) and the other is a string (e.g., "5").
    const favoriteIdStrings = favoriteIds.map(String);
    return foods.filter(food => favoriteIdStrings.includes(String(food.id)));
}

function createFoodCard(food) {
    // Create the main food card div
    const foodCard = document.createElement('div');
    foodCard.className = 'foodCard';
    
    // Create the remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-favorite';
    removeBtn.innerHTML = '×';
    removeBtn.title = 'Remove from favorites';
    removeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromFavorites(food.id);
    };

    // Create the image element
    const img = document.createElement('img');
    img.src = food.foodBannerImage;
    img.alt = food.name;
    img.loading = 'lazy';

    // Create the content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'food-content';

    // Create the h2 element with link
    const h2 = document.createElement('h2');
    const a = document.createElement('a');
    a.href = `foodDetails.html?id=${food.id}`;
    a.textContent = food.name;

    // Create location info
    const locationP = document.createElement('p');
    locationP.className = 'food-location';
    locationP.textContent = food.location;

    // Assemble the card
    h2.appendChild(a);
    contentDiv.appendChild(h2);
    contentDiv.appendChild(locationP);
    
    foodCard.appendChild(removeBtn);
    foodCard.appendChild(img);
    foodCard.appendChild(contentDiv);

    // Add the completed food card to the container
    foodCardList.appendChild(foodCard);
}

function removeFromFavorites(foodId) {
    // Get current favorites
    let favoriteIds = getFavoriteIds();
    
    // Remove the food ID from favorites (ensure comparison works with mixed types)
    favoriteIds = favoriteIds.filter(id => String(id) !== String(foodId));
    
    // Update localStorage
    localStorage.setItem('favouriteFoods', JSON.stringify(favoriteIds));
    
    // Reload the favorites display
    loadFavorites();
    
    // Optional: Show a brief confirmation message
    showNotification('Removed from favorites');
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        transition: all 0.3s ease;
        transform: translateX(100%);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}