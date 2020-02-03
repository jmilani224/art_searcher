
const searchField = document.querySelector("#search-field"),
      form = document.querySelector("form"),
      goButton = document.querySelector(".go"),
      backButton = document.querySelector('.go-back'),
      searchContainer = document.querySelector(".search-container"),
      resultContainer = document.querySelector(".result-container"),
      searchCard = document.querySelector(".search-card"),
      artApi = "https://openaccess-api.clevelandart.org/api/artworks/?q=",
      params = "&limit=20&has_image=1";

let searchQuery;      

const getArt = () => {
    searchQuery = encodeURIComponent(searchField.value);
    const apiUrl = artApi + searchQuery + params;

    document.body.style.flexDirection = "column"
    searchContainer.style.display = 'none';
    backButton.style.display = "block";
    resultContainer.style.display = "flex";
    
    fetch(apiUrl)
    .then(response => {
        return response.json();
    })
    .then(art => {
        const artList = art.data;

        for (artPiece in artList) {
            const newCard = searchCard.cloneNode(true);
            newCard.style.display = "flex";

            const h2 = newCard.querySelector('h2');
            h2.innerHTML = artList[artPiece].title;

            const artist = newCard.querySelector('.artist');
            artist.innerHTML = artList[artPiece].creators[0].description;

            const image = newCard.querySelector('img');
            image.src = artList[artPiece].images.web.url;

            const description = newCard.querySelector('.description');
            description.innerHTML = artList[artPiece].wall_description.substring(0, 250) + ". . .";

            const link = newCard.querySelector('a');
            link.href = artList[artPiece].url;

            resultContainer.appendChild(newCard);
        };
    })
    .catch(err => { 
        return err;
    })
};

const goBack = () => {
    
    document.body.style.flexDirection = "row"
    resultContainer.innerHTML = "";
    backButton.style.display = "none";
    searchContainer.style.display = "flex";

};

goButton.addEventListener("click", getArt);

form.addEventListener("submit", function (e) {
    e.preventDefault();
})

backButton.addEventListener("click", goBack);
