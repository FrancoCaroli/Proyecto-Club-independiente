var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


router.post('/',async(req, res, next)=>{
  var nombre=req.body.nombre;
  var apellido=req.body.apellido;
  var email=req.body.email;
  var tel=req.body.tel;
  var mensaje=req.body.mensaje;

  var obj= {
    to:'carolifranco7@gmail.com',
    subjet:'CONTACTO WEB',
    html: nombre + "se conecto a traves de la web y quiere mas informacion a este correo : " + email + ". <br> Su tel es: " + tel
   }

  var transport= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth:{
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS

    }
   });
   
  var info = await transport.sendMail(obj);
  
  res.render('index' , {
    message: 'Mensaje enviado correctamente'
  });
});

module.exports = router;
