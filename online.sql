-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 19, 2022 at 03:48 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online`
--

-- --------------------------------------------------------

--
-- Table structure for table `college`
--

CREATE TABLE `college` (
  `college_id` varchar(2) NOT NULL,
  `college_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `college`
--

INSERT INTO `college` (`college_id`, `college_name`) VALUES
('1', 'COICT'),
('2', 'COET');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(10) NOT NULL,
  `course_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `document_id` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL,
  `document_destination` varchar(255) NOT NULL,
  `type_id` varchar(2) DEFAULT NULL,
  `status_id` varchar(1) DEFAULT NULL,
  `feedback_id` varchar(10) DEFAULT NULL,
  `support1` varchar(100) DEFAULT NULL,
  `support2` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`document_id`, `date_created`, `document_destination`, `type_id`, `status_id`, `feedback_id`, `support1`, `support2`) VALUES
('file-16484', '2022-03-28 09:29:41', '', '1', '0', NULL, 'file-1648448981308.pdf', 'file-1648448981360.pdf'),
('file-1648497666798.pdf', '2022-03-28 23:01:06', '', '3', '0', NULL, 'file-1648497666806.pdf', 'file-1648497666875.pdf'),
('file-1648497861151.pdf', '2022-03-28 23:04:21', '', '3', '0', NULL, 'file-1648497861176.pdf', 'file-1648497861233.pdf'),
('file-1650178116266.pdf', '2022-04-17 09:48:36', '', '1', '0', NULL, 'file-1650178116449.pdf', 'file-1650178116500.pdf'),
('file-1650178371793.pdf', '2022-04-17 09:52:51', '', '1', '0', NULL, 'file-1650178371802.pdf', 'file-1650178371886.pdf'),
('file-1650178537524.pdf', '2022-04-17 09:55:37', '', '1', '0', NULL, 'file-1650178537531.pdf', 'file-1650178537642.pdf'),
('file-1650178640887.pdf', '2022-04-17 09:57:21', '', '3', '0', NULL, 'file-1650178640902.pdf', 'file-1650178640962.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `document_movement`
--

CREATE TABLE `document_movement` (
  `movement_id` int(10) NOT NULL,
  `date_received` datetime NOT NULL,
  `date_dispatched` datetime NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `document_destination` varchar(255) NOT NULL,
  `user_id` varchar(15) DEFAULT NULL,
  `office_id` varchar(10) DEFAULT NULL,
  `document_id` varchar(100) DEFAULT NULL,
  `read_status` int(10) DEFAULT 0,
  `responded_to` varchar(100) NOT NULL,
  `resp_ofc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document_movement`
--

INSERT INTO `document_movement` (`movement_id`, `date_received`, `date_dispatched`, `comments`, `document_destination`, `user_id`, `office_id`, `document_id`, `read_status`, `responded_to`, `resp_ofc`) VALUES
(1, '2022-04-17 09:55:37', '2022-04-17 09:55:37', '', '200', '100', '1', 'file-1650178537524.pdf', 1, '', ''),
(2, '2022-04-17 09:57:21', '2022-04-17 09:57:21', '', '200', '100', '1', 'file-1650178640887.pdf', 0, '', ''),
(3, '2022-04-19 14:29:36', '2022-04-19 14:29:36', 'weka cheti bro', '100', '200', '1', 'file-1650178537524.pdf', 1, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `document_status`
--

CREATE TABLE `document_status` (
  `status_id` varchar(1) NOT NULL,
  `status_name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document_status`
--

INSERT INTO `document_status` (`status_id`, `status_name`) VALUES
('0', 'in process'),
('1', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `document_type`
--

CREATE TABLE `document_type` (
  `type_id` varchar(2) NOT NULL,
  `type_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `document_type`
--

INSERT INTO `document_type` (`type_id`, `type_name`) VALUES
('1', 'postpone studies'),
('2', 'resume studies'),
('3', 'special test'),
('4', 'special examination');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_id` varchar(10) NOT NULL,
  `date_created` datetime NOT NULL,
  `feedback_destionation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login_credentials`
--

CREATE TABLE `login_credentials` (
  `user_id` varchar(10) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login_credentials`
