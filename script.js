// // - getOriginals()
// //   * URL : 'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'



  



const apiKey = '19f84e11932abbc79e6d83f82d6d1045';
const bannerImage = document.getElementById('baner');
const movieName = document.getElementById('moviheading');
const movieList = document.getElementById('trend');
const tvlist = document.getElementById("orignal")
const movieDescription = document.getElementById('overeview')

// Fetch movie data from API
fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const movies = data.results;

    // Generate movie posters dynamically
    movies.forEach(movie => {
     
      const moviePoster = document.createElement('img');
      moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      moviePoster.alt = movie.title;
      
      moviePoster.addEventListener('click', function() {
        fetchMovieDetails(movie.id);
      });

      movieList.appendChild(moviePoster);
    });
  })
  .catch(error => console.log(error));

  fetch(`https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213`)
  .then(response => response.json())
  .then(data => {
    const tvShows = data.results;
    console.log(data)

    // Generate TV show posters dynamically

    tvShows.forEach(tvShow => {
      if(tvShow.id == 227371 ||tvShow.id ==126280 || tvShow.id ==227975){
        return
       }
      const tvShowPoster = document.createElement('img');
      tvShowPoster.src = `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`;
      tvShowPoster.alt = tvShow.name;
      
      tvShowPoster.addEventListener('click', function() {
        fetchTVShowDetails(tvShow.id);
      });

      tvlist.appendChild(tvShowPoster);
    });
  })
  .catch(error => console.log(error));

// Fetch movie details for a specific movie
function fetchMovieDetails(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(movieData => {
      const backdropPath = movieData.backdrop_path;
      const movieTitle = movieData.title;
      const overview = movieData.overview
      
      updateBanner(backdropPath, movieTitle,overview);
    })
    .catch(error => console.log(error));
}
function fetchTVShowDetails(tvShowId) {
  fetch(`https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}`)
    .then(response => response.json())
    .then(tvShowData => {
      const backdropPath = tvShowData.backdrop_path;
      const tvShowTitle = tvShowData.name;
      const tvdescription  = tvShowData.overview
      
      updateBanner(backdropPath,  tvShowTitle,tvdescription);
    })
    .catch(error => console.log(error));
}

// Update banner image and movie name
function updateBanner(imagePath, name,desc) {
  bannerImage.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${imagePath})`;
  movieName.textContent = name;
  movieDescription.innerText = desc

}



  


