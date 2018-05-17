var express  = require('express');
var app      = express();
var base64Img = require('base64-img');
var bodyParser = require('body-parser');
var fs = require('fs');
var path=require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var port = process.env.PORT || 3001;

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
      res.json({ message: 'imagen añadida' });	
     });
  // Save  and check for errors
  // 
  });
//Mostrar fotos
var CamaraRoute2 = router.route('/camara/:archivo');
CamaraRoute2.get(function  (req,res){
  var archivo=req.params.archivo;
  var rutaArchivos='../CamaraServer/'+archivo;
  console.log(rutaArchivos);
  fs.exists(rutaArchivos, function(exists){
    if(exists){
      res.sendFile(path.resolve(rutaArchivos))
    }else{
      res.status(200).send({message: 'no existe la imagen...'});
    }
  });
});

app.use('/api', router);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Start the server
app.listen(port);
