const express = require('express');
const app = express();
const port = 3000;
const connect = require('./connect');

app.set('view engine','ejs');
app.use(express.urlencoded());
app.use(express.static('public'));

app.get('/accounts',(req,res)=>{
    let con = connect.createcon();

    let query="Select * from accounts";

    con.connect();

    con.query(query,(err,result)=>{
        if (err) throw err;
        res.render('account',{accounts : result});
    });

    con.end();
    
});

app.get('/accounts/login',(req,res)=>{
    res.render('login',{msg:""});
});

app.post('/accounts/login',(req,res)=>{
    let con = connect.createcon();

    let query = "Select * from accounts where Username = ?";
    let user = [req.body.username];

    con.connect();

    con.query(query,user,(err,result)=>{
        if (err) {
            throw err;
        }
  
        if (result[0].Password == [req.body.password]) {
            res.redirect('/accounts');
        }
        else
        {
            res.render('login',{msg : "Vui lòng nhập lại"});
        }
    });

    con.end();
});

app.get('/accounts/detail/:id',(req,res)=>{
    let con = connect.createcon();

    let query="Select * from accounts where Id = ?";
    let id = [req.params.id];

    con.connect();
    
    con.query(query,id,(err,result)=>{
        if(err) throw err;
        res.render('detail',{accounts : result});
    });

    con.end();
});

app.get('/accounts/add',(req,res)=>{
    res.render('add');
});

app.post('/accounts/add',(req,res)=>{
    let con = connect.createcon();

    let sql = "INSERT INTO accounts (Username,Password,FullName) values(?,?,?)";
    let params = [
        req.body.username,
        req.body.password,
        req.body.fullname
    ]

    con.connect();

    con.query(sql,params,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0 ){
            res.redirect('/accounts');
        }
    });

    con.end();

});

app.get('/accounts/delete/:id',(req,res)=>{
    let con = connect.createcon();

    let query="DELETE FROM accounts where Id=?";
    let id = [req.params.id];

    con.connect();

    con.query(query,id,(err,result)=>{
        if(err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/accounts');
        }
    });

    con.end();
});

app.get('/accounts/update/:id',(req,res)=>{
    let con = connect.createcon();

    let sql = "Select * from accounts where Id = ?";
    let params = [req.params.id];

    con.connect();

    con.query(sql,params,(err,result)=>{
        if(err) throw err;
        res.render('update',{accounts : result});
    });

    con.end();
});

app.post('/accounts/update/:id',(req,res)=>{
    let con = connect.createcon();

    let query = "UPDATE accounts set Username = ?,FullName = ? where Id=?"
    let params = [
        req.body.username,
        req.body.fullname,
        req.params.id
    ];
    con.connect();

    con.query(query,params,(err,result)=>{
        if(err) throw err;
        if (result.affectedRows > 0) {
            res.redirect('/accounts');
        }
    })

    con.end();
});

app.listen(port,()=>{
    console.log(`Sever đã chạy với cổng ${port}`);
});