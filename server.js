const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('HELLO WORLD!');
});

//Connect to MySQL
var mysql = require('mysql');

//Connect to MySQL
var con = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  port: "3306",
  user: "b1ffbd17d2ae7c",
  password: "0485777d",
  database: "heroku_a1e2fe87fd75c8e"
});

//Open Connection
con.connect(function(err) {
	  if (err) throw err;
});

// create router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// REGISTER  ROUTES
app.use('/api', router);

//*****users table*****
//login
router.get('/login', function (req, res) {
    var userID;
    let query = "select * from users where email = '" + req.query.email + "' and password = '" + req.query.password + "';";
	con.query(query, function (err, result, fields) {
        if (err) throw err;
        if(rows == NULL){
            //incorrect username/password
            userID = 0;
        }
        else{
            userID = rows[0].userID;
        }
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});
//create new user
//get user by user id
//get user by email
//get all users

//*****meetings table*****
//create new meeting
//get meeting by id
//change zoom code
//change zoom password
//change meeting start time
//change meeting end time
//change meeting name
//cancel meeting(mark is_cancelled as true and creates notification of type 6 sent from meeting host to all meeting participants)

//*****meetingMembers table*****
//user adds self to meeting & creates notification of type 1 sent from joining user to host
//host adds another user to meeting & create notification of type 4 sent from host to joining user
//remove self from a meeting & create notification of type 2 sent from leaving user to host
//host removes participant from a meeting & create notification of type 5
//get all meetings that a given userID is part of
//get all comment messages for a given meetingID

//*****groups table*****
//create a new group
//rename a group
//delete a group and remove all group members with matching group id from groupMembers table

//*****groupMembers table*****
//add a new group member
//remove a group member

//*****notifications table*****
//get all notifications in which the recipient has a given userID

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));