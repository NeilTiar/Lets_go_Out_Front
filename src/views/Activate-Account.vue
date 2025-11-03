<template>
  <HeaderComponent />

  <div class="activation-container">
    <p v-if="message">{{ message }}</p>

    <!-- Compteur -->
    <p v-if="countdown > 0">
      Redirection vers connexion dans {{ countdown }} secondes...
    </p>

    <!-- Loader simple -->
    <div v-if="loading" class="counter-loading"></div>
    <div v-if="countdown > 0" class="loader"></div>
  </div>

  <FooterComponent />
</template>

<script setup>
import FooterComponent from '@/components/Footer-component.vue';
import HeaderComponent from '@/components/Header-component.vue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const message = ref('');
const countdown = ref(0);
const loading = ref(false);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  const token = route.params.token;

  console.log("Token from URL params:", token);

  if (token) {
    loading.value = true;
    fetch(`https://localhost:5001/user/activate/${token}`)
      .then(res => res.json())
      .then(data => {
        console.log("Réponse du backend :", data);

        loading.value = false;
        message.value = "🎉 Félicitations, votre compte est actif !";
        countdown.value = 5; // nombre de secondes avant redirection

        const interval = setInterval(() => {
          countdown.value--;
          if (countdown.value <= 0) {
            clearInterval(interval);
            router.push('/Login');
          }
        }, 1000);
      })
      .catch(err => {
        loading.value = false;
        message.value = "Une erreur est survenue, merci de réessayer.";
        console.error("Erreur :", err);
      });
  }
});
</script>

<style>
.activation-container {
  text-align: center;
  margin-top: 50px;
  color: white;
  font-size: 18px;
}

/* Loader en cercle */
.counter-loading {
  margin: 20px auto;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


 
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: l1 1s infinite;
}
@keyframes l1 {to{transform: rotate(1turn)}}




</style>
