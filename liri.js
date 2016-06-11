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

