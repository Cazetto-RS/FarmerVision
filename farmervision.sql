-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 27, 2025 at 09:02 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `farmervision`
--

-- --------------------------------------------------------

--
-- Table structure for table `adocao`
--

CREATE TABLE `adocao` (
  `mac_placa` char(12) NOT NULL,
  `planta_usuario` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dados_sensor`
--

CREATE TABLE `dados_sensor` (
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `valores` json DEFAULT NULL,
  `mac_placa` char(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mac`
--

CREATE TABLE `mac` (
  `mac` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mac`
--

INSERT INTO `mac` (`mac`) VALUES
('A812FF9B31'),
('A812FF9B32'),
('A1GD3BD32PD'),
('A1B2C3D4E5'),
('5C013B884BA4');

-- --------------------------------------------------------

--
-- Table structure for table `plantas`
--

CREATE TABLE `plantas` (
  `id` int NOT NULL,
  `nome_comum` varchar(100) DEFAULT NULL,
  `nome_cientifico` varchar(150) DEFAULT NULL,
  `familia` varchar(100) DEFAULT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `descricao` text,
  `reino` varchar(50) DEFAULT NULL,
  `divisao` varchar(50) DEFAULT NULL,
  `classe` varchar(50) DEFAULT NULL,
  `luz` varchar(100) DEFAULT NULL,
  `solo` varchar(100) DEFAULT NULL,
  `agua` varchar(100) DEFAULT NULL,
  `temperatura_media` float DEFAULT NULL,
  `umidade_media` float DEFAULT NULL,
  `ph_solo_medio` float DEFAULT NULL,
  `usos` text,
  `partes_utilizadas` varchar(255) DEFAULT NULL,
  `toxicidade` varchar(100) DEFAULT NULL,
  `efeitos_toxicos` text,
  `imagem_principal` varchar(255) DEFAULT NULL,
  `clima` varchar(100) DEFAULT NULL,
  `altura_media_cm` float DEFAULT NULL,
  `tempo_de_cultivo_dias` int DEFAULT NULL,
  `floracao` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plantas`
--

INSERT INTO `plantas` (`id`, `nome_comum`, `nome_cientifico`, `familia`, `genero`, `descricao`, `reino`, `divisao`, `classe`, `luz`, `solo`, `agua`, `temperatura_media`, `umidade_media`, `ph_solo_medio`, `usos`, `partes_utilizadas`, `toxicidade`, `efeitos_toxicos`, `imagem_principal`, `clima`, `altura_media_cm`, `tempo_de_cultivo_dias`, `floracao`) VALUES
(1, 'Babosa', 'Aloe vera', 'Asphodelaceae', 'Aloe', 'Planta suculenta com folhas espessas, conhecida por suas propriedades cicatrizantes e hidratantes.', 'Plantae', 'Magnoliophyta', 'Liliopsida', 'Sol pleno', 'Bem drenado e arenoso', 'Pouca rega, solo seco entre irrigações', 22.5, 30, 6.75, 'Medicinal, cosmético, ornamental', 'Folhas', 'Levemente tóxica para animais', 'Vômitos e diarreia em cães e gatos', 'https://exemplo.com/imagens/aloe-vera.jpg', 'Tropical e subtropical', 60, 300, 'Primavera'),
(2, 'Hortelã', 'Mentha spicata', 'Lamiaceae', 'Mentha', 'Planta aromática muito utilizada em chás e na culinária, com propriedades digestivas.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Meia sombra', 'Úmido e fértil', 'Rega frequente', 17.5, 70, 6.75, 'Culinário, medicinal, aromático', 'Folhas', 'Não tóxica', 'Nenhum conhecido', 'https://exemplo.com/imagens/hortela.jpg', 'Temperado', 40, 135, 'Verão'),
(3, 'Lavanda', 'Lavandula angustifolia', 'Lamiaceae', 'Lavandula', 'Planta ornamental e aromática, muito usada em perfumaria e para relaxamento.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Sol pleno', 'Bem drenado', 'Pouca rega', 22.5, 40, 7, 'Ornamental, aromático, medicinal', 'Flores', 'Levemente tóxica para animais', 'Pode causar náuseas em animais', 'https://exemplo.com/imagens/lavanda.jpg', 'Mediterrâneo', 75, 540, 'Verão'),
(4, 'Manjericão', 'Ocimum basilicum', 'Lamiaceae', 'Ocimum', 'Erva aromática muito utilizada na culinária italiana e em pratos mediterrâneos.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Sol pleno', 'Fértil e bem drenado', 'Rega regular', 22.5, 60, 6.75, 'Culinário, medicinal', 'Folhas', 'Não tóxica', 'Nenhum conhecido', 'https://exemplo.com/imagens/manjericao.jpg', 'Tropical', 45, 120, 'Verão'),
(5, 'Suculenta', 'Echeveria elegans', 'Crassulaceae', 'Echeveria', 'Planta ornamental que armazena água em suas folhas, ideal para jardins de baixa manutenção.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Sol pleno', 'Bem drenado', 'Pouca rega', 20, 25, 6.75, 'Ornamental', 'Folhas', 'Não tóxica', 'Nenhum conhecido', 'https://exemplo.com/imagens/suculenta.jpg', 'Árido', 15, 270, 'Primavera');

-- --------------------------------------------------------

--
-- Table structure for table `sessoes`
--

CREATE TABLE `sessoes` (
  `usuario` int NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `validade` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sessoes`
--

INSERT INTO `sessoes` (`usuario`, `token`, `validade`) VALUES
(1, 'a6631eeafa23814d1e2b6cbce86e0b0c310c19d68ce98cbad0d1135feee0cab26e29c616ab13e1e9cb0e8a51dc1c1d070e1087302e9ae8322cbb56a7bdddb412', '2025-11-29 05:54:12');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `telefone`, `email`, `password`) VALUES
(1, 'Rafael Sandei Cazetto', '+55 15 98813-0769', 'rafasandei17@gmail.com', '$2b$10$V2BACNr0ml4YBYEFlrIXbeLV1kzAdaUS4Gc9NoGE7HXj8i1p95koa'),
(2, 'Icaro Cau', '+55 15 99120-9505', 'icarotsss@gmail.com', '$2b$10$V2BACNr0ml4YBYEFlrIXbeLV1kzAdaUS4Gc9NoGE7HXj8i1p95koa'),
(3, 'Nicholas Rodrigues Pereira', '(55) +15 9881-3076', 'nicholasrodrigues@gmail.com', '$2b$10$V2BACNr0ml4YBYEFlrIXbeLV1kzAdaUS4Gc9NoGE7HXj8i1p95koa');

-- --------------------------------------------------------

--
-- Table structure for table `usuario_plantas`
--

CREATE TABLE `usuario_plantas` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `planta_id` int NOT NULL,
  `data_cadastro` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adocao`
--
ALTER TABLE `adocao`
  ADD PRIMARY KEY (`mac_placa`),
  ADD KEY `planta_usuario` (`planta_usuario`);

--
-- Indexes for table `dados_sensor`
--
ALTER TABLE `dados_sensor`
  ADD KEY `mac_placa` (`mac_placa`),
  ADD KEY `mac_placa_2` (`mac_placa`);

--
-- Indexes for table `plantas`
--
ALTER TABLE `plantas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessoes`
--
ALTER TABLE `sessoes`
  ADD PRIMARY KEY (`usuario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `usuario_plantas`
--
ALTER TABLE `usuario_plantas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `planta_id` (`planta_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `plantas`
--
ALTER TABLE `plantas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `usuario_plantas`
--
ALTER TABLE `usuario_plantas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adocao`
--
ALTER TABLE `adocao`
  ADD CONSTRAINT `adocao_ibfk_1` FOREIGN KEY (`planta_usuario`) REFERENCES `usuario_plantas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `dados_sensor`
--
ALTER TABLE `dados_sensor`
  ADD CONSTRAINT `dados_sensor_ibfk_1` FOREIGN KEY (`mac_placa`) REFERENCES `adocao` (`mac_placa`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sessoes`
--
ALTER TABLE `sessoes`
  ADD CONSTRAINT `sessoes_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `usuario_plantas`
--
ALTER TABLE `usuario_plantas`
  ADD CONSTRAINT `usuario_plantas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `usuario_plantas_ibfk_2` FOREIGN KEY (`planta_id`) REFERENCES `plantas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
