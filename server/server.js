var express = require('express')
var bodyParser= require('body-parser')
var {ObjectID} = require('mongodb')


var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

var port = process.env.PORT || 3000

var app = express();
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo ({
        text: req.body.text
    });
    todo.save().then((todo)=>{
        res.send(todo);
    },(e)=>{
        res.status(400).send(e);
    })
});

app.get('/todos',(req,res)=> {
    Todo.find().then((todos)=>{
        res.send({todos})
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
        res.status(200).send({todo});
    }).catch((e)=>res.status(400).send())
});

app.listen(port, ()=>{
    console.log(`started on port${port}`)
})
module.exports = {app};


