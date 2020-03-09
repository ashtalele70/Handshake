const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');

const app = express();

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));

// Connect Database
// connectDB.connectDB();

// Allow Access Control
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,HEAD,OPTIONS,POST,PUT,DELETE',
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
	);
	res.setHeader('Cache-Control', 'no-cache');
	next();
});


// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => console.log('Api running'));
app.use('/students', require('./routes/students'));
app.use('/auth', require('./routes/auth'));
app.use('/studentProfile', require('./routes/profile'));
app.use('/companies', require('./routes/companies'));
app.use('/jobs', require('./routes/jobs'));
app.use('/authc', require('./routes/authc'));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
