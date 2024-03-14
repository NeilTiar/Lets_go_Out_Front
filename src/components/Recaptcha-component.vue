<template>
  <div>
    <vue-recaptcha
      ref="recaptcha"
      sitekey="YOUR_RECAPTCHA_SITE_KEY"
      @verify="onRecaptchaVerify"
    ></vue-recaptcha>
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>

import vueRecaptcha from 'vue3-recaptcha2';

export default {
  components: {
    vueRecaptcha
  },
  methods: {
    onRecaptchaVerify(response) {
      console.log('reCAPTCHA verification successful with response:', response);
      // Vous pouvez effectuer ici toute logique nécessaire après la vérification reCAPTCHA
    },
    submitForm() {
      // Vous pouvez ajouter ici la logique pour soumettre le formulaire après la vérification reCAPTCHA
      this.$refs.recaptcha.execute();
    }
  }
}
</script>
