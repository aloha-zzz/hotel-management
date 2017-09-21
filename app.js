var http=require('http');
var express=require('express');
var fs=require('fs');
var app=express();
var mysql=require('mysql');
var bodyParser = require('body-parser');


app.use(bodyParser());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
var jsonParser = bodyParser.json();


var pool=mysql.createPool({
    host:'localhost',
    port:3306,
    database:'hotel_management',
    user:'root',
    password:'1234',

})


// app.get('/',function (req,res) {
//     res.sendFile(__dirname+'/index.html');
// })

app.get('/test',function (req,res) {
    res.setHeader('Content-Type','application/json');
    res.send({status:200,data:'111'});
})

app.post('/login',function (req,res) {

    console.log(req.body);
    var resIn1=req.body.username;
    var resIn2=req.body.password;

    res.setHeader('Content-Type','application/json');
    // res.send({status:200,data:[resIn1,resIn2]});
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select id,idtype from login where username=${resIn1} and password=${resIn2}`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })


})

//顾客
app.post('/client/getInfo',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var userId=req.body.userId;
    console.log(userId)
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from client where c_id=${userId}`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})


app.get('/client/getfreeRoom',function (req,res) {
    res.setHeader('Content-Type','application/json');
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from room where state='空房'`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})

app.post('/client/checkIn',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var userId=req.body.c_id;
    var number=req.body.room;
    var inTime=req.body.time;

    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`update room set state ='入住' where number=${number}`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    poolconnect.query(`insert into check_in values(${userId},${number},'${inTime}',0)`,function (err,result) {
                        if(err){
                            res.send({status:300});
                        }else {
                            res.send({status:200,data:result});
                        }
                    })
                }
            })

            poolconnect.release();
        }
    })
})

app.post('/client/checkInInfo',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var userId=req.body.userId;
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from check_in A,room B where A.room=B.number and A.c_id=${userId} and A.outTime=0`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})

app.post('/client/checkout',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var c_id=req.body.c_id;
    var inTime=req.body.inTime;
    var room=req.body.room;
    var outTime=req.body.outTime;
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`update check_in set outTime='${outTime}' where c_id=${c_id} and room=${room} and inTime='${inTime}'`,function (err,result) {
                if(err){
                    res.send({status:301});
                    console.log(err)
                }else {
                    poolconnect.query(`update room set state='空房' where number=${room}`,function (err,result) {
                        if(err){
                            res.send({status:300});
                        }else {
                            res.send({status:200,result})
                        }
                    })
                }
            })
            poolconnect.release();
        }
    })
})
app.post('/client/historyInfo',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var userId=req.body.userId;
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from check_in A,room B where A.room=B.number and A.c_id=${userId} and A.outTime<>0`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})
app.post('/client/changeRoom',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var oldRoom=req.body.oldroom;
    var newRoom=req.body.newRoom;
    console.log(oldRoom);
    console.log(newRoom);
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`update check_in set room=${newRoom} where room=${oldRoom} and outTime='0'`,function (err,result) {
                if(err){
                    res.send({status:301});
                }else {
                    poolconnect.query(`update room set state='入住' where number=${newRoom} and state='空房' `,function (err,result) {
                        if(err){
                            res.send({status:302});
                        }else {
                            poolconnect.query(`update room set state='空房' where number=${oldRoom} and state='入住' `,function (err,result) {
                                if(err){
                                    res.send({status:300});
                                }else {
                                    res.send({status:200})
                                }
                            })
                        }
                    })
                }
            })
            poolconnect.release();
        }
    })
})

//employee
app.post('/employee/getInfo',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var userId=req.body.userId;
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from employee where e_id=${userId}`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})


app.get('/employee/getRoom',function (req,res) {
    res.setHeader('Content-Type','application/json');
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from room where state='空房'`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})


app.get('/employee/getCheckIn',function (req,res) {
    res.setHeader('Content-Type','application/json');
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from client A,check_in B where B.outTime='0' and B.c_id=A.c_id;`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})

//manager
app.post('/manager/getInfo',function (req,res) {
    res.setHeader('Content-Type','application/json');
    var userId=req.body.userId;
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from manager where m_id=${userId}`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})




app.get('/manager/getAllInfo',function (req,res) {
    res.setHeader('Content-Type','application/json');
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from employee`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})

app.post('/manager/changeSalary',function (req,res) {
    var id=req.body.id;
    var salary=req.body.salary;

    res.setHeader('Content-Type','application/json');
    console.log(id);
    console.log(salary);
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`update employee set salary = ${salary} where e_id=${id}`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})
app.get('/manager/getAllClientInfo',function (req,res) {
    res.setHeader('Content-Type','application/json');
    pool.getConnection(function (err,poolconnect) {
        if(err){
            console.log('failed');
        }else {
            console.log('connected');
            poolconnect.query(`select * from client A,check_in B where  B.c_id=A.c_id;`,function (err,result) {
                if(err){
                    res.send({status:300});
                }else {
                    res.send({status:200,data:result});
                }
            })
            poolconnect.release();
        }
    })
})

app.listen(3000,'127.0.0.1',function () {
    console.log('server is running')
});
