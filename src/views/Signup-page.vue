<template>
  <h1 class="title">Let's go out in Paris</h1>


  <form action="" class="signup-form" @submit.prevent="submitForm">


    <div
      :class="{
        'container-mobile-form': !isDesktop,
        'container-desktop-form': isDesktop,
      }"
    >
      <div :class="{ 'fields-container': isDesktop }">
        <div :class="{ 'left-part-form': isDesktop }">
          <div :class="{ 'container-left-part-form': isDesktop }">
                  <h2 class="signup-title">crée un compte</h2>
            <h3 class="signup-form-tag">informations relatives à votre compte</h3>

            <input
              v-model="pseudo"
              class="signup-input last-name-input"
              type="text"
              required
              placeholder="pseudo"
            />

            <input
              v-model="email"
              class="signup-input email-input"
              type="text"
              required
              placeholder="email"
            />

            <input
              v-model="checkVerifyEmail"
              class="signup-input checkVerifyEmail-input"
              type="text"
              required
              placeholder="verification email"
            />

            <input
              v-model="password"
              class="signup-input password-input"
              type="password"
              required
              placeholder="mot de passe"
            />

            <input
              v-model="passwordConfirmation"
              class="signup-input password-input"
              type="password"
              required
              placeholder="confirmation du mdp"
            />

            <h3 class="signup-form-tag">Mon Adresse</h3>

            <input
              v-model="street_name"
              class="signup-input adress-input"
              type="text"
              required
              placeholder="Adresse"
            />

            <input
              v-model="city"
              class="signup-input city-input"
              type="text"
              required
              placeholder="Ville"
            />

            <input
              v-model="postal_code"
              class="signup-input last-name-input"
              type="number"
              required
              placeholder="Code-postal"
            />
          </div>
        </div>

        <div :class="{ 'right-part-form': isDesktop }">
          <div :class="{ 'container-right-part-form': isDesktop }">
            <h3 class="signup-form-tag">Mes informations personnelles</h3>

            <select
              id="gender-select"
              v-model="gender"
              required
              title="select a gender"
            >
              <option value="" disabled selected>Genre</option>
              <option value="M">M</option>
              <option value="Mme">Mme</option>
              <option value="Mlle">Mlle</option>
              <option value="Autre">Autre</option>
            </select>

            <input
              v-model="firstname"
              class="signup-input first-name-input"
              type="text"
              required
              placeholder="Nom"
            />

            <input
              v-model="lastname"
              class="signup-input last-name-input"
              type="text"
              required
              placeholder="Prenom"
            />

            <input
              v-model="phone"
              class="signup-input phone-input"
              type="number"
              required
              placeholder="Numéro de téléphone"
            />

                <div v-if="errorMessage" class="error-message">
      <ul>
        <li v-for="(msgError, index) in errorMessage" :key="index">
         - {{ msgError }}
        </li>
      </ul>
    </div>


      <recaptchaComponent
                class="recaptcha-component"
                @captcha-verification="handleCaptchaVerification"
                @submit-request="submitForm , console.log('recaptcha passed by signup with $emit')"
              />

            <div v-if="successMessage" class="success-message">
              <p>{{ successMessage }}</p>
            </div>

            <div v-if="captchaVerified">captcha Validé !</div>
            <div v-if="captchaMissed" class="missed-captcha-msg">
              Veuillez remplir le captcha
            </div>

             <ModalSignup 
  :show="successMessage.length > 0"
  :message="successMessage" 
  @close="successMessage = 'fermer'"
/>

            <div
              class="captcha-container"
              :class="{ 'desktop-captcha-container': isDesktop }"
            >

            

<button type="submit" class="signup-submit-button" @click="submitForm, console.log('submit form clicked')">
  Submit
</button>


            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="signup-recaptcha-protection">protection par reCaptcha</p>


  </form>

  <FooterComponent />
</template>

<script >
// SEO : gestion du <title> et des balises meta pour la page Inscription
import { useHead } from '@vueuse/head'
import FooterComponent from '../components/Footer-component.vue'
import recaptchaComponent from '../components/Recaptcha-component.vue'
import ModalSignup from '../components/Modal-Signup.vue';


export default {

 components: {
    recaptchaComponent,
    ModalSignup,
    FooterComponent
  },

  name: 'SignupView',
  data() {
    return {
      pseudo: '',
      email: '',
      checkVerifyEmail: '',
      password: '',
      passwordConfirmation: '',
      street_name: '',
      city: '',
      postal_code: '',
      gender: '',
      firstname: '',
      lastname: '',
      phone: '',
      successMessage: '',
      errorMessage: null,
      captchaVerified: false,
      captchaMissed: false,
      isDesktop: window.innerWidth > 768 // true si largeur > 768px
    }
  },

  
setup() {
useHead({
  title: "Inscription - Let's Go Out in Paris",
  meta: [
    {
      name: 'description',
      content:
        "Créez un compte sur Let's Go Out in Paris pour découvrir, partager et organiser vos sorties dans la Ville Lumière."
    },
    // Open Graph pour un partage optimisé
    { property: 'og:title', content: "Inscription - Let's Go Out in Paris" },
    { property: 'og:description', content: "Rejoignez notre communauté et explorez Paris autrement grâce à Let's Go Out in Paris." },
    { property: 'og:type', content: 'website' }
  ]
})
},

  methods: {

   async submitForm() {
  
    console.log('submitForm called');

      try {
        // Utilisation de la fonction fetch pour envoyer une requête POST à votre API
        const response = await fetch(`https://localhost:5001/user/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            email: this.email,
            password: this.password,
            pseudo: this.pseudo,
            gender: this.gender,
            checkVerifyEmail: this.checkVerifyEmail,
            password: this.password,
            passwordConfirmation: this.passwordConfirmation,
            firstname: this.firstname,
            lastname: this.lastname,
            phone: this.phone, 
            street_name: this.street_name,
            city: this.city,  
            postal_code: this.postal_code
          }),
        });

        const data = await response.json(); 
       

        if (response.ok) {
          // Si la réponse est OK, traiter les données reçues
          this.errorMessage = null;
          this.successMessage = data.successMessage;
          // Rediriger ou effectuer d'autres actions après une connexion réussie
          console.log('Inscription réussie :', data);

        } else {
          // Si la réponse n'est pas OK, afficher les erreurs
          this.errorMessage = data.msgError || ['Une erreur est survenue lors de la connexion.'];
          console.error('Erreur lors de la connexion :', data.msgError);
        }
      } catch (error) {
        console.error('Erreur réseau ou serveur :', error); 
      }
    },
    handleCaptchaVerification(status) {
      this.captchaVerified = status
      this.captchaMissed = !status
    }
  }
}
</script>



<style scoped>
@import '../styles/signup-style.scss';

.missed-captcha-msg {
  color: red;
  font-size: 1.3rem;
}

.error-message {
  list-style-type: none;
  color: var(--feedback-error);
  font-size: 0.8rem;
  font-family: Arial, Helvetica, sans-serif;
  padding: 2rem;
  

}

ul li, ol li {
  list-style: none;
  margin: 1rem;
}

.recaptcha-component {
margin-top: 1rem;

}
</style>
