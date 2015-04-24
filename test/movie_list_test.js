describe('Movie list', function () {
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
            controller = $controller('ListMoviesController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
     * Testaa myös, että Fireb
     * asea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should list all movies from the Firebase', function () {
        expect(FirebaseServiceMock.getMovies().length).toBe(3);
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
    });

    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
        var movie = scope.movies[1];
        scope.removeMovie(movie);
        expect(scope.movies.length).toBe(2);
        expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
    });

});