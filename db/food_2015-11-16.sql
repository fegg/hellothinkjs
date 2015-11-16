# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.27)
# Database: food
# Generation Time: 2015-11-16 05:41:43 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table think_food
# ------------------------------------------------------------

DROP TABLE IF EXISTS `think_food`;

CREATE TABLE `think_food` (
  `foodid` varchar(20) NOT NULL,
  `foodname` varchar(50) NOT NULL,
  `foodurl` varchar(100) NOT NULL,
  PRIMARY KEY (`foodid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `think_food` WRITE;
/*!40000 ALTER TABLE `think_food` DISABLE KEYS */;

INSERT INTO `think_food` (`foodid`, `foodname`, `foodurl`)
VALUES
	('1','火锅','/static/img/food/1.jpg'),
	('10','火锅','/static/img/food/1.jpg'),
	('11','小面','/static/img/food/2.jpg'),
	('12','小面','/static/img/food/2.jpg'),
	('13','小面','/static/img/food/2.jpg'),
	('14','小面','/static/img/food/2.jpg'),
	('15','小面','/static/img/food/2.jpg'),
	('16','小面','/static/img/food/2.jpg'),
	('17','小面','/static/img/food/2.jpg'),
	('18','小面','/static/img/food/2.jpg'),
	('19','小面','/static/img/food/2.jpg'),
	('2','火锅','/static/img/food/1.jpg'),
	('20','小面','/static/img/food/2.jpg'),
	('21','小面','/static/img/food/2.jpg'),
	('22','小面','/static/img/food/2.jpg'),
	('23','小面','/static/img/food/2.jpg'),
	('24','小面','/static/img/food/2.jpg'),
	('25','小面','/static/img/food/2.jpg'),
	('26','小面','/static/img/food/2.jpg'),
	('3','火锅','/static/img/food/1.jpg'),
	('4','火锅','/static/img/food/1.jpg'),
	('5','火锅','/static/img/food/1.jpg'),
	('6','火锅','/static/img/food/1.jpg'),
	('7','火锅','/static/img/food/1.jpg'),
	('8','火锅','/static/img/food/1.jpg'),
	('9','火锅','/static/img/food/1.jpg');

/*!40000 ALTER TABLE `think_food` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
