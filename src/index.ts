import {addMovie as addMovieService, rateMovie as rateMovieService,getName, getAverageRating, getTopRated, getMoviesBygenre, getMoviesByDirector, searchMoviesByKeyword, getMovie, removeMovie} from './movies'
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu(){
    console.log("1. Add a movie");
    console.log("2. Rate a movie");
    console.log("3. Get average rating of a movie");
    console.log("4. Get top rated movies");
    console.log("5. Get movies by genre");
    console.log("6. Get movies by director");
    console.log("7. Search movies by keyword");
    console.log("8. Get movie");
    console.log("9. Remove movie");
    console.log("10. Exit");
    rl.question("Enter your choice: ", (choice) => {
        handleInput(choice);
    });
}

function addMovie(){
    rl.question("Enter movie id: ", (id) => {
        rl.question("Enter movie title: ", (title) => {
            rl.question("Enter release year: ", (releaseYear) => {
                rl.question("Enter director: ", (director) => {
                    rl.question("Enter genre: ", (genre) => {
                        addMovieService(id, title, parseInt(releaseYear), director, genre);
                        console.log("Movie added successfully");
                        showMenu();
                    });
                });
            });
        });
    });
}

function rateMovie(){
    rl.question("Enter movie id: ", (id) => {
        rl.question("Enter rating[1-5]: ", (rating) => {
            rateMovieService(id, parseInt(rating));
            console.log("Movie rated successfully");
            showMenu();
        });
    });
}

function getAverageRatingPrompt(){
    rl.question("Enter movie id: ", (id) => {
        console.log(`Average rating ${getName(id)}: `);
        console.log(getAverageRating(id));
        showMenu();
    });
}

function handleInput(choice:string){
    switch(choice){
        case '1':
            addMovie();
         
           
            break;
        case '2':
            rateMovie();
             
            break;
        case '3':
            getAverageRatingPrompt();
            break;
        case '4':
            console.log("Top Rated Movies: \n")
            console.log(getTopRated());
            showMenu();
            break;
        case '5':
            rl.question("Enter genre: ", (genre) => {
                console.log("Movies by genre: \n");
                console.log(getMoviesBygenre(genre));
                showMenu();
            });
            break;
        case '6':
            rl.question("Enter director: ", (director) => {
                console.log("Movies by director: \n");
                console.log(getMoviesByDirector(director));
                showMenu();
            });
            break;
        case '7':
            rl.question("Enter keyword: ", (keyword) => {
                console.log("Movies by keyword: \n");
                console.log(searchMoviesByKeyword(keyword));
                showMenu();
            });
            break;
        case '8':
            rl.question("Enter movie id: ", (id) => {
                console.log("Movie: \n");
                console.log(getMovie(id));
                showMenu();
            });
            break;
        case '9':
            rl.question("Enter movie id: ", (id) => {
                console.log(removeMovie(id));
                console.log("Movie removed");
                showMenu();
            });
            break;
        case '10':
            rl.close();
            break;
        default:
            console.log("Invalid choice");
            showMenu();
    }
}

showMenu();