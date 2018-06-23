
// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
       return console.log('Unable to connect To DB server');
    }
    console.log('connect to MongoDB server')
    
    const db = client.db('TodoApp')

    // 
    
    db.collection('Users').find({name: "Alejandro"}).toArray().then((docs)=>{
            console.log(`this is the nuber of user with the name Alejandro: ${docs.length}`);
            console.log(JSON.stringify(docs, undefined,2));
        }, (err)=>{
            console.log("unable to find todos", err);
        })

    // client.close();
});




// newUser.save().then((doc)=>{
//     console.log("New user created",doc)
// }, (e)=>{
//     console.log('Unable to create new user',e)
// });

// var newTodo = new Todo({
//     text: 'Bike 1:15 mins',
    
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);

// }, (e) => {
//     console.log('unable to save')
// });
