const express = require('express')
const app = express()
const cors = require('cors')

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10
const multer = require('multer')

const secret = "Lionel";
const verifyToken = require('./middleware/auth')


app.use(cors())
app.use(express.json())
app.use(setUser)
app.use(express.static('public'))

const mysql = require('mysql2')
const { log } = require('console')
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'testhotel'
})

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"public/img")
    },
    filename: function (req,file,cb){
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage})

app.get('/info_user',jsonParser,(req,res)=>{
  connection.query('SELECT * FROM info_user;',(err,result)=>{
   if(err){
       console.log(err);
   }else{
       res.send(result)
   }
  })
})
app.get('/info_user/:id',jsonParser,(req,res)=>{
  connection.query('SELECT * FROM info_user WHERE id=?;',[req.params.id],(err,result)=>{
   if(err){
       console.log(err);
   }else{
       res.send(result)
   }
  })
})


app.get('/user',jsonParser,(req,res)=>{
    connection.query('SELECT * FROM info_user;',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })

 app.get('/reserve',jsonParser,(req,res)=>{
  connection.query('SELECT * FROM reserve;',(err,result)=>{
    if(err){
      console.log(err);
    }else{
        res.send(result)
    }
  })
 })

app.post('/reserve', jsonParser, (req, res, next) => {
  const id_room = req.body.id_room;
  const id_user = req.body.id_user;
  const date_start = req.body.date_start;
  const date_end = req.body.date_end;
  const num_guests = req.body.num_guests;
  const status = req.body.status;

  connection.query(
    'INSERT INTO reserve(id_room, id_user, date_start, date_end, num_guests, status) VALUES (?, ?, ?, ?, ?, 0)',
    [id_room,id_user,date_start,date_end,num_guests,status],
    function(err, results, fields) {
      if (err) {
        res.json({ status: 'error', message: err });
        return;
      }
      res.json({ status: 'ok' });
    }
  );
});

 app.post('/register', jsonParser, (req, res, next) => {
  // Check if email or username already exists
  connection.query(
      'SELECT * FROM info_user WHERE email = ? OR username = ?',
      [req.body.email, req.body.username],
      function (err, results, fields) {
          if (err) {
              res.json({ status: 'error', message: err });
              return;
          }

          if (results.length > 0) {
              // Email or username already exists
              res.json({ status: 'error', message: 'Email or username already exists' });
          } else {
              // Proceed with registration
              bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                  connection.query(
                      'INSERT INTO info_user(email,username,firstname,lastname,phone,password,role_id) VALUES(?, ?, ?, ?, ?, ?,2)',
                      [req.body.email, req.body.username, req.body.firstname, req.body.lastname, req.body.phone, hash],
                      function (err, results, fields) {
                          if (err) {
                              res.json({ status: 'error', message: err });
                              return;
                          }
                          res.json({ status: 'ok' });
                      }
                  );
              });
          }
      }
  );
});

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
            var token = jwt.sign({ id: info_user[0].id,email: info_user[0].email,username: info_user[0].username,firstname: info_user[0].firstname,lastname: info_user[0].lastname,phone: info_user[0].phone, role_id: info_user[0].role_id,role: info_user[0].role},secret,{ expiresIn: '2h' });
            res.json({status:'ok',message:'Login Success',token, id: info_user[0].id,role_id: info_user[0].role_id })
            
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
    console.log(user);
  } catch (err) {
    res.json({ status: 'error', message: err.message });
  }
});

app.get('/infolog', verifyToken, (req, res) => {
  try {
    const user = req.user;

    // เชื่อมต่อกับฐานข้อมูลหรือใช้ ORM ของคุณเพื่อดึงข้อมูลจากตารางอื่น ๆ
    // ตัวอย่างของการใช้ SQL:
    const sql = 'SELECT * FROM info_user WHERE id = ?'; // ตั้งค่าคำสั่ง SQL ให้ตรงกับโครงสร้างของฐานข้อมูลของคุณ
    db.query(sql, [user.id], (error, results) => {
      if (error) {
        res.json({ status: 'error', message: error.message });
      } else {
        // นี่คือผลลัพธ์จากการเปรียบเทียบ ID กับตารางอื่น
        res.json({ status: 'ok', user, otherData: results });
      }
    });
  } catch (err) {
    res.json({ status: 'error', message: err.message });
  }
});

