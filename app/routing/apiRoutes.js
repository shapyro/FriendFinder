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
    console.log(lowestNum)

    var indices = [];
    // var array = ['a', 'b', 'a', 'c', 'a', 'd'];
    // var element = 'a';
    var idx = scoreCountArray.indexOf(lowestNum);
    while (idx != -1) {
      indices.push(idx);
      idx = scoreCountArray.indexOf(lowestNum, idx + 1);
    }
    console.log(indices);
    // [0, 2, 4]

    // var bestMatch = indices.filter(i => indices[i] = possibleMatches[i])
    var matchArray = []
    for (i=0; i<indices.length; i++) {
      matchArray.push(possibleMatches[indices[i]])
      // console.log("the indices value is: " + indices[i])
      // console.log("the lowest number is: " + lowestNum)
    }

    // console.log("score board says: " + scoreCountArray)

    res.json(matchArray);
    // res.json(postMessage);

  });

}