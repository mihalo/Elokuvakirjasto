describe('Show movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {
            return {
                getMovie: function (key, done) {
                    if (key === 'abc123') {
                        done({
                            name: 'Joku leffa',
                            director: 'Kalle Ilves',
                            year: 2015,
                            description: 'Mahtava leffa!'
                        });
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

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MovieController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routePrams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /* 
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
        scope.load();
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });
});