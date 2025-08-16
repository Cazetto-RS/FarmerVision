-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 05/08/2025 às 10:31
-- Versão do servidor: 8.0.30
-- Versão do PHP: 8.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `farmervision`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `plantas`
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
  `temperatura_min` float DEFAULT NULL,
  `temperatura_max` float DEFAULT NULL,
  `ph_solo_min` float DEFAULT NULL,
  `ph_solo_max` float DEFAULT NULL,
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
-- Despejando dados para a tabela `plantas`
--

INSERT INTO `plantas` (`id`, `nome_comum`, `nome_cientifico`, `familia`, `genero`, `descricao`, `reino`, `divisao`, `classe`, `luz`, `solo`, `agua`, `temperatura_min`, `temperatura_max`, `ph_solo_min`, `ph_solo_max`, `usos`, `partes_utilizadas`, `toxicidade`, `efeitos_toxicos`, `imagem_principal`, `clima`, `altura_media_cm`, `tempo_de_cultivo_dias`, `floracao`) VALUES
(1, 'Babosa', 'Aloe vera', 'Asphodelaceae', 'Aloe', 'Planta suculenta com folhas espessas, conhecida por suas propriedades cicatrizantes e hidratantes.', 'Plantae', 'Magnoliophyta', 'Liliopsida', 'Sol pleno', 'Bem drenado e arenoso', 'Pouca rega, solo seco entre irrigações', 15, 30, 6, 7.5, 'Medicinal, cosmético, ornamental', 'Folhas', 'Levemente tóxica para animais', 'Vômitos e diarreia em cães e gatos', 'https://exemplo.com/imagens/aloe-vera.jpg', 'Tropical e subtropical', 60, 300, 'Primavera'),
(2, 'Hortelã', 'Mentha spicata', 'Lamiaceae', 'Mentha', 'Planta aromática muito utilizada em chás e na culinária, com propriedades digestivas.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Meia sombra', 'Úmido e fértil', 'Rega frequente', 10, 25, 6, 7.5, 'Culinário, medicinal, aromático', 'Folhas', 'Não tóxica', 'Nenhum conhecido', 'https://exemplo.com/imagens/hortela.jpg', 'Temperado', 40, 135, 'Verão'),
(3, 'Lavanda', 'Lavandula angustifolia', 'Lamiaceae', 'Lavandula', 'Planta ornamental e aromática, muito usada em perfumaria e para relaxamento.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Sol pleno', 'Bem drenado', 'Pouca rega', 15, 30, 6.5, 7.5, 'Ornamental, aromático, medicinal', 'Flores', 'Levemente tóxica para animais', 'Pode causar náuseas em animais', 'https://exemplo.com/imagens/lavanda.jpg', 'Mediterrâneo', 75, 540, 'Verão'),
(4, 'Manjericão', 'Ocimum basilicum', 'Lamiaceae', 'Ocimum', 'Erva aromática muito utilizada na culinária italiana e em pratos mediterrâneos.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Sol pleno', 'Fértil e bem drenado', 'Rega regular', 18, 27, 6, 7.5, 'Culinário, medicinal', 'Folhas', 'Não tóxica', 'Nenhum conhecido', 'https://exemplo.com/imagens/manjericao.jpg', 'Tropical', 45, 120, 'Verão'),
(5, 'Suculenta', 'Echeveria elegans', 'Crassulaceae', 'Echeveria', 'Planta ornamental que armazena água em suas folhas, ideal para jardins de baixa manutenção.', 'Plantae', 'Magnoliophyta', 'Magnoliopsida', 'Sol pleno', 'Bem drenado', 'Pouca rega', 10, 30, 6, 7.5, 'Ornamental', 'Folhas', 'Não tóxica', 'Nenhum conhecido', 'https://exemplo.com/imagens/suculenta.jpg', 'Árido', 15, 270, 'Primavera');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `telefone`, `email`, `password`) VALUES
(1, 'Rafael', '+55 15 98813-0769', 'rafasandei17@gmail.com', 'PasswordAdmin');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_plantas`
--

CREATE TABLE `usuario_plantas` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `planta_id` int NOT NULL,
  `data_cadastro` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `usuario_plantas`
--

INSERT INTO `usuario_plantas` (`id`, `usuario_id`, `planta_id`, `data_cadastro`) VALUES
(1, 1, 3, '2025-08-05 07:30:42');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `plantas`
--
ALTER TABLE `plantas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `usuario_plantas`
--
ALTER TABLE `usuario_plantas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `planta_id` (`planta_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `plantas`
--
ALTER TABLE `plantas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuario_plantas`
--
ALTER TABLE `usuario_plantas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `usuario_plantas`
--
ALTER TABLE `usuario_plantas`
  ADD CONSTRAINT `usuario_plantas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `usuario_plantas_ibfk_2` FOREIGN KEY (`planta_id`) REFERENCES `plantas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
