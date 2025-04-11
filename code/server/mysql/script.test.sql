-- supprimer la base de données si elle existe
-- ATTENTION uniquement en développement
DROP DATABASE IF EXISTS le_reseau_des_gourmets_test;

-- créer une base de données
CREATE DATABASE le_reseau_des_gourmets_test; 
USE le_reseau_des_gourmets_test;


-- créer les tables
-- commencer par les tables n'ayant pas de clé étrangère

-- ROLE

CREATE TABLE le_reseau_des_gourmets_test.role(
    role_id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL
);

-- USER

CREATE TABLE le_reseau_des_gourmets_test.user(
    user_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pseudo VARCHAR(30) NOT NULL UNIQUE,
    surname VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    profile_picture VARCHAR(100),
    role_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- RECIPE

CREATE TABLE le_reseau_des_gourmets_test.recipe(
    recipe_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL UNIQUE,
    preparation_time TIME,
    cooking_time TIME,
    difficulty ENUM('Facile', 'Moyen', 'Difficile') DEFAULT NULL,
    description TEXT,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- INGREDIENT

CREATE TABLE le_reseau_des_gourmets_test.ingredient(
    ingredient_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    quantity VARCHAR(10),
    unit ENUM('mg', 'g', 'kg', 'ml', 'cl', 'l', 'càc', 'càs', 'pincée', 'oz', 'lb', 'unité') DEFAULT NULL,
    recipe_id SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- INSTRUCTION

CREATE TABLE le_reseau_des_gourmets_test.instruction (
    instruction_id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    step_number TINYINT UNSIGNED,
    text TEXT NOT NULL,
    recipe_id SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- TAG

CREATE TABLE le_reseau_des_gourmets_test.tag (
    tag_id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    user_id TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE (name, user_id)
);

-- RECIPE_TAG

CREATE TABLE le_reseau_des_gourmets_test.recipe_tag (
    recipe_id SMALLINT UNSIGNED NOT NULL,
    tag_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (recipe_id, tag_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- PICTURE

CREATE TABLE le_reseau_des_gourmets_test.picture(
    picture_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL
);

-- RECIPE_PICTURE

CREATE TABLE le_reseau_des_gourmets_test.recipe_picture (
    recipe_id SMALLINT UNSIGNED NOT NULL,
    picture_id SMALLINT UNSIGNED NOT NULL,
    PRIMARY KEY (recipe_id, picture_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (picture_id) REFERENCES picture(picture_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- créer des enregistrements (insertions)
-- commencer par les tables n'ayant pas de clés étrangères

-- ROLE

INSERT INTO le_reseau_des_gourmets_test.role
VALUES

-- pour la primary key, utiliser NULL pour l'auto-incrémentation
    (NULL, 'admin'),
    (NULL, 'user')
;

-- USER

INSERT INTO le_reseau_des_gourmets_test.user
VALUES

    (NULL, 'Tigy', 'Ferreira', 'Ines', 'ines@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$U2ZWOUxnVjFXVTNOOWdhQw$XJfOyxOEvhYfHqB6h50smQ', '/public/img/default_avatars/cookies.jpg', 1),
    (NULL, 'Lulu', 'Jalba', 'Ludmila', 'ludmila@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$eDZ3ZW9BOXd6Q2htbDlHeQ$Hk0YRdYqWVKQoXcJDPu/Ng', 'image1.jpg', 2),
    (NULL, 'Zyny', 'Yakut', 'Zeynep', 'zeynep@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$bXhBeTF0REYwU2k0Z0lSTg$+9dM5tP3tPel833PfUcgQw', 'image1.jpg', 2)
;

-- Ines => Bidibabidibou92
-- Ludmila => Bidibabidibou74
-- Zeynep => Bidibabidibou80

-- RECIPE

INSERT INTO le_reseau_des_gourmets_test.recipe
VALUES

    (NULL, 'Tarte au citron', '01:00:00', '00:30:00', 'Facile', 'Une tarte délicieuse au citron.', 2),
    (NULL, 'Lasagnes', '01:30:00', '00:45:00', 'Difficile', 'Des lasagnes maison bien gratinées.', 3),
    (NULL, 'Charlotte aux fraises', '00:45:00', '03:00:00', 'Moyen', 'Un dessert frais et fruité.', 1)
;

-- INGREDIENT

INSERT INTO le_reseau_des_gourmets_test.ingredient
VALUES

    (NULL, 'Citron', '3', 'unité', 1),
    (NULL, 'Viande hachée', '1.5', 'kg', 2),
    (NULL, 'Boudoire', '500', 'ml', 3),
    (NULL, 'Oeuf', '2', 'unité', 1)
;

-- INSTRUCTION

INSERT INTO le_reseau_des_gourmets_test.instruction VALUES
    (NULL, 1, 'Préchauffez le four à 180°C.', 1),
    (NULL, 2, 'Mélangez les ingrédients dans un bol.', 1),
    (NULL, 3, 'Versez la préparation dans un moule.', 1)
;

-- PICTURE

INSERT INTO le_reseau_des_gourmets_test.picture
VALUES

    (NULL, 'tarte au citron1.png'),
    (NULL, 'tarte au citron2.png'),
    (NULL, 'lasagne1.png'),
    (NULL, 'charlotte1.png')
;

INSERT INTO le_reseau_des_gourmets_test.recipe_picture
VALUES

    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4)
;

-- TAG

INSERT INTO le_reseau_des_gourmets_test.tag (name, user_id)
VALUES 
    ('dessert', 2),
    ('rapide', 2),
    ('citron', 2)
;

INSERT INTO le_reseau_des_gourmets_test.recipe_tag (recipe_id, tag_id)
VALUES
    (1, 1),
    (1, 2),
    (1, 3)
;


-- INSERT INTO le_reseau_des_gourmets_test.post
-- VALUES

-- -- pour la primary key, utiliser NULL pour l'auto-incrémentation
--     (NULL, 'title1', 'content1', NULL, '2024-10-31', 1),
--     (NULL, 'title2', 'content2', 'image1.png', '2024-10-31', 2),
--     (NULL, 'title3', 'content3', 'image2.png', '2024-10-31', 3)
-- ;


-- modifier des enregistrements :

--  UPDATE le_reseau_des_gourmets_test.<table name>

-- SET permet de cibler les colonnes à mettre à jour, et leur affecter une nouvelle valeur :

--  SET 
--      <table name>.<valeur ciblée> = '<nouvelle valeur>' 

-- WHERE permet de créer une condition, cibler une colonne et une valeur

--  WHERE
--      <table name>.<id name> = <id number> ;


-- supprimer un enregistrement :

--  DELETE FROM le_reseau_des_gourmets_test.<table name>

--  WHERE

--   <table name>.<id name> = <id number> ;