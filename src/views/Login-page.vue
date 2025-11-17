<template>
  <body>
    <h1 class="title">Let's go out in paris</h1>

    <div
      :class="{
        'container-login': isDesktop,
        'container-login-mobile': !isDesktop,
      }"
    >
      <section
        :class="{ connection: isDesktop, 'mobile-connection': !isDesktop }"
      >
        <div class="title-connection">
          <h2>Se connecter :</h2>
        </div>


        <div v-if="connectionMessage" class="connection-message">
          {{ connectionMessage }}
        </div>

        <form class="form-connection" @submit.prevent="submitForm">
          <label class="label-login" for="username">Identifiant:</label>
          <input
            id="username"
            v-model="email"
            class="input-login"
            type="text"
            required
            autocomplete="current-password"
          />

          <label class="label-login" for="password">Mot de passe:</label>
          <input
            id="password"
            v-model="password"
            class="input-login"
            type="password"
            required
            autocomplete="current-password"
          />

          <a href="forgoten-password" class="forgoten-password"
            >mot de passe oublié</a
          >

          <div class="button-container">
            <button class="send-form-button" type="submit">Connexion</button>
          </div>
        </form>
      </section>

      <section class="signup-link">
        <p class="question">
          Vous n’avez pas encore votre compte let’s go out ?
        </p>
        <p class="proposal-registration">
          inscrivez vous dès maintenant,Afin de créer vos propres reviews et
          alimenter votre liste coup de cœur dés maintenant
        </p>
        <a href="signup" class="link-to-signup">créer votre compte</a>
        <transition
    enter-active-class="animate__animated animate__fadeInLeftBig"
    leave-active-class="animate__animated animate__fadeOutRightBig"
  >
    <p v-if="errorMessage">
      {{ errorMessage }}
    </p>
  </transition>
      </section>
    </div>

    <FooterComponent />
  </body>
</template>

<script>
import FooterComponent from '@/components/Footer-component.vue';
import store from '../store/store';
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import 'animate.css';

export default {
  name: 'SignupPage',
  components: {
    FooterComponent,
  },

  data() {
    return {
      email: '',
      password: '',
      pseudo: '',
      errorMessage: null,
      connectionMessage: null,
      isDesktop: window.innerWidth > 768,
    };
  },

  methods: {
    
    async submitForm() {
      // test console.log('Identifiant:', this.email);
      // test console.log('Mot de passe:', this.password);

    const api = import.meta.env.VITE_API_URL;

      try {
        // Utilisation de la fonction fetch pour envoyer une requête POST à votre API
        const response = await fetch(`${api}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });

        console.log(
          'AccessToken depuis le LocalStorage : ',
          localStorage.getItem('accessToken')
        );

        const responseData = await response.json();

        const isRefreshToken = responseData.isValidRefreshToken;

        const errorMessage = responseData.messageError;

        errorMessage
          ? (this.errorMessage = errorMessage)
          : (this.errorMessage = null);

         const isActivateAccount = responseData.isActivateAccount;

         console.log("isActivateAccount from login :", isActivateAccount);

        // mon erreur etait d'essayé d'acceder a l'accesstoken ici , alors qu'il est generer aprés connexion !!!

        // cette fonction est a revoir car la manipulation du req.headers.authorization n'est possible qu'aprés connexion

        // Vérification de la réponse du serveur
        if (response.ok ) {



      
          // console.log('refreshToken :', refreshToken)

          if (isRefreshToken) {
            // Stockez le token dans le local storage

            // Vérifier si le header Authorization est présent
            const brutAccessToken = response.headers.get('Authorization');

            if (brutAccessToken) {

              console.log('Header Authorization ===========>>>:', brutAccessToken);

              const AccessToken = brutAccessToken.split(' ')[1]; // Prend la partie après 'Bearer'
            
           
        // test   console.log(' ===========>>>>brutAccessToken from header :', brutAccessToken);    

        
        // Stockage local de l'accessToken
          localStorage.setItem('accessToken', AccessToken);

            }

            store.dispatch('currentRefreshToken', isRefreshToken);
          }

              console.log(
            'Token stocké dans Vuex :',
            this.$store.state.accessToken
          );

          const isAdmin = responseData.isAdmin;
          
          await this.$store.commit('setIsAdmin', isAdmin);


          /* test isAdmin from response .
                    console.log('isAdmin: ', isAdmin); */

         // test console.log('response.isValidRefreshToken', responseData);

         
          // test   console.log('isAdmin from store:', this.$store.state.isAdmin);

          this.$store.commit('setFavorites', responseData.favoriteReviewsId);

          // test  console.log('FAVORITES REVIEWS FROM STORE : ', this.$store.state.favorites);

          // test console.log("AccessToken From Store : ", store.state.accessToken , "refreshToken :" , store.state.refreshToken)

          // test console.log("responsData : ", responseData)

          const userName = responseData.pseudo;

          // test pseudo via local storage : console.log('test pseudo by local :', localStorage.getItem('pseudo'));

          await store.dispatch('updatePseudo', userName);

          // Vous pouvez également accéder au pseudo mis à jour directement à partir du store
          // test console.log('Pseudo mis à jour :', store.state.pseudo);

          this.connectionMessage = responseData.message[1];
          // test console.log('message de success :', responseData.message[1]);
          setTimeout(() => {
            this.$router.push('/main');
          }, 1500);
          // Traitement de la réponse si nécessaire
          return responseData;
        } else {
          if (response.status === 401) {
        
            this.errorMessage = responseData.messageError;
            console.log('Erreur côté serveur :', responseData);
            // Afficher le message d'erreur pendant 6 secondes
            setTimeout(() => {
              this.errorMessage = null; // Réinitialiser le message d'erreur après le délai
            }, 3500);
          }
        }
      } catch (error) {
        console.log('Erreur lors de la requête :', error);
      }
    },
  },
};
</script>

<style scoped>

html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}




.mobile-connection {
  padding: 1rem;
  margin-top: 2rem;
}

.title {
  font-family: 'Courgette', cursive;
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
  width: 80vw;              /* ✅ corrige "vwh" → "vw" */
  margin: auto;             /* centre horizontalement et verticalement si possible */
  border-radius: 15px;
  background-color: rgb(249, 254, 255);
  min-height: max-content;  /* garde la hauteur selon le contenu */
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

.container-login-mobile {
  display: flex;
  flex-direction: column-reverse;
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
  font-family: 'Courgette', cursive;
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

.error-message,
.success-message {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 500px) {
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

    .animate__fadeInLeftBig
    .animate__fadeOutRightBig
    {
     animation-duration: 18s;  /* durée de l’animation */
     animation-delay: 9s;
  }

}
</style>
