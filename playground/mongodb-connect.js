
// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
       return console.log('Unable to connect To DB server');
    }
    console.log('connect to MongoDB server')

    // const db = client.db('TodoApp')
    // db.collection('Todos').insertOne({
    //     text:'Something to Do',
    //     completed: false

    // },(err,res)=>{
    //     if(err){
    //         return console,log("Unable to Instert Todo",err)
    //     }
    //     console.log(JSON.stringify(res.ops,undefined,2))
    // })

        // const db= client.db('TodoApp')
        //     db.collection('Users').insertOne({
        //         name:'Alfre',
        //         age: 29,
        //         location:'Calgary'
        //     }, (err,res)=>{
        //         if(err){
        //             return console.log("Unable to insert user", err)
        //         }
        //         console.log(JSON.stringify(res.ops,undefined,2))
        //     });

    client.close();
});
