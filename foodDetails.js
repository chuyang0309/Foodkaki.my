import { foods } from './foodDetailsData.js';

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const foodId = urlParams.get('id');

    const selectedFood = foods.find(food => food.id == foodId);

    // If food is found
    if (selectedFood) {
        document.getElementById('food').innerHTML = selectedFood.name;
        document.getElementById('location').innerHTML = selectedFood.location;
        document.getElementById('foodBannerImage').src = selectedFood.foodBannerImage;

        document.getElementById('s2').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${selectedFood.foodImageS2}')`;

        document.getElementById('titleS2').innerHTML = selectedFood.titleSection2;
        document.getElementById('subtextS2').innerHTML = selectedFood.subtextSection2InnerHTML;
        document.getElementById('titleLeft').innerHTML = selectedFood.titleSection2_1LeftInnerHTML;
        document.getElementById('subtextLeft').innerHTML = selectedFood.subtextSection2_1LeftInnerHTML;
        document.getElementById('titleRight').innerHTML = selectedFood.titleSection2_1RightInnerHTML;
        document.getElementById('subtextRight').innerHTML = selectedFood.subtextSection2_1RightInnerHTML;
        document.getElementById('youtubeEmbed').innerHTML = selectedFood.youtubeEmbedInnerHTML;
        document.getElementById('mapEmbed').innerHTML = selectedFood.mapEmbedInnerHTML;
        document.getElementById('name').innerHTML = selectedFood.spotName;
        document.getElementById('address').innerHTML = selectedFood.spotAddress;
        document.getElementById('mapLink').href = selectedFood.mapLink;

        document.getElementById('favourite-btn').addEventListener('click', function () {
            saveFavouriteFood(foodId);
        });
    } else {
        // If no food is found, display error
        // Replace HTML content with error message
        const content = document.getElementById('content');
        if (content) {
        content.innerHTML = '<h1>Food not found! :(</h1>';
        } else {
        document.body.innerHTML = '<h1>Food not found! :(</h1>';
        }
    }

    // Function to retrieve and display favorite food IDs
    function displayFavouriteFoods() {
        const favourites = JSON.parse(localStorage.getItem('favouriteFoods')) || [];

        // Check if the array is not empty
        if (favourites.length > 0) {
            console.log("Favorite Food IDs:");

            // 2. Loop through the array using forEach()
            favourites.forEach(foodId => {
                // Log each food ID to the console
                console.log(foodId);

                
                // You can use this foodId to find the corresponding food object from your data.
                // For example, if you had a 'foods' array available:
                const favouriteFood = foods.find(food => food.id == foodId);
                if (favouriteFood) {  //if found
                    // Do something with the favourite food object, like displaying its name
                    console.log(favouriteFood.name); 
                    console.log(favouriteFood.foodBannerImage);   //just food image
                }
            });
        } else {
            console.log("You have no favorite foods saved.");
        }
    }

};

function saveFavouriteFood(foodId) {
    // Get existing favourite food IDs from local storage
    const favourites = JSON.parse(localStorage.getItem('favouriteFoods')) || [];

    // Check if the food ID already exists in the list to prevent duplicates
    if (!favourites.includes(foodId)) {
        // Add the new food ID to the list
        favourites.push(foodId);

        // Save the updated list back to local storage
        localStorage.setItem('favouriteFoods', JSON.stringify(favourites));
        alert('Food added to favourites!');
    } else {
        alert('Food is already in your favourites!');
    }
}