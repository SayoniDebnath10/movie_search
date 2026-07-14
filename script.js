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
        const watchlistbtn=document.createElement("button");
        const showmorebtn=document.createElement("button");
        showmorebtn.className="showmore-btn";
        showmorebtn.textContent="Show Details";
        watchlistbtn.className="watchlist-btn";
        watchlistbtn.textContent="Add To Watchlist";
        moviegrid.className="movie-card";
        moviegrid.innerHTML=`
        <img src="${movie.Poster}" alt="${movie.Title}">
        <div>
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <p>${movie.Type}</p>
        <div>`
        ;
        moviegrid.appendChild(showmorebtn);
        moviegrid.appendChild(watchlistbtn);

        container.appendChild(moviegrid);

    
    showmorebtn.addEventListener("click", async function(){
        const url=`https://www.omdbapi.com/?apikey=373a4f7b&i=${movie.imdbID}`;
        const response=await fetch(url);
        const details=await response.json();
        const modal=document.querySelector(".modal-container");
        const modaldetails=document.querySelector(".modal-details"); 
        modal.style.display="flex";
        modaldetails.innerHTML=`
        <img src="${details.Poster}">
        <h2>${details.Title}</h2>
        <p>${details.Year}</p><br>
        <p><b>Genre<b>: ${details.Genre}</p><br>
        <p>Language: ${details.Language}</p><br>
        <p>Rated: ${details.Rated}</p><br>
        <p>Released: ${details.Released}</p><br>
        <p>Runtime: ${details.Runtime}</p><br>
        <p>Actors: ${details.Actors}</p><br>
        <p>Awards: ${details.Awards}</p><br>
        <p>Box-Office: ${details.BoxOffice}</p><br>
        <p>Country: ${details.Country}</p><br>
        <p>Director: ${details.Director}</p><br>
        <p>Writer: ${details.Writer}</p><br>
        <p>imdb Rating: ${details.imdbRating}</p><br>
        <p>imdb Votes: ${details.imdbVotes}</p><br>
        <p>Production: ${details.Production}</p><br><br>
        <p>Plot: </p><br>
        <p>${details.Plot}</p>   
        `;

        const closebtn=document.querySelector(".closebtn");
        closebtn.addEventListener("click", function(){
            modal.style.display="none";


        });



    });
    watchlistbtn.addEventListener("click",function(event){



    });
}
    
});