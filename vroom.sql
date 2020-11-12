/*vroom database*/
/*DROP DATABASE IF EXISTS `vroom`;
CREATE DATABASE `vroom`;
USE `vroom`;*/

/******NOTE: we are using cleardb, which auto_increments ids by 10 instead of by 1******/

/*create users table w/ default values*/
drop table if exists `users`;
CREATE TABLE `users` (`userID` int not null auto_increment primary key, `email` varchar(255) not null, `password` varchar(255) not null, `firstName` varchar(255) not null, `lastName` varchar(255) not null);
INSERT INTO `users` (`email`, `password`, `firstName`, `lastName`) VALUES
('username@email.com', 'password', 'John', 'Smith'),
('professor@email.com', 'profPass', 'Jane', 'Doe');
/*select * from users;*/

/*create meetings table w/ default values*/
/*if isOnline = false, zoomCode and zoomPassword are null. it is also possible to have no password for a zoom meeting*/
/*times are in 24hr format, year-month-day*/
drop table if exists `meetings`;
CREATE TABLE `meetings` (`meetingID` int not null auto_increment primary key, `meetingName` varchar(255) not null, `isOnline` boolean not null, `startTime` datetime not null, `endTime` datetime not null, `zoomCode` varchar(50), `zoomPassword` varchar(50), `isOpen` boolean not null, `maxParticipants` int, `isCancelled` boolean not null);
INSERT INTO `meetings` (`meetingName`, `isOnline`, `startTime`, `endTime`, `zoomCode`, `zoomPassword`, `isOpen`, `maxParticipants`, `isCancelled`) VALUES
('Office Hours', true, '2020-10-28 13:00:00', '2020-10-28 14:00:00', '4447773333', NULL, true, NULL, false),
('Meeting', true, '2020-10-27 13:00:00', '2020-10-27 14:00:00', '4447773333', 'p', false, 5, false),
('Lecture', false, '2020-10-28 14:00:00', '2020-10-28 15:00:00', NULL, NULL, false, 30, false);
/*select * from meetings;*/

/*create meeting member table w/ default values*/
/*used to connect meeting members to the meeting*/
drop table if exists `meetingMembers`;
CREATE TABLE `meetingMembers` (`participantID` int not null auto_increment primary key, `meetingID` int not null, `userID` int not null, `isHost` boolean not null, `message` varchar(255),
KEY `meetingID` (`meetingID`), KEY `userID` (`userID`), FOREIGN KEY (`meetingID`) REFERENCES `meetings` (`meetingID`), FOREIGN KEY (`userID`) REFERENCES `users`(`userID`));
INSERT INTO `meetingMembers` (`meetingID`, `userID`, `isHost`, `message`) VALUES
(1, 1, 0, 'help me with my math homework'),
(1, 11, 1, 'I am having office hours for our class'),
(11, 1, 0, NULL),
(11, 11, 1, 'class time');
/*select * from meetingMembers;*/

/*create groups table w/ default values*/
drop table if exists `groups`;
CREATE TABLE `groups` (`groupID` int not null auto_increment primary key, `ownerID` int not null, `groupName` varchar(255),
KEY `groupID` (`groupID`), KEY `ownerID` (`ownerID`), FOREIGN KEY (`ownerID`) REFERENCES `users`(`userID`));
INSERT INTO `groups` (`ownerID`, `groupName`) VALUES
(11, 'Class Study Group');
/*select * from `groups`;*/

/*create group member table w/ default values*/
/*used to connect group members to the group*/
drop table if exists `groupMembers`;
CREATE TABLE `groupMembers` (`memberID` int not null auto_increment primary key, `groupID` int not null, `userID` int not null,
KEY `groupID` (`groupID`), KEY `userID` (`userID`), FOREIGN KEY (`groupID`) REFERENCES `groups` (`groupID`), FOREIGN KEY (`userID`) REFERENCES `users` (`userID`));
INSERT INTO `groupMembers` (`groupID`, `userID`) VALUES
(1, 1),
(1, 11);
/*select * from groupMembers;*/

/*create table to store notifications*/
/*notificationType determines the message of the notification*/
/*sender can be null if the notification is a system message(like to all users)*/
drop table if exists `notifications`;
CREATE TABLE `notifications` (`notificationID` int not null auto_increment primary key, `notificationTime` datetime not null, `notificationType` int not null, `sender` int, `recipient` int not null, `meetingID` int,
KEY `sender` (`sender`), KEY `recipient` (`recipient`), KEY `meetingID` (`meetingID`), FOREIGN KEY (`sender`) REFERENCES `users` (`userID`), FOREIGN KEY (`recipient`) REFERENCES `users` (`userID`), FOREIGN KEY (`meetingID`) REFERENCES `meetings` (`meetingID`));
INSERT INTO `notifications` (`notificationTime`, `notificationType`, `sender`, `recipient`, `meetingID`) VALUES
('2020-10-27 12:00:00', 4, 11, 1, 1);
/*select * from notifications;*/