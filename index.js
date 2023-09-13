const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn');
const User = require('./models/User');
const book = require('./models/livros')
const Usar = require('./models/User');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.get('/user/create', (req, res)=>{
    return res.render('userAdd')
})
app.post('/user/create', async (req, res)=>{
    const {name, occupation} = req.body
    let newsletter = req.body.newsletter

    console.log(name, occupation, newsletter)

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    await User.create({name, occupation, newsletter})
    return res.redirect('/')
})

app.get('/users/:id', async (req, res)=>{
    const id = req.params.id
    console.log(id)
    const user = await User.findOne({raw: true, where: {id:id}})
    console.log(user)

    return res.render('viewuser', {user})
})

app.post('/users/delete/:id', async (req, res)=>{
    const id = req.params.id
    console.log(id)
    await User.destroy({where: { id:id }})
    return res.redirect('/')
})

app.get('/users/edit/:id', async (req, res)=>{
    const id = req.params.id
    const user = await User.findOne({raw: true, where: {id:id}})

    return res.render('edituser', {user:user})
})

app.post('/users/update', async (req, res)=>{
    const {id, name, occupation} = req.body
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }
    const UserData = {
        id, 
        name, 
        occupation,
        newsletter
    }
    await User.update(UserData, {where: { id:id} })
    return res.redirect('/')
})

app.get('/user', async (req, res)=>{
    const users = await User.findAll({raw: true})
    console.log(users)
    return res.render('user', {users})
})

app.get('/books', async (req, res)=>{
    const books = await book.findAll({raw: true})
    console.log(books)
    return res.render('books', {books})
})

app.get('/book/create', async (req, res)=>{
    return res.render('bookAdd')
})

app.post('/book/create', async (req, res)=>{
    const {autor, titulo, preco} = req.body
    let capaDura = req.body.capaDura

    if(capaDura === 'on'){
        capaDura = true
    }else{
        capaDura = false
    }
    const BookData = {
        autor, 
        titulo, 
        preco,
        capaDura
    }
    await book.create(BookData)
    return res.redirect('/')
})

app.get('/book/:id', async (req, res)=>{
    const id = req.params.id
    console.log(id)
    const books = await book.findOne({raw: true, where: {id:id}})
    console.log(books)

    return res.render('viewBooks', {books})
})

app.post('/book/delete/:id', async (req, res)=>{
    const id = req.params.id
    console.log(id)
    await book.destroy({where: { id:id }})
    return res.redirect('/')
})

app.get('/book/edit/:id', async (req, res)=>{
    const id = req.params.id
    const books = await book.findOne({raw: true, where: {id:id}})

    return res.render('editbook', {books})
})

app.post('/book/update', async (req, res)=>{
    const {id, autor, titulo, preco} = req.body
    let capaDura = req.body.capaDura

    if(capaDura === 'on'){
        capaDura = true
    }else{
        capaDura = false
    }
    const BookData = {
        autor, 
        titulo, 
        preco,
        capaDura
    }
    await book.update(BookData, {where: { id:id} })
    return res.redirect('/')
})

app.get('/', (req, res) => {
    return res.render('home');
})

conn.sync().then(() => {
    app.listen(3333, () => {
        console.log('Servidor Onlline');
    })
}).catch((err) => console.log(err)) 