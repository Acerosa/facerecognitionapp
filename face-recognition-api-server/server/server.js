const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cors = require('cors')
var knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smart_brain'
    }
});

db.select('*').from('users').then(data => {
    console.log(data)
})

/*const database = {
  users: [{
    id: '123',
    name: 'Andrei',
    email: 'john@gmail.com',
    entries: 0,
    joined: new Date()
  }],
  secrets: {
    users_id: '123',
    hash: 'wghhh'
  }
}*/

app.use(cors());
app.use(bodyParser.json());
//app.get('/', (req, res) => res.send('Hello World!'))

/*app.post('/signin', (req, res) => {
  var a = JSON.parse(req.body);
  if (a.username === database.users[0].email && a.password === database.secrets.hash) {
    res.send('signed in');
  } else {
    res.json('access denied');
  }
})*/

/*app.post('/findface', (req, res) => {
  database.users.forEach(user => {
    if (user.email === req.body.email) {
      user.entries++
      res.json(user)
    }
  });
  res.json('nope')
})
*/

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    db('users')
        .returning('*')
        .insert({
    name: name,
    email: email,
    joined: new Date()
        })
        .then(user => { 
            res.json(user[0])
        })
        .catch(err => res.status(400).json('Unable to register'))
 
})

/*app.get('/profile/:userId', (req, res) => {
  database.users.forEach(user => {
    if (user.id === req.params.userId) {
      return res.json(user);
    }
  })
  // res.json('no user')

})*/

app.listen(3000, () => console.log('Example app listening on port 3000!'))
