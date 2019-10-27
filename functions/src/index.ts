import * as functions from 'firebase-functions';

//import * as admin from 'firebase-admin';
const admin = require('firebase-admin');

const cors = require('cors')({origin: true});


const nodemailer = require('nodemailer');


admin.initializeApp();



let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'duenolacomanda@gmail.com',
      pass: 'practica2019'
  }
});

exports.validarMail= functions.https.onRequest((req, res)=>{

   const db = admin.firestore()
    db.collection("SP_usuarios").doc(req.query.id).update("estado","Registrado").then((data:any)=>{
        return res.send('Registro completo!');
   }).catch((data:any)=>{
    return res.send(' Error!');
   });

})


exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    
      // getting dest email by query string
      const dest = req.query.dest;
      const idUsr = req.query.id;

      const mailOptions = {
          from: 'La comanda <duenolacomanda@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
          to: dest,
          subject: 'Verificacion de correo', // email subject
          html:" <p style='font-size: 16px;'>Te damos la bienvenida a la familia de LA COMANDA EQUIPO 5. <br>Por favor haz click en el siguiente enlace para terminar el proceso de registro de usuario:<br><a href='https://us-central1-practicaprofesional-dbd4e.cloudfunctions.net/validarMail?id="+idUsr+"'>Validar Mail</a></p>"

      };

      // returning result
      return transporter.sendMail(mailOptions, (erro:any, info:any) => {
          if(erro){
              return res.send(erro.toString());
          }
          return res.send('Sended');
      });
  });    
});



exports.createUser = functions.firestore
    .document('SP_usuarios/{userId}')
    .onCreate(async (snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      //const newValue = snap.data();

      // access a particular field as you would any JS property
      
        //const name = newValue!.name;
        const payload = {
            notification: {
                title: 'Prueba',
                //body: `${data} is following your content!`,
                body: `Damian is watching you!`,
                icon: 'https://goo.gl/Fz9nrQ'
            }
          }
      
          // ref to the device collection for the user
          const db = admin.firestore()
          const devicesRef = db.collection("devices")
          //.where('userId', '==', userId)
         
          // get the user's tokens and send notifications
          const devices = await devicesRef.get();
      
          const tokens = new Array();
      
          // send a notification to each device token
          devices.forEach( (result: { data: () => { token: any, perfil: string }; }) => {                        
              const token = result.data().token;    
              tokens.push( token )            
          })
    
    
    
        
        return admin.messaging().sendToDevice(tokens, payload)
      // perform desired operations ...
    });


exports.AltaPedido = functions.firestore
  .document('SP_pedidos/{pedidoId}')
  .onCreate(async (snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      //const newValue = snap.data();

      // access a particular field as you would any JS property
      
        //const name = newValue!.name;
        const payload = {
            notification: {
                title: 'Aviso!',
                //body: `${data} is following your content!`,
                body: `Han generado un nuevo pedido!`
                //icon: 'https://goo.gl/Fz9nrQ'
            }
          }
      
          // ref to the device collection for the user
          const db = admin.firestore()
          const devicesRef = db.collection("devices")
          //.where('userId', '==', userId)
      
      
          // get the user's tokens and send notifications
          const devices = await devicesRef.get();
      
          const tokens = new Array();
      
          // send a notification to each device token
          devices.forEach( (result: { data: () => { token: any, perfil: string }; }) => {
            
            if(result.data().perfil === 'empleado'){
              const token = result.data().token;
      
              tokens.push( token )
            }
          
          })
    
    
    
        
        return admin.messaging().sendToDevice(tokens, payload)
      // perform desired operations ...
  });

exports.SolicitudMesa = functions.https.onRequest(async (req, res) => {
    
    const payload = {
        notification: {
            title: 'Aviso!',
            //body: `${data} is following your content!`,
            body: `El cliente: ${req.param('nombre')}  esta solicitando una mesa! `
          
            //icon: 'https://goo.gl/Fz9nrQ'
        }
      }
  
      // ref to the device collection for the user
      const db = admin.firestore()
      const devicesRef = db.collection("devices")
      //.where('userId', '==', userId)
  
  
      // get the user's tokens and send notifications
      const devices = await devicesRef.get();
  
      const tokens = new Array();
  
      // send a notification to each device token
      devices.forEach( (result: { data: () => { token: any, perfil: string }; }) => {
        
        if(result.data().perfil === 'empleado' || result.data().perfil === 'supervisor' ){
          const token = result.data().token;
  
          tokens.push( token )
        }
      
      })
      
      cors(req, res, () => {
        res.status(200).send(); 
      });
    
    return admin.messaging().sendToDevice(tokens, payload)  
    
  });





  
exports.pushListaEspera = functions.firestore
.document('SP_listaEspera/{clienteId}')
.onCreate(async (snap, context) => {

      const payload = {
          notification: {
              title: 'Cliente en espera.',
           
              body: `Se agrego un nuevo cliente a la lista de espera.`
 
          }
        }

        const db = admin.firestore()
        const devicesRef = db.collection("devices")
    
        const devices = await devicesRef.get();
    
        const tokens = new Array();
  
        devices.forEach( (result: { data: () => { token: any, perfil: string, tipo:string }; }) => {
          
          if(result.data().tipo === 'mozo'){
            const token = result.data().token;
    
            tokens.push( token )
          }
        
        })
      
      return admin.messaging().sendToDevice(tokens, payload)
    
});





exports.EstadoReserva = functions.https.onRequest(async (req, res) => {
    var idUsuario= req.query.id;
  var respuesta=req.query.estado;

  const payload = {
      notification: {
          title: 'Estado de Reserva',
          body: `Te informamos que tu reserva fue ${respuesta}.`
      }
    }
    const db = admin.firestore()
    const devicesRef = db.collection("devices")
    const devices = await devicesRef.get();

    const tokens = new Array();

    devices.forEach( (result: { data: () => { token: any, perfil: string, id:string }; }) => {
      
      if(result.data().id === idUsuario ){
        const token = result.data().token;

        tokens.push( token )
      }
    
    })
    
    cors(req, res, () => {
      res.status(200).send(); 
    });
  
  return admin.messaging().sendToDevice(tokens, payload)  
  
});






