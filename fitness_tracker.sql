-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2024 at 03:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fitness_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` bigint(20) NOT NULL,
  `template_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `template_name`) VALUES
(1, 'Full Body Workout'),
(5, 'Push Day'),
(6, 'Pull Day'),
(7, 'Pushups Day'),
(8, 'abc'),
(10, 'LegLegLeg Day'),
(11, 'Pulling Day');

-- --------------------------------------------------------

--
-- Table structure for table `workouts`
--

CREATE TABLE `workouts` (
  `id` bigint(20) NOT NULL,
  `workout_name` varchar(255) NOT NULL,
  `workout_reps` varchar(255) DEFAULT NULL,
  `workout_sets` varchar(255) DEFAULT NULL,
  `workout_weight` decimal(10,2) DEFAULT NULL,
  `workout_weight_type` varchar(50) DEFAULT NULL,
  `template_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workouts`
--

INSERT INTO `workouts` (`id`, `workout_name`, `workout_reps`, `workout_sets`, `workout_weight`, `workout_weight_type`, `template_id`) VALUES
(5, 'Pushups', '12', '4', 140.00, 'lbs', 1),
(6, 'Bench Press', '15', '3', 200.00, 'lbs', 5),
(7, 'Weighted Pullups', '8', '3', 20.00, 'lbs', 6),
(10, 'Pushups', '9999', '99', 99999.00, 'lbs', 7),
(11, 'aaa', '31', '4', 15.00, 'lbs', 8),
(14, 'Leg Press', '33', '3', 3333.00, 'lbs', 10),
(15, 'Push', '4', '3', 5.00, 'lbs', 10),
(16, 'Seated Rows', '15', '3', 60.00, 'lbs', 11),
(17, 'Bicep Curls', '15', '3', 40.00, 'kg', 11);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workouts`
--
ALTER TABLE `workouts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_template_id` (`template_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `workouts`
--
ALTER TABLE `workouts`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `workouts`
--
ALTER TABLE `workouts`
  ADD CONSTRAINT `fk_template_id` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
