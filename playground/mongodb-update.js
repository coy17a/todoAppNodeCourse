
// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client)=>{
    if(err){
       return console.log('Unable to connect To DB server');
    }
    console.log('connect to MongoDB server')
    
    const db = client.db('TodoApp')

    // 
    
    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID("5b2ac45052e85a7e2a7ffe0b")}, {
    //     $set: {
    //         completed: true
    //     }
    //  }, {
    //      returnOriginal: false
    //  }).then((res)=>{
    //      console.log(res)
    //  })
    db.collection('Users').findOneAndUpdate({_id: new ObjectID("5b2ab6cc0484aa7b0970e4b3")},
    {
        $set: {
            name:"Yulieth"
        },
        $inc : {
            age:+1
        }
    }, 
    {
    returnOriginal: false
    }).then((res)=>{
        console.log(res)
    });

    // client.close();
});
