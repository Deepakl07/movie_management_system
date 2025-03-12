// movies.ts
const movies = new Map<string, { title: string; releaseYear: number; director: string; genre: string }>();
const movieRatings = new Map<string, number[]>();

function addMovie(id: string, title: string, releaseYear: number, director: string, genre: string) {
    if (movies.has(id)) {
        return false;
    }
    movies.set(id, { title, releaseYear, director, genre });
    return true;
}

function rateMovie(id: string, rating: number) {
    if (!movies.has(id)) {
        return false;
    }
    if (!movieRatings.has(id)) {
        movieRatings.set(id, []);
    }
    movieRatings.get(id)!.push(rating);
    return true;
}

function getName(id: string) {
    return movies.get(id)?.title ?? null;
}

function getAverageRating(id: string) {
    const ratings = movieRatings.get(id);
    return ratings && ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
}

function getTopRated() {
    return Array.from(movies.entries())
        .map(([id, movie]) => ({ ...movie, id, avgRating: getAverageRating(id) ?? 0 }))
        .sort((a, b) => b.avgRating - a.avgRating);
}

function getMoviesBygenre(genre: string) {
    return Array.from(movies.values()).filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
}

function getMoviesByDirector(director: string) {
    return Array.from(movies.values()).filter(movie => movie.director.toLowerCase() === director.toLowerCase());
}

function searchMoviesByKeyword(keyword: string) {
    return Array.from(movies.values()).filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()));
}

function getMovie(id: string) {
    return movies.get(id) ?? "Movie not found.";
}

function removeMovie(id: string) {
    return movies.delete(id);
}

export {
    addMovie,
    rateMovie,
    getAverageRating,
    getTopRated,
    getName,
    getMoviesBygenre,
    getMoviesByDirector,
    searchMoviesByKeyword,
    getMovie,
    removeMovie
};
