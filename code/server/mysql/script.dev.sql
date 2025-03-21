-- supprimer la base de données si elle existe
-- ATTENTION uniquement en développement
DROP DATABASE IF EXISTS le_reseau_des_gourmets_dev;

-- créer une base de données
CREATE DATABASE le_reseau_des_gourmets_dev; 

-- créer les tables
-- commencer par les tables n'ayant pas de clé étrangère

CREATE TABLE le_reseau_des_gourmets_dev.role(
    role_id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL
);

CREATE TABLE le_reseau_des_gourmets_dev.ingredient(
    ingredient_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE le_reseau_des_gourmets_dev.user(
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

CREATE TABLE le_reseau_des_gourmets_dev.recipe(
    recipe_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL UNIQUE,
    preparation_time TIME NULL,
    cooking_time TIME NULL,
    difficulty ENUM('Facile', 'Moyen', 'Difficile') DEFAULT NULL,
    description TEXT NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE le_reseau_des_gourmets_dev.recipe_ingredient(
    quantity DECIMAL(5,1) NULL,
    unit ENUM('g', 'kg', 'ml', 'l', 'càs', 'càc', 'pincée(s)', 'oz', 'lb') DEFAULT NULL,
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    ingredient_id SMALLINT UNSIGNED,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id),
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.picture(
    picture_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE le_reseau_des_gourmets_dev.recipe_picture(
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id) ON DELETE CASCADE,
    picture_id SMALLINT UNSIGNED,
    FOREIGN KEY (picture_id) REFERENCES picture(picture_id) ON DELETE CASCADE,
    PRIMARY KEY (recipe_id, picture_id)
);

-- CREATE TABLE le_reseau_des_gourmets_dev.post(
--     post_id TINYINT(2) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     title VARCHAR(60) NOT NULL,
--     content TEXT NOT NULL,
--     image VARCHAR(255) NULL,
--     publication_date DATE NOT NULL,
--     user_id TINYINT UNSIGNED,
--     FOREIGN KEY (user_id) REFERENCES user(user_id)
-- );


-- créer des enregistrements
-- commencer par les tables n'ayant pas de clés étrangères



INSERT INTO le_reseau_des_gourmets_dev.role
VALUES

-- pour la primary key, utiliser NULL pour l'auto-incrémentation
    (NULL, 'admin'),
    (NULL, 'user')
;

INSERT INTO le_reseau_des_gourmets_dev.ingredient
VALUES

    (NULL, 'Citron'),
    (NULL, 'Viande hachée'),
    (NULL, 'Boudoire'),
    (NULL, 'Oeuf'),
    (NULL, 'Cerise')
;

INSERT INTO le_reseau_des_gourmets_dev.user
VALUES

    (NULL, 'Tigy', 'Ferreira', 'Ines', 'ines@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$U2ZWOUxnVjFXVTNOOWdhQw$XJfOyxOEvhYfHqB6h50smQ', '/public/img/default_avatars/cookies.jpg', 1),
    (NULL, 'Lulu', 'Jalba', 'Ludmila', 'ludmila@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$eDZ3ZW9BOXd6Q2htbDlHeQ$Hk0YRdYqWVKQoXcJDPu/Ng', 'image1.jpg', 2),
    (NULL, 'Zyny', 'Yakut', 'Zeynep', 'zeynep@gmail.com', '$argon2i$v=19$m=16,t=2,p=1$bXhBeTF0REYwU2k0Z0lSTg$+9dM5tP3tPel833PfUcgQw', 'image1.jpg', 2)
;

-- Ines => Bidibabidibou92
-- Ludmila => Bidibabidibou74
-- Zeynep => Bidibabidibou80

-- INSERT INTO le_reseau_des_gourmets_dev.post
-- VALUES

-- -- pour la primary key, utiliser NULL pour l'auto-incrémentation
--     (NULL, 'title1', 'content1', NULL, '2024-10-31', 1),
--     (NULL, 'title2', 'content2', 'image1.png', '2024-10-31', 2),
--     (NULL, 'title3', 'content3', 'image2.png', '2024-10-31', 3)
-- ;

INSERT INTO le_reseau_des_gourmets_dev.recipe
VALUES

    (NULL, 'Tarte au citron', '01:00:00', '00:30:00', 'Facile', 'Etape 1: zhafhazbfchbazhquxcb.', 2),
    (NULL, 'Lasagnes', '01:30:00', '00:45:00', 'Difficile', 'Etape 1: ezffuhuahfabfia.', 3),
    (NULL, 'Charlotte aux fraises', '00:45:00', '03:00:00', 'Moyen', 'Etape 1: ejhducabucbu.', 1)
;

INSERT INTO le_reseau_des_gourmets_dev.recipe_ingredient
VALUES

    (3, NULL, 1, 1),
    (1.5, 'kg', 2, 2),
    (500, 'ml', 3, 3),
    (2, NULL, 1, 4)
;

INSERT INTO le_reseau_des_gourmets_dev.picture
VALUES

    (NULL, 'tarte au citron1.png'),
    (NULL, 'tarte au citron2.png'),
    (NULL, 'lasagne1.png'),
    (NULL, 'charlotte1.png')
;

INSERT INTO le_reseau_des_gourmets_dev.recipe_picture
VALUES

    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3)
;




-- modifier des enregistrements :

--  UPDATE le_reseau_des_gourmets_dev.<table name>

-- SET permet de cibler les colonnes à mettre à jour, et leur affecter une nouvelle valeur :

--  SET 
--      <table name>.<valeur ciblée> = '<nouvelle valeur>' 

-- WHERE permet de créer une condition, cibler une colonne et une valeur

--  WHERE
--      <table name>.<id name> = <id number> ;


-- supprimer un enregistrement :

--  DELETE FROM le_reseau_des_gourmets_dev.<table name>

--  WHERE

--   <table name>.<id name> = <id number> ;