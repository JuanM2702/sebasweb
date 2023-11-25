const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pg = require('pg');
const bcrypt = require('bcrypt');


const app = express();
const port = 3000;

const pool = new pg.Pool({
  user: 'juan',
  host: 'localhost',
  database: 'sebaslogin',
  password: '2702',
  port: 5432,
});
app.use(express.static('imagenes'));
app.use(express.static('videos'));
app.use(express.static('js'));
app.use(express.static('fuente'));
app.use(express.static('styles'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secreto', resave: true, saveUninitialized: true }));

app.use(express.json());

const carrito = [];

app.post('/agregar-al-carrito', (req, res) => {
  const { destino, precio } = req.body;
  carrito.push({ destino, precio });
  res.json({ message: 'Agregado al carrito' });
});

app.get('/carrito', (req, res) => {
    res.sendFile(__dirname + '/carrito.html');
});  
  app.get('/obtener-carrito', (req, res) => {
    res.json(carrito);
});
  

  
  
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/registro', (req, res) => {
  res.sendFile(__dirname + '/registro.html');
});

app.post('/registro', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );

    req.session.userId = result.rows[0].id;
    res.redirect('/index');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el registro.');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const isValidPassword = await bcrypt.compare(password, result.rows[0].password);

      if (isValidPassword) {
        req.session.userId = result.rows[0].id;
        return res.redirect('/index');
      } else {
        return res.status(401).send('Contraseña incorrecta');
      }
    } else {
      return res.status(404).send('Usuario no encontrado. <a href="/registro">Registrarse</a>');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el login.');
  }
});

app.get('/index', (req, res) => {
  if (req.session.userId) {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.redirect('/login');
  }
});
app.get('/pagina3', (req, res) => {
  res.sendFile(__dirname + '/pagina3.html');
});
app.get('/pagina4', (req, res) => {
  res.sendFile(__dirname + '/pagina4.html');
});
app.get('/pagina5', (req, res) => {
  res.sendFile(__dirname + '/pagina5.html');
});
app.get('/pagina6', (req, res) => {
  res.sendFile(__dirname + '/pagina6.html');
});
app.get('/pagina7', (req, res) => {
  res.sendFile(__dirname + '/pagina7.html');
});
app.get('/pagina8', (req, res) => {
  res.sendFile(__dirname + '/pagina8.html');
});
app.get('/pagina9', (req, res) => {
  res.sendFile(__dirname + '/pagina9.html');
});
app.get('/pagina10', (req, res) => {
  res.sendFile(__dirname + '/pagina10.html');
});
app.get('/pagina11', (req, res) => {
  res.sendFile(__dirname + '/pagina11.html');
});
app.get('/pagina12', (req, res) => {
  res.sendFile(__dirname + '/pagina12.html');
});
app.get('/pagina13', (req, res) => {
  res.sendFile(__dirname + '/pagina13.html');
});
app.get('/pagina14', (req, res) => {
  res.sendFile(__dirname + '/pagina14.html');
});
app.get('/pagina15', (req, res) => {
  res.sendFile(__dirname + '/pagina9.html');
});
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
