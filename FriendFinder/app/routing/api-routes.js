// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.


var friendData 		= require('../data/friends.js');
var path 					= require('path');


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
		var userData = req.body;
		var bestMatch;


		for (var i = 0; i < userData.scores.length; i++) {
				if (userData.scores[i] == "1 (Strongly Disagree") {
					userData.scores[i] = 1;
				} else if (userData.scores[i] == "5 (Strongly Agree") {userData.scores[i] = 5;

				} else {userData.scores[i] = parseInt(userData.scores[i]);
				}
		}

		var scoreDiff = [];

		for(var i = 0; i < friendData.length; i++) {

			var compareFriend = friendData[i];
			var totalDiff = 0;

			for(var j = 0; j < compareFriend.scores.length; j++) {
				var differenceOneScore = Math.abs(compareFriend.scores[j] - userData.scores[j]);
				totalDiff += differenceOneScore;
			}

			scoreDiff[i] = totalDiff;
		}

		var bestMatch = scoreDiff[0];
		var bestMatchVal = 0;

		for(var i = 1; i < scoreDiff.length; i++) {
			if(scoreDiff[i] < bestMatch) {
				bestMatch = scoreDiff[i];
				bestMatchVal = i;
			}
		}

				//currDiff += Math.abs(item.scores[i] - req.body.scores[i]);

		//	if (currDiff <= scoreDiff){
			//	scoreDiff = currDiff;
				//bestMatch = item;
        //}
			//var currDiff = 0;
		console.log(bestMatch);
		friendData.push(userData);
		res.json(friendData[bestMatchVal]);
		})
}



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

	// ---------------------------------------------------------------------------
	// I added this below code so you could clear out the table while working with the functionality.
	// Don't worry about it!

	/* app.post('/api/clear', function(req, res){
		// Empty out the arrays of data
		friendData = [];
		console.log(friendData);
	}) */
