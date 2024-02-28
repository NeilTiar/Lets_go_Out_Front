<template>
    <h1 class="title">Let's go out in paris</h1>

    <div class="container-login">

        <section class="connection">

            <div class="title-connection">
                <h2>Se connecter :</h2>
            </div>

            <div class="connection-form">

                <form class="form-connection" @submit.prevent="submitForm">

                    <label class="label-login" for="username">Identifiant:</label>
                    <input class="input-login" type="text" id="username" v-model="email" required>

                    <label class="label-login" for="password">Mot de passe:</label>
                    <input class="input-login" type="password" id="password" v-model="password" required>

                    <a href="forgoten-password" class="forgoten-password">mot de passe oublié</a>

                    <button class="send-form-button" type="submit">Connexion</button>
                </form>



            </div>


        </section>
        <section class="signup-link">
        </section>

    </div>

    <Footer />
</template>


<script>

import Footer from '../components/Footer.vue';




export default {


    data() {

        return {

            email: "",
            password: "",
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
                        password: this.password
                    }),
                });

                // Vérification de la réponse du serveur
                if (response.ok) {
                    const responseData = await response.json();
                    // Traitement de la réponse si nécessaire
                    console.log('Réponse du serveur :', responseData);
                } else {
                    console.error('Échec de la requête :', response.statusText);
                }
            } catch (error) {
                console.error('Erreur lors de la requête :', error);
            }
        }
    }
}






</script>

<style scoped> .title {

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

     border: 1px solid black;
     height: 63vh;
     max-width: 80%;
     margin: 1.7rem auto 4rem auto;
     border-radius: 15px;
     background-color: rgb(249, 254, 255);
 }


 Footer {

     display: flex;
     flex: 1;
 }



 .form-connection {

     display: flex;
     flex-direction: column;
     padding: 0 auto 0 auto;

 }

 .connection {

     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     width: 50%;
     height: 100%;
     border-right: 1px solid rgb(0, 0, 0);
     font-family: Arial, Helvetica, sans-serif;
 }


 #username,
 #password {

     border-radius: 25px;
     height: 2rem;
     width: 20rem;
     border: 1px solid black;
 }

 .title-connection {
     position: relative;
     right: 8rem;
     color: rgb(51, 15, 88);
 }

 .label-login {
     font-size: 1.4rem;
     margin: 2rem 0 1rem 0;
 }


 .input-login {

     font-size: 1.3rem;
     text-align: center;
 }

 .send-form-button {

     margin-top: 3rem;
     width: max-content;
     font-size: 1.3rem;
     border-radius: 25px;
 }

 .forgoten-password {

     margin: 1.3rem 0 0 9rem;
 }
</style>