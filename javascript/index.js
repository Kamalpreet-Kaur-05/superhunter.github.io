let charactersContainer = document.getElementById("charactersContainer");
// function to fetch data from marvel Api
async function fetchData() {
  const response = await fetch(
    "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=ffd376d6fa928075d01edfc90e532730&hash=a2634b9aef9eb258af74a4f0c95252af"
  );
  const data = await response.json();
  return data;
}
// get favorite characters from local storage
function getStorage() {
  let data = JSON.parse(localStorage.getItem("favorite")) || [];
  return data;
}
fetchData()
  .then((data) => {
    // console.log(getStorage());
    let favoriteData = getStorage();
    let arr = data.data.results;
    charactersContainer.innerHTML = "";
    // iterate over an array and show the output on the screen
    for (let i = 0; i < arr.length; i++) {
      let favorite = "favorite";
      // to check character is already marked is favorite or not 
      for (let j = 0; j < favoriteData.length; j++) {
        if (arr[i].id == favoriteData[j].id) {
          favorite = "UnFavorite";
          break;
        }
      }
      // create a div for character
      const { id, thumbnail, name } = arr[i];
      let div = document.createElement("div");
      div.classList.add("character-cards");
      div.setAttribute("id", id);
      let path = `../pages/characterdetails.html#${id}`;
  
      div.innerHTML = `
        <img class="poster" src=${thumbnail.path}.jpg alt="">
        <div class="cards-body">
          <a href=${path}>${name}</a>
          <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavoritecharacter(this)"/>
        </div>
      `;
      charactersContainer.appendChild(div);
    }
  })
  // if there was error to fetch data from api then displaying an error on screen 
  .catch((error) => {
    console.error(error);
  });
// search functionality for character
let searchBtn = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");
// added an click event on search button
searchBtn.addEventListener("click", () => {
  let query = searchBox.value;
  searchBox.value = "";
  let url = `https://gateway.marvel.com/v1/public/characters?name=${query}&ts=1&apikey=ffd376d6fa928075d01edfc90e532730&hash=a2634b9aef9eb258af74a4f0c95252af`;
  // fetch relevant data based on information provided by user
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data.data.results);
      let result = data.data.results[0];
      const { id, name, thumbnail } = result;
      // get local favorite characters from local storage
      let favoriteData = getStorage();
      let favorite = "favorite";
      // check searched character is already favorite or not
      for (let j = 0; j < favoriteData.length; j++) {
        if (result.id == favoriteData[j].id) {
          favorite = "UnFavorite";
          break;
        }
      }
      searchResult.innerHTML = "";
      let h2 = document.createElement("h2");
      h2.innerText = "search results :";
      searchResult.appendChild(h2);
      // create a chracter
      let div = document.createElement("div");
      div.classList.add("character-cards");
      div.setAttribute("id", id);
      let path = `../pages/characterdetails.html#${id}`;
      
      div.innerHTML = `
        <img class="poster" src=${thumbnail.path}.jpg alt="">
        <div class="cards-body">
          <a href=${path}>${name}</a>
          <input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavoritecharacter(this)"/>
        </div>
      `;
      searchResult.appendChild(div);
    })
    // if any error occured while fetching data from api then display it on console
    .catch((error) => {
      console.error(error);
    });
});