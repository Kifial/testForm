const port = 8080;

const bodyParser = require('body-parser');

const express = require('express');
const app = express();

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  let layout = fs.readFileSync('dist/index.html', 'utf-8');
  res.send(layout);
});

app.post('/login', (req, res) => {
  var result;
  if (req.body.login == 'User' && req.body.password == 'Password') {
    result = {
      Auth: 'Logged',
      Language: 'EN'
    };
    res.send(JSON.stringify(result));
  } else {
    result = {
      Auth: 'Denied'
    };
    res.send(JSON.stringify(result));
  }
});

const server = app.listen(port, () => {
  console.log(`Listening on ${port} port`);
});