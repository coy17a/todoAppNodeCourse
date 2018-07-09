const expect = require('expect')
const request = require('supertest')
const {ObjectId}= require('mongodb')

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
    {
        _id: new ObjectId(),
        text: 'First Todo'
    }, {
        _id: new ObjectId(),
        text: 'Second Todo',
        completed : true,
        completedAt: 1212
    }
]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos);
    }).then(() => done())
});

describe('POST /todo', () => {
    it('should creat a new todo', (done) => {
        var text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done()
                }).catch((e) => done(e));


            })
    });
    it("should not create todo with invalid body data", (done) => {

        request(app)
            .post('/todos')
            .send({ 'text': 'te' })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e) => done(e));
            });
    });

});

describe('GET /todos', ()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    })
})
describe('GET /todo/:id', ()=>{
    it('should get todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text)
        })
        .end(done)
    });
    it('should return 404 if todo not found',(done)=>{
        //make sure you get 404 back
        request(app)
        .get(`/todos/${(new ObjectId).toHexString()}`)
        .expect(404)
        .end(done)
    });
    it('should return 404 for non-object id',(done)=>{
    request(app)
    .get(`/todos/123abc`)
    .expect(404)
    .end(done)
    
    });
})

describe('Delete /todos/:id', ()=>{
    it ('should remove a todo',(done)=>{
        var hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo._id).toBe(hexId)
        })
        .end((err,res)=>{
            if(err){
                return done(err)
            }
        Todo.findById(hexId).then((todo)=>{
            expect(todo).toBeFalsy();
            done()
        }).catch((e)=> done(e))
        });
    });
    it('should return 404 if todo not found',(done)=>{
        request(app)
        .delete(`/todos/${(new ObjectId).toHexString()}`)
        .expect(404)
        .end(done)

    });
    it('should rerunt 404 for non-object id',(done)=>{
        request(app)
        .delete(`/todos/123abc`)
        .expect(404)
        .end(done)
    });

})

describe('Patch /todos/id', ()=>{
    it ('should update the todo',(done)=>{
        
        var id = todos[0]._id.toHexString();
        var   text = 'updated first todo'
           
        request(app)
        .patch(`/todo/${id}`)
        .send({
            text,
            completed:true
        })
        .expect(200)
        .expect((res)=>{
         expect(res.body.text).toBe(text)
         expect(res.body.completed).toBe(true)
         expect(res.body.completedAt).toBe('number')
        })
        .end(done);
        
        //grab id for firs item
        //update text, set complete true
        //200
        //test is changed, completed is true, completedAt is number .to BeA
    })
    it ('Should clear completedAt when todo is not completed',(done)=>{
        //grab id of second todo item
        // update text
        //set completed to false
        //200
        //text is changed, completed is false, completedAt is null .tobe Falsy
    })
})
