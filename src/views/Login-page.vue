<template>
    <body>

        <h1 class="title">Let's go out in paris</h1>

        <div class="container-login">

            <section class="connection">

                <div class="title-connection">
                    <h2>Se connecter :</h2>
                </div>

                <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </div>

                <div v-if="connectionMessage" class="connection-message">
                    {{ connectionMessage }}
                </div>



                <form class="form-connection" @submit.prevent="submitForm">

                    <label class="label-login" for="username">Identifiant:</label>
                    <input class="input-login" type="text" id="username" v-model="email" required>

                    <label class="label-login" for="password">Mot de passe:</label>
                    <input class="input-login" type="password" id="password" v-model="password" required>

                    <a href="forgoten-password" class="forgoten-password">mot de passe oublié</a>

                    <div class="button-container">
                        <button class="send-form-button" type="submit">Connexion</button>
                    </div>
                </form>


            </section>

            <section class="signup-link">
                <p class="question">Vous n’avez pas encore votre compte let’s go out ?</p>
                <p class="proposal-registration">inscrivez vous dès maintenant,Afin de créer vos propres reviews et
                    alimenter
                    votre liste coup de cœur dés maintenant</p>
                <a href="signup" class="link-to-signup">créer votre compte</a>

            </section>

        </div>

        <Footer />

    </body>
</template>


<script>

import Footer from '../components/Footer.vue';
import store from '../store/store'

export default {

    data() {

        return {
            email: "",
            password: "",
            pseudo: "",
            errorMessage: null,
            connectionMessage: null,
        };
    },

    name: "Signup-page",
    components: {

        Footer

    },



    methods: {

        async submitForm() {


            console.log('Identifiant:', this.email);
            console.log('Mot de passe:', this.password);

            try {
                // Utilisation de la fonction fetch pour envoyer une requête POST à votre API
                const response = await fetch(`http://localhost:5001/user/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        email: this.email,
                        password: this.password,
                        
                    }),

                })


                // Vérification de la réponse du serveur
                if (response.ok) {

                    const responseData = await response.json();

                    console.log("responsData : ", responseData)

                   const newPseudo = responseData.pseudo;

                    await store.dispatch('updatePseudo', newPseudo);

                    // Vous pouvez également accéder au pseudo mis à jour directement à partir du store
                    console.log('Pseudo mis à jour :', store.state.pseudo);

                    this.connectionMessage = responseData.message[1]
                    console.log('message de success :', responseData.message[1]);
                    setTimeout(() => {
                        this.$router.push('/main');
                    }, 1500);
                    // Traitement de la réponse si nécessaire
                    return responseData


                } else {

                    if (response.status === 401) {

                        const errorData = await response.json();
                        this.errorMessage = errorData.message;
                        console.log('Erreur côté serveur :', this.errorMessage);
                        // Afficher le message d'erreur pendant 6 secondes
                        setTimeout(() => {
                            this.errorMessage = null; // Réinitialiser le message d'erreur après le délai
                        }, 2000);
                    }


                }
            }

            catch (error) {

                console.log('Erreur lors de la requête :', error);
            }
        }
    }
}

</script>

<style scoped>
.title {

    font-family: "Courgette", cursive;
    background: linear-gradient(to right, rgb(174, 218, 202), rgb(62, 24, 112));
    -webkit-background-clip: text;
    /* Safari and older versions of Chrome, Edge, and Opera */
    color: transparent;
    /* Rend le texte transparent */
    display: inline-block;
    font-size: 3.2rem;
    margin-left: 4rem;
}


.container-login {

    display: flex;
    border: 1px solid black;
    height: max-content;
    max-width: 80%;
    margin: auto;
    border-radius: 15px;
    background-color: rgb(249, 254, 255);
    margin-bottom: auto;
}






.form-connection {

    display: flex;
    flex-direction: column;
    padding: 0 auto 0 auto;
    box-sizing: border-box;
    width: 90%;

}

.connection {

    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    align-items: center;
    justify-content: center;
    width: 65%;
    height: 100%;
    border-right: 1px solid rgb(0, 0, 0);
    font-family: Arial, Helvetica, sans-serif;
}




#username,
#password {

    margin-left: 3rem;
    border-radius: 25px;
    height: 2rem;
    border: 1px solid black;
}



.title-connection {

    margin-left: 0.8rem;
    width: 100%;
    color: rgb(51, 15, 88);
}



.label-login {
    font-size: 1.4rem;
    margin: 2rem 0 1rem 0;
}


.input-login {

    width: 60%;
    font-size: 1.3rem;
    text-align: center;
}

.send-form-button {

    margin: 0 auto;
    margin-top: 3rem;
    width: max-content;
    font-size: 1.3rem;
    border-radius: 25px;
}

.forgoten-password {

    margin-top: 1.5rem;
}

.signup-link {

    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    padding: 0 2rem;
}

.proposal-registration {

    width: 65%;
    text-align: center;
}


.link-to-signup {

    margin-top: 4rem;
    color: rgb(71, 177, 141);
    font-size: 1.5rem;
    transition: 0.3s ease;
}

.link-to-signup:hover {

    font-size: 2rem;
    color: rgb(72, 35, 105);
    background-color: rgb(219, 245, 234);
    padding: 1rem;
    border-radius: 25px;
}

.question {

    font-family: "Courgette", cursive;
    font-size: 1.6rem;
    color: rgb(78, 54, 100);
}

.error-message {
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(173, 36, 100);

}

.connectionMessage {
    font-family: Arial, Helvetica, sans-serif;
    color: rgb(44, 233, 160);
}

.button-container {
    margin-bottom: 2rem;
}



@media screen and (max-width : 500px) {



    html {
        background-color: aqua;
    }

    .container-login {

        height: max-content;
        flex-direction: column;
        border: none;
    }

    .signup-link {

        margin-bottom: 2rem;

    }

    .connection {
        border: none;
        width: 100%;
    }

    .input-login {
        width: 70%;
    }

    .title {

        margin: 0 auto 2rem 2rem;
    }

    .title-connection {
        height: max-content;
        margin-bottom: 2rem;
    }

    .link-to-signup {

        margin-top: 1rem;
    }

    .proposal-registration {

        margin-bottom: 2rem;
        width: 90vw;
        font-size: 1.1rem;
    }

    .forgoten-password {

        margin-left: 12%;
    }

    .label-login {
        margin: 0.5rem 0 0.8rem 1.5rem;
    }

    .question {

        width: 90vw;
        margin: 1rem 0 0 2rem;
        font-size: 1.5rem;
    }

    #username,
    #password {
        margin: 0.3rem 0;
    }

    #username {
        margin-bottom: 1rem;
    }

    .button-container {

        display: flex;
        justify-content: center;
        margin-bottom: 4rem;

    }

}
</style>