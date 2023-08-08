// get local storage of favorite chracter
function getStorage() {
    let data = JSON.parse(localStorage.getItem("favorite")) || [];
    return data;
  }
  
  // add favorite characters  in localstorage
  function setStorage(data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem("favorite", dataString);
  }
  
  // when user click on favorite button on home page then this function is called.
  function updateFavoritecharacter(e) {
    let data = JSON.parse(e.getAttribute("data-character"));
    let favoriteList = getStorage();
  
    // check if character is already favorite then mark it as a unfavorite
    for (let character = 0; character < favoriteList.length; character++) {
      if (favoriteList[character].id == data.id) {
        favoriteList.splice(character, 1);
        e.setAttribute("value", "Favorite");
        setStorage(favoriteList);
        return;
      }
    }
  
    // if character is not present in favorite list then add it to favorite
    favoriteList.push(data);
    setStorage(favoriteList);
    e.setAttribute("value", "UnFavorite");
  }
  
  // display favorite page
  function displayFavorite(favoriteContainer) {
    // get favorite list of characters from local storage
    let myFavoriteList = getStorage();
    
    if(myFavoriteList.length > 0) {
      favoriteContainer.innerHTML = "";
    }
    // iterate over all the favorite list characters fetched from local storage
    for (let character = 0; character < myFavoriteList.length; character++) {
      const { id, name, path } = myFavoriteList[character];
  
      // create a diffrent div container for each character.
      let div = document.createElement("div");
      div.classList.add("character-cards");
      div.setAttribute("id", id);
  
      // path to redirect to the character details page when user click on character titles
      let detailsPath = `../pages/characterdetails.html#${id}`;
      div.innerHTML = `
          <img class="poster" src=${path}.jpg alt="">
          <div class="cards-body">
          <a href=${detailsPath}>${name}</a>
          <input type="button" value="UnFavorite" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateFavoritecharacter(this)"/>
          </div>
      `;
      favoriteContainer.appendChild(div);
    }
  }
  
  // show favorite page  if user visits on favorite page
  let favoriteContainer = document.getElementById('favorite-charactersHero');
  if(favoriteContainer != null) {
    displayFavorite(favoriteContainer);
  }
  