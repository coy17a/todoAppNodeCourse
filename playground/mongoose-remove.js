const {mongoose}= require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

// Todo.findOneAndRemove({}).then((doc)=>{

// });
var id = '5b438ec2dffbe508c4e000bb'
Todo.findByIdAndRemove(id).then((res)=>{
    console.log(JSON.stringify(res,undefined,2))
});
