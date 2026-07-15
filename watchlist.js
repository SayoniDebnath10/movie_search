loadWatchList();

function loadWatchList(){

    const data= localStorage.getItem("watchlist");
    const watchlist=JSON.parse(data);
    if(watchlist.length===0){
        const container=document.querySelector(".movie-grids");
        container.innerHTML=`
        <div class=failed>
        <h3>No Movies Added Yet!</h3>
        </div>`;
        return;

    }
    const container=document.querySelector(".movie-grids");
    for(let movie of watchlist){
        const moviegrid= document.createElement("div");
        const removebtn=document.createElement("button");
        removebtn.textContent="Remove From Watchlist";
        removebtn.className="removebtn";
         moviegrid.className="movie-card";
        moviegrid.innerHTML=`
        <img src="${movie.poster}" alt="${movie.title}">
        <div>
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <p>${movie.type}</p>
        <div>`
        ;
        moviegrid.appendChild(removebtn);
         container.appendChild(moviegrid);

         removebtn.addEventListener("click",function(){
            removeMovie(movie.imdbID);
         });


    }



    }

    function removeMovie(imdbID){
        const data = localStorage.getItem("watchlist");
    const watchlist = JSON.parse(data);
    const updatewatchlist=watchlist.filter((movie)=>movie.imdbID!==imdbID);
    localStorage.setItem("watchlist",JSON.stringify(updatewatchlist));
    const container = document.querySelector(".movie-grids");
container.innerHTML = "";
loadWatchList();
    }