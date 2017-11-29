# Host: localhost  (Version 5.7.14)
# Date: 2017-11-29 17:11:08
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "check_in"
#

DROP TABLE IF EXISTS `check_in`;
CREATE TABLE `check_in` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `room` int(11) DEFAULT NULL,
  `inTime` varchar(255) NOT NULL DEFAULT '',
  `outTime` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "check_in"
#

INSERT INTO `check_in` VALUES (1,102,'2017-11-22 21:07:57','0'),(3,103,'2017-11-22 21:08:31','0');

#
# Structure for table "client"
#

DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `sex` varchar(255) DEFAULT NULL,
  `VIPcard` varchar(255) NOT NULL DEFAULT '',
  `phone` int(11) DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

#
# Data for table "client"
#

INSERT INTO `client` VALUES (1,'客户甲','男','无',1),(2,'客户乙','男','无',2),(3,'客户丙','女','无',3),(4,'客户丁','男','无',4);

#
# Structure for table "employee"
#

DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `e_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `salary` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=utf8;

#
# Data for table "employee"
#

INSERT INTO `employee` VALUES (10000,'员工甲','1000','男'),(10001,'员工乙','1200','女');

#
# Structure for table "login"
#

DROP TABLE IF EXISTS `login`;
CREATE TABLE `login` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Idtype` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=utf8;

#
# Data for table "login"
#

INSERT INTO `login` VALUES (1,'1','1','1'),(2,'1','2','2'),(3,'1','3','3'),(100,'3','100','100'),(10000,'2','10000','10000'),(10001,'2','10001','10001');

#
# Structure for table "manager"
#

DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

#
# Data for table "manager"
#

INSERT INTO `manager` VALUES (100,'经理','男');

#
# Structure for table "room"
#

DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `number` int(11) NOT NULL AUTO_INCREMENT,
  `state` varchar(255) NOT NULL DEFAULT '',
  `room_type` varchar(255) NOT NULL DEFAULT '',
  `price` varchar(255) NOT NULL DEFAULT '',
  `deposit` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`number`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;

#
# Data for table "room"
#

INSERT INTO `room` VALUES (101,'空房','标准间','150','100'),(102,'入住','标准间','150 ','100'),(103,'入住','单人间','100','50'),(104,'空房','豪华房间','199','199'),(105,'空房','豪华房间','199','199');
