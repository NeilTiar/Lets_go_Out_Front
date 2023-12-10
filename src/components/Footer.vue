<template>
  <footer class="Footer">


    <div class="contact-follow">

      <div class="social-network">
        <h3 class="follow-title">suivez-nous :</h3>

        <div class="social-img">

          <button class="left-logo button-logo">
            <img src="../assets/instagram.png" alt="instagram-logo" class="contact-logo">
          </button>

          <button class="button-logo">
            <img src="../assets/facebook.png" alt="facebook-logo" class="contact-logo">
          </button>

          <button class="right-logo button-logo">
            <img src="../assets/x.png" alt="x-logo" class="contact-logo">
          </button>

        </div>
      </div>

      <div class="mail">
        <p class="contact-mail">contactez-nous :</p>
        <a href="mailto:letsgoparis@gmail.com" class="email">letsgoparis@gmail.com</a>
      </div>

    </div>


  </footer>
</template>
  
<script>

export default {
  name: 'component-footer'
};
</script>
  
  
<style scoped>
@import url('../styles/Footer.css');
</style>