
var friendsData = require("../data/friends.js");
var friend;

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
    // console.log(friendsData)
  });

  app.post("/api/friends", function(req, res) {
    // update friends

    var scoring = req.body.scores.map(a=>parseFloat(a));

      var newFriend = {
        name: req.body.name,
        photo: req.body.photo,
        scores: scoring
      }

      console.log(newFriend);
      friendsData.push(newFriend);
      
      var possibleMatches = friendsData.filter(match => match.name != newFriend.name)
      // console.log(possibleMatches);
      
      var scoreCountArray = [];
      possibleMatches.forEach(function (match){
        var total = 0;
        for (i=0; i<match.scores.length; i++) {
          // var tempArray = []
          total += Math.abs(match.scores[i] - newFriend.scores[i]);
        }
        scoreCountArray.push(total);
      })

      console.log("score board says: " + scoreCountArray)

      // for (i=0; i<possibleMatches.length; i++) {
      //   var diffArray = [];
      //   console.log(possibleMatches[i]);
      //   var diff = Math.abs(possibleMatches[i].scores[i] - newFriend.scores[i])
      //   scoreCountArray.push[diff]
      // }
      
      // console.log(possibleMatches)
      res.json(scoreCountArray);
      // res.json(postMessage);

  });

}