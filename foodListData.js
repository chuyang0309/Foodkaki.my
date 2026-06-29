import { foods } from './foodDetailsData.js';

let foodCardList = document.getElementById('foodCardList');  //container for food cards in html

window.onload=loadFoodCard();

function loadFoodCard() {
    // Loop through the foods array to create a card for each item
    foods.forEach(food => {
        createFoodCard(food);
    });
}

function createFoodCard(food) {
    // Create the main food card div
    const foodCard = document.createElement('div');
    foodCard.className = 'foodCard';

    // Create the image element and set its source and alt text from the food object
    const img = document.createElement('img');
    img.src = food.foodBannerImage;
    img.alt = food.name;

    // Create the h2 element
    const h2 = document.createElement('h2');

    // Create the anchor (link) element and set its href and text content dynamically
    const a = document.createElement('a');
    a.href = `foodDetails.html?id=${food.id}`;
    a.textContent = food.name;

    // Assemble the card
    h2.appendChild(a);
    foodCard.appendChild(img);
    foodCard.appendChild(h2);

    // Add the completed food card to the container
    foodCardList.appendChild(foodCard);
}


//search function
document.getElementById("searchButton").addEventListener('click', function () {
    document.getElementById('foodCardList').innerHTML = '';  //clear foodCardList contents 

    let searchQuery = document.getElementById("searchInput").value.toLowerCase().trim();  //user search query

    foods.forEach(food => {                    //add the found food into displayedFoods array list
        if (food.name.toLowerCase().includes(searchQuery)) {
            createFoodCard(food);
        }
    })
})

