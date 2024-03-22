<template>
  <div>
    <VueRecaptcha ref="recaptcha" :sitekey="recaptchaSiteKey" @verify="onRecaptchaVerify"></VueRecaptcha>
    <button class="signup-submit-button" @click="submitForm">Submit</button>
    
  </div>

</template>

<script>

import VueRecaptcha from 'vue3-recaptcha2';


export default {
  components: {
    VueRecaptcha
  },

  data() {
    return {
      showRecaptcha: true,
      loadingTimeout: 30000, // 30 seconds
      recaptchaSiteKey: '' // Initialisé par le backend
    };
  },

  async mounted() {
    
 // Appel pour récupérer la clé depuis le backend
  await this.fetchRecaptchaSiteKey()

 
   
    //console.log("test get site key captcha from api,() process.env ):", await this.fetchRecaptchaSiteKey());
    
  },


  methods: {

    async fetchRecaptchaSiteKey() {
      try {
        const response = await fetch('http://localhost:5001/user/siteKey', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        this.recaptchaSiteKey = data.siteKey;
        console.log("from func :", data)
       
      } catch (error) {
        console.error('Erreur lors de la récupération de la clé reCAPTCHA:', error);
      }

    },

    async onRecaptchaVerify() {

      try {

        console.log("depuis onRecaptchaVerify ")

         this.$emit('captcha-verification', true);

        const result = await fetch('http://localhost:5001/captcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (result.success) {

          this.$emit('captcha-verification', true);
        
          // Le captcha est valide, continuer avec le traitement
          console.log(result.message);
        } else {
          // Le captcha est invalide
          console.log(result);
          // Réinitialiser le captcha
       
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du CAPTCHA :', error);
        // Gérer l'erreur
      }
    },


    resetCaptcha() {
      // Réinitialiser le captcha en cas d'expiration ou d'échec
      this.$refs.vueRecaptcha.reset();
    },

    
    handleCaptchaError(error) {
      console.error('Erreur lors de la validation du CAPTCHA :', error);
      // Gérer l'erreur
    }
  }
};
</script>

<style>

.signup-submit-button {
height:3.3rem;
width:65%;
background-color: rgb(171, 146, 202);
border-radius: 15px;
font-size: 1.5rem;
display: flex;
align-items: center;
justify-content: center;
margin:1.5rem auto;
}

</style>