MyApp.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://torrid-inferno-3314.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.addMovie = function (movie) {
        movies.$add(movie);
    };

    this.removeMovie = function (movie) {
        movies.$remove(movie);
    };

    this.editMovie = function (movie) {
        movies.$save(movie);
    };

    this.getMovies = function () {
        return movies;
    };

    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    };


});