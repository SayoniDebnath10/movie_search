const searchform=document.querySelector(".search-form");
const searchbar=document.querySelector("#searchbar");
searchform.addEventListener("submit",async function(event){
    event.preventDefault();
    const moviename=searchbar.value.trim();
    if(!moviename){
        alert("Enter Movie Name! ")        
        return;
    } 
    const url=`https://www.omdbapi.com/?apikey=373a4f7b&s=${encodeURIComponent(moviename)}`;
    const response=await fetch(url);
    const data =await response.json();
    const container=document.querySelector(".movie-grids");
    container.innerHTML="";
    if(data.Response=="False"){
        container.innerHTML=`<div class="failed">
        <h2>Unable To Get Results</h2>
        <h3>${data.Error}</h3>
        </div>`;
        return;
    }

    const movies=data.Search;
    
    for(let movie of movies){
        
        const moviegrid= document.createElement("div");
        moviegrid.className="movie-card";
        moviegrid.innerHTML=`
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div>
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <p>${movie.Type}</p>
        <div>`
        ;

        container.appendChild(moviegrid);

    }
    
});