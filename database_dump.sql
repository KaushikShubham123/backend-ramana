-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: database_dev1
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.22.04.1

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
-- Table structure for table `AttendanceTables`
--

DROP TABLE IF EXISTS `AttendanceTables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AttendanceTables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employeeId` int DEFAULT NULL,
  `inPhotoUrl` varchar(255) DEFAULT NULL,
  `inLongitude` varchar(1000) DEFAULT NULL,
  `inLatitude` varchar(1000) DEFAULT NULL,
  `factoryName` varchar(255) DEFAULT NULL,
  `inTime` datetime DEFAULT NULL,
  `outTime` datetime DEFAULT NULL,
  `outLongitude` varchar(1000) DEFAULT NULL,
  `outLatitude` varchar(1000) DEFAULT NULL,
  `outPhotoUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AttendanceTables`
--

LOCK TABLES `AttendanceTables` WRITE;
/*!40000 ALTER TABLE `AttendanceTables` DISABLE KEYS */;
INSERT INTO `AttendanceTables` VALUES (1,29,NULL,NULL,NULL,'Ramana','2024-11-23 06:20:29','2024-11-23 06:53:14','34312','12121','url54235l ','2024-11-23 11:50:29','2024-11-23 12:23:14'),(2,NULL,'url54235l ','34312','12121','Ramana','2024-11-23 07:01:30',NULL,NULL,NULL,NULL,'2024-11-23 12:31:30','2024-11-23 12:31:30'),(3,28,'url54235l ','34312','12121','Ramana','2024-11-23 07:02:09','2024-11-23 07:02:34','34312','12121','url54235l ','2024-11-23 12:32:09','2024-11-23 12:32:34'),(4,30,'url54235l ','34312','12121','Ramana','2024-11-23 07:08:17','2024-11-23 07:09:11','34232323312','1212661','Burl353re54235l ','2024-11-23 12:38:17','2024-11-23 12:39:11'),(5,31,'Burl353re54235l ','34232323312','1212661','Ramana','2024-11-23 07:16:06','2024-11-23 07:16:27','34232323312','1212661','Burl353re54235l ','2024-11-23 12:46:06','2024-11-23 12:46:27'),(6,31,'Burl353re54235l ','34232323312','1212661','Ramana','2024-11-23 07:27:55','2024-11-23 07:28:09','34232323312','1212661','Burl353re54235l ','2024-11-23 12:57:55','2024-11-23 12:58:09'),(7,31,'Burl353re54235l ','34232323312','1212661','Ramana','2024-11-23 07:28:23','2024-11-23 07:28:59','34232323312','1212661','Burl353re54235l ','2024-11-23 12:58:23','2024-11-23 12:58:59');
/*!40000 ALTER TABLE `AttendanceTables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Otps`
--

DROP TABLE IF EXISTS `Otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Otps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `otp` varchar(255) DEFAULT NULL,
  `expiresAT` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Otps`
--

LOCK TABLES `Otps` WRITE;
/*!40000 ALTER TABLE `Otps` DISABLE KEYS */;
INSERT INTO `Otps` VALUES (25,'gurpreetsignhpctebtech20@gmail.com','9927','2024-11-18 13:38:53','2024-11-18 09:53:53','2024-11-18 09:53:53'),(26,'gurpreetsinghhpctebtech20@gmail.com','7792','2024-11-18 13:39:25','2024-11-18 09:54:25','2024-11-18 09:54:25'),(48,'rishamjassal19@gmail.com','5476','2024-11-20 08:19:24','2024-11-20 08:15:24','2024-11-20 08:15:24'),(50,'jassal9@gmail.com','8239','2024-11-20 08:26:48','2024-11-20 08:22:48','2024-11-20 08:22:48'),(51,'jassal@gmail.com','7625','2024-11-20 09:18:55','2024-11-20 09:14:55','2024-11-20 09:14:55'),(58,'jasal@gmail.com','3809','2024-11-20 10:37:33','2024-11-20 10:33:33','2024-11-20 10:33:33');
/*!40000 ALTER TABLE `Otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductCategories`
--

DROP TABLE IF EXISTS `ProductCategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductCategories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameOfcategory` varchar(255) DEFAULT NULL,
  `parentId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductCategories`
--

LOCK TABLES `ProductCategories` WRITE;
/*!40000 ALTER TABLE `ProductCategories` DISABLE KEYS */;
INSERT INTO `ProductCategories` VALUES (1,'Clothes',NULL,'2024-11-22 07:05:08','2024-11-22 07:05:08');
/*!40000 ALTER TABLE `ProductCategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProductTables`
--

DROP TABLE IF EXISTS `ProductTables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductTables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `salesman_id` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `productName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `stockAvailability` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductTables`
--

LOCK TABLES `ProductTables` WRITE;
/*!40000 ALTER TABLE `ProductTables` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProductTables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20241111163104-create-user.js'),('20241112211048-create-otp.js'),('20241113054040-create-otp.js'),('20241116093824-create-user.js'),('20241117052331-add-verified-default.js'),('20241118064503-add_column_to_user.js'),('20241119062033-create-user-profiles.js'),('20241119100402-add_column_to_table.js'),('20241119102936-add_new_column_to_usersprofile_table.js'),('20241119103755-create-user-profiles.js'),('20241119112752-rename-retailer-column.js'),('20241119120239-rename-retailer-column.js'),('20241120074005-create-vendor.js'),('20241120094110-add-unique-constraint-to-mobile.js'),('20241120180426-change-verndor-mobile-type.js'),('20241121053701-change-vendor-mobile-and-email-type.js'),('20241122045858-create-product-category.js'),('20241122050757-create-product-table.js'),('20241122113036-create-attendance-table.js'),('20241122114507-add-inLongitude-column.js'),('20241122123138-create-attendance-table.js'),('20241122123437-create-attendance-table.js'),('20241126065906-create-user-form.js'),('create-user.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserForms`
--

DROP TABLE IF EXISTS `UserForms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserForms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `itemCategory` enum('Furniture','Electronics','Machine','Textile','Others') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserForms`
--

LOCK TABLES `UserForms` WRITE;
/*!40000 ALTER TABLE `UserForms` DISABLE KEYS */;
INSERT INTO `UserForms` VALUES (2,'rohtin','2143443433433','kfdfrae2wweewa@gmail.com','I am Good','Machine','2024-11-26 09:05:05','2024-11-26 09:05:05'),(3,'rohtin','2143443433433','kfdfrae2wweewa@gmail.com','I am Good','Others','2024-11-26 09:05:17','2024-11-26 09:05:17'),(4,'rohtin','2143443433433','kfdfrae2wweewa@gmail.com','I am Good','Others','2024-11-26 09:15:32','2024-11-26 09:15:32'),(5,'rohtin','2143443433433','kfdfrae2wweewa@gmail.com','I am Good','Others','2024-11-26 10:40:13','2024-11-26 10:40:13');
/*!40000 ALTER TABLE `UserForms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Profiles`
--

DROP TABLE IF EXISTS `User_Profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `salesman_id` int DEFAULT NULL,
  `retailerName` varchar(255) DEFAULT NULL,
  `contactNo` varchar(255) DEFAULT NULL,
  `outletAddress` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `followUpDate` datetime DEFAULT NULL,
  `leadPhase` varchar(255) DEFAULT NULL,
  `newImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `User_Profiles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Profiles`
--

LOCK TABLES `User_Profiles` WRITE;
/*!40000 ALTER TABLE `User_Profiles` DISABLE KEYS */;
INSERT INTO `User_Profiles` VALUES (4,18,'Shiv Charan','9872813488','hn 3 nagr','221313','32432','2024-12-10 18:30:00','Cold-call ','url2113','2024-11-21 07:05:13','2024-11-21 07:05:13',NULL),(5,18,'Shiv Charan','9872813488','hn 3 nagr','221313','32432','2024-12-10 18:30:00','Cold-call ','url2113','2024-11-21 07:47:54','2024-11-21 07:47:54',NULL),(6,23,'Rishu','98138878544',' nagr','221313','32432','2024-12-10 18:30:00','call ','url2113','2024-11-21 09:04:07','2024-11-21 09:04:07',NULL),(7,26,'kaushiksharma0006@gmail.com','98323212','Ldh','342423','24242343','2023-11-24 00:00:00','Routine-call','URL23242','2024-11-21 12:29:41','2024-11-21 12:29:41',NULL),(8,29,'SHUBH','9832113212','Ldh','342423','24242343','2023-11-24 00:00:00','Routine-call','URL23242','2024-11-21 18:43:35','2024-11-21 18:43:35',NULL);
/*!40000 ALTER TABLE `User_Profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (28,'GurpreetSin','Singh','ka006@gmail.com','India','983213212','$2b$10$zhxOJ3976q9uE4NtZHT/i.Jc4W2GYC7zo7.5OKSkJqb0dLQ4CRis6','Ramana',0,'2024-11-21 18:36:30','2024-11-21 18:36:30'),(29,'GurpreetSin','Singh','ka@gmail.com','India','9832113212','$2b$10$ziu3TOhqZYE/fK5OdLKjdeEelynuSfeey89SUyEi4irghpGE.aXUm','Ramana',0,'2024-11-21 18:40:40','2024-11-21 18:40:40'),(30,'GurpreetSin','Singh','kaa@gmail.com','India','212','$2b$10$nl.8zgIJdyl2l4y/u1/46.w6buvrN9tLtCl3cc.nA6ddsnpZjw/Q2','Ramana',1,'2024-11-21 18:42:24','2024-11-21 18:43:08'),(31,'rohtin','Singh','kae2wweewa@gmail.com','India','21434433433','$2b$10$NFE.c1D/ojS7H4IFxsnEYekI2V./CN9kz6aXKQx9y7zE/JsB245y2','Ramana',1,'2024-11-23 12:42:35','2024-11-23 12:42:35'),(32,'rohtin','Singh','kfdfrae2wweewa@gmail.com','India','2143443433433','$2b$10$CJfS7NfNmNQA/anXE.kFo.QdEZzN8SCXJGaXCx8ToolsF1N7J6N52','Ramana',1,'2024-11-23 12:44:56','2024-11-23 12:44:56');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendors`
--

DROP TABLE IF EXISTS `Vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vendors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendors`
--

LOCK TABLES `Vendors` WRITE;
/*!40000 ALTER TABLE `Vendors` DISABLE KEYS */;
INSERT INTO `Vendors` VALUES (1,'GurpreetSin','Singh','Ldh','9832113212','ka@gmail.com','Ramana','2024-11-21 18:44:22','2024-11-21 18:44:22');
/*!40000 ALTER TABLE `Vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-27 11:29:08
