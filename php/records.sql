-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-12-2024 a las 00:22:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `records`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `nombre` varchar(200) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `nivel` float(3,1) NOT NULL,
  `tiempo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`nombre`, `apellidos`, `nivel`, `tiempo`) VALUES
('Miguel', 'Álvarez', 0.8, 0.244),
('Pepito', 'Grillo', 0.2, 0.182),
('dvfsdfd', 'vsdxfvsx', 0.8, 0.235),
('xvxvxv', 'vxdfv', 0.8, 0.258),
('hfhfh', 'tfdhsxtf', 0.8, 0.165),
('aesfsf', 'sefesfe', 0.5, 0.399),
('ujgjguyj', 'gyjgj', 0.5, 2.415),
('drgyedr', 'fthtfh', 0.5, 0.286),
('adfgsrgthytgjuykilk', 'ikjljuioluj', 0.8, 0.082),
('efsef', 'fesfs', 0.8, 0.303),
('jyukfjyf', 'fytjftjtjtjt', 0.8, 0.267),
('ujuyikuikouolñ', 'fghfghgkj', 0.5, 1.201),
('vhjgvhj', 'jknjkn', 0.5, 0.336),
('Miguel', 'Alvarez', 0.5, 0.181),
('Pepito', 'Grillo', 0.2, 0.356),
('Pepe', 'Grillo', 0.2, 0.317),
('Pepe', 'Grillo', 0.2, 0.317),
('Pepe', 'Pereira', 0.8, 0.296),
('Ramon', 'Suarez', 0.8, 0.154),
('kjjjjjjjjjjj', 'ikjoiojioj', 0.8, 0.306),
('sdfsdfg', 'hgjghj', 0.8, 0.279),
('´lñlk´kl´ñ', 'hjkhjkjhk', 0.8, 0.251),
('jhkhjkhj', 'hjkhjkjhk', 0.5, 0.467),
('Hola', 'Qtal', 0.8, 0.243),
('Gero', 'Geronimo', 0.5, 0.233),
('Buenas', 'Buenas', 0.2, 0.284),
('Buenas', 'Buenas', 0.2, 0.284),
('SISISI', 'sisisis', 0.2, 0.258),
('Prueba', 'Prueba', 0.2, 0.32),
('lkñlklk', 'ljkljk', 0.8, 0.327),
('lkñlklk', 'ljkljk', 0.8, 0.327),
('kljklj', 'okjoikj', 0.5, 0.284),
('Prueba', 'prueba', 0.8, 0.162),
('uyijkuyk', 'ujliiuliuj', 0.2, 0.356),
('uyijkuyk', 'ujliiuliuj', 0.2, 0.356),
('jklkñpñoñop', 'bhjkhbk', 0.5, 0.234),
('jklkñpñoñop', 'bhjkhbk', 0.5, 0.234),
('yuikyik', 'yuikyuik', 0.5, 0.355),
('fhgh', 'kugfsd', 0.5, 0.239),
('Juan', 'Carlos', 0.5, 0.485),
('Federico', 'Loco', 0.2, 0.285),
('yjhjjy', 'jyjjytyjyj', 0.5, 0.343),
('dgdgdrg', 'drgdrgdrg', 0.8, 0.399),
('hujkgyujgtj', 'yjygjgjyg', 0.8, 0.307),
('hujkgyujgtj', 'yjygjgjyg', 0.8, 0.307),
('dasd', 'sdas', 0.2, 0.325),
('dasd', 'sdas', 0.2, 0.325),
('dasd', 'sdas', 0.2, 0.325),
('dasd', 'sdas', 0.2, 0.325),
('sadsad', 'sadasd', 0.8, 0.276),
('sadsad', 'sadasd', 0.8, 0.276),
('hthtf', 'fthfhf', 0.8, 0.477),
('hthtf', 'fthfhf', 0.8, 0.477),
('adasd', 'sadadsad', 0.5, 0.239),
('gdgdfg', 'dfgdfgdf', 0.8, 0.37),
('gdgdfg', 'dfgdfgdf', 0.8, 0.37),
('fdgdfgdf', 'dfgdfgdf', 0.8, 0.234),
('fdgdfgdf', 'dfgdfgdf', 0.8, 0.234),
('dfdgdfgdf', 'oljlnhljhgl', 0.2, 0.345),
('kiuykhki', 'iujkliujlkghl', 0.5, 0.227),
('oljujoil', 'hgjghj', 0.2, 0.306),
('thfdhtf', 'fthtdfh', 0.8, 0.314),
('drgdgdr', 'drgdg', 0.8, 0.186),
('dsrgdg', 'yhjgjgujg', 0.2, 0.261),
('yhfgjh', 'uhgjuhgju', 0.8, 0.251),
('rdgdgdrg', 'dgdfgdgf', 0.5, 0.282),
('dtghfth', 'fhfth', 0.8, 0.222),
('dtghfth', 'fhfth', 0.8, 0.222),
('dtghfth', 'fhfth', 0.8, 0.222),
('uyjyjgj', 'gjhygj', 0.2, 0.272),
('sefsedf', 'fdgd', 0.5, 0.367),
('rgyjyki', 'luiolhfdhxfh', 0.2, 0.315),
('hdthfth', 'fthfhfsseses', 0.2, 0.316),
('sgdg', 'yhfdgxgfdsdgd', 0.8, 0.261),
('dgrdg', 'drgdgd', 0.5, 0.303),
('ythfhfh', 'dxgxgrdg', 0.2, 0.345);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
