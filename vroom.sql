/*vroom database*/
DROP DATABASE IF EXISTS `vroom`;
CREATE DATABASE `vroom`;
USE `vroom`;

/*create users table w/ default values*/
CREATE TABLE `users` (`userID` int not null auto_increment primary key, `username` varchar(255) not null, `password` varchar(255) not null, `firstName` varchar(255) not null, `lastName` varchar(255) not null);
INSERT INTO `users` (`username`, `password`, `firstName`, `lastName`) VALUES
('username', 'password', 'John', 'Smith'),
('professor', 'profPass', 'Jane', 'Doe');

/*create meetings table w/ default values*/
/*if isOnline = false, zoomCode and zoomPassword are null. it is also possible to have no password for a zoom meeting*/
/*times are in 24hr format, year-month-day*/
CREATE TABLE `meetings` (`meetingID` int not null auto_increment primary key, `meetingName` varchar(255) not null, `isOnline` boolean not null, `startTime` datetime not null, `endTime` datetime not null, `zoomCode` varchar(50), `zoomPassword` varchar(50), `isOpen` boolean not null, `maxParticipants` int, `isCancelled` boolean not null);
INSERT INTO `meetings` (`meetingName`, `isOnline`, `startTime`, `endTime`, `zoomCode`, `zoomPassword`, `isOpen`, `maxParticipants`, `isCancelled`) VALUES
('Office Hours', true, '2020-10-28 13:00:00', '2020-10-28 14:00:00', '4447773333', NULL, true, NULL, false),
('Meeting', true, '2020-10-27 13:00:00', '2020-10-27 14:00:00', '4447773333', 'p', false, 5, false),
('Lecture', false, '2020-10-28 14:00:00', '2020-10-28 15:00:00', NULL, NULL, false, 30, false);

/*create meeting member table w/ default values*/
/*used to connect meeting members to the meeting*/
CREATE TABLE `meetingMembers` (`participantID` int not null auto_increment primary key, `meetingID` int not null, `userID` int not null, `isHost` boolean not null, `message` varchar(255),
KEY `meetingID` (`meetingID`), KEY `userID` (`userID`), FOREIGN KEY (`meetingID`) REFERENCES `meetings` (`meetingID`), FOREIGN KEY (`userID`) REFERENCES `users`(`userID`));
INSERT INTO `meetingMembers` (`meetingID`, `userID`, `isHost`, `message`) VALUES
(1, 1, 0, 'help me with my math homework'),
(1, 2, 1, 'I am having office hours for our class'),
(2, 1, 0, NULL),
(2, 2, 1, 'class time');

/*create groups table w/ default values*/
CREATE TABLE `groups` (`groupID` int not null auto_increment primary key, `ownerID` int not null, `groupName` varchar(255),
KEY `groupID` (`groupID`), KEY `ownerID` (`ownerID`), FOREIGN KEY (`ownerID`) REFERENCES `users`(`userID`));
INSERT INTO `groups` (`ownerID`, `groupName`) VALUES
(2, 'Class Study Group');

/*create group member table w/ default values*/
/*used to connect group members to the group*/
CREATE TABLE `groupMembers` (`memberID` int not null auto_increment primary key, `groupID` int not null, `userID` int not null,
KEY `groupID` (`groupID`), KEY `userID` (`userID`), FOREIGN KEY (`groupID`) REFERENCES `groups` (`groupID`), FOREIGN KEY (`userID`) REFERENCES `users` (`userID`));
INSERT INTO `groupMembers` (`groupID`, `userID`) VALUES
(1, 1),
(1, 2);

/*create table to store notifications*/
/*notificationType determines the message of the notification*/
/*meetingID and groupID are included to link to the relevant meeting or group, group = NULL if it's related to a meeting*/
/*sender can be null if the notification is a system message(like to all users)*/
CREATE TABLE `notifications` (`notificationID` int not null auto_increment primary key, `notificationTime` datetime not null, `notificationType` int not null, `sender` int, `recipient` int not null, `meetingID` int, `groupID` int,
KEY `sender` (`sender`), KEY `recipient` (`recipient`), KEY `meetingID` (`meetingID`), KEY `groupID` (`groupID`), FOREIGN KEY (`sender`) REFERENCES `users` (`userID`), FOREIGN KEY (`recipient`) REFERENCES `users` (`userID`), FOREIGN KEY (`meetingID`) REFERENCES `meetings` (`meetingID`), FOREIGN KEY (`groupID`) REFERENCES `groups` (`groupID`));
INSERT INTO `notifications` (`notificationTime`, `notificationType`, `sender`, `recipient`, `meetingID`, `groupID`) VALUES
('2020-10-27 12:00:00', 4, 2, 1, 1, NULL);

/*select * from users;
select * from meetings;
select * from meetingMembers;
select * from `groups`;
select * from groupMembers;
select * from notifications;*/