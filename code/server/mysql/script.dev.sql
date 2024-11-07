-- supprimer la base de données si elle existe
-- ATTENTION uniquement en développement
DROP DATABASE IF EXISTS le_reseau_des_gourmets_dev;

-- créer une base de données
CREATE DATABASE le_reseau_des_gourmets_dev; 

-- créer les tables
-- commencer par les tables n'ayant pas de clé étrangère

CREATE TABLE le_reseau_des_gourmets_dev.role(
    role_id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    image VARCHAR(50) NOT NULL
);

CREATE TABLE le_reseau_des_gourmets_dev.ingredient(
    ingredient_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE le_reseau_des_gourmets_dev.user(
    user_id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pseudo VARCHAR(40) NOT NULL UNIQUE,
    surname VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    profil_picture VARCHAR(50) NULL,
    background VARCHAR(50) NULL,
    subscription_date DATE NOT NULL,
    role_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.recipe(
    recipe_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL UNIQUE,
    preparation_time TIME NULL,
    cooking_time TIME NULL,
    difficulty VARCHAR(20) NULL,
    description TEXT NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);


CREATE TABLE le_reseau_des_gourmets_dev.category(
    category_id TINYINT(2) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    creation_date DATE NOT NULL,
    parent_id TINYINT(2) UNSIGNED,
    FOREIGN KEY (parent_id) REFERENCES category(category_id),
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.category_recipe(
    category_id TINYINT(2) UNSIGNED,
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    PRIMARY KEY(category_id, recipe_id)
);


CREATE TABLE le_reseau_des_gourmets_dev.recipe_ingredient(
    quantity DECIMAL(5,1) NULL,
    unit VARCHAR(50) NULL,
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    ingredient_id SMALLINT UNSIGNED,
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id),
    PRIMARY KEY (recipe_id, ingredient_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.picture(
    picture_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    image VARCHAR(100) NOT NULL,
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.recipe_picture(
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    picture_id SMALLINT UNSIGNED,
    FOREIGN KEY (picture_id) REFERENCES picture(picture_id),
    PRIMARY KEY (recipe_id, picture_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.theme(
    theme_id TINYINT(1) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
    primary_color VARCHAR(7) NOT NULL,
    secondary_color VARCHAR(7) NULL,
    tertiary_color VARCHAR(7) NULL,
    font VARCHAR(100) NOT NULL,
    font_color VARCHAR(7) NOT NULL,
    image_background VARCHAR(100) NULL
);

CREATE TABLE le_reseau_des_gourmets_dev.custom_theme(
    custom_theme_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    primary_color VARCHAR(7) NULL,
    secondary_color VARCHAR(7) NULL,
    tertiary_color VARCHAR(7) NULL,
    font VARCHAR(100) NULL,
    font_color VARCHAR(7) NULL,
    image_background VARCHAR(100) NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    recipe_id SMALLINT UNSIGNED,
    FOREIGN KEY (recipe_id) REFERENCES recipe(recipe_id),
    theme_id TINYINT(1) UNSIGNED,
    FOREIGN KEY (theme_id) REFERENCES theme(theme_id)
);

CREATE TABLE le_reseau_des_gourmets_dev.post(
    post_id TINYINT(2) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    content TEXT NOT NULL,
    publication_date DATE NOT NULL,
    user_id TINYINT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
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
    (NULL, 'Boudoires'),
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
    (NULL, 'title1', 'content1', '2024-10-31', 1),
    (NULL, 'title2', 'content2', '2024-10-31', 2),
    (NULL, 'title3', 'content3', '2024-10-31', 3)
;

INSERT INTO le_reseau_des_gourmets_dev.recipe
VALUES

    (NULL, 'Tarte au citron', '01:00:00', '00:30:00', 'Facile', 'Etape 1: zhafhazbfchbazhquxcb.', 2),
    (NULL, 'Lasagnes', '01:30:00', '00:45:00', 'Difficile', 'Etape 1: ezffuhuahfabfia.', 3),
    (NULL, 'Charlotte aux fraises', '00:45:00', '03:00:00', 'Moyen', 'Etape 1: ejhducabucbu.', 1)
;

INSERT INTO le_reseau_des_gourmets_dev.category
VALUES

    (NULL, 'Tartes', '2024-08-10', NULL, 2),
    (NULL, 'Plats', '2024-09-25', NULL, 3),
    (NULL, 'Desserts', '2024-08-10', NULL, 1)
;

INSERT INTO le_reseau_des_gourmets_dev.category_recipe
VALUES

    (1, 1),
    (2, 2),
    (3, 3)
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

    (NULL, 'tarte au citron1.png', 1),
    (NULL, 'tarte au citron2.png', 1),
    (NULL, 'lasagne1.png', 2),
    (NULL, 'charlotte1.png', 3)
;

INSERT INTO le_reseau_des_gourmets_dev.recipe_picture
VALUES

    (1, 1),
    (1, 2),
    (2, 2),
    (3, 3)
;

INSERT INTO le_reseau_des_gourmets_dev.theme
VALUES

    (NULL, 'Automn', '#f12711', '#f5af19', '#F2994A', 'Fuzzy Bubbles', '#DAD299', 'image_background_automn.png'),
    (NULL, 'Winter', '#2980B9', '#6DD5FA', '#FFFFFF', 'Winter Snow', '#0F2027', 'image_background_winter.png'),
    (NULL, 'Summer', '#a8ff78', '#78ffd6', '#FAFFD1', 'Shartoll Light', '#11998e', 'image_background_summer.png'),
    (NULL, 'Spring', '#FBD3E9', '#BB377D', '#F15F79', 'Sunday', '#cc2b5e', 'image_background_spring.png')
;

INSERT INTO le_reseau_des_gourmets_dev.custom_theme
VALUES

    (NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 2, 1),
    (NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 3, 2),
    (NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 1, 4)
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