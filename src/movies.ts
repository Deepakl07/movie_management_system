const movies = new Map();
const movieRatings = new Map<string, number[]>();


function addMovie(id : string ,title : string ,releaseYear:number ,director:string ,genre :string){
    if(movies.has(id)){
        return "Movie already exists";
    }
    movies.set(id, {title, releaseYear, director, genre});
}

function rateMovie(id:string, rating:number){
    if(!movies.has(id)){
        return "Movie not found";
    }
    if(!movieRatings.has(id)){
        movieRatings.set(id, []);
    }
    movieRatings.get(id)!.push(rating);
}

function getAverageRating(id:string){
    const ratings = movieRatings.get(id);
    if(!ratings || ratings.length === 0){
        return null;
    }
    return ratings.reduce((a, b) => a + b) / ratings.length;
}

function getTopRated() {
    return Array.from(movies).sort((a, b) => {
        const avgRatingA = getAverageRating(a[0]);
        const avgRatingB = getAverageRating(b[0]);
        return (avgRatingB ?? 0) - (avgRatingA ?? 0);
    });
}

function getMoviesBygenre(genre:string){
    return Array.from(movies).filter(([id, movie]) => movie.genre === genre);
}

function getMoviesByDirector(director:string){
    return Array.from(movies).filter(([id, movie]) => movie.director === director);
}

function searchMoviesByKeyword(keyword:string){
    return Array.from(movies).filter(([id, movie]) => movie.title.includes(keyword));
}

function getMovie(id:string){
    return movies.get(id);
}

function removeMovie(id:string){
    movies.delete(id);
}

export {addMovie, rateMovie, getAverageRating, getTopRated, getMoviesBygenre, getMoviesByDirector, searchMoviesByKeyword, getMovie, removeMovie};

