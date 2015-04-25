MyApp.controller('MovieController', function ($scope, $routeParams, $location, FirebaseService) {
    
    $scope.load = function () {
        FirebaseService.getMovie($routeParams.id, function (data) {
            $scope.movie = data;

            if ($scope.movie === null) {
                $location.path('/');
            } else {
                $scope.name = $scope.movie.name;
                $scope.year = $scope.movie.year;
                $scope.director = $scope.movie.director;
                $scope.description = $scope.movie.description;
            }

            $scope.edit = function () {
                var path = '/movies/' + $routeParams.id + '/edit';
                $location.path(path);
            };

        });
    };
    $scope.load();

});


