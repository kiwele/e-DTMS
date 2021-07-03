-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: edtms
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `college`
--

DROP TABLE IF EXISTS `college`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `college` (
  `college_id` varchar(2) NOT NULL,
  `college_name` varchar(255) NOT NULL,
  PRIMARY KEY (`college_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `college`
--

LOCK TABLES `college` WRITE;
/*!40000 ALTER TABLE `college` DISABLE KEYS */;
INSERT INTO `college` VALUES ('1','College of information and communication technologies'),('2','College of engneering and technologies');
/*!40000 ALTER TABLE `college` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` varchar(10) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('1','Bachelor of science in computer science'),('2','Bachelor of science with computer science'),('3','Bachelor of science in computer engneering and IT '),('4','Bachelor of science in telecommunication engneering'),('5','Bachelor of science in electronic science');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `document_id` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL,
  `type_id` varchar(2) DEFAULT NULL,
  `status_id` varchar(1) DEFAULT NULL,
  `feedback_id` varchar(10) DEFAULT NULL,
  `support1` varchar(30) DEFAULT NULL,
  `support2` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `type_id` (`type_id`),
  KEY `status_id` (`status_id`),
  KEY `feedback_id` (`feedback_id`),
  CONSTRAINT `document_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `document_type` (`type_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `document_status` (`status_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_ibfk_3` FOREIGN KEY (`feedback_id`) REFERENCES `feedback` (`feedback_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
INSERT INTO `document` VALUES ('file-1625128841706.pdf','2021-07-01 11:40:42','1','0',NULL,NULL,NULL),('file-1625166900733.pdf','2021-07-01 22:15:01','1','0',NULL,'',''),('file-1625166921851.pdf','2021-07-01 22:15:22','3','0',NULL,'',''),('file-1625166941818.pdf','2021-07-01 22:15:42','4','0',NULL,'',''),('file-1625212066146.pdf','2021-07-02 10:47:46','3','0',NULL,'file-1625212066183.pdf','file-1625212066212.pdf'),('file-1625212151320.pdf','2021-07-02 10:49:11','3','0',NULL,'file-1625212151362.pdf','file-1625212151373.pdf'),('file-1625213392541.pdf','2021-07-02 11:09:53','1','0',NULL,'file-1625213392555.pdf','file-1625213392562.pdf'),('file-1625213408858.pdf','2021-07-02 11:10:09','1','0',NULL,'file-1625213408880.pdf','file-1625213408881.pdf'),('file-1625213411873.pdf','2021-07-02 11:10:12','1','0',NULL,'file-1625213411889.pdf','file-1625213411890.pdf'),('file-1625213415319.pdf','2021-07-02 11:10:15','1','0',NULL,'file-1625213415330.pdf','file-1625213415331.pdf'),('file-1625246553839.pdf','2021-07-02 20:22:34','1','1',NULL,NULL,NULL),('file-1625246607674.pdf','2021-07-02 20:23:28','1','1',NULL,NULL,NULL),('file-1625246646606.pdf','2021-07-02 20:24:07','1','1',NULL,NULL,NULL),('file-1625248733430.pdf','2021-07-02 20:58:53','2','1',NULL,NULL,NULL),('file-1625252079939.pdf','2021-07-02 21:54:40','1','1',NULL,NULL,NULL);
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_movement`
--

DROP TABLE IF EXISTS `document_movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_movement` (
  `movement_id` int NOT NULL AUTO_INCREMENT,
  `date_received` datetime NOT NULL,
  `date_dispatched` datetime NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `document_destination` varchar(255) NOT NULL,
  `user_id` varchar(15) DEFAULT NULL,
  `office_id` varchar(10) DEFAULT NULL,
  `document_id` varchar(100) DEFAULT NULL,
  `read_status` int NOT NULL DEFAULT '0',
  `responded_to` varchar(10) DEFAULT NULL,
  `resp_ofc` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`movement_id`),
  KEY `user_id` (`user_id`),
  KEY `office_id` (`office_id`),
  KEY `document_id` (`document_id`),
  CONSTRAINT `document_movement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_movement_ibfk_2` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_movement_ibfk_3` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_movement`
--

LOCK TABLES `document_movement` WRITE;
/*!40000 ALTER TABLE `document_movement` DISABLE KEYS */;
INSERT INTO `document_movement` VALUES (82,'2021-07-01 11:40:42','2021-07-01 11:40:42','','300','100','1','file-1625128841706.pdf',1,NULL,NULL),(83,'2021-07-01 22:15:01','2021-07-01 22:15:01','','300','100','1','file-1625166900733.pdf',1,NULL,NULL),(84,'2021-07-01 22:15:22','2021-07-01 22:15:22','','300','100','1','file-1625166921851.pdf',1,NULL,NULL),(85,'2021-07-01 22:15:42','2021-07-01 22:15:42','','300','100','1','file-1625166941818.pdf',1,NULL,NULL),(89,'2021-07-01 22:38:52','2021-07-01 22:38:52','','400','300','1','file-1625166900733.pdf',1,NULL,NULL),(90,'2021-07-01 22:40:44','2021-07-01 22:40:44','','400','300','1','file-1625166921851.pdf',1,NULL,NULL),(91,'2021-07-01 22:43:44','2021-07-01 22:43:44','','400','300','1','file-1625166900733.pdf',1,NULL,NULL),(92,'2021-07-01 22:44:34','2021-07-01 22:44:34','','400','300','1','file-1625166900733.pdf',1,NULL,NULL),(93,'2021-07-01 22:45:05','2021-07-01 22:45:05','','400','300','1','file-1625166900733.pdf',1,NULL,NULL),(94,'2021-07-01 22:45:16','2021-07-01 22:45:16','','400','300','1','file-1625166921851.pdf',1,NULL,NULL),(95,'2021-07-01 22:45:23','2021-07-01 22:45:23','','400','300','1','file-1625166941818.pdf',1,NULL,NULL),(96,'2021-07-02 10:49:11','2021-07-02 10:49:11','','300','100','1','file-1625212151320.pdf',1,NULL,NULL),(97,'2021-07-02 10:57:08','2021-07-02 10:57:08','','400','300','1','file-1625212151320.pdf',1,NULL,NULL),(98,'2021-07-02 11:09:53','2021-07-02 11:09:53','','300','100','1','file-1625213392541.pdf',1,NULL,NULL),(99,'2021-07-02 11:10:09','2021-07-02 11:10:09','','300','100','1','file-1625213408858.pdf',0,NULL,NULL),(100,'2021-07-02 11:10:12','2021-07-02 11:10:12','','300','100','1','file-1625213411873.pdf',0,NULL,NULL),(101,'2021-07-02 11:10:15','2021-07-02 11:10:15','','300','100','1','file-1625213415319.pdf',0,NULL,NULL),(102,'2021-07-02 11:26:10','2021-07-02 11:26:10','musa kiwele','100','300','1','file-1625213392541.pdf',1,NULL,NULL),(103,'2021-07-02 11:56:43','2021-07-02 11:56:43','','400','300','1','file-1625213392541.pdf',1,NULL,NULL),(104,'2021-07-02 20:24:07','2021-07-02 20:24:07','','0','500','2','file-1625246646606.pdf',0,NULL,NULL),(105,'2021-07-02 20:58:53','2021-07-02 20:58:53','','0','500','2','file-1625248733430.pdf',0,'100',NULL),(106,'2021-07-02 21:54:40','2021-07-02 21:54:40','','0','500','2','file-1625252079939.pdf',0,'100','2');
/*!40000 ALTER TABLE `document_movement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_status`
--

DROP TABLE IF EXISTS `document_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_status` (
  `status_id` varchar(1) NOT NULL,
  `status_name` varchar(15) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_status`
--

LOCK TABLES `document_status` WRITE;
/*!40000 ALTER TABLE `document_status` DISABLE KEYS */;
INSERT INTO `document_status` VALUES ('0','in process...'),('1','completed');
/*!40000 ALTER TABLE `document_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_type`
--

DROP TABLE IF EXISTS `document_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_type` (
  `type_id` varchar(2) NOT NULL,
  `type_name` varchar(100) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_type`
--

LOCK TABLES `document_type` WRITE;
/*!40000 ALTER TABLE `document_type` DISABLE KEYS */;
INSERT INTO `document_type` VALUES ('1','posttpone studies'),('2','resume studies'),('3','special test'),('4','special examination');
/*!40000 ALTER TABLE `document_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` varchar(10) NOT NULL,
  `feedback_name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES ('0','notRespond'),('1','responded');
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `filename` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (31,'Postpone studies','file-1621800563322.pdf'),(32,'Postpone studies','file-1621800683031.pdf'),(33,'resume studies','file-1621801146725.pdf'),(34,'resume studies','file-1621801193674.pdf'),(35,'resume studies','file-1621801313753.pdf'),(36,'resume studies','file-1621801401414.pdf'),(37,'resume studies','file-1621801467789.pdf'),(38,'resume studies','file-1621801467789.pdf'),(39,'resume studies','file-1621801474892.pdf'),(40,'resume studies','file-1621801474892.pdf'),(41,'resume studies','file-1622038445636.pdf'),(42,'resume studies','file-1622038565835.pdf'),(43,'resume studies','file-1622039093715.pdf'),(44,'resume studies','file-1622039575807.pdf'),(45,'Special test','file-1622039600066.pdf'),(46,'resume studies','file-1622039722335.pdf'),(47,'resume studies','file-1622039776418.pdf'),(48,'resume studies','file-1622039796734.pdf'),(49,'resume studies','file-1622039848895.pdf'),(50,'resume studies','file-1622039869595.pdf');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login_credentials`
--

DROP TABLE IF EXISTS `login_credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_credentials` (
  `user_id` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_credentials`
--

LOCK TABLES `login_credentials` WRITE;
/*!40000 ALTER TABLE `login_credentials` DISABLE KEYS */;
INSERT INTO `login_credentials` VALUES ('10','$2a$10$57M7R95BVXt4snTGap2th.GZxdra3xVttWvbOzcnY9kxAUi8jKwgi'),('100','$2a$10$tTak/4S5pR9is/cUVSfXwu96Xl/4afbCJHENZfdByReywAjUUGqTG'),('20','$2a$10$WtRzNPIVJ6pDa4es1.EShucN8a5xzoKkhhBADPaMPNaiiyn1xY7Eq'),('30','$2a$10$tBRIKnHjt2EknGEcTkrVeuv5Fi51rQD7n6DFE4ecN90JEhKse66ae'),('300','$2a$10$b30eJ4iQ9fgs3uF5Rukhue6eN9HZkcpADZo3rL4CeU0fYi8vJ8INy'),('40','$2a$10$YnLufvjiAaURGMAUl/iNT.0Nyyemx/jU/E02bWaoidlNSjqyMDC1K'),('400','$2a$10$yFMTL3b8J94prLe8NwV8Se99QM/aTdaO8eLZBYkr0LXNgLQmYzt8q'),('500','$2a$10$rIxM4lSolJ6tGXTfJ049Te1IMQcL2CFB.cV5eDJoCDlE2SR6XxpPm');
/*!40000 ALTER TABLE `login_credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `office`
--

DROP TABLE IF EXISTS `office`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `office` (
  `office_id` varchar(10) NOT NULL,
  `office_name` varchar(255) NOT NULL,
  `college_id` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`office_id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `office_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college` (`college_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
INSERT INTO `office` VALUES ('1','Office of head of depertment of computer science and engneering','1'),('2','Office of principle COICT ','1');
/*!40000 ALTER TABLE `office` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roles_id` varchar(1) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`roles_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('1','student'),('2','secretary'),('3','staff');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_position`
--

DROP TABLE IF EXISTS `user_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_position` (
  `position_id` varchar(10) NOT NULL,
  `position_name` varchar(255) NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_position`
--

LOCK TABLES `user_position` WRITE;
/*!40000 ALTER TABLE `user_position` DISABLE KEYS */;
INSERT INTO `user_position` VALUES ('1','Student'),('2','Secretary department of computer engneering and IT'),('3','Head of department of computer engneering and IT'),('4','Principle COICT'),('5','dvc');
/*!40000 ALTER TABLE `user_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `registration_number` varchar(15) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `middle_name` varchar(20) NOT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `year_of_study` int NOT NULL,
  `user_id` varchar(15) DEFAULT NULL,
  `course_id` varchar(10) DEFAULT NULL,
  `position_id` varchar(2) DEFAULT NULL,
  `role_id` varchar(1) DEFAULT NULL,
  `office_id` int NOT NULL,
  `successor_position` int NOT NULL,
  PRIMARY KEY (`registration_number`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  KEY `position_id` (`position_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `login_credentials` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_profile_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_profile_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `user_position` (`position_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_profile_ibfk_4` FOREIGN KEY (`role_id`) REFERENCES `roles` (`roles_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES ('10','Kibaka','musa','Kibaka',2018,'10','1','1','1',0,0),('100','Ian','ian','Ian',2,'100','1','1','1',1,2),('20','hawaa','idrissa','hawaa',2,NULL,NULL,NULL,NULL,0,0),('30','musa','sudi','musa',2912,'30',NULL,'2','2',0,0),('300','chiku','bakari','chiku',0,'300',NULL,'2','2',1,3),('40','vicent','wilson','vicent',2021,'40',NULL,'3','3',0,0),('400','Musa','Sudi','Musa',0,'400',NULL,'3','3',1,4),('500','saidi','ramadan','saidi',0,'500',NULL,'4','3',2,5);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-03 12:02:35
