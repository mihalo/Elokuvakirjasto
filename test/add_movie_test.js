describe('Add movie', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {
            var movies = [
                {
                    name: "The Shawshank Redemption",
                    year: 1994,
                    director: "Frank Darabont",
                    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
                },
                {
                    name: "Pulp Fiction",
                    year: 1994,
                    director: "Quentin Tarantino",
                    description: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
                },
                {
                    name: "The Godfather",
                    year: 1972,
                    director: "Francis Ford Coppola",
                    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."

                }
            ];

            return {
                addMovie: function (movie) {
                    movies.push(movie);
                },
                getMovies: function () {
                    return movies;
                },
                editMovies: function (movie) {
                    // Etsitään muokattava viesti mockin taulukosti
                    movieToEdit = movies.find(function (m) {
                        return m.name = movie.name;
                    });
                    if (movieToEdit) {
                        // Muokataan viestiä
                        movieToEdit.name = movie.name;
                    }
                },
                removeMovie: function (movie) {
                    for (var i = 0; i < movies.length; i++) {
                        if (movie == movies[i]) {
                            movies.splice(i, 1);
                            return;
                        }
                    }
                }
            };
        })();

        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('AddMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {

        scope.name = "Hyvä elokuva";
        scope.director = "Aku Ankka";
        scope.year = 2017;
        scope.description = "Paras leffa koskaan";

        scope.addMovie();
        expect(scope.movies.length).toBe(4);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {

        scope.year = 1;
        scope.director = "aa";
        scope.description = "ju";

        scope.addMovie();
        expect(scope.movies.length).toBe(3);
        expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
    });
});