CREATE DATABASE  IF NOT EXISTS `esercizio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `esercizio`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: esercizio
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `subtotal` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,NULL),(2,1,2,1,NULL),(3,1,3,1,NULL),(4,2,1,1,NULL),(5,2,2,1,NULL),(6,2,3,1,NULL),(7,3,5,5,NULL),(8,4,3,3,NULL),(9,5,1,2,NULL),(10,6,5,2,NULL),(11,7,2,2,NULL),(12,8,4,1,NULL),(13,8,5,1,NULL),(14,9,2,2,NULL),(15,10,2,2,NULL),(16,11,1,2,NULL),(17,12,5,1,NULL),(18,13,2,2,NULL),(19,14,2,2,NULL),(20,15,2,2,NULL),(21,16,4,2,NULL),(22,17,5,1,NULL),(23,18,4,1,NULL),(24,19,4,1,NULL),(25,20,4,1,NULL),(26,21,2,2,NULL),(27,22,1,1,NULL),(28,23,1,1,NULL),(29,24,1,1,NULL),(30,25,1,3,NULL),(31,26,1,3,NULL),(32,27,1,3,NULL),(33,28,2,3,NULL),(34,29,1,4,NULL),(35,30,2,1,NULL),(36,31,2,1,NULL),(37,31,3,1,NULL),(38,32,2,1,NULL),(39,32,3,1,NULL),(40,33,2,1,NULL),(41,33,4,1,NULL),(42,33,5,1,NULL),(43,34,2,1,NULL),(44,35,3,1,NULL),(45,36,5,1,NULL),(46,36,6,1,NULL),(47,37,3,1,NULL),(48,37,5,1,NULL),(49,38,2,2,NULL),(50,39,3,1,NULL),(51,40,4,1,NULL),(52,41,4,1,NULL),(53,42,5,4,NULL),(54,43,4,3,NULL),(55,44,5,1,NULL),(56,44,4,1,NULL),(57,45,5,1,NULL),(58,45,4,1,NULL),(59,46,4,2,NULL),(60,47,4,2,NULL),(61,48,4,2,NULL),(62,49,4,1,NULL),(63,50,4,1,NULL),(64,51,4,2,NULL),(65,52,4,1,NULL),(66,53,5,1,NULL),(67,54,4,1,NULL),(68,55,6,1,NULL),(69,56,6,1,NULL),(70,57,6,1,NULL),(71,58,4,1,NULL),(72,59,5,1,NULL),(73,60,4,1,NULL),(74,61,1,1,NULL),(75,62,1,1,NULL),(76,63,1,1,NULL),(77,64,1,1,NULL),(78,65,1,1,NULL),(79,66,1,1,NULL),(80,66,4,1,NULL),(81,67,4,1,NULL);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,239.88,'2025-04-23 15:49:21'),(2,239.88,'2025-04-23 15:50:53'),(3,197.5,'2025-04-23 15:53:13'),(4,449.7,'2025-04-23 15:53:21'),(5,119.98,'2025-04-23 16:06:28'),(6,79,'2025-04-23 16:16:46'),(7,59.98,'2025-04-23 16:17:22'),(8,118.5,'2025-04-23 16:17:33'),(9,59.98,'2025-04-23 16:23:00'),(10,59.98,'2025-04-23 16:23:06'),(11,119.98,'2025-04-23 16:23:11'),(12,39.5,'2025-04-23 16:26:59'),(13,59.98,'2025-04-23 16:27:11'),(14,59.98,'2025-04-23 16:28:07'),(15,59.98,'2025-04-23 16:28:28'),(16,158,'2025-04-23 16:29:07'),(17,39.5,'2025-04-23 16:29:15'),(18,79,'2025-04-23 16:29:22'),(19,79,'2025-04-23 16:29:33'),(20,79,'2025-04-23 16:29:39'),(21,59.98,'2025-04-23 16:31:19'),(22,59.99,'2025-04-23 16:31:28'),(23,59.99,'2025-04-24 09:44:42'),(24,59.99,'2025-04-24 09:54:07'),(25,179.97,'2025-04-24 09:54:18'),(26,179.97,'2025-04-24 09:57:48'),(27,179.97,'2025-04-24 12:18:08'),(28,89.97,'2025-04-24 12:46:02'),(29,239.96,'2025-04-24 12:47:17'),(30,29.99,'2025-04-24 12:47:47'),(31,179.89,'2025-04-24 15:36:29'),(32,179.89,'2025-04-24 15:36:42'),(33,148.49,'2025-04-24 15:43:59'),(34,29.99,'2025-04-24 15:44:03'),(35,149.9,'2025-04-24 15:44:28'),(36,129.49,'2025-04-24 16:03:45'),(37,189.4,'2025-04-24 16:03:55'),(38,59.98,'2025-04-24 16:23:53'),(39,149.9,'2025-04-24 16:30:43'),(40,79,'2025-04-24 16:31:51'),(41,79,'2025-04-24 16:32:18'),(42,158,'2025-04-24 16:35:00'),(43,237,'2025-04-24 16:35:04'),(44,118.5,'2025-04-24 16:37:22'),(45,118.5,'2025-04-24 16:37:33'),(46,158,'2025-04-24 16:37:39'),(47,158,'2025-04-24 16:37:45'),(48,158,'2025-04-24 16:43:19'),(49,79,'2025-04-24 16:44:04'),(50,79,'2025-04-24 16:44:22'),(51,158,'2025-04-24 16:46:32'),(52,79,'2025-04-24 16:47:23'),(53,39.5,'2025-04-24 16:49:33'),(54,79,'2025-04-24 16:55:04'),(55,89.99,'2025-04-24 16:56:45'),(56,89.99,'2025-04-24 16:56:49'),(57,89.99,'2025-04-24 17:10:59'),(58,79,'2025-04-25 10:33:11'),(59,39.5,'2025-04-25 12:36:30'),(60,79,'2025-04-25 13:11:02'),(61,59.99,'2025-04-25 13:14:34'),(62,59.99,'2025-04-25 13:14:52'),(63,59.99,'2025-04-25 13:15:24'),(64,59.99,'2025-04-25 13:16:46'),(65,59.99,'2025-04-25 13:16:52'),(66,138.99,'2025-04-25 13:17:02'),(67,79,'2025-04-25 13:23:16');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Gamepad PS4',59.99,19,'https://upload.wikimedia.org/wikipedia/commons/5/59/DualShock_4.jpg'),(2,'Tappetino Mouse XL',29.99,20,'https://m.media-amazon.com/images/I/81F4aeF1ViL._AC_UF1000,1000_QL80_.jpg'),(3,'Headset Gaming',149.90,10,'https://media.ldlc.com/r1600/ld/products/00/05/88/25/LD0005882576_1.jpg'),(4,'RAM 16GB (2x8)',79.00,1,'https://media.ldlc.com/r1600/ld/products/00/05/58/40/LD0005584046_2_0005767617.jpg'),(5,'Supporto monitor da muro',39.50,24,'https://m.media-amazon.com/images/I/61tY+4Q5poL._AC_UF1000,1000_QL80_.jpg'),(6,'Tastiera meccanica',89.99,29,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'esercizio'
--

--
-- Dumping routines for database 'esercizio'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-25 15:29:11
