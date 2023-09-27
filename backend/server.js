const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10

const secret = 'Lionel'
const verifyToken = require('./middleware/auth')

app.use(cors())
app.use(express.json())
app.use(setUser)

const mysql = require('mysql2')
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'testhotel'
})
app.get('/infouser',(req,res)=>{
    connection.query('SELECT * FROM info_user',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
app.post('/register',jsonParser,(req,res,next)=>{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.query(
            'INSERT INTO info_user(email,username,firstname,lastname,phone,password,role_id) VALUES(?, ?, ?, ?, ?, ?,1)',
            [req.body.email,req.body.username,req.body.firstname,req.body.lastname,req.body.phone,hash],
            function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
        );
    });   
})

app.post('/login',jsonParser,(req,res,next)=>{
   
    connection.query(
        'SELECT * FROM info_user WHERE username=?',
        [req.body.username],
        function(err, info_user, fields) {
        if(err){
            res.json({status:'error',message:err})
            return
        }
        if(info_user.length === 0){
            res.json({status:'error',message:'User not found'});
        return
        }
        
        bcrypt.compare(req.body.password,info_user[0].password, function(err, isMatch) {
           if(isMatch){
            var token = jwt.sign({ email: info_user[0].email ,username: info_user[0].username ,role:info_user[0].role,firstname:info_user[0].firstname,lastname:info_user[0].lastname,phone:info_user[0].phone,id:info_user[0].id},secret,{ expiresIn: '20h' });
            res.json({status:'ok',message:'Login Success',token, user: info_user[0] })
            
           }else{
            res.json({status:'error',message:'Login Failed'})
           }
        });
        
        }
        
    );
    
})

app.get('/userlog',verifyToken, (req, res) => {
    try {
      const user = req.user;
      res.json({ status: 'ok', user });
    } catch (err) {
      res.json({ status: 'error', message: err.message });
    }
  });

app.post('/carousel',jsonParser,(req,res,next)=>{
    connection.query(
        'INSERT INTO index_carousel(file_name) VALUE(?)'
        [req.body.file_name],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
function setUser(req,res,next){
    const userId= req.body.userId
    if (userId){
        req.user = users.find(user => user.id === userId)
    }
    next()
}

app.listen(3000,function(){
    console.log("Server STARTTTTTT");
})