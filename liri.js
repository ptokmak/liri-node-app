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
  			fs.appendFile('log.txt', "______LAST 20 TWEETS______________________" + '\n');
    	  	for (var i = 0; i < 20; i++) {   
    	  	fs.appendFile('log.txt', "__________________________________________" + '\n');     	  		  	
  			console.log(tweets[i].created_at);  			 
  			fs.appendFile('log.txt', 'Tweet: ' + tweets[i].created_at + '\n');
			console.log(tweets[i].text);
			fs.appendFile('log.txt', 'Created_at: ' + tweets[i].text+ '\n');
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
		fs.appendFile('log.txt', "______MOVIE DETAILS_____________________" + '\n');
		console.log("Title: " + body.Title);
		fs.appendFile('log.txt', 'Title: ' + body.Title + '\n');
		console.log("Year: " + body.Year);
		fs.appendFile('log.txt', 'Year: ' + body.Year + '\n');
		console.log("IMDB_Rating: " + body.imdbRating);
		fs.appendFile('log.txt', 'IMDB Rating: ' + body.imdbRating + '\n');
		console.log("Country: " + body.Country);
		fs.appendFile('log.txt', 'Country: ' + body.Country + '\n');
		console.log("Language: " + body.Language);
		fs.appendFile('log.txt', 'Language: ' + body.Language + '\n');
		console.log("Plot: " + body.Plot);
		fs.appendFile('log.txt', 'Plot: ' + body.Plot + '\n');
		console.log("Actors :" + body.Actors);
		fs.appendFile('log.txt', 'Actors: ' + body.Actors + '\n');
		console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
		console.log("Rotten Tomatoes URL: " + body.tomatoURL);
		fs.appendFile('log.txt', 'Rotten Tomatoes URL: ' + body.tomatoURL + '\n');

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
    	fs.appendFile('log.txt', "______SONG DETAILS____________________" + '\n')
    	console.log('Artist: ' + data.tracks.items[0].artists[0].name);
    	fs.appendFile('log.txt', 'Artist: ' + data.tracks.items[0].artists[0].name + '\n');
        console.log('Song_Name: ' + data.tracks.items[0].name);
        fs.appendFile('log.txt', 'Song Name: ' + data.tracks.items[0].name + '\n');
        console.log('Preview_url: ' + data.tracks.items[0].preview_url);
        fs.appendFile('log.txt', 'Preview URL: ' + data.tracks.items[0].preview_url + '\n');
        console.log('Album: ' + data.tracks.items[0].album.name);
        fs.appendFile('log.txt', 'Album: ' + data.tracks.items[0].album.name + '\n');
    }
 });
}//end function spotifySong


//function for doWhat
function doWhat() {
	fs.readFile('./random.txt', "utf8", function(err, data){
		if (err) {
			console.log('error detail: ' +err);
		}
		fs.appendFile('log.txt', "***************DO WHAT?***************" + '\n')
		splitData = data.split(',');
		action = splitData[0];
		value = splitData[1];		
		random();
	});
} // end function doWhat
random();