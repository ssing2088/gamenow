// This changes the title of your site

var sitename = "Gamenow.net"; // Change this to change the name of your website.
var subtext = "Play Game Freely!"; // set the subtext

// more settings in main.css



// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!

import "/./config/custom.js";

var serverUrl1 = "https://gamenow.net";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = `Play ${game.name} - ${game.description ? game.description.substring(0, 100) + '...' : 'Free Online Unblocked Game'}`;
    gameImage.loading = "lazy";
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/&gamename=${encodeURIComponent(game.name)}`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    // Add game description tooltip (optional)
    if (game.description) {
      gameName.title = game.description;
    }

    // Add category badge (optional)
    let categoryBadge = null;
    if (game.category) {
      categoryBadge = document.createElement("span");
      categoryBadge.textContent = game.category;
      categoryBadge.className = "category-badge";
      categoryBadge.style.cssText = "background: #4b87f7; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 5px;";
    }

    // Enhanced structured data for each game
    gameDiv.setAttribute('itemscope', '');
    gameDiv.setAttribute('itemtype', 'https://schema.org/Game');
    
    const gameLink = document.createElement("a");
    gameLink.href = `play.html?gameurl=${game.url}/&gamename=${encodeURIComponent(game.name)}`;
    gameLink.setAttribute('itemprop', 'url');
    gameLink.style.textDecoration = "none";
    gameLink.style.color = "inherit";
    
    const gameTitle = document.createElement("span");
    gameTitle.setAttribute('itemprop', 'name');
    gameTitle.textContent = game.name;
    gameTitle.style.display = "none";
    
    // Add description for structured data
    if (game.description) {
      const gameDesc = document.createElement("span");
      gameDesc.setAttribute('itemprop', 'description');
      gameDesc.textContent = game.description;
      gameDesc.style.display = "none";
      gameDiv.appendChild(gameDesc);
    }
    
    // Add category for structured data
    if (game.category) {
      const gameGenre = document.createElement("span");
      gameGenre.setAttribute('itemprop', 'genre');
      gameGenre.textContent = game.category;
      gameGenre.style.display = "none";
      gameDiv.appendChild(gameGenre);
    }
    
    gameLink.appendChild(gameImage);
    const nameContainer = document.createElement("div");
    nameContainer.appendChild(gameName);
    if (categoryBadge) {
      nameContainer.appendChild(categoryBadge);
    }
    gameLink.appendChild(nameContainer);
    
    gameDiv.appendChild(gameLink);
    gameDiv.appendChild(gameTitle);
    gamesContainer.appendChild(gameDiv);
  });
}


function handleSearchInput() {
  const searchInputValue = document
    .getElementById("searchInput")
    .value.toLowerCase();
  
  const filteredGames = gamesData.filter((game) => {
    // Search in game name
    if (game.name.toLowerCase().includes(searchInputValue)) {
      return true;
    }
    
    // Search in description
    if (game.description && game.description.toLowerCase().includes(searchInputValue)) {
      return true;
    }
    
    // Search in tags
    if (game.tags && game.tags.some(tag => tag.toLowerCase().includes(searchInputValue))) {
      return true;
    }
    
    // Search in category
    if (game.category && game.category.toLowerCase().includes(searchInputValue)) {
      return true;
    }
    
    return false;
  });
  
  displayFilteredGames(filteredGames);
}

// Add category filter function (optional enhancement)
function filterByCategory(category) {
  const filteredGames = category === 'all' 
    ? gamesData 
    : gamesData.filter(game => game.category === category);
  displayFilteredGames(filteredGames);
}


fetch("./config/games.json") 
  .then((response) => response.json())
  .then((data) => {
    gamesData = data;
    displayFilteredGames(data); 
  })
  .catch((error) => console.error("Error fetching games:", error));


document
  .getElementById("searchInput")
  .addEventListener("input", handleSearchInput);

document.getElementById("title").innerHTML = `${sitename}`;

document.getElementById("subtitle").innerHTML = `${subtext}`

