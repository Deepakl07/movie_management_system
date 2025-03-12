// index.ts
import {
    addMovie as addMovieService,
    rateMovie as rateMovieService,
    getName,
    getAverageRating,
    getTopRated,
    getMoviesBygenre,
    getMoviesByDirector,
    searchMoviesByKeyword,
    getMovie,
    removeMovie
} from './movies';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\nMovie Management System");
    console.log("1. Add a movie");
    console.log("2. Rate a movie");
    console.log("3. Get average rating of a movie");
    console.log("4. Get top-rated movies");
    console.log("5. Get movies by genre");
    console.log("6. Get movies by director");
    console.log("7. Search movies by keyword");
    console.log("8. Get movie details");
    console.log("9. Remove a movie");
    console.log("10. Exit");
    rl.question("Enter your choice: ", handleInput);
}

function addMovie() {
    rl.question("Enter movie ID: ", (id) => {
        rl.question("Enter movie title: ", (title) => {
            rl.question("Enter release year: ", (releaseYear) => {
                rl.question("Enter director: ", (director) => {
                    rl.question("Enter genre: ", (genre) => {
                        if (addMovieService(id, title, parseInt(releaseYear), director, genre)) {
                            console.log("Movie added successfully!");
                        } else {
                            console.log("A movie with this ID already exists.");
                        }
                        showMenu();
                    });
                });
            });
        });
    });
}

function rateMovie() {
    rl.question("Enter movie ID: ", (id) => {
        rl.question("Enter rating (1-5): ", (rating) => {
            if (rateMovieService(id, parseInt(rating))) {
                console.log("Movie rated successfully!");
            } else {
                console.log("Movie not found.");
            }
            showMenu();
        });
    });
}

function getAverageRatingPrompt() {
    rl.question("Enter movie ID: ", (id) => {
        const name = getName(id);
        if (name) {
            console.log(`Average rating for "${name}": ${getAverageRating(id) ?? "No ratings yet"}`);
        } else {
            console.log("Movie not found.");
        }
        showMenu();
    });
}

function handleInput(choice: string) {
    switch (choice) {
        case '1': addMovie(); break;
        case '2': rateMovie(); break;
        case '3': getAverageRatingPrompt(); break;
        case '4':
            console.log("Top Rated Movies:");
            console.log(getTopRated());
            showMenu();
            break;
        case '5':
            rl.question("Enter genre: ", (genre) => {
                console.log("Movies in this genre:", getMoviesBygenre(genre));
                showMenu();
            });
            break;
        case '6':
            rl.question("Enter director: ", (director) => {
                console.log("Movies by this director:", getMoviesByDirector(director));
                showMenu();
            });
            break;
        case '7':
            rl.question("Enter keyword: ", (keyword) => {
                console.log("Matching movies:", searchMoviesByKeyword(keyword));
                showMenu();
            });
            break;
        case '8':
            rl.question("Enter movie ID: ", (id) => {
                console.log("Movie details:", getMovie(id));
                showMenu();
            });
            break;
        case '9':
            rl.question("Enter movie ID: ", (id) => {
                removeMovie(id);
                console.log("Movie removed successfully.");
                showMenu();
            });
            break;
        case '10':
            console.log("Goodbye!");
            rl.close();
            break;
        default:
            console.log("Invalid choice. Please try again.");
            showMenu();
    }
}

showMenu();