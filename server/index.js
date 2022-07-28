const express = require('express');
const app = express();
var count = 0;
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
mongoose.connect(url);

var todoSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  completed: Boolean,
});

var todoModel = new mongoose.model('todoList', todoSchema);

app.get('/todos', (req, res) => {
  count = count + 1;
  res.json([{ userId: 1, id: count, title: 'Hello Him', completed: false }]);
});

app.post('/todos', (req, res) => {
  let register = new todoModel(req.body);
  register.save();
});

app.listen(3000);
