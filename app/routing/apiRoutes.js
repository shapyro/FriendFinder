var friendsData = require("../data/friends.js");
var friend;

module.exports = function(app) {

  // get friends from api
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  // update friends
  app.post("/api/friends", function(req, res) {

    // get scores as nums
    // may have an opportunity to coerce with '+' somewhere down below
    var scoring = req.body.scores.map(a=>parseFloat(a));

    // build friend
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: scoring
    }

    console.log(newFriend);
    // add new Friend to FrendsArray
    friendsData.push(newFriend);

    // exclude newFriend from possible matches
    var possibleMatches = friendsData.filter(match => match.name != newFriend.name)

    // get absolute value array for indexing to find best match from FriendsArray
    var scoreCountArray = [];
    possibleMatches.forEach(function (match){
      var total = 0;
      for (i=0; i<match.scores.length; i++) {
        total += Math.abs(match.scores[i] - newFriend.scores[i]);
      }
      scoreCountArray.push(total);
    });

    // find lowest num in array
    var lowestNum = Math.min(...scoreCountArray)

    var indices = [];
    var idx = scoreCountArray.indexOf(lowestNum);
    while (idx != -1) {
      indices.push(idx);
      idx = scoreCountArray.indexOf(lowestNum, idx + 1);
    }
    console.log(indices);

    // making a match array in case the user has more than one match! 
    var matchArray = []
    for (i=0; i<indices.length; i++) {
      matchArray.push(possibleMatches[indices[i]])
    }

    // respond to user with matches
    res.json(matchArray);

  });

}