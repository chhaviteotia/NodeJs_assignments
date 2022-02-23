const express= require ('express');
const faker = require ('faker');
const app = express ();
const bodyParser=require('body-parser')

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser());


var users=[]

for (let i=0; i<5; i++ ){
    users.push({
        name: faker.name.findName(),
        email: faker.internet.email()
        
    })
}
//console.log(users);
app.get('/', (req,res)=>{
    res.render('home.ejs', {users});
})

app.get('/form', (req,res)=>{
    res.render('form.ejs');
})

app.post('/user/add', (req,res)=>{
    users.push({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect('/')
})

app.listen(3000, ()=>console.log('Server is listening'))