--

INSERT INTO `login_credentials` (`user_id`, `password`) VALUES
('100', '$2a$10$iReTH8mM32IwGpiP5/2qOe5/sHzj.fFUIaCbifG1y9w/MnvYWWU1K'),
('200', '$2a$10$5pGd6zwQwbCmHEZmuR6SXuPr.MY6B3OZ2mz4R8j9NyYG59c8gmjD.'),
('400', '$2a$10$un/l.0mBZ87Esu3IPj3LG.1acvITxF0wft5OyAw87HgsVCT9W15Zi');

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `office_id` varchar(10) NOT NULL,
  `office_name` varchar(255) NOT NULL,
  `college_id` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`office_id`, `office_name`, `college_id`) VALUES
('1', 'Office of HOD in Computer science and Engineering', '1'),
('2', 'Office of Principle COICT', '2');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roles_id` varchar(1) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roles_id`, `role_name`) VALUES
('1', 'student'),
('2', 'secretary'),
('3', 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `user_position`
--

CREATE TABLE `user_position` (
  `position_id` varchar(10) NOT NULL,
  `position_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_position`
--

INSERT INTO `user_position` (`position_id`, `position_name`) VALUES
('1', 'student'),
('2', 'secretary department of computer science and engineering'),
('3', 'Head of department of computer science and engineering'),
('4', 'Principle COICT');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `registration_number` varchar(15) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `middle_name` varchar(20) NOT NULL,
  `last_name` varchar(20) DEFAULT NULL,
  `year_of_study` int(11) NOT NULL,
  `user_id` varchar(15) DEFAULT NULL,
  `course_id` varchar(10) DEFAULT NULL,
  `office_id` varchar(50) NOT NULL,
  `position_id` varchar(2) DEFAULT NULL,
  `role_id` varchar(1) DEFAULT NULL,
  `successor_position` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`registration_number`, `first_name`, `middle_name`, `last_name`, `year_of_study`, `user_id`, `course_id`, `office_id`, `position_id`, `role_id`, `successor_position`) VALUES
('100', 'musa', 'sudi', 'musa', 2, '100', NULL, '1', '1', '1', 2),
('200', 'juma', 'hassan', 'juma', 0, '200', NULL, '1', '2', '2', 3),
('400', 'musa', 'hassan', 'musa', 0, '400', NULL, '2', '3', '3', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `college`
--
ALTER TABLE `college`
  ADD PRIMARY KEY (`college_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `feedback_id` (`feedback_id`);

--
-- Indexes for table `document_movement`
--
ALTER TABLE `document_movement`
  ADD PRIMARY KEY (`movement_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `office_id` (`office_id`),
  ADD KEY `document_id` (`document_id`);

--
-- Indexes for table `document_status`
--
ALTER TABLE `document_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `document_type`
--
ALTER TABLE `document_type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- Indexes for table `login_credentials`
--
ALTER TABLE `login_credentials`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`office_id`),
  ADD KEY `college_id` (`college_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roles_id`);

--
-- Indexes for table `user_position`
--
ALTER TABLE `user_position`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`registration_number`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `position_id` (`position_id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `document_movement`
--
ALTER TABLE `document_movement`
  MODIFY `movement_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `document_type` (`type_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `document_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `document_status` (`status_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `document_ibfk_3` FOREIGN KEY (`feedback_id`) REFERENCES `feedback` (`feedback_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `document_movement`
--
ALTER TABLE `document_movement`
  ADD CONSTRAINT `document_movement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `document_movement_ibfk_2` FOREIGN KEY (`office_id`) REFERENCES `office` (`office_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `document_movement_ibfk_3` FOREIGN KEY (`document_id`) REFERENCES `document` (`document_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `office`
--
ALTER TABLE `office`
  ADD CONSTRAINT `office_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `college` (`college_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `login_credentials` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `user_profile_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `user_profile_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `user_position` (`position_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `user_profile_ibfk_4` FOREIGN KEY (`role_id`) REFERENCES `roles` (`roles_id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
