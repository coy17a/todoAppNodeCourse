const {mongoose}= require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// user module require
 id = "5b2d6b5fda9de28e801ac490";

 User.findById(id).then((user)=>{
     if(!user){
      return console.log("User not found")
     }
     console.log(JSON.stringify(user,undefined,2))
 }).catch((e)=>console.log(e));



// var id= '5b34125efd841636f6947ce';

// // if(!ObjectID.isValid(id)){
//     console.log('ID not valid')
// }

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos',todos)
// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo one',todo)
// });

// Todo.findById(id).then((todobyid)=>{
//     if(!todobyid){
//         return console.log('Id not Found')
//     }
//     console.log('Todo by',todobyid)
// }).catch((e)=>console.log(e));

