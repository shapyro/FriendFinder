var friendsData = require("../data/friends.js");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
    //  console.log(friendsData)
  });

  app.post("/api/friends", function(req, res) {
    // update friends
    // if (friendsData.length < 5) {

    var scoring = req.body.scores.map(a=>parseFloat(a));
    // if (friendsData) {
      var newFriend = {
        name: req.body.name,
        photo: req.body.photo,
        scores: scoring
      }
      console.log(newFriend)
      // var name = req.body.name;
      // var photo = req.body.photo;
      // var scoring = req.body.scores.map(a=>parseFloat(a));
      // console.log(scoring)

      // friendsData.push(req.body);
      friendsData.push(newFriend);
      // console.log(req.body)
      // console.log(req.body.name)
      // console.log(req.body.photo)
      // console.log(req.body.parseFloat(scores));
      // console.log("here is the name: " + req.body.name)
      // console.log("Here are the scores: " + req.body.scores)
      

      var possibleMatches = friendsData.filter(match => match.name != newFriend.name)
      console.log(possibleMatches)

      // res.json(true);
      res.json(possibleMatches);
  });

}