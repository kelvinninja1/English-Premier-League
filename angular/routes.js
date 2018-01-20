
myApp.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/totalMatches',{
            
            templateUrl     : 'views/Allmatches-view.html',
            
            controller      : 'mainController',
           
             controllerAs   : 'matches1'
        })
        .when('/singlematch/:matchDay/:team1/:team2/:score1/:score2/:date/:key1/:key2/:code1/:code2',{
            
            templateUrl     : 'views/singleMatch-view.html',
            
            controller      : 'singleController',
           
            controllerAs    : 'singleMatch'
        })

        .when('/teamView',{
            
            templateUrl     : 'views/statistics-view.html',
           
            controller      : 'statisticsController',
            
             controllerAs   : 'stats'
        })      

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<p class="text-center" style="font-size:2.0em; color:white;"></p>'
            });

}]);