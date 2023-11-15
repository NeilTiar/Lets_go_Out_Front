<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Courgette&display=swap" rel="stylesheet">

  <div>
    <Headers />

    <main>

      <div class="test">
      <h1>Lets Go Out Paris</h1>
    </div>
    </main>

    <Footer />

  </div>
</template>
  
<script>
import Headers from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'view-Home',
  components: {
    Headers,
    Footer
  }


};
</script>


  
<style scoped>


h1 {

  padding: 20px; /* Ajustez la taille du padding selon vos besoins */
  background-color: rgb(12, 170, 131); /* Couleur de fond du texte */
  color: azure; /* Couleur du texte */
  text-align: center; /* Centrer le texte horizontalement */
  font-family: 'Courgette', cursive;
  border: 2px black solid; /* Bordure autour du texte */
  border-radius: 10px; /* Coins arrondis pour la bordure */
  margin: 0; /* Supprimer la marge par défaut du h1 */
  padding:100px;
}
</style>