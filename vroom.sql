/*vroom database*/

CREATE DATABASE `vroom`;
USE `vroom`;

/*create users table w/ default values*/
CREATE TABLE `users` (`userID` int not null auto_increment primary key, `username` varchar(255) not null, `password` varchar(255) not null, `name` varchar(255) not null, `isProfessor` boolean not null);
INSERT INTO `users` (`username`, `password`, `name`, `isProfessor`) VALUES
('username', 'password', 'John Smith', false),
('professor', 'profPass', 'Jane Doe', true);

/*create meetings table w/ default values*/
CREATE TABLE `meetings` (`meetingID` int not null auto_increment primary key, `meetingName` varchar(255) not null, `isOnline` boolean not null, `startTime` datetime not null, `endTime` datetime not null, `zoomCode` varchar(50), `zoomPassword` varchar(50));
/*if isOnline = false, zoomCode and zoomPassword are null. it is also possible to have no password for a zoom meeting*/
/*times are in 24hr format, year-month-day*/
INSERT INTO `meetings` (`meetingName`, `isOnline`, `startTime`, `endTime`, `zoomCode`, `zoomPassword`) VALUES
('Office Hours', true, '2020-10-28 13:00:00', '2020-10-28 14:00:00', '4447773333', NULL),
('Meeting', true, '2020-10-27 13:00:00', '2020-10-27 14:00:00', '4447773333', 'p'),
('Lecture', false, '2020-10-28 14:00:00', '2020-10-28 15:00:00', NULL, NULL);

/*create meeting member table w/ default values*/
/*used to connect meeting members to the meeting*/
CREATE TABLE `meetingMembers` (`rowID` int not null auto_increment primary key, `meetingID` int not null, `userID` int not null, `isHost` boolean not null,
KEY `meetingID` (`meetingID`), KEY `userID` (`userID`), FOREIGN KEY (`meetingID`) REFERENCES `meetings` (`meetingID`), FOREIGN KEY (`userID`) REFERENCES `users`(`userID`));
INSERT INTO `meetingMembers` (`meetingID`, `userID`, `isHost`) VALUES
(1, 1, 0),
(1, 2, 1),
(2, 1, 0),
(2, 2, 1);