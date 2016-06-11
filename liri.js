var keys = require('./keys.js');

var request = require ("request");
var twitter = require('twitter');
var spotify = require('spotify');

var fs = require('fs');

var action = process.argv[2];
var value = process.argv[3];



function random(){
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
}//end function random


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


//function to search omdbapi for a movie
function movieThis() {
	var value = process.argv[3] || "Mr. Nobody";
	var queryUrl = 'http://www.omdbapi.com/?&y=&plot=short&r=json&tomatoes=true&t=' + value;
	request(queryUrl, function(err, response, body) {
	if ( err ) {
        console.log('error detail: ' + err);
        return;
    } else {
		body = JSON.parse(body);
		console.log("Title: " + body.Title);
		console.log("Year: " + body.Year);
		console.log("IMDB_Rating: " + body.imdbRating);
		console.log("Country: " + body.Country);
		console.log("Language: " + body.Language);
		console.log("Plot: " + body.Plot);
		console.log("Actors :" + body.Actors);
		console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
		console.log("Rotten Tomatoes URL: " + body.tomatoURL);

	}
});
}//end function movieThis



//function to search Spotify with a song name
function spotifySong() {
var value = process.argv[3] || "what's my age again";
spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log('error detail: ' + err);
        return;
    } else {
    	console.log('Artist: ' + data.tracks.items[0].artists[0].name)
        console.log('Song_Name: ' + data.tracks.items[0].name);
        console.log('Preview_url: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);
    }
 });
}//end function spotifySong


//function for doWhat
function doWhat() {
	fs.readFile('./random.txt', "utf8", function(err, data){
		if (err) {
			console.log('error detail: ' +err);
		}
		splitData = data.split(',');
		action = splitData[0];
		value = splitData[1];		
		random();
	});
} // end function doWhat
random();