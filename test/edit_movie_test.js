describe('Edit movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {
            var movie = {
                name: 'Joku leffa',
                director: 'Kalle Ilves',
                year: 2015,
                description: 'Mahtava leffa!'
            };
            return {
                editMovie: function (mov) {
                    movie = mov;
                },
                getMovie: function (key, done) {
                    if (key === 'abc123') {
                        done(movie);
                    } else {
                        done(null);
                    }
                }
            };
        })();

        RouteParamsMock = (function () {
            return {
                id: 'abc123'
            };
        })();


        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('EditMovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        scope.load();
        expect(scope.name).toBe('Joku leffa');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        scope.load();

        scope.name = 'Testi leffa';
        scope.editMovie();

        expect(scope.movie.name).toBe('Testi leffa');
        expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();

    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.load();

        scope.name = '';
        scope.editMovie();

        expect(scope.movie.name).toBe('Joku leffa');
        expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
    });
});