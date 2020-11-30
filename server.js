const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

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
//login <- fix it? does it work?
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
router.post('/postuserbody', async (req, res) => {
	var userID = req.body.userID
    var email = req.body.email
    var password = req.body.password
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    
	 con.query("INSERT INTO users (userID, email, password, firstName, lastName) VALUES (?,?,?,?,?)", [userID, email, password, firstName, lastName],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//get user by user id
app.get('/getuser/:userID', function (req, res) {
    var userID = req.params.userID
    
    con.query("SELECT * FROM users WHERE userID = ?",userID, function (err, result, fields) {
        if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
    });
});

//get user by email
router.get('/getuser/:email', function (req, res) {
    var email = req.params.email
    
	con.query("SELECT * FROM users WHERE email = ?", email, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//get all users
router.get('/getallusers', function(req, res) {
    con.query("SELECT * FROM users", function(err, result, fields) {
        if(err) throw err;
        res.end(JSON.stringify(result));
    }); 
});

//*****meetings table*****
//create new meeting
router.post('/postmeetingbody', async (req, res) => {
	var meetingID = req.body.meetingID
    var meetingName = req.body.meetingName
    var isOnline = req.body.isOnline
    var startTime = req.body.startTime
    var endTime = req.body.endTime
    var zoomCode = req.body.zoomCode
    var zoomPassword = req.body.zoomPassword
    var isOpen = req.body.isOpen
    var maxParticipants = req.body.maxParticipants
    var isCancelled = req.body.isCancelled
    
	 con.query("INSERT INTO meetings (meetingID, meetingName, isOnline, startTime, endTime, zoomCode, zoomPassword, isOpen, maxParticipants, isCancelled) VALUES (?,?,?,?,?,?,?,?,?,?)", [meetingID, meetingName, isOnline, startTime, endTime, zoomCode, zoomPassword, isOpen, maxParticipants, isCancelled],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//get meeting by id
router.get('/getmeeting/:meetingID', function (req, res) {
    var meetingID = req.params.meetingID
    
	con.query("SELECT * FROM meetings WHERE meetingID = ?", meetingID, function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

//change zoom code
router.put('/putmeetings/:meetingID', async (req, res) => {
	var zoomCodeNew = req.body.zoomCode
    var meetingID = req.params.meetingID

	 con.query("UPDATE meetings SET zoomCode = ? WHERE meetingID = ?", [zoomCodeNew,meetingID],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//change zoom password
router.put('/putmeetings/:meetingID', async (req, res) => {
	var zoomPasswordNew = req.body.zoomPassword
    var meetingID = req.params.meetingID

	 con.query("UPDATE meetings SET zoomPassword = ? WHERE meetingID = ?", [zoomPasswordNew,meetingID],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//change meeting start time
router.put('/putmeetings/:meetingID', async (req, res) => {
	var startTimeNew = req.body.startTime
    var meetingID = req.params.meetingID

	 con.query("UPDATE meetings SET startTime = ? WHERE meetingID = ?", [startTimeNew,meetingID],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//change meeting end time
router.put('/putmeetings/:meetingID', async (req, res) => {
	var endTimeNew = req.body.endTime
    var meetingID = req.params.meetingID

	 con.query("UPDATE meetings SET endTime = ? WHERE meetingID = ?", [endTimeNew,meetingID],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//change meeting name
router.put('/putmeetings/:meetingID', async (req, res) => {
	var meetingNameNew = req.body.meetingName
    var meetingID = req.params.meetingID

	 con.query("UPDATE meetings SET meetingName = ? WHERE meetingID = ?", [meetingNameNew,meetingID],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

//cancel meeting(mark is_cancelled as true and creates notification of type 6 sent from meeting host to all meeting participants)
router.put('/putmeetings/:meetingID', async (req, res) => {
	var meetingID = req.params.meetingID
	
	 con.query("UPDATE meetings SET isCancelled = true WHERE meetingID = ?", [meetingID],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

router.post('/postmeetingbody', async (req, res) => {
	var notificationID = req.body.notificationID
    var notificationTime = req.body.notificationTime
//    var notificationType = req.body.notificationType
    var sender = req.body.sender
    var recipient = req.body.recipient
    var meetingID = req.body.meetingID
    
	 con.query("INSERT INTO notifications (notificationID, notificationTime, notificationType, sender, recipient, meetingID) VALUES (?,?,6,?,?,?)", [notificationID, notificationTime, sender, recipient, meetingID],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});


//*****meetingMembers table*****
//user adds self to meeting & creates notification of type 1 sent from joining user to host
//host adds another user to meeting & create notification of type 4 sent from host to joining user
//remove self from a meeting & create notification of type 2 sent from leaving user to host
//host removes participant from a meeting & create notification of type 5

//get all meetings that a given userID is part of
router.get('/meetingMembers/:userID', function (req, res) {
	var userID = req.params.userID;
	con.query("select * from meetings inner join meetingMembers on meetings.meetingID = meetingMembers.meetingID where meetingMembers.userID = ?", userID, function(err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
});

//get all users who are part of a given meeting
router.get('/meetingMembers/:meetingID', function (req, res) {
	var meetingID = req.params.meetingID;
	con.query("select userID from meetingMembers where meetingID = ?", meetingID, function(err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
});

//get all comment messages for a given meetingID
router.get('/meetingMessage/:meetingID', function (req, res) {
	var meetingID = req.params.meetingID;
	con.query("select message from meetingMembers where meetingID = ?", meetingID, function(err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
});

//*****groups table*****
//create a new group
router.post('/postgroupbody', async (req, res) => {
	var groupID = req.body.groupID
    var ownerID = req.body.ownerID
    var groupName = req.body.groupName
	 con.query("INSERT INTO groups (groupID, ownerID, groupName) VALUES (?,?,?)", [groupID, ownerID, groupName], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});
//rename a group
router.put('/putgroupname', async (req, res) => {
	var groupID = req.body.groupID
	var newName = req.body.newName
	con.query("UPDATE groups SET groupName = ? WHERE groupID = ?", [newName,groupID], function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});
//delete a group and remove all group members with matching group id from groupMembers table

//*****groupMembers table*****
//add a new group member
router.post('/postmeetingmember', async (req, res) => {
	var participantID = req.body.participantID
    var meetingID = req.body.meetingID
    var userID = req.body.userID
    var isHost = req.body.isHost
    var message = req.body.message
    
	 con.query("INSERT INTO meetingMembers (participantID, meetingID, userID, isHost, message) VALUES (?,?,?,?,?)", [participantID, meetingID, userID, isHost, message],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});
//remove a group member
router.delete('/deletemember', async (req, res) => { 
	var participantID = req.body.participantID
	con.query("DELETE FROM meetingMembers WHERE participantID = ?", participantID, function (err, result, fields) {
		if (err) return console.error(error.message);
		res.end(JSON.stringify(result));   
	});
});

//*****notifications table*****
//get all notifications in which the recipient has a given userID
router.get('/notifications/:userID', function (req, res) {
	var uID = req.params.userID;
	con.query("select * from notifications where recipient = ?", uID, function(err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result));
	});
});

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3306;
app.listen(port, () => console.log(`Listening on port ${port}..`));