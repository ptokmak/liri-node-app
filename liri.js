var keys = require('./keys.js');

var request = require ("request");
var twitter = require('twitter');
var spotify = require('spotify');

var fs = require('fs');

var action = process.argv[2];
var value = process.argv[3];

switch (action){
	case 'my-tweets':
		myTweets();
	break;

	case 'spotify-this-song':
		spotifySong();
	break;

	case 'movie-this':
		movieThis();
	break;

	case 'do-what-it-says':
		doWhat();
	break;
}//end switch

//function to show 20 tweets
function myTweets(){
	var client = new twitter(keys.twitterKeys);
	var params = {screen_name: 'pinariuss'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
  		if (!error) {
    	  	for (var i = 0; i < 20; i++) {
  			console.log(tweets[i].created_at);
  			 console.log(tweets[i].text);
  			}		
  		}  else {
  			console.log('error detail: ' + error);
  		}    	
  		
	});
}//end function myTweets


