-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 22 2024 г., 21:42
-- Версия сервера: 10.3.22-MariaDB
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `isabeldb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `accessory`
--

CREATE TABLE `accessory` (
  `article` int(11) NOT NULL,
  `title` tinytext COLLATE utf8mb4_unicode_ci NOT NULL,
  `media_id` int(11) UNSIGNED NOT NULL,
  `description` varchar(4000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `comment_block_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `accessory`
--

INSERT INTO `accessory` (`article`, `title`, `media_id`, `description`, `category_id`, `price`, `comment_block_id`) VALUES
(1, 'Ring \'Scarlet sunset\'', 1, 'This ring is made of black hornbeam wood and red jewelry epoxy resin with silver leaf on the chips.', 1, '24.99', NULL),
(2, 'Ring \'Blue Sky\'', 2, 'A ring crafted from white hornbeam wood and blue jewelry epoxy resin, emitting a faint glow in the dark.', 1, '23.79', NULL),
(3, 'Ring \'Endless Love\'', 3, 'The \'Endless Love\' ring crafted from black hornbeam and transparent jewelry resin, featuring an infinity symbol made of plexiglass that glows in the dark.', 1, '28.39', NULL),
(4, 'Ring \'Northern lights\'', 4, 'This ring is crafted from black hornbeam wood and features a mesmerizing blend of blue and green jewelry resin, glowing faintly in the dark.', 1, '24.89', NULL),
(5, 'Ring \'Ice\'', 5, 'This ring showcases a captivating light blue resin with silver leaf delicately embedded within.', 1, '19.43', NULL),
(6, 'Ring \'Forest spirit\'', 6, 'This captivating ring is crafted from bog oak wood and features a mesmerizing blend of transparent jewelry-grade epoxy resin, natural moss, and shimmering gold leaf.', 1, '25.56', NULL),
(7, 'Ring \'Norway Lights\'', 7, 'This captivating ring is crafted from walnut wood and features a mesmerizing blend of jewelry-grade epoxy resin in shades of blue and violet. Intricately carved mountain ranges within the wooden base, when combined with the swirling resin, create an enchanting illusion of the aurora borealis against a mountainous backdrop. The mountain peaks glow in the dark (the ring needs to be charged under a bright lamp or sunlight for 3-5 minutes).', 1, '25.56', NULL),
(8, 'Earrings \'Lotus\'', 8, 'The \'Lotus\' wooden earrings are crafted from black hornbeam and transparent epoxy resin, featuring a delicate natural dried flower encased within. The hypoallergenic stainless steel ear hooks ensure comfortable wear. These earrings glow faintly in the dark, adding an enchanting touch of mystery.', 2, '33.75', NULL),
(9, 'Earrings \'Norway Lights\'', 9, 'The \'Norway Lights\' wooden earrings are crafted from walnut wood and feature a mesmerizing blend of blue, pink, and purple epoxy resin. The hypoallergenic stainless steel ear hooks ensure comfortable wear. These earrings glow faintly in the dark, adding a touch of captivating luminescence.', 2, '31.70', NULL),
(10, 'Earrings \'Ancient patterns\'', 10, 'These captivating earrings are crafted from oak wood and feature a mesmerizing shade of blue epoxy resin. The hypoallergenic stainless steel ear hooks ensure comfortable wear.', 2, '31.70', NULL),
(11, 'Earrings \'Cornflower\'', 11, 'The \'Cornflower\' wooden earrings are crafted from black hornbeam and feature a delicate natural dried flower encased within transparent epoxy resin. The hypoallergenic stainless steel ear hooks ensure comfortable wear. These earrings glow faintly in the dark, adding a touch of captivating luminescence.', 2, '33.75', NULL),
(12, 'Earrings \'Black and white\'', 12, 'These captivating earrings are crafted from white hornbeam wood and feature a mesmerizing shade of black epoxy resin. The hypoallergenic stainless steel ear hooks ensure comfortable wear.', 2, '33.75', NULL),
(13, 'Earrings \'Avatar\'', 13, 'These captivating earrings are crafted from padauk wood and feature a mesmerizing shade of ocean blue epoxy resin. The hypoallergenic stainless steel ear hooks ensure comfortable wear.', 2, '31.70', NULL),
(14, 'Earrings \'Fern\'', 14, 'These captivating earrings are crafted from walnut wood and feature a delicate natural fern encased within transparent epoxy resin. The hypoallergenic stainless steel ear hooks ensure comfortable wear.', 2, '33.75', NULL),
(15, 'Pendant \'Blue sunset\'', 15, '\"Blue Sunset\" Pendant: A Symphony of Walnut Wood and Swirling Resin', 3, '32.06', NULL),
(16, 'Pendant \'Colibri\'', 16, 'The pendant is made of black hornbeam wood and transparent jewelry resin with natural dried flowers and moss inside. The color of the dried flowers can be changed.', 3, '38.65', NULL),
(17, 'Pendant \'My soul mate\'', 17, 'The pendant is made of black hornbeam wood and transparent and blue jewelry resin with white streaks, with whale figures inside. The whales are painted with acrylic paints.', 3, '38.65', NULL),
(18, 'Pendant \'Etna\'', 18, 'The pendant is made of black hornbeam wood and transparent jewelry resin with gray streaks.', 3, '42.82', NULL),
(19, 'Pendant \'White sun of the desert\'', 19, '\"White Sun of the Desert\" pendant is made of birch burl and epoxy resin in orange and transparent colors. The diameter of the pendant is 3.8 cm, the length of the cord is 50 cm.', 3, '34.47', NULL),
(20, 'Pendant \'Polar Night\'', 20, '\"Polar Night\" pendant by GreenWood is made of black hornbeam wood and blue-navy jewelry resin with green streaks. The diameter of the pendant is 3.8 cm, the length of the cord is 50 cm. Glows in the dark!', 3, '32.38', NULL),
(21, 'Pendant \'Black Bat\'', 21, '\"Black Bat\" pendant is made of black hornbeam wood and transparent jewelry resin with white streaks. Inside is a dense fog and the outline of bats - for fans of the Gothic style.', 3, '32.38', NULL),
(22, 'Bracelet \'Classic Pearl\'', 22, 'Adorned with a symphony of lustrous pearls, this elegant bracelet gracefully encircles the wrist, a testament to timeless beauty and understated refinement.', 4, '21.48', NULL),
(23, 'Bracelet \'Light and Night\'', 23, 'A harmonious blend of nature\'s finest artistry, this amethyst and pearl bracelet is an exquisite ode to elegance and natural beauty.', 4, '20.89', NULL),
(24, 'Bracelet \'Emerald\'', 24, 'A symphony of verdant allure, this emerald bracelet gracefully adorns the wrist, an embodiment of nature\'s exquisite artistry and timeless elegance.', 4, '21.76', NULL),
(25, 'Bracelet \'Quartz & Chlorite\'', 25, 'Emerging from the earth\'s embrace, this chlorite quartz bracelet adorns the wrist with an aura of tranquility and natural elegance.', 4, '21.35', NULL),
(26, 'Bracelet \'Flower of Eternity\'', 26, 'Adorned with a delicate flower motif, this pearl bracelet is a symphony of elegance and grace. Each lustrous pearl, meticulously selected for its flawless iridescence, glistens like a captured moonbeam.', 4, '18.21', NULL),
(27, 'Bracelet \'Moonless night\'', 27, 'Elegant beads, smooth as velvet, dance upon a strand of gleaming silver, their fiery facets catching the light, sparkling like a constellation', 4, '31.49', NULL),
(28, 'Bracelet \'Sapphire\'', 28, 'A captivating cascade of celestial hues, the Labradorite Gemstone Bracelet dances with an iridescent symphony of light and color that mirrors the cosmos within.', 4, '27.89', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `admin`
--

CREATE TABLE `admin` (
  `email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `admin`
--

INSERT INTO `admin` (`email`) VALUES
('isabel@gmail.com'),
('zerdax777@bk.ru');

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` tinytext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'ring'),
(2, 'earrings'),
(3, 'pendant'),
(4, 'bracelet');

-- --------------------------------------------------------

--
-- Структура таблицы `media`
--

CREATE TABLE `media` (
  `id` int(11) UNSIGNED NOT NULL,
  `URL` varchar(2500) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `media`
--

INSERT INTO `media` (`id`, `URL`) VALUES
(1, 'picture/ring1-1.jpg'),
(1, 'picture/ring1-2.jpg'),
(1, 'picture/ring1-3.jpg'),
(2, 'picture/ring2-1.jpg'),
(2, 'picture/ring2-2.jpg'),
(2, 'picture/ring2-3.jpg'),
(3, 'picture/ring3-1.jpg'),
(3, 'picture/ring3-2.jpg'),
(3, 'picture/ring3-3.jpg'),
(4, 'picture/ring4-1.jpg'),
(4, 'picture/ring4-2.jpg'),
(4, 'picture/ring4-3.jpg'),
(5, 'picture/ring5-1.jpg'),
(5, 'picture/ring5-2.jpg'),
(6, 'picture/ring6-1.jpg'),
(6, 'picture/ring6-2.jpg'),
(6, 'picture/ring6-3.jpg'),
(6, 'picture/ring6-4.jpg'),
(7, 'picture/ring7-1.jpg'),
(7, 'picture/ring7-2.jpg'),
(7, 'picture/ring7-3.jpg'),
(7, 'picture/ring7-4.jpg'),
(8, 'picture/earrings1-1.jpg'),
(8, 'picture/earrings1-2.jpg'),
(8, 'picture/earrings1-3.jpg'),
(9, 'picture/earrings2-1.jpg'),
(9, 'picture/earrings2-2.jpg'),
(9, 'picture/earrings2-3.jpg'),
(9, 'picture/earrings2-4.jpg'),
(10, 'picture/earrings3-1.jpg'),
(10, 'picture/earrings3-2.jpg'),
(10, 'picture/earrings3-3.jpg'),
(11, 'picture/earrings4-1.jpg'),
(11, 'picture/earrings4-2.jpg'),
(11, 'picture/earrings4-3.jpg'),
(11, 'picture/earrings4-4.jpg'),
(12, 'picture/earrings5-1.jpg'),
(12, 'picture/earrings5-2.jpg'),
(13, 'picture/earrings6-1.jpg'),
(13, 'picture/earrings6-2.jpg'),
(14, 'picture/earrings7-1.jpg'),
(14, 'picture/earrings7-2.jpg'),
(14, 'picture/earrings7-3.jpg'),
(15, 'picture/pendant1-1.jpg'),
(15, 'picture/pendant1-2.jpg'),
(15, 'picture/pendant1-3.jpg'),
(15, 'picture/pendant1-4.jpg'),
(16, 'picture/pendant2-1.jpg'),
(16, 'picture/pendant2-2.jpg'),
(17, 'picture/pendant3-1.jpg'),
(17, 'picture/pendant3-2.jpg'),
(17, 'picture/pendant3-3.jpg'),
(17, 'picture/pendant3-4.jpg'),
(18, 'picture/pendant4-1.jpg'),
(18, 'picture/pendant4-2.jpg'),
(18, 'picture/pendant4-3.jpg'),
(19, 'picture/pendant5-1.jpg'),
(19, 'picture/pendant5-2.jpg'),
(19, 'picture/pendant5-3.jpg'),
(20, 'picture/pendant6-1.jpg'),
(20, 'picture/pendant6-2.jpg'),
(20, 'picture/pendant6-3.jpg'),
(21, 'picture/pendant7-1.jpg'),
(21, 'picture/pendant7-2.jpg'),
(21, 'picture/pendant7-3.jpg'),
(21, 'picture/pendant7-4.jpg'),
(22, 'picture/bracelet1-1.jpg'),
(22, 'picture/bracelet1-2.jpg'),
(22, 'picture/bracelet1-3.jpg'),
(23, 'picture/bracelet2-1.jpg'),
(23, 'picture/bracelet2-2.jpg'),
(23, 'picture/bracelet2-3.jpg'),
(23, 'picture/bracelet2-4.jpg'),
(24, 'picture/bracelet3-1.jpg'),
(24, 'picture/bracelet3-2.jpg'),
(24, 'picture/bracelet3-3.jpg'),
(25, 'picture/bracelet4-1.jpg'),
(25, 'picture/bracelet4-2.jpg'),
(25, 'picture/bracelet4-3.jpg'),
(26, 'picture/bracelet5-1.jpg'),
(26, 'picture/bracelet5-2.jpg'),
(26, 'picture/bracelet5-3.jpg'),
(27, 'picture/bracelet6-1.jpg'),
(27, 'picture/bracelet6-2.jpg'),
(27, 'picture/bracelet6-3.jpg'),
(28, 'picture/bracelet7-1.jpg'),
(28, 'picture/bracelet7-2.jpg'),
(28, 'picture/bracelet7-3.jpg'),
(28, 'picture/bracelet7-4.jpg'),
(28, 'picture/bracelet7-5.jpg'),
(29, 'picture/earrings8-1.jpg'),
(29, 'picture/earrings8-2.jpg'),
(29, 'picture/earrings8-3.jpg'),
(29, 'picture/earrings8-4.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `number` int(11) NOT NULL,
  `user_email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accessory_id` int(11) NOT NULL,
  `count` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`number`, `user_email`, `accessory_id`, `count`) VALUES
(11, 'new@mail.ru', 14, 1),
(12, 'new@mail.ru', 4, 1),
(21, 'newuser@gmail.com', 9, 1),
(28, 'newmail@gmail.com', 11, 1),
(29, 'newuser@gmail.com', 29, 1),
(31, 'zerdax777@bk.ru', 21, 1),
(32, 'zerdax777@bk.ru', 13, 1),
(33, 'newuser@gmail.com', 2, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `email` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(14) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` tinytext COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`email`, `pass`, `surname`, `name`, `phone_number`, `address`) VALUES
('fffired@gmail.com', '12345678', 'Fired', 'Amaterasu', NULL, NULL),
('isabel@gmail.com', '12345678', 'Admin', 'Isabel', NULL, NULL),
('new@gmail.com', '12345678', 'Smith', 'Ollie', NULL, NULL),
('newuser@gmail.com', 'MyPass1234', 'Forger', 'Yor', '87654321', 'Chanba street, 15, Psyrtskha village, Gudauta municipality, Autonomous Republic of Abkhazia');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `accessory`
--
ALTER TABLE `accessory`
  ADD PRIMARY KEY (`article`),
  ADD UNIQUE KEY `article` (`article`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `media_id` (`media_id`);

--
-- Индексы таблицы `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `email_2` (`email`),
  ADD KEY `email_3` (`email`);

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `media`
--
ALTER TABLE `media`
  ADD KEY `id` (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`number`),
  ADD KEY `user_email` (`user_email`),
  ADD KEY `accessory_id` (`accessory_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone_number` (`phone_number`),
  ADD KEY `email_2` (`email`),
  ADD KEY `email_3` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `accessory`
--
ALTER TABLE `accessory`
  MODIFY `article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `number` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
