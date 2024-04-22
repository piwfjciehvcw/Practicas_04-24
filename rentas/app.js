const express = require('express');
const mysql2 = require('mysql2')
const cors = require('cors');
const bodyParser = require('body-parser');

const app=express();
const port='3000';
app.use(cors())
app.use(bodyParser.json())

//Establecer conexion Mysql
const db=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"luismario"
});

//Comprobar conexion a BD
db.connect(function(error){
    if(error){
        console.log("Error al conectar con la BD")
    }else{
        console.log("Felicidades conexion a la BD éxitosaaaa")
    }  
})

//Creamos el Servidor
app.listen(port,()=>{
    console.log(`Dirección servidor: http://localhost:3000`)
})

//---Inicio API---
app.post('/create',(req,res)=>{
    const matricula=req.body.matricula;
    const nombre=req.body.nombre;
    const direccion=req.body.direccion
    db.query("insert into Alumnos (Matricula, Nombre, Direccion) values(?,?,?)",[matricula,nombre,direccion]);
    res.send("success");
});

app.get('/users',(req,resp)=>{
    db.query("select * from users",
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            resp.send(result)
        }
    });
});

app.put("/update",(req, res)=>{
    const matricula=req.body.matricula;
    const nombre=req.body.nombre;
    const direccion=req.body.direccion
    db.query("update Alumnos set Nombre=?, Direccion=? where Matricula=?",[nombre,direccion, matricula],
    (err,result)=>{
        err?
        console.log(err)
        :
        res.send(true);
    }
    );
})

app.delete("/alumno/:matricula",(req, res)=>{
    const matricula=req.params.matricula;
    db.query("delete from Alumnos where Matricula=?",matricula,
    (err, result)=>{
        err?
        console.log("Problemas para eliminar"+err)
        :
        res.send(true)
    });
})