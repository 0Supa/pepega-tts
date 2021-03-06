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
INSERT INTO `languages` VALUES (1,'af','Afrikaans','πΏπ¦'),(2,'hy','Armenian','π¦π²'),(3,'id','Indonesian','π?π©'),(4,'bn','Bengali','π§π©'),(5,'ca','Catalan','π΄σ ₯σ ³σ £σ ΄σ Ώ'),(6,'cs','Czech','π¨πΏ'),(7,'da','Danish','π©π°'),(8,'de','German','π©πͺ'),(9,'en','English','πΊπΈ'),(10,'es','Spanish','πͺπΈ'),(11,'fil','Filipino','π΅π­'),(12,'fr','French','π«π·'),(13,'hr','Croatian','π­π·'),(14,'is','Icelandic','π?πΈ'),(15,'it','Italian','π?πΉ'),(16,'jv','Javanese','π?π©'),(17,'km','Khmer','π°π­'),(18,'lv','Latvian','π±π»'),(19,'hu','Hungarian','π­πΊ'),(20,'ml','Malayalam','π?π³'),(21,'mr','Marathi','π?π³'),(22,'nl','Dutch','π³π±'),(23,'ne','Nepali','π³π΅'),(24,'nb','Norwegian','π³π΄'),(25,'pl','Polish','π΅π±'),(26,'pt','Portuguese','π΅πΉ'),(27,'ro','Romanian','π·π΄'),(28,'si','Sinhala','π±π°'),(29,'sk','Slovak','πΈπ°'),(30,'su','Sundanese','π?π©'),(31,'sw','Swahili','π°πͺ'),(32,'fi','Finnish','π«π?'),(33,'sv','Swedish','πΈπͺ'),(34,'ta','Tamil','π?π³'),(35,'te','Telugu','π?π³'),(36,'vi','Vietnamese','π»π³'),(37,'tr','Turkish','πΉπ·'),(38,'el','Greek','π¬π·'),(39,'ru','Russian','π·πΊ'),(40,'sr','Serbian','π·πΈ'),(41,'uk','Ukranian','πΊπ¦'),(42,'ar','Arabic','π¦πͺ'),(43,'hi','Hindi','π?π³'),(44,'th','Thai','πΉπ­'),(45,'ko','Korean','π°π·'),(46,'cmn','Chinese','π¨π³'),(47,'ja','Japanese','π―π΅');
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
INSERT INTO `voices` VALUES (1,'Arabic','Zeina','π¦πͺ'),(2,'Chinese','Zhiyu','π¨π³'),(3,'Danish','Naja','π©π°'),(4,'Danish','Mads','π©π°'),(5,'Dutch','Lotte','π³π±'),(6,'Dutch','Ruben','π³π±'),(7,'English (Australian)','Nicole','π¦πΊ'),(8,'English (Australian)','Olivia','π¦πΊ'),(9,'English (Australian)','Russell','π¦πΊ'),(10,'English (British)','Amy','π¬π§'),(11,'English (British)','Emma','π¬π§'),(12,'English (British)','Brian','π¬π§'),(13,'English (Indian)','Aditi','π?π³'),(14,'English (Indian)','Raveena','π?π³'),(15,'English (US)','Ivy','πΊπΈ'),(16,'English (US)','Joanna','πΊπΈ'),(17,'English (US)','Kendra','πΊπΈ'),(18,'English (US)','Kimberly','πΊπΈ'),(19,'English (US)','Salli','πΊπΈ'),(20,'English (US)','Joey','πΊπΈ'),(21,'English (US)','Justin','πΊπΈ'),(22,'English (US)','Kevin','πΊπΈ'),(23,'English (US)','Matthew','πΊπΈ'),(24,'English (Welsh)','Geraint','π΄σ §σ ’σ ·σ ¬σ ³σ Ώ'),(25,'French','Celine','π«π·'),(26,'French','Lea','π«π·'),(27,'French','Mathieu','π«π·'),(28,'French (Canadian)','Chantal','π«π·'),(29,'German','Marlene','π©πͺ'),(30,'German','Vicki','π©πͺ'),(31,'German','Hans','π©πͺ'),(32,'Hindi','Aditi','π?π³'),(33,'Icelandic','Dora','π?πΈ'),(34,'Icelandic','Karl','π?πΈ'),(35,'Italian','Carla','π?πΉ'),(36,'Italian','Bianca','π?πΉ'),(37,'Italian','Giorgio','π?πΉ'),(38,'Japanese','Mizuki','π―π΅'),(39,'Japanese','Takumi','π―π΅'),(40,'Korean','Seoyeon','π°π·'),(41,'Norwegian','Liv','π³π΄'),(42,'Polish','Ewa','π΅π±'),(43,'Polish','Maja','π΅π±'),(44,'Polish','Jacek','π΅π±'),(45,'Polish','Jan','π΅π±'),(46,'Portuguese (Brazilian)','Camila','π§π·'),(47,'Portuguese (Brazilian)','Vitoria','π§π·'),(48,'Portuguese (Brazilian)','Ricardo','π§π·'),(49,'Portuguese (European)','Ines','π΅πΉ'),(50,'Portuguese (European)','Cristiano','π΅πΉ'),(51,'Romanian','Carmen','π·π΄'),(52,'Russian','Tatyana','π·πΊ'),(53,'Russian','Maxim','π·πΊ'),(54,'Spanish (European)','Conchita','πͺπΈ'),(55,'Spanish (European)','Lucia','πͺπΈ'),(56,'Spanish (European)','Enrique','πͺπΈ'),(57,'Spanish (Mexican)','Mia','π²π½'),(58,'US Spanish','Lupe','πΊπΈ'),(59,'US Spanish','Penelope','πΊπΈ'),(60,'US Spanish','Miguel','πΊπΈ'),(61,'Swedish','Astrid','πΈπͺ'),(62,'Turkish','Filiz','πΉπ·'),(63,'Welsh','Gwyneth','π¨πΎ');
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
