const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// Handlebars Middleware
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));


// Init middleware
//app.use(logger); // removed after installing Handlebars

/*
// Get All Members
app.get('/api/members', (req, res) => res.json(members)); // this should match the json;

// Get Single Member
app.use('/api/members/:id', (req, res) => {
  //res.send(req.params.id);
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id))); // if you just enter 'req.params.id' = string
  } else {
    res.status(400).json({ msg: `No member w that id`});
  } 
});
*/  // move the section to routes/api/members.js > change "app."> to "router"

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home pg Route:  render index view
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member Handling Test via ExpressJS',
    members
  })
);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// Members API Routes
//app.use('/api/members', require('./routes/api/members'));
