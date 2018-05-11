var db = require("../models");

//var burgers = db.Burger;
module.exports = function(app) {
  app.get("/", function(req, res) {
    db.burgers.findAll({}).then(function(results) {
      // results are available to us inside the .then
      //console.log(results.length + " burgers returned");
      var myburgers = [];
      results.forEach(function(burger){
        myburgers.push(burger.dataValues);
      });
      var hbsObject = {
        burgers : myburgers
      };
      //console.log("hbsObject");
      //console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  app.post("/api/burger", function(req, res) {
    var newBurger = {
      burger_name : req.body.name,
      devour : false
    };
    db.burgers.create(newBurger).then(function(results) {
      res.redirect('/');
    });
    /*burgers.insert("burger_name,devour", "'"+req.body.name+"',false", function(result) {
      // Send back the ID of the new burger
      res.redirect('/');
    });*/
  });

  app.put("/api/burger/:id", function(req, res) {
    //var id = req.params.id;
    var devoured = true;
    console.log("Updating id: " + req.params.id + " | devoured: " + devoured);

    db.burgers.update({
      devour : true
    },{
      where: {
        id: req.params.id
      }
    }).then(function(results){
      res.redirect('/');
    });
  

  });

};


// Export routes for server.js to use.
//module.exports = router;