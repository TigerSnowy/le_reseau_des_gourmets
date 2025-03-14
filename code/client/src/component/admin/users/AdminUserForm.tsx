import { useForm } from "react-hook-form";
import type User from "../../../model/user";
import styles from "../../../assets/scss/adminUserForm.module.scss"

const AdminUserForm = () => {

    /*
    handleSubmit permet de gérer la soumission du formulaire
    register permet de référencer les champs de formulaire
    errors permet de gérer les messages d'erreur
    */ 

    const { handleSubmit, register, formState: { errors }, } = useForm<User>();
      
    // soumission du formulaire
    // values récupère la saisie du formulaire
        const onSubmitUser = (values: User) => {
            console.log(values);
        };

    return (
        
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmitUser)}>
        
        <div>
            
            {/* reprendre STRICTEMENT le nom des colonnes SQL */}

            <label htmlFor="name">Nom :</label>
            <input
                    type="text"
                    id="name"
                    {...register("surname", {
                        required: "Le nom est obligatoire.",
                        minLength: {
                        value: 2,
                        message: "Le nom est trop court."
                    },
                
                })}
            />

            <small>{errors.surname?.message}</small>

            <label htmlFor="fname">Prénom :</label>
            <input type="text" {...register("first_name")} />

            <label htmlFor="pseudo">Pseudo :</label>
            <input type="text" {...register("pseudo")} />

            <label htmlFor="email">Email :</label>
            <input type="text" {...register("email")} />

            <label htmlFor="Mpd">Mot de passe :</label>
            <input type="text" {...register("password")} />
        </div>
        <p>
            <button type="submit">
                Soumettre
            </button>
        </p>
          
        </form>
    );
      
};

export default AdminUserForm