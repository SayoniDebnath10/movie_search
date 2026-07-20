const searchform=document.querySelector(".search-form");
const searchbar=document.querySelector("#searchbar");
searchform.addEventListener("submit",async function(event){
    event.preventDefault();
    const moviename=searchbar.value.trim();
    if(!moviename){
        alert("Enter Movie Name! ")        
        return;
    } 
    const container=document.querySelector(".movie-grids");
    container.innerHTML="<h1>Loading......</h1>"
    const url=`https://www.omdbapi.com/?apikey=373a4f7b&s=${encodeURIComponent(moviename)}`;

    const response=await fetch(url);
    const data =await response.json();
    
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
        const buttonbox=document.createElement("div");
        buttonbox.className="button-box";
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
        buttonbox.appendChild(showmorebtn);
        buttonbox.appendChild(watchlistbtn);
        moviegrid.appendChild(buttonbox);

        container.appendChild(moviegrid);

        watchlistbtn.addEventListener("click",function(){
            saveList(movie);


        });

        
               
        function saveList(movie){
            const movieobj={
                    poster: movie.Poster,
                    title: movie.Title,
                    year: movie.Year,
                    imdbID: movie.imdbID,
                    type: movie.Type

                };
            const listdata=localStorage.getItem("watchlist");
            let watchlist;
            if(!listdata){
                watchlist=[];               

            }
            else{
                watchlist=JSON.parse(listdata);
                const check=watchlist.some(function(savedmovie){
                    return savedmovie.imdbID===movie.imdbID;
                });
                    if(check){
                        
                        return;
                    }                     
            }
            watchlist.push(movieobj);
                localStorage.setItem("watchlist",JSON.stringify(watchlist));
                watchlistbtn.textContent="Remove From Watchlist";
                watchlistbtn.className="removebtn";


        }

    
    showmorebtn.addEventListener("click", async function(){
        const url=`https://www.omdbapi.com/?apikey=373a4f7b&i=${movie.imdbID}`;
        const response=await fetch(url);
        const details=await response.json();
        const modal=document.querySelector(".modal-container");
        const modaldetails=document.querySelector(".modal-details"); 
        modaldetails.className="modal-details";
        modal.style.display="flex";
        modaldetails.innerHTML=`
        <img src="${details.Poster}" alt="">
        
        <h2>${details.Title}</h2>
        <h3>${details.Year}</h3><br>
        <p>Genre: ${details.Genre}</p><br>
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

