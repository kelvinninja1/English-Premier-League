var myApp = angular.module('leagueApp' ,['ngRoute']); 

myApp.controller('mainController' , ['$http', function($http){
    
    var main = this;

    this.pageHeading    = 'English Premier League';
    this.pageSubHeading = 'Work Hard , Playing Harder';
    this.year           = "year15"
    this.baseUrl; 
    this.leagueMatches  = [];
    
    this.loadAllMatches = function (){

        if (main.year == "year15"){
           main.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
        }
        else {
           main.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
        }

        $http({
            method: 'GET',
            url: main.baseUrl
        }).then(function successCallback(response){
              
                main.leagueMatches = response.data;
                
            },
            function errorCallback(response) {
                
                alert("some error occurred. Check the console.");
                

            });

    }
        this.loadAllMatches();
   
}]);
// End Controller
myApp.controller('singleController',['$http', '$routeParams', function($http, $routeParams){

    var main = this;
    this.team1_score =  $routeParams.score1
    this.team2_score =  $routeParams.score2
    this.name1       =  $routeParams.team1
    this.name2       =  $routeParams.team2
    this.round       =  $routeParams.matchDay;
    this.matchDate   =  $routeParams.date;
    this.team1_key   =  $routeParams.key1;
    this.team2_key   =  $routeParams.key2;
    this.team1_code  =  $routeParams.code1;
    this.team2_code  =  $routeParams.code2;

    
    if(this.team1_score > this.team2_score){
        this.final_result = this.name1 + ' Won';
    }
    else if(this.team1_score< this.team2_score){
        this.final_result = this.name2 + ' Won';
    }
    else{
        this.final_result = "Match drawn";
    }

}]);
//End of the Single Controller

myApp.controller('statisticsController',['$http', function($http){

    var main = this;
    this.year = "year15";
    this.statMatches = [];
    this.baseUrl;
    
    
    this.statisticMatches = function(){

       if (main.year == "year15"){
        main.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
        }
        else {
        main.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
        }
            $http({
                method : 'GET',
                url    : main.baseUrl
            }).then(function successCallback(response){
                
                main.statMatches = response.data;
                console.log(main.statMatches);

            },function errorCallback(response){

                alert("Some error occurred. Check the console.");
                console.log(response);
        });
    }
    
    this.statisticMatches();

    this.teamName ='';
    this.name     ='';

    this.submit   = function () {
        main.teamName = main.name;
    
        if(main.teamName){

            this.code;
            this.played = 0;
            this.won    = '';
            this.lost   = '';
            this.draw   = '';
            this.goal   =  0;
             
            for (var i = 0; i < main.statMatches.rounds.length; i++) {
                for (var j = 0; j < main.statMatches.rounds[i].matches.length; j++) {
                
                    if ((main.teamName) === (main.statMatches.rounds[i].matches[j].team1.name)) {
                    
                         this.code = (main.statMatches.rounds[i].matches[j].team1.code);
                         this.played++;

                        if ((main.statMatches.rounds[i].matches[j].score1) > (main.statMatches.rounds[i].matches[j].score2)) {
                            this.won++;
                            this.goal += main.statMatches.rounds[i].matches[j].score1; 
                        }
                        else if ((main.statMatches.rounds[i].matches[j].score1) == (main.statMatches.rounds[i].matches[j].score2)) {
                                this.draw++;
                                this.goal += main.statMatches.rounds[i].matches[j].score1; 
                        }
                        else{
                            this.lost++;
                            this.goal += main.statMatches.rounds[i].matches[j].score1; 
                        }
                    }  
                    else {
                    
                        if ((main.teamName) === (main.statMatches.rounds[i].matches[j].team2.name)) {
                        
                        this.played++;
                        this.code = (main.statMatches.rounds[i].matches[j].team2.code);

                        if ((main.statMatches.rounds[i].matches[j].score1) < (main.statMatches.rounds[i].matches[j].score2)){
                            this.won++;
                            this.goal += main.statMatches.rounds[i].matches[j].score2; 
                        }
                        else if((main.statMatches.rounds[i].matches[j].score1) == (main.statMatches.rounds[i].matches[j].score2)){
                                this.draw++;
                                this.goal += main.statMatches.rounds[i].matches[j].score2; 
                        }                             
                        else{
                           this.lost++;
                           this.goal += main.statMatches.rounds[i].matches[j].score2; 
                        }
                            
                    }
                    }                    
                    }
                    }
                    this.winning = (this.won/this.played)*100;
                    this.lossing = (this.lost/this.played)*100;
                    
               }
    };                        
}]);    
//End of the statistics Controller.