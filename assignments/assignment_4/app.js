
const express= require ('express');
const bodyParser=require('body-parser');
const user= require("./model/users");
const mongoose= require('mongoose');
var methodOverride =require ('method-override')

mongoose.connect('mongodb://localhost:27017/assigment_4')

const app = express ();

app.use(methodOverride("_method"));
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser());
app.use(express.static('public'));


app.get('/', async(req,res)=>{
    const users = await user.find();
    res.render('index.ejs', {users});
})

app.get('/form', (req,res)=>{
    res.render('form.ejs');
})

app.post('/users/add',async(req,res)=>{
    await user.create({
        name: req.body.name,
        email:req.body.email
    })
    res.redirect('/')
})

//update
app.put('/users/:id', async(req,res)=>{
    await user.updateOne({_id: req.params.id}, [{$set:{isPromoted: {$not: "$isPromoted"}}}])
     res.redirect('/');
})

//delete
app.delete('/users/:id', async(req,res)=>{
    await user.deleteOne({_id: req.params.id});
    res.redirect("/")
})

app.listen(3000, ()=>console.log('Server is listening'))
