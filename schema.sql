-- MySQL dump 10.17  Distrib 10.3.25-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: pepega_tts
-- ------------------------------------------------------
-- Server version	10.3.25-MariaDB-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `guilds`
--

DROP TABLE IF EXISTS `guilds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guilds` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `guild_id` varchar(255) NOT NULL,
  `voice` varchar(255) NOT NULL DEFAULT 'Brian',
  `lang` varchar(50) NOT NULL DEFAULT 'en',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `language` varchar(200) NOT NULL,
  `flag` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'af','Afrikaans','🇿🇦'),(2,'hy','Armenian','🇦🇲'),(3,'id','Indonesian','🇮🇩'),(4,'bn','Bengali','🇧🇩'),(5,'ca','Catalan','🏴󠁥󠁳󠁣󠁴󠁿'),(6,'cs','Czech','🇨🇿'),(7,'da','Danish','🇩🇰'),(8,'de','German','🇩🇪'),(9,'en','English','🇺🇸'),(10,'es','Spanish','🇪🇸'),(11,'fil','Filipino','🇵🇭'),(12,'fr','French','🇫🇷'),(13,'hr','Croatian','🇭🇷'),(14,'is','Icelandic','🇮🇸'),(15,'it','Italian','🇮🇹'),(16,'jv','Javanese','🇮🇩'),(17,'km','Khmer','🇰🇭'),(18,'lv','Latvian','🇱🇻'),(19,'hu','Hungarian','🇭🇺'),(20,'ml','Malayalam','🇮🇳'),(21,'mr','Marathi','🇮🇳'),(22,'nl','Dutch','🇳🇱'),(23,'ne','Nepali','🇳🇵'),(24,'nb','Norwegian','🇳🇴'),(25,'pl','Polish','🇵🇱'),(26,'pt','Portuguese','🇵🇹'),(27,'ro','Romanian','🇷🇴'),(28,'si','Sinhala','🇱🇰'),(29,'sk','Slovak','🇸🇰'),(30,'su','Sundanese','🇮🇩'),(31,'sw','Swahili','🇰🇪'),(32,'fi','Finnish','🇫🇮'),(33,'sv','Swedish','🇸🇪'),(34,'ta','Tamil','🇮🇳'),(35,'te','Telugu','🇮🇳'),(36,'vi','Vietnamese','🇻🇳'),(37,'tr','Turkish','🇹🇷'),(38,'el','Greek','🇬🇷'),(39,'ru','Russian','🇷🇺'),(40,'sr','Serbian','🇷🇸'),(41,'uk','Ukranian','🇺🇦'),(42,'ar','Arabic','🇦🇪'),(43,'hi','Hindi','🇮🇳'),(44,'th','Thai','🇹🇭'),(45,'ko','Korean','🇰🇷'),(46,'cmn','Chinese','🇨🇳'),(47,'ja','Japanese','🇯🇵');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voices`
--

DROP TABLE IF EXISTS `voices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `voices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `language` varchar(200) NOT NULL,
  `voice` varchar(200) NOT NULL,
  `flag` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voices`
--

LOCK TABLES `voices` WRITE;
/*!40000 ALTER TABLE `voices` DISABLE KEYS */;
INSERT INTO `voices` VALUES (1,'Arabic','Zeina','🇦🇪'),(2,'Chinese','Zhiyu','🇨🇳'),(3,'Danish','Naja','🇩🇰'),(4,'Danish','Mads','🇩🇰'),(5,'Dutch','Lotte','🇳🇱'),(6,'Dutch','Ruben','🇳🇱'),(7,'English (Australian)','Nicole','🇦🇺'),(8,'English (Australian)','Olivia','🇦🇺'),(9,'English (Australian)','Russell','🇦🇺'),(10,'English (British)','Amy','🇬🇧'),(11,'English (British)','Emma','🇬🇧'),(12,'English (British)','Brian','🇬🇧'),(13,'English (Indian)','Aditi','🇮🇳'),(14,'English (Indian)','Raveena','🇮🇳'),(15,'English (US)','Ivy','🇺🇸'),(16,'English (US)','Joanna','🇺🇸'),(17,'English (US)','Kendra','🇺🇸'),(18,'English (US)','Kimberly','🇺🇸'),(19,'English (US)','Salli','🇺🇸'),(20,'English (US)','Joey','🇺🇸'),(21,'English (US)','Justin','🇺🇸'),(22,'English (US)','Kevin','🇺🇸'),(23,'English (US)','Matthew','🇺🇸'),(24,'English (Welsh)','Geraint','🏴󠁧󠁢󠁷󠁬󠁳󠁿'),(25,'French','Celine','🇫🇷'),(26,'French','Lea','🇫🇷'),(27,'French','Mathieu','🇫🇷'),(28,'French (Canadian)','Chantal','🇫🇷'),(29,'German','Marlene','🇩🇪'),(30,'German','Vicki','🇩🇪'),(31,'German','Hans','🇩🇪'),(32,'Hindi','Aditi','🇮🇳'),(33,'Icelandic','Dora','🇮🇸'),(34,'Icelandic','Karl','🇮🇸'),(35,'Italian','Carla','🇮🇹'),(36,'Italian','Bianca','🇮🇹'),(37,'Italian','Giorgio','🇮🇹'),(38,'Japanese','Mizuki','🇯🇵'),(39,'Japanese','Takumi','🇯🇵'),(40,'Korean','Seoyeon','🇰🇷'),(41,'Norwegian','Liv','🇳🇴'),(42,'Polish','Ewa','🇵🇱'),(43,'Polish','Maja','🇵🇱'),(44,'Polish','Jacek','🇵🇱'),(45,'Polish','Jan','🇵🇱'),(46,'Portuguese (Brazilian)','Camila','🇧🇷'),(47,'Portuguese (Brazilian)','Vitoria','🇧🇷'),(48,'Portuguese (Brazilian)','Ricardo','🇧🇷'),(49,'Portuguese (European)','Ines','🇵🇹'),(50,'Portuguese (European)','Cristiano','🇵🇹'),(51,'Romanian','Carmen','🇷🇴'),(52,'Russian','Tatyana','🇷🇺'),(53,'Russian','Maxim','🇷🇺'),(54,'Spanish (European)','Conchita','🇪🇸'),(55,'Spanish (European)','Lucia','🇪🇸'),(56,'Spanish (European)','Enrique','🇪🇸'),(57,'Spanish (Mexican)','Mia','🇲🇽'),(58,'US Spanish','Lupe','🇺🇸'),(59,'US Spanish','Penelope','🇺🇸'),(60,'US Spanish','Miguel','🇺🇸'),(61,'Swedish','Astrid','🇸🇪'),(62,'Turkish','Filiz','🇹🇷'),(63,'Welsh','Gwyneth','🇨🇾');
/*!40000 ALTER TABLE `voices` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-06 19:34:56
