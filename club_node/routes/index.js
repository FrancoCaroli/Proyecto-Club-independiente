var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var eventosModel = require('../models/eventosModel');
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    // Obtener eventos desde el modelo
    var eventos = await eventosModel.getEventos();

    // Seleccionar los primeros 5 eventos
    eventos = eventos.splice(0, 5);

    // Procesar las imágenes de los eventos
    eventos = eventos.map(evento => {
      if (evento.img_id) {
        const imagen = cloudinary.url(evento.img_id, {
          width: 460,
          crop: 'fill'
        });
        return {
          ...evento,
          imagen
        };
      } else {
        return {
          ...evento,
          imagen: '/img/Eventopers.png'
        };
      }
    });

    // Renderizar la vista 'index' con los eventos
    res.render('index', {
      eventos
    });
  } catch (error) {
    console.error(error);
    next(error); // Manejo de errores
  }
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
    html: nombre + " " + apellido + " se conecto a traves y quiere mas info a este correo: " + email +  ". <br> Además, hizo el siguiente comentario: " + mensaje + ".<br> Su tel es: " + tel
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
