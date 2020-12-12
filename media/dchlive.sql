-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2020 at 09:01 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dchlive`
--

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `uname` varchar(50) NOT NULL,
  `uts` varchar(50) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT current_timestamp(),
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `uid`, `uname`, `uts`, `ts`, `name`) VALUES
(1, 1, 'udf', '0000-00-00 00:00:00', '2020-12-12 07:44:53', ''),
(2, 1, 'udf', '0000-00-00 00:00:00', '2020-12-12 07:46:33', ''),
(3, 1, 'udf', '0000-00-00 00:00:00', '2020-12-12 07:47:15', ''),
(4, 1, 'udf', '0000-00-00 00:00:00', '2020-12-12 07:50:06', ''),
(5, 1, 'udf', '0000-00-00 00:00:00', '2020-12-12 07:50:32', ''),
(6, 1, 'udf', '0000-00-00 00:00:00', '2020-12-12 07:51:44', ''),
(7, 1, 'udf', '1607759607429', '2020-12-12 07:53:27', ''),
(8, 1, 'udf', '12/12/2020', '2020-12-12 07:55:15', ''),
(9, 1, 'udf', '12/12/2020, 1:25:45 PM', '2020-12-12 07:55:45', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `device` varchar(50) NOT NULL,
  `os` varchar(50) NOT NULL,
  `browser` varchar(50) NOT NULL,
  `screen` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT 'U',
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `device`, `os`, `browser`, `screen`, `name`, `time`) VALUES
(1, 'PC', 'Windows-10', 'Chrome-87', '1366 x 768', 'U', '2020-12-12 07:25:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
