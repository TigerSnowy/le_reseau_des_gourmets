-- sélectionner des enregistrements
-- choisir les colonnes à sélectionner
-- * = sélection de toutes les colonnes

-- SELECT 
--     user.*
--     -- user.pseudo, user.email, user.password 
    
-- FROM 
--     le_reseau_des_gourmets_dev.user

-- -- WHERE permet de créer une condition pour récupérer des enregistrements
-- WHERE 
--     -- user.user_id = 3
--     user.email = 'ines@gmail.com'
-- ;



-- sélectionner les noms et les prénoms des personnes avec le rôle user

-- SELECT
--     user.first_name, user.surname
-- FROM
--     le_reseau_des_gourmets_dev.user
-- WHERE
--     user.role_id = 2
--     ;


-- jointure : sélectoonner des données présentes dans plusieurs tables en utilisant les relations

-- SELECT
--     recipe.*,
--     -- user.* ou tu sélection les colonnes que tu veux =>
--     user.surname, user.first_name
-- FROM 
--     le_reseau_des_gourmets_dev.recipe

-- -- JOIN / INNER JOIN permet de cibler une table en relation
-- JOIN 
--     le_reseau_des_gourmets_dev.user

-- -- ON permet de relier une clé étrangère à une clé primaire
-- ON 
--     user.user_id = recipe.user_id
-- ;

-- SELECT
--     post.*,
--     user.pseudo
-- FROM 
--     le_reseau_des_gourmets_dev.post
-- JOIN 
--     le_reseau_des_gourmets_dev.user
-- ON 
--     user.user_id = post.user_id

-- ;


-- jointure avec une table de jointure

-- SELECT
--     recipe.title,
--     recipe.description,
--     GROUP_CONCAT(ingredient.name) AS ingredients
-- FROM
--     le_reseau_des_gourmets_dev.recipe
-- JOIN 
--     le_reseau_des_gourmets_dev.ingredient
-- JOIN
--     le_reseau_des_gourmets_dev.recipe_ingredient
-- ON
--     recipe_ingredient.ingredient_id = ingredient.ingredient_id
-- AND
--     recipe_ingredient.recipe_id = recipe.recipe_id
-- -- AND (si tu as plusieurs relations)
-- GROUP BY
--     recipe.title
-- ;
