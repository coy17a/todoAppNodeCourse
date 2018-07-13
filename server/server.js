 require ('./config/config')
const _= require ('lodash');
var express = require('express')
var bodyParser= require('body-parser')
var {ObjectID} = require('mongodb')
const hbs = require('hbs');
const methodOverride = require("method-override");


var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var port = process.env.PORT 

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname+'/views/partials')
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
hbs.registerHelper('status',(status)=>{
    if(status === true){
        return 
    }
    
});

app.post('/todos',(req,res)=>{
    var todo = new Todo ({
        text: req.body.text
    });
    todo.save().then((todo)=>{
        res.redirect("/todos");
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos',(req,res)=> {
    Todo.find().then((todos)=>{
        
         res.render('todos.hbs',{todos})
        //res.send({todos})
        //  res.send({todos})
    },(e)=>{
        res.status(400).send(e)
    });
});

//GET /todos/_id
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
       return res.status(404).send('Id not Valid')
    }
    Todo.findById(id).then((todo)=>{
        if(!todo){
            res.status(404).send('Todo Not Found')
        }
        res.status(200).send({todo});
    }).catch((e)=>res.status(400).send())

})

//delete /todos/id Route

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id Not Valid')
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            res.status(404).send('Todo Not found')
        }
        //res.status(200).send({todo})
        res.status(200).redirect('/todos');
    }).catch((e)=>res.status(400).send())
});

//update /todos/id Route
//EDIT
app.get('/todos/:id/edit',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id Not Valid')
    }
    Todo.findById(id).then((todo)=>{
    if(!todo){
        res.status(404).send('Todo Not found')
    }
    res.render('edit.hbs',{todo});
    });
});

//update

app.put('/todos/:id',(req,res)=>{
    var id = req.params.id;
    console.log(req.body.text)
    var body = _.pick(req.body,['text','completed'])
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Id Not Valid')
    }
    if (_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
  

    Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send()
        }
        res.status(200).redirect('/todos')
    }).catch((e)=>{
        res.status(400).send()
    })
})


app.listen(port, ()=>{
    console.log(`started on port${port}`)
})
module.exports = {app};


