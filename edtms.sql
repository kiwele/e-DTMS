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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `college`
--

LOCK TABLES `college` WRITE;
/*!40000 ALTER TABLE `college` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document` (
  `document_id` varchar(10) NOT NULL,
  `date_created` datetime NOT NULL,
  `document_destination` varchar(255) NOT NULL,
  `type_id` varchar(2) DEFAULT NULL,
  `status_id` varchar(1) DEFAULT NULL,
  `feedback_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `type_id` (`type_id`),
  KEY `status_id` (`status_id`),
  KEY `feedback_id` (`feedback_id`),
  CONSTRAINT `document_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `document_type` (`type_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `document_status` (`status_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_ibfk_3` FOREIGN KEY (`feedback_id`) REFERENCES `feedback` (`feedback_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document`
--

LOCK TABLES `document` WRITE;
/*!40000 ALTER TABLE `document` DISABLE KEYS */;
/*!40000 ALTER TABLE `document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_movement`
--

DROP TABLE IF EXISTS `document_movement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document_movement` (
  `movement_id` varchar(10) NOT NULL,
  `date_received` datetime NOT NULL,
  `date_dispatched` datetime NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `document_destination` varchar(255) NOT NULL,
  `user_id` varchar(15) DEFAULT NULL,
  `office_id` varchar(10) DEFAULT NULL,
  `document_id` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`movement_id`),
  KEY `user_id` (`user_id`),
  KEY `office_id` (`office_id`),
  KEY `document_id` (`document_id`),
  CONSTRAINT `document_movement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_movement_ibfk_2` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `document_movement_ibfk_3` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_movement`
--

LOCK TABLES `document_movement` WRITE;
/*!40000 ALTER TABLE `document_movement` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_status`
--

LOCK TABLES `document_status` WRITE;
/*!40000 ALTER TABLE `document_status` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_type`
--

LOCK TABLES `document_type` WRITE;
/*!40000 ALTER TABLE `document_type` DISABLE KEYS */;
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
  `date_created` datetime NOT NULL,
  `feedback_destionation` varchar(255) NOT NULL,
  PRIMARY KEY (`feedback_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_credentials`
--

LOCK TABLES `login_credentials` WRITE;
/*!40000 ALTER TABLE `login_credentials` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `office`
--

LOCK TABLES `office` WRITE;
/*!40000 ALTER TABLE `office` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_position`
--

LOCK TABLES `user_position` WRITE;
/*!40000 ALTER TABLE `user_position` DISABLE KEYS */;
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
  PRIMARY KEY (`registration_number`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  KEY `position_id` (`position_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `login_credentials` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_profile_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_profile_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `user_position` (`position_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_profile_ibfk_4` FOREIGN KEY (`role_id`) REFERENCES `roles` (`roles_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
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

-- Dump completed on 2021-05-04 12:06:36
