const API_URL = "https://procejt2.herokuapp.com";

//add game
const randomButton = document.querySelector("#randomButton");
const addGameButton = document.querySelector("#addGameButton");
const deleteButton = document.querySelector("#deleteButton");
const updateButton = document.querySelector("#updateButton");
const title = document.getElementById("title").value;
const thumbnail = document.getElementById("thumbnail").value;
const short_description = document.getElementById("short_description").value;
const genre = document.getElementById("genre").value;
const platform = document.getElementById("platform").value;
const publisher = document.getElementById("publisher").value;
const developer = document.getElementById("developer").value;
const freetogame_profile_url = document.getElementById(
  "freetogame_profile_url"
).value;
let randomGame;

//update form
const titleUpdated = document.getElementById("titleUpdated");
const thumbnailUpdated = document.getElementById("thumbnailUpdated");
const short_descriptionUpdated = document.getElementById(
  "descriptionInputUpdated"
);
const genreUpdated = document.getElementById("genreUpdated");
const platformUpdated = document.getElementById("profileURLInputUpdate");
const platformUpdate = document.getElementById("platformUpdate");
const publisherUpdate = document.getElementById("publisherUpdate");
const developerUpdate = document.getElementById("developerUpdate");
const freetogame_profile_urlUpdate = document.getElementById(
  "freetogame_profile_urlUpdate"
);

//listening buttons
randomButton.addEventListener("click", handleRandomButtonClick);
addGameButton.addEventListener("click", handleAddButtonClick);
deleteButton.addEventListener("click", handleDeleteButtonClick);
updateButton.addEventListener("click", handleUpdateButtonClick);

//function that will give me a random game
function handleRandomButtonClick() {
  console.log("random clicked");
  fetch(`${API_URL}/games/all`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      //gernerate a radnom index based on the length of the data array
      const randomIndex = Math.floor(Math.random() * data.length);

      // console.log(randomIndex);
      //get the random game object
      randomGame = data[randomIndex];
      console.log(randomGame);

      //display
      const gameContainer = document.querySelector("#randomGame");
      console.log(gameContainer);
      gameContainer.innerHTML = `
        <h2 class='randomTitle'>${randomGame.title}</h2>
        <img  class='randomImg' src="${randomGame.thumbnail}" />
        <p class='randomDescription'>${randomGame.short_description}</p>
        <p class='randomGenre'>${randomGame.genre}</p>
        <a href='${randomGame.freetogame_profile_url}' target='_blank' class='randomLink'>Play Now</a>
        `;
    })
    .catch((error) => {
      console.error(error);
    });
}

function handleAddButtonClick(event) {
  event.preventDefault();
  console.log(event.target);
  const game = {
    title: document.getElementById("title").value,
    thumbnail: document.getElementById("thumbnail").value,
    short_description: document.getElementById("short_description").value,
    genre: document.getElementById("genre").value,
    platform: document.getElementById("platform").value,
    publisher: document.getElementById("publisher").value,
    developer: document.getElementById("developer").value,
    freetogame_profile_url: document.getElementById("freetogame_profile_url")
      .value,
  };

  fetch(`${API_URL}/games/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Game added:", data);
    })
    .catch((error) => {
      console.log("Error adding game:", error);
    });
}

function handleDeleteButtonClick() {
  console.log("Delete button clicked");
  console.log(randomGame.id, "here");
  console.log(randomGame, "here");
  if (randomGame) {
    fetch(`${API_URL}/games/delete/${randomGame._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(randomGame),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game deleted:", data);
        // Reset the stored random game variable
        randomGame = null;
        const gameContainer = document.querySelector("#randomGame");
        gameContainer.innerHTML = `
            <h2 class='randomTitle'></h2>
            <img  class='randomImg' src="" />
            <h2 class='randomDescription'>Game Deleted</h2>
            <p class='randomGenre'></p>
            <a href='' target='_blank' class='randomLink'></a>
            `;
      })
      .catch((error) => {
        console.log("Error deleting game:", error);
      });
  } else {
    console.log("No game selected to delete.");
  }
}

//get one by id
// update game

function handleUpdateButtonClick(event) {
  event.preventDefault();
  console.log("Update button clicked");
  console.log(randomGame.id, "here");
  console.log(randomGame, "here");

  const updateGame = {
    title: document.getElementById("titleUpdate").value.trim(),
    thumbnail: document.getElementById("thumbnailUpdate").value.trim(),
    short_description: document
      .getElementById("short_description")
      .value.trim(),
    genre: document.getElementById("genreUpdate").value.trim(),
    platform: document.getElementById("platformUpdate").value.trim(),
    publisher: document.getElementById("publisherUpdate").value.trim(),
    developer: document.getElementById("developerUpdate").value.trim(),
    //  freetogame_profile_url: document.getElementById('freetogame_profile_urlUpdate').value
  };
  if (randomGame) {
    fetch(`${API_URL}/games/${randomGame._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updateGame),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game updated", data);
        // Reset the stored random game variable
        randomGame = null;
      })
      .catch((error) => {
        console.log("Error updating game:", error);
      });
  } else {
    console.log("No game selected to update.");
  }
}
