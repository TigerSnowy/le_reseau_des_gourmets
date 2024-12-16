-- supprimer la base de données si elle existe
-- ATTENTION uniquement en développement
DROP DATABASE IF EXISTS le_reseau_des_gourmets_dev;

-- créer une base de données
CREATE DATABASE le_reseau_des_gourmets_dev; 

-- créer les tables
-- commencer par les tables n'ayant pas de clé étrangère

CREATE TABLE le_reseau_des_gourmets_dev.role(
    role_id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL,
    image VARCHAR(50) NOT NULL
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
    password VARCHAR(100) NOT NULL,
    profile_picture VARCHAR(100) NULL,
    profile_background VARCHAR(100) NULL,
    subscription_date DATE NOT NULL,
    role_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES role(role_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE le_reseau_des_gourmets_dev.recipe(
    recipe_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL UNIQUE,
    preparation_time TIME NULL,
    cooking_time TIME NULL,
    difficulty ENUM('facile', 'moyen', 'difficile') DEFAULT NULL,
    description TEXT NULL,
    share_token VARCHAR (255) DEFAULT NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE le_reseau_des_gourmets_dev.recipe_ingredient(
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quantity DECIMAL(5,1) NULL,
    unit ENUM('g', 'kg', 'ml', 'l', 'càs', 'càc', 'pincée(s)', 'oz', 'lb') DEFAULT NULL,
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    ingredient_id SMALLINT UNSIGNED,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
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

CREATE TABLE le_reseau_des_gourmets_dev.post(
    post_id TINYINT(2) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255) NULL,
    publication_date DATE NOT NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.share_type(
    share_type_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(30) NOT NULL
);

CREATE TABLE le_reseau_des_gourmets_dev.user_recipe_type(
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    share_type_id SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (share_type_id) REFERENCES share_type(share_type_id)
);



-- créer des enregistrements
-- commencer par les tables n'ayant pas de clés étrangères



INSERT INTO le_reseau_des_gourmets_dev.role
VALUES

-- pour la primary key, utiliser NULL pour l'auto-incrémentation
    (NULL, 'admin', 'logo-admin.png'),
    (NULL, 'user', 'logo-user.png')
;

INSERT INTO le_reseau_des_gourmets_dev.ingredient
VALUES

    (NULL, 'Citron'),
    (NULL, 'Viande hachée'),
    (NULL, 'Boudoire'),
     (NULL, 'Oeuf')
;

INSERT INTO le_reseau_des_gourmets_dev.user
VALUES

    (NULL, 'Tigy', 'Ferreira', 'Ines', 'ines@gmail.com', 'Bidibabidibou92', 'image1.jpg', 'image2.jpg', '2024-08-10', 1),
    (NULL, 'Lulu', 'Jalba', 'Ludmila', 'ludmila@gmail.com', 'Bidibabidibou74', 'image1.jpg', 'image2.jpg', '2024-10-30', 2),
    (NULL, 'Zyny', 'Yakut', 'Zeynep', 'zeynep@gmail.com', 'Bidibabidibou80', 'image1.jpg', 'image2.jpg', '2024-09-25', 2)
;

INSERT INTO le_reseau_des_gourmets_dev.post
VALUES

-- pour la primary key, utiliser NULL pour l'auto-incrémentation
    (NULL, 'title1', 'content1', NULL, '2024-10-31', 1),
    (NULL, 'title2', 'content2', 'image1.png', '2024-10-31', 2),
    (NULL, 'title3', 'content3', 'image2.png', '2024-10-31', 3)
;

INSERT INTO le_reseau_des_gourmets_dev.recipe
VALUES

    (NULL, 'Tarte au citron', '01:00:00', '00:30:00', 'Facile', 'Etape 1: zhafhazbfchbazhquxcb.', NULL, 2),
    (NULL, 'Lasagnes', '01:30:00', '00:45:00', 'Difficile', 'Etape 1: ezffuhuahfabfia.', NULL, 3),
    (NULL, 'Charlotte aux fraises', '00:45:00', '03:00:00', 'Moyen', 'Etape 1: ejhducabucbu.', 'abc123xyz', 1)
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