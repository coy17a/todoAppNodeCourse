
// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
       return console.log('Unable to connect To DB server');
    }
    console.log('connect to MongoDB server')
    
    const db = client.db('TodoApp')

    //delete Many
    // db.collection('Todos').deleteMany({text:"voluntering wild rose triathlon"}).then((result)=>{
    //     console.log(result);
    // })
    
    // //deleteOne
    // db.collection('Todos').deleteOne({text:"Walk the Dog"}).then((result)=>{
    //     console.log(result);
    // })

    //findOneAndDelete
    
    // db.collection('Todos').findOneAndDelete({completed:false}).then((res)=>{
    //     console.log(res);
    // })

    db.collection('Users').deleteMany({name:"Alejandro"}).then((res)=>{
        console.log(res);
    })

    db.collection('Users').findOneAndDelete({_id: new ObjectID("5b2ab6d6a088607b0d98be15")}).then((res)=>{
        console.log(res);
    })
    // client.close();
});
