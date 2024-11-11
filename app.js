const express = require('express')
const mongoose = require('mongoose')

// Importa los módulos necesarios
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require("path");

// Configuración de Swagger
const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PC4 API",
      version: "1.0.0",
    },
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`], // Asegúrate de que esta ruta sea correcta
});



const app = express();
app.use(express.json());
// Middleware para servir la documentación de Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));


mongoose.connect('mongodb://4.228.231.241:27017/',{
    dbName:'DB',
    user:'nilouadmin',
    pass:'nilou123'
}).then(()=>{
    console.log('Mongodb connected')
})

app.all('/test',(req,res)=>{
    //console.log(req.query);
    //res.send(req.query);
    console.log(req.body);
    res.send(req.body);
});

const DepartmentsRoute = require('./Routes/Departments.route');
const MessagesRoute = require('./Routes/Messages.route');
const UsersRoute = require('./Routes/Users.route');

app.use('/Departments',DepartmentsRoute);
app.use('/Messages',MessagesRoute);
app.use('/Users',UsersRoute);




app.use((req,res,next)=>{
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

//Manejo de errores
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    });
});


app.listen(3000, ()=>{
    console.log('Server started ');
});