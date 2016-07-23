// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.


var friendData 		= require('../data/friends.js');
var path 			= require('path');


/*function compareScore(){
	var userScore = 0;
	for (var i = 0; i < friendData.length; i++) {
			for (var j = 0; j < friendData[i].scores.length; j++) {
				 userScore += friendData[i].scores[i];
			}
	}
} */
// ROUTING
// ===============================================================================

module.exports = function(app){

	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});

	app.post('/api/friends', function(req, res){
		var bestMatch = {
			name: "",
			photo: "",
			scoreDiff: 50
		};

		var userData = req.body;
		var userName = userData.name;
		var userPhoto = userData.photo;
		var userScores = userData.scores;

		var totalDiff = 0;

		for (var i=0; i<friendData.length; i++){
			console.log (friendData[i].name);

			for (var j=0; j<friendData[i].scores[j]; j++){

				totalDiff += Math.abs(userScores[j]- friendData[i].scores[j]);

				if (totalDiff <= bestMatch.scoreDiff){

					bestMatch.name = friendData[i].name;
					bestMatch.image = friendData[i].image;
					bestMatch.scoreDiff = totalDiff;
        }
			}
}


		console.log(bestMatch);
		friendData.push(userData);
		res.json(bestMatch);
		//compareScore();
		/* friendData.forEach(function(item) {
				var currDiff = 0;
				for (var i = 0; i < item.scores.length; i++) {
					currDiff += Math.abs(item.scores[i] - req.body.scores[i]);
				}
				if (currDiff <= scoreDiff) {
						scoreDiff = currDiff;
						bestMatch = item;
				}
			}) */
		 // KEY LINE
	});

	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!

	app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		friendData = [];
		console.log(friendData);
	})
}