// Set up
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
//var logger = require('morgan');
var bodyParser = require('body-parser');
//var cors = require('cors');
 var Empleado = require('./models/empleado');

// Configuration

mongoose.connect('mongodb://localhost/Empleados');
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'holahola' }); 
});

var EmpleadosRoute = router.route('/Empleados');
// Create endpoint /api/ for POSTS
EmpleadosRoute.post(function(req, res) {
  // Create a new instance of the  model
  var empleado = new Empleado();

  // Set the  properties that came from the POST data
  empleado.Tipoid = req.body.tipo;
  empleado.Numid = req.body.numid;
  empleado.Nombres = req.body.nombres;
  empleado.Apellidos=req.body.apellidos;
  empleado.Edad=req.body.edad;
  empleado.Genero=req.body.genero;
  empleado.Cargo=req.body.cargo;

  // Save  and check for errors
  empleado.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Empleado añadido', data: empleado });
  });
});
EmpleadosRoute.get(function(req, res) {
  // Use  model to find all 
  Empleado.find(function(err, empleados) {
    if (err)
      res.send(err);

    res.json(empleados);
  });
});
var empleadoRoute = router.route('/empleados/:empleado_id');

// Create endpoint /api/empleados/:empleados for GET
empleadoRoute.get(function(req, res) {
  // Use the Empleados model to find a specific empleado
  Empleado.findById(req.params.empleado_id, function(err, empleado) {
    if (err)
      res.send(err);

    res.json(empleado);
  });
});
empleadoRoute.put(function(req, res) {
  // Use the Beer model to find a specific empleado
  Empleado.findById(req.params.empleado_id, function(err, empleado) {
    if (err)
      res.send(err);

    // Update the existing empleado 
  empleado.Tipoid = req.body.tipo;
  empleado.Numid = req.body.numid;
  empleado.Nombres = req.body.nombres;
  empleado.Apellidos=req.body.apellidos;
  empleado.Edad=req.body.edad;
  empleado.Genero=req.body.genero;
  empleado.Cargo=req.body.cargo;

    // Save the employee and check for errors
    empleado.save(function(err) {
      if (err)
        res.send(err);

      res.json(empleado);
    });
  });
});
///api/empleado/:empleado_id para DELETE
empleadoRoute.delete(function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Empleado.findByIdAndRemove(req.params.empleado_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'El empleado se ha eliminado!' });
  });
});

app.use('/api', router);
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
  });

// Start the server
app.listen(port);