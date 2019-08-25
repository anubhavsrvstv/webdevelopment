var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyparser = require('body-parser');
const port = process.env.PORT||7550;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

var mydb;
mongoose.connect('mongodb://localhost:27017/test',function(err,db){
     if (err) {
             console.log("error", err);
    }
     else {
         mydb = db;
     }
 });

 app.use(express.static('.'));

app.get('/', function (req, res) {
    res.send({'my first express application!'});
});
 app.get('/fillForm', function (req, res) {
     console.log("form print")
     res.sendFile(__dirname + '/form.html');
 });

 app.post('/saveData', function (req, res) {
     console.log("checking running or not");
     console.log("req", req.body);
     res.send('my first post API!');
    mydb.collection('formTest').insertOne(req.body, function (err, data) {
        if (err) throw err;
        res.send({ success: true, mydata: data });

    })
});

// app.get('/home', function (req, res) {
//     // var myobj = {name: "ram",age:26};
 //     mydb.collection('hello').insertOne(myobj,function(err,data){
//         if (err) throw err;
//         res.send({success:true,mydata:data});

//     })

// });  

app.get('/getData', function (req, res) {
    mydb.collection('formTest').find({}).toArray(function (err, response) {
        if (err) throw err;
        console.log("response", response);

        res.setHeader('Content-Type', 'application/json');
        res.json({ data: response });


    });
});





app.get('/updateData', function (req, res) {
    mydb.collection("formTest").update({ name: "Ajay Pal\r\n" }, { name: "vipul" }).toArray(function (err, obj) {
        if (err) throw err;
        console.log(obj);
        res.setHeader('Content-Type', 'application/json');
        res.send({ success: "true" });


    })

});








app.delete('/deleteData', function (req, res) {
    mydb.collection("formTest").deleteOne({ name: "vipul" }, function (err, obj) {
        if (err) throw err;
        // console.log(obj.result.n + '/info.html');
        res.send({ success: "true" });


    });

});


var server = app.listen(port, function () {
    console.log("server started on port....."+port);
 });