app.get('/role',(req,res)=>{
  connection.query('SELECT * FROM role',(err,result)=>{
   if(err){
       console.log(err);
   }else{
       res.send(result)
   }
  })
})
  app.post('/role',jsonParser,(req,res,next)=>{
    connection.query(
        'INSERT INTO role(role) VALUE(?)',
        [req.body.role],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
app.post('/facilities',jsonParser,(req,res,next)=>{
    connection.query(
        'INSERT INTO room_facilities(facilities) VALUE(?)',
        [req.body.facilities],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
app.get('/facilities',(req,res)=>{
    connection.query('SELECT * FROM room_facilities',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })

 app.post('/facilities_meeting',jsonParser,(req,res,next)=>{
    connection.query(
        'INSERT INTO meeting_facilities(facilities) VALUE(?)',
        [req.body.facilities],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
app.get('/facilities_meeting',(req,res)=>{
    connection.query('SELECT * FROM meeting_facilities',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
 app.post('/facilities_gym',jsonParser,(req,res,next)=>{
    connection.query(
        'INSERT INTO gym_facilities(facilities) VALUE(?)',
        [req.body.facilities],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
app.get('/facilities_gym',(req,res)=>{
    connection.query('SELECT * FROM gym_facilities',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
 app.post('/spa_service',jsonParser,(req,res,next)=>{
    connection.query(
        'INSERT INTO spa_service(service) VALUE(?)',
        [req.body.service],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
app.get('/spa_service',(req,res)=>{
    connection.query('SELECT * FROM spa_service',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })


app.post('/carousel',jsonParser,(req,res,next)=>{
    connection.query(
        'INSERT INTO home_carousel(file_name) VALUE(?)'
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
app.post('/room', upload.single('file'),jsonParser,(req,res,next)=>{
    const room_name = req.body.room_name;
    const detail = req.body.detail;
    const bed_type = req.body.bed_type;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const file = req.file.filename;
    const facilities = req.body.facilities;

    connection.query(
        'INSERT INTO room_detail (room_name,detail,bed_type,price,quantity,img,facilities) VALUE(?,?,?,?,?,?,?)',
        [room_name,detail,bed_type,price,quantity,file,facilities],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})

app.get('/room',(req,res)=>{
    connection.query('SELECT * FROM room_detail',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
app.post('/meeting', upload.single('file'),jsonParser,(req,res,next)=>{
    const room_name = req.body.room_name;
    const capacity = req.body.capacity;
    const file = req.file.filename;
    const facilities = req.body.facilities;

    connection.query(
        'INSERT INTO meeting_room (room_name,capacity,img,facilities) VALUE(?,?,?,?)',
        [room_name,capacity,file,facilities],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
app.post('/gym', upload.single('file'),jsonParser,(req,res,next)=>{
    const room_name = req.body.room_name;
    const detail = req.body.detail;
    const file = req.file.filename;
    const facilities = req.body.facilities;

    connection.query(
        'INSERT INTO gym_room (room_name,detail,img,facilities) VALUE(?,?,?,?)',
        [room_name,detail,file,facilities],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})
app.post('/spa', upload.single('file'),jsonParser,(req,res,next)=>{
    const room_name = req.body.room_name;
    const detail = req.body.detail;
    const file = req.file.filename;
    const service = req.body.service;

    connection.query(
        'INSERT INTO spa_room (room_name,detail,img,service) VALUE(?,?,?,?)',
        [room_name,detail,file,service],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})

app.get('/meeting',(req,res)=>{
    connection.query('SELECT * FROM meeting_room',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
app.get('/gym',(req,res)=>{
    connection.query('SELECT * FROM gym_room',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
app.get('/spa',(req,res)=>{
    connection.query('SELECT * FROM spa_room',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })

app.put('/home',jsonParser,(req,res,next)=>{
    const navColor = req.body.navColor;
    const navName = req.body.navName;
    const bgColor = req.body.bgColor;

    connection.query(
        'UPDATE home SET navColor = ?, navName = ?, bgColor = ?',
        [navColor,navName,bgColor],
        (err, results, fields) => {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
})

app.put('/cardEdit/:id', jsonParser,(req, res,next) => {
    const title = req.body.title;
    const detail = req.body.detail;
    const id = req.params.id;

    connection.query('UPDATE home_card SET title = ? , detail = ? WHERE id = ? ;', [title,detail, id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
      }
    });
  });
app.put('/cardImgEdit/:id', upload.single('file'), jsonParser, (req, res, next) => {
    const file = req.file.filename;
    const id = req.params.id;
    connection.query(
        'UPDATE home_card SET img = ? WHERE id = ?',
        [file, id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            res.json({ status: 'ok' })
        }
    )
})
app.post('/homepage',upload.single('file'),jsonParser,(req,res,next)=>{
    const file = req.file.filename;
    connection.query(
        'INSERT INTO home_carousel(file_name) VALUE(?)',
        [file],
        function(err, results, fields) {
            if(err){
                res.json({status:'error',message:err})
                return
            }
            res.json({status:'ok'})
            }
    )
    console.log(req.body);
    console.log(req.file);
})

app.post('/homecard', upload.single('file'), jsonParser, (req, res, next) => {
    const file = req.file.filename;
    const title = req.body.title; 
    const detail = req.body.detail;
    connection.query(
        'INSERT INTO home_card (img, title, detail) VALUES (?, ?, ?)',
        [file, title, detail],
        function(err, results, fields) {
            if(err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok' });
        }
    );

    console.log(req.body); 
    console.log(req.file); 
});
app.post('/payment', upload.single('file'), jsonParser, (req, res, next) => {  
    const account_number = req.body.account_number; 
    const bank = req.body.bank;
    const account_name = req.body.account_name;
    const file = req.file.filename;
    connection.query(
        'INSERT INTO payment (account_number,bank,account_name,img) VALUES (?, ?, ?, ?)',
        [account_number,bank,account_name,file],
        function(err, results, fields) {
            if(err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok' });
        }
    );

    console.log(req.body); 
    console.log(req.file); 
});
app.get('/payment',(req,res)=>{
  connection.query('SELECT * FROM payment',(err,result)=>{
   if(err){
       console.log(err);
   }else{
       res.send(result)
   }
  })
})
app.get('/carousel',(req,res)=>{
    connection.query('SELECT * FROM home_carousel',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
 app.get('/card',(req,res)=>{
    connection.query('SELECT * FROM home_card',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })
 app.get('/home',(req,res)=>{
    connection.query('SELECT * FROM home',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })

 app.get('/carousel',(req,res)=>{
    connection.query('SELECT * FROM home_carousel',(err,result)=>{
     if(err){
         console.log(err);
     }else{
         res.send(result)
     }
    })
 })



function setUser(req,res,next){
    const userId= req.body.userId
    if (userId){
        req.user = users.find(user => user.id === userId)
    }
    next()
}

 app.delete('/delete_card/:id', (req, res) => { 
    connection.query("DELETE FROM home_card WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });

  app.delete('/delete_carousel/:id', (req, res) => { 
    connection.query("SELECT file_name FROM home_carousel WHERE id = ?",[req.params.id],(err,result)=>{
      connection.query("DELETE FROM home_carousel WHERE id = ?",[req.params.id] ,(err, result2) => {
        if (err){
          console.log(err);
          return
        } else{
     
          fs.unlink('./public/img/'+result[0].file_name,(err)=>{
            if(err){
              console.log(err);
              return
            }
          });
          res.json({ status: 'ok'});

        }      
      });
    })
  });

  app.delete('/delete/room_facilities/:id', (req, res) => { 
    connection.query("DELETE FROM room_facilities WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });
  app.delete('/delete/meeting_facilities/:id', (req, res) => { 
    connection.query("DELETE FROM meeting_facilities WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });
  app.delete('/delete/gym_facilities/:id', (req, res) => { 
    connection.query("DELETE FROM gym_facilities WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });
  app.delete('/delete/spa_service/:id', (req, res) => { 
    connection.query("DELETE FROM spa_service WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });

  app.put('/Edit/Room/:id', jsonParser,(req, res,next) => {
    // const file = req.file.filename;
    const room_name = req.body.room_name;
    const bed_type = req.body.bed_type;
    const detail = req.body.detail;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const facilities = req.body.facilities;
    const id = req.params.id;

    connection.query('UPDATE room_detail SET room_name = ? , bed_type = ? , detail = ? , price = ? , quantity = ? , facilities = ? WHERE id = ? ;', [room_name,bed_type,detail,price,quantity,facilities, id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
      }
    });
  });
  app.put('/Edit/meeting_room/:id', jsonParser,(req, res,next) => {
    // const file = req.file.filename;
    const room_name = req.body.room_name;
    const capacity = req.body.capacity;
    const facilities = req.body.facilities;
    const id = req.params.id;

    connection.query('UPDATE meeting_room SET room_name = ? , capacity = ? , facilities = ? WHERE id = ? ;', [room_name,capacity,facilities, id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
      }
    });
  });
  app.put('/Edit/gym_room/:id', jsonParser,(req, res,next) => {
    // const file = req.file.filename;
    const room_name = req.body.room_name;
    const detail = req.body.detail;
    const facilities = req.body.facilities;
    const id = req.params.id;

    connection.query('UPDATE gym_room SET room_name = ? , detail = ? , facilities = ? WHERE id = ? ;', [room_name,detail,facilities, id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
      }
    });
  });
  app.put('/Edit/spa/:id', jsonParser,(req, res,next) => {
    // const file = req.file.filename;
    const room_name = req.body.room_name;
    const detail = req.body.detail;
    const service = req.body.service;
    const id = req.params.id;

    connection.query('UPDATE spa_room SET room_name = ? , detail = ? , service = ? WHERE id = ? ;', [room_name,detail,service, id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
        console.log(req);
      }
    });
  });

  app.put('/Edit/role/:id', jsonParser,(req, res,next) => {

    // const role_id = req.body.role_id;
    const role = req.body.role;
    const id = req.params.id;

    connection.query('UPDATE info_user SET role = ? WHERE id = ? ;', [role, id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
        console.log(req);
      }
    });
  });

  app.put('/reset/password/:id', jsonParser,(req, res,next) => {

    const id = req.params.id;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash){
      connection.query('UPDATE info_user SET password = ?  WHERE id = ? ;', [hash,id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
        console.log(req);
      }
    });
  })
    });
    
  

  app.put('/Edit/userlog/:id', jsonParser,(req, res,next) => {

    const email = req.body.email;
    const username = req.body.username;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    const id = req.params.id;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash){
      connection.query('UPDATE info_user SET email = ? ,username = ? ,firstname = ?,lastname = ?,phone = ?,password = ?  WHERE id = ? ;', [email, username,firstname,lastname,phone,hash,id], (err, result) => {
      if (err) {
        res.json({ status: 'error', message: err.message });
      } else {
        res.json({ status: 'ok', message: 'Success' });
        console.log(req);
      }
    });
    })
    
  });

app.put('/ImgEdit/Room/:id', upload.single('file'), jsonParser, (req, res, next) => {
    const file = req.file.filename;
    const id = req.params.id;
    connection.query(
        'UPDATE room_detail SET img = ? WHERE id = ?',
        [file, id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            res.json({ status: 'ok' })
        }
    )
})
app.put('/ImgEdit/meeting_room/:id', upload.single('file'), jsonParser, (req, res, next) => {
    const file = req.file.filename;
    const id = req.params.id;
    connection.query(
        'UPDATE meeting_room SET img = ? WHERE id = ?',
        [file, id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            res.json({ status: 'ok' })
        }
    )
})
app.put('/ImgEdit/gym_room/:id', upload.single('file'), jsonParser, (req, res, next) => {
    const file = req.file.filename;
    const id = req.params.id;
    connection.query(
        'UPDATE gym_room SET img = ? WHERE id = ?',
        [file, id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            res.json({ status: 'ok' })
        }
    )
})
app.put('/ImgEdit/spa_room/:id', upload.single('file'), jsonParser, (req, res, next) => {
    const file = req.file.filename;
    const id = req.params.id;
    connection.query(
        'UPDATE spa_room SET img = ? WHERE id = ?',
        [file, id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err })
                return
            }
            res.json({ status: 'ok' })
        }
    )
})
app.delete('/delete/payment/:id', (req, res) => { 
  connection.query("DELETE FROM payment WHERE id = ?",[req.params.id] ,(err, result) => {
    if (err){
      console.log(err);
    } else{
      res.json({ status: 'ok'});
    }      
  });
});
  app.delete('/delete/room/:id', (req, res) => { 
    connection.query("DELETE FROM room_detail WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });
  app.delete('/delete/meeting_room/:id', (req, res) => { 
    connection.query("DELETE FROM meeting_room WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });
  app.delete('/delete/gym_room/:id', (req, res) => { 
    connection.query("DELETE FROM gym_room WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });
  app.delete('/delete/spa_room/:id', (req, res) => { 
    connection.query("DELETE FROM spa_room WHERE id = ?",[req.params.id] ,(err, result) => {
      if (err){
        console.log(err);
      } else{
        res.json({ status: 'ok'});
      }      
    });
  });


app.listen(3000,function(){
    console.log("Server STARTTTTTT");
})