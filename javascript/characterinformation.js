window.onload = function () {
    let wrapper = document.getElementById("character-Wrapper");
    // console.log(wrapper);
  
    let winurl = window.location.href;
    let id = winurl.substring(winurl.lastIndexOf("#") + 1) || 1017100;
  
    // character details
    let url = `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=ffd376d6fa928075d01edfc90e532730&hash=a2634b9aef9eb258af74a4f0c95252af`;
    fetch(url)
      .then((response) => {
        // console.log(response.json());
        return response.json();
      })
      .then((data) => {
        console.log(data.data.results);
        let character = data.data.results[0];
        const {name, description, thumbnail} = character;
        let div = document.createElement("div");
        div.classList.add("characters-information-container");
  
        div.innerHTML = `
          <div class="characters-posterInfo">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="characters-information">
            <h3>${name}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
        wrapper.innerHTML = "";
        wrapper.appendChild(div);
      })
      // if any error occured while fetching data from api then display it on console
      .catch((error) => {
        console.log(error);
      });
  
    // fetch character releated comics
    let comicsWrapper = document.getElementById("comics-section");
    comicsWrapper.innerHTML = "";
    url = `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=ffd376d6fa928075d01edfc90e532730&hash=a2634b9aef9eb258af74a4f0c95252af`;
  
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let comics = res.data.results;
        // iterate over all the comics and display it on browser
        for (let comic of comics) {
          const { title, thumbnail, description } = comic;
          let div = document.createElement("div");
          div.classList.add("characters-information-container");
  
          div.innerHTML = `
          <div class="characters-posterInfo">
            <img src="${thumbnail.path}.jpg" alt="">
          </div>
          <div class="characters-information">
            <h3>${title}</h3>
            <p>${description || "description not found"}</p>
          </div>
        `;
          comicsWrapper.appendChild(div);
        }
      })
      // if any error occured while fetching data from api then display it on console
      .catch((error) => {
        console.error(error);
      })
  };
  