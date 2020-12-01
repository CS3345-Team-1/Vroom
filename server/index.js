const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3306;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

} else {
    const app = express();

    app.all('*', function(req, res, next) {
        if (req.headers['x-forwarded-proto'] != 'https' && req.headers.host != 'localhost:3306')
            res.redirect('https://' + req.headers.host + req.url)
        else
            next() /* Continue to other routes if we're not redirecting */
    });

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());

    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    // Answer API requests.
    app.get('/api', function (req, res) {
        res.set('Content-Type', 'application/json');
        res.send('{"message":"Hello world!"}');
    });

    //Connect to MySQL
    var mysql = require('mysql');

    var db_config = {
        host: "de1tmi3t63foh7fa.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: "3306",
        user: "aybtaplp5xw2pgv6",
        password: "tazinfa0sg1zl86k",
        database: "s9z1n09np8wpporb"
    };

    var con;

    // Self-reestablishing database connection
    function handleDisconnect() {
        console.log('1. connecting to db:');
        con = mysql.createConnection(db_config);

        con.connect(function(err) {
            if (err) {
                console.log('2. error when connecting to db:', err);
                setTimeout(handleDisconnect, 1000);
            }
        });

        con.on('error', function(err) {
            console.log('3. db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                handleDisconnect();
            } else {
                throw err;
            }
        });
    }

    handleDisconnect();

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

    // BEGIN API CALLS

    //*****users table*****
    router.get('/login', function (req, res) {
        var userID;
        let query = "select * from users where email = '" + req.query.email + "' and password = '" + req.query.password + "';";
        con.query(query, function (err, result, fields) {
            // if (err) throw err;
            if(result == null || result.length == 0 || err){
                //incorrect username/password
                userID = -1;
            }
            else{
                userID = result[0].userID;
            }
            res.end(JSON.stringify(userID)); // Result in JSON format
        });
    });

    //create new user
    router.post('/postuserbody', async (req, res) => {
        var email = req.body.email
        var password = req.body.password
        var firstName = req.body.firstName
        var lastName = req.body.lastName

        console.log(req.body)
        console.log(req.query)

        con.query("INSERT INTO users (email, password, firstName, lastName) VALUES (?,?,?,?)", [email, password, firstName, lastName],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //get user by user id
    router.get('/userbyid/:userID', function (req, res) {
        var userID = req.params.userID

        con.query("SELECT * FROM users WHERE userID = ?", userID, function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //get user by email
    router.get('/userbyemail/:email', function (req, res) {
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
        // var meetingID = req.body.meetingID
        var meetingName = req.body.meetingName
        var date = req.body.date
        var isOnline = req.body.isOnline
        var startTime = req.body.startTime
        var endTime = req.body.endTime
        var zoomCode = req.body.zoomCode
        var zoomPassword = req.body.zoomPassword
        var isOpen = req.body.isOpen
        var maxParticipants = req.body.maxParticipants
        var isCancelled = req.body.isCancelled

        con.query("INSERT INTO meetings (meetingName, isOnline, date, startTime, endTime, zoomCode, zoomPassword, isOpen, maxParticipants, isCancelled) VALUES (?,?,?,?,?,?,?,?,?,?)", [meetingName, isOnline, date, startTime, endTime, zoomCode, zoomPassword, isOpen, maxParticipants, isCancelled],function (err, result, fields) {
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

    //EXPERIMENTAL get all meetings for user with comments/participants
    router.get('/getCompleteMeetings/:userID', function (req, res) {
        var userID = req.params.userID

        con.query("SELECT meetings.*, (SELECT JSON_ARRAYAGG(JSON_OBJECT( 'first', users.firstName, 'last', users.lastName, 'id', comments.commentID, 'time', comments.`timestamp`, 'comment', comments.`comment`)) FROM users INNER JOIN comments ON users.userID = comments.authorID WHERE comments.meetingID = meetings.meetingID) AS 'comments', (SELECT JSON_ARRAYAGG(JSON_OBJECT('email', users.email, 'first', users.firstName, 'last', users.lastName, 'userId', users.userID, 'id', meetingmembers.participantID, 'isHost', meetingmembers.isHost)) FROM users INNER JOIN meetingmembers ON users.userID = meetingmembers.userID WHERE meetingmembers.meetingID = meetings.meetingID) AS 'participants' FROM meetings INNER JOIN meetingmembers ON meetings.meetingID = meetingmembers.meetingID INNER JOIN users ON meetingmembers.userID = users.userID WHERE meetings.meetingID = meetingmembers.meetingID AND meetingmembers.userID = ?", userID, function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });


    //change zoom code
    router.put('/changeid/:meetingID', async (req, res) => {
        var zoomCodeNew = req.body.zoomCode
        var meetingID = req.params.meetingID

        con.query("UPDATE meetings SET zoomCode = ? WHERE meetingID = ?", [zoomCodeNew,meetingID],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //change zoom password
    router.put('/changepasscode/:meetingID', async (req, res) => {
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

    //cancel meeting(mark is_cancelled as true)
    router.put('/cancelmeeting/:meetingID', async (req, res) => {
        var meetingID = req.params.meetingID

        con.query("UPDATE meetings SET isCancelled = true WHERE meetingID = ?", [meetingID],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //*****meetingMembers table*****
    //add member to meeting
    router.post('/joinMeeting', async (req, res) => {
        var meetingId = req.body.meetingId
        var userId = req.body.userId
        var isHost = req.body.isHost

        con.query("INSERT INTO meetingmembers (meetingID, userID, isHost) VALUES (?,?,?)", [meetingId, userId, isHost],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //remove member from meeting
    router.delete('/deletemeetingmember/:participantID', async (req, res) => {
        var participantID = req.params.participantID
        con.query("DELETE FROM meetingmembers WHERE participantID = ?", participantID, function (err, result, fields) {
            if (err) return console.error(error.message);
            res.end(JSON.stringify(result));
        });
    });

    //get all meetings that a given userID is part of
    router.get('/meetingMembers/:userID', function (req, res) {
        var userID = req.params.userID;
        con.query("select * from meetings inner join meetingMembers on meetings.meetingID = meetingMembers.meetingID where meetingMembers.userID = ? ORDER BY meetings.startTime", userID, function(err, result, fields) {
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

    //get all meetings for a given user
    router.get('/userMeetings/:userID', function(req, res) {
        var userId = req.params.userID;
        con.query("SELECT meetings.meetingID as id, meetings.meetingName as title, meetings.date as date, meetings.isOnline as isOnline, meetings.startTime as startTime, meetings.endTime as endTime, meetings.zoomCode as meetingId, meetings.zoomPassword as passcode, meetings.isOpen as isOpen, meetings.maxParticipants as maxParticipants, meetings.isCancelled as isCancelled, meetingmembers.isHost as isHost FROM meetingmembers INNER JOIN meetings ON meetingmembers.meetingID = meetings.meetingID WHERE meetingmembers.userID = ? ORDER BY meetings.startTime", userId, function(err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    })

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
    //**this may not work
    router.delete('/deletegroup:groupID', async (req, res) => {
        var groupID = req.params.groupID
        con.query("DELETE FROM groupMembers WHERE groupID = ? UNION DELETE FROM groups where groupID = ?", [groupID, groupID], function (err, result, fields) {
            if (err) return console.error(error.message);
            res.end(JSON.stringify(result));
        });
    });

    //*****groupMembers table*****
    //add a new group member
    router.post('/postgroupmember', async (req, res) => {
        var memberID = req.body.memberID
        var groupID = req.body.groupID
        var userID = req.body.userID
        con.query("INSERT INTO groupMembers (memberID, groupID, userID) VALUES (?,?,?)", [memberID, groupID, userID],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //remove a group member
    router.delete('/deletegroupmember/:memberID', async (req, res) => {
        var memberID = req.params.memberID
        con.query("DELETE FROM groupMembers WHERE memberID = ?", memberID, function (err, result, fields) {
            if (err) return console.error(error.message);
            res.end(JSON.stringify(result));
        });
    });

    //get all members of a certain group
    router.get('/groupMembers/:groupID', function (req, res) {
        var groupID = req.params.groupID;
        con.query("select * from notifications where groupID = ?", groupID, function(err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    });

    //*****notifications table*****
    //create a new notification
    router.post('/postnotif', async (req, res) => {
        var notificationTime = req.body.notificationTime
        var notificationType = req.body.notificationType
        var sender = req.body.sender
        var recipient = req.body.recipient
        var meetingID = req.body.meetingID
        con.query("INSERT INTO notifications (notificationTime, notificationType, sender, recipient, meetingID) VALUES (?,?,?,?,?)", [notificationTime, notificationType, sender, recipient, meetingID], function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //get all notifications in which the recipient has a given userID
    router.get('/notifications/:userID', function (req, res) {
        var uID = req.params.userID;
        con.query("select * from notifications where recipient = ?", uID, function(err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    });

    //*****comments table*****
    //add a new comment
    router.post('/postcomment', async (req, res) => {
        var meetingID = req.body.meetingID
        var authorID = req.body.authorID
        var timestamp = req.body.timestamp
        var comment = req.body.comment
        con.query("INSERT INTO comments (meetingID, authorID, timestamp, comment) VALUES (?,?,?,?)", [meetingID, authorID, timestamp, comment],function (err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result)); // Result in JSON format
        });
    });

    //get all comments per meetingid
    router.get('/meetingMessage/:meetingID', function (req, res) {
        var meetingID = req.params.meetingID;
        con.query("select * from comments where meetingID = ?", meetingID, function(err, result, fields) {
            if (err) throw err;
            res.end(JSON.stringify(result));
        });
    });
    // END API CALLS

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function(request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });

    app.listen(PORT, function () {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
    });
}