var express  = require('express');
var app      = express();
var base64Img = require('base64-img');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//var port = process.env.PORT || 3001;
var port = 3001;
// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3001/api
var CamaraRoute = router.route('/camara');
// Create endpoint /api/ for POSTS
CamaraRoute.post(function(req, res) {
  // Create a new instance of the  mode
     var camaraimage=req.body.image;

     base64Img.img(camaraimage, '../CamaraServer', Date.now(), function(err, filepath) {
       if (err)
      res.send(err);

    res.json({ message: 'imagen añadida', data: filepath });
     });
  // Save  and check for errors
  // 
  });
app.use('/api', router);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Start the server
app.listen(port);
