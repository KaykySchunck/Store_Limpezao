-- Script para verificar se as tabelas foram criadas
-- Execute este script no seu cliente MySQL (MySQL Workbench, phpMyAdmin, ou linha de comando)

-- Substitua 'seu_banco_de_dados' pelo nome do seu banco (valor da variável DB_MYSQL_NAME)
USE store_limpezao;

-- Lista todas as tabelas do banco
SHOW TABLES;

-- Se quiser ver a estrutura de uma tabela específica, descomente uma das linhas abaixo:
-- DESCRIBE merchant;
-- DESCRIBE store;
-- DESCRIBE categories;
-- DESCRIBE itens;
-- DESCRIBE images_itens;
-- DESCRIBE subscriptions;
-- DESCRIBE store_customizations;

