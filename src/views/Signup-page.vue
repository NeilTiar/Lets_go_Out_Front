<template>
  <h1 class="title">Let's go out in Paris</h1>

  <h2 class="signup-title">crée un compte</h2>

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

            <div v-if="successMessage" class="success-message">
              <p>{{ successMessage }}</p>
            </div>

            <div v-if="captchaVerified">captcha Validé !</div>
            <div v-if="captchaMissed" class="missed-captcha-msg">
              Veuillez remplir le captcha
            </div>

            <div
              class="captcha-container"
              :class="{ 'desktop-captcha-container': isDesktop }"
            >
              <recaptchaComponent
                class="recaptcha-component"
                @captcha-verification="handleCaptchaVerification"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="signup-recaptcha-protection">protection par reCaptcha</p>

    <div v-if="errorMessage" class="error-message">
      <ul>
        <li v-for="(msgError, index) in errorMessage" :key="index">
          {{ msgError }}
        </li>
      </ul>
    </div>
  </form>

  <FooterComponent />
</template>

<script setup>
// ✅ SEO : gestion du <title> et des balises meta pour la page Inscription
import { useHead } from '@vueuse/head'

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
</script>

<script>
export default {
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
      isDesktop: true
    }
  },
  methods: {
    submitForm() {
      // logique d'inscription
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
</style>
