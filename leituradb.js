var express = require("express");
var app = express();
const mysql = require("mysql");

var wsserver = require("ws").Server;
var ws = new wsserver({port : 8080});

var ultimo=0;

const conn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'curso123',
database: 'senaidb'
});

ws.on("connection",function(ws){
var tempo = setInterval(envia,35000,ws);

ws.on("close",function(tempo){
clearInterval(tempo);
ws.close();
fecha.close();
console.log("FECHOU PORTAS");
}
);

}
);

function envia(socket){
conn.query('SELECT id, sensor_name, sensor_value, sensor_datetime FROM sensores',(err,rows)=>{
if(err) throw err;
if(ultimo==0){
rows.forEach((row)=>{

socket.send(" Sensor: "+ row.sensor_name +"="+ row.sensor_value +" Data-Hora: "+row.sensor_datetime);}
);
}


else if(ultimo>0)
{

rows.forEach((row,index)=>{

if(index>=ultimo){
socket.send(" Sensor: "+ row.sensor_name +"="+ row.sensor_value +" Data-Hora: "+row.sensor_datetime );
}
}

);

}
ultimo=rows.length;

}
);
//console.log("LENDO DADOS");

}

app.get("/",function(req,res){
res.sendFile(__dirname + "/teste.html");
}
);

app.use(function(req,res,next){
res.status(404).send("ERRO 404-PAGINA NÃO PODE SER ENCONTRADA");
}
);

var fecha =app.listen(81,function(){
console.log("Servidor iniciado na porta 81");
}
);


