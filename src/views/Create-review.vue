<template>
    <HeaderComponent />

   
    <h2 class="title">Créer votre nouvelle review :</h2>
    <div class="container-create-review-form">
        <div class="select-theme">
            <select 
                v-model="selectedTheme"
                class="theme-select"
            >
                <option
                    disabled
                    selected
                    value=""
                    hidden
                >
                    Sélectionnez un theme
                </option>
                <option value="Food&Drinks">Food&drinks</option>
                <option value="Loisirs">Loisirs</option>
                <option value="Culture">Culture</option>
            </select>
        </div>
        <input
            class="input-place"
            type="text" 
            placeholder="Nom du lieux ou de l'établissement"
        >

        <input
            class="input-address"
            type="text" 
            placeholder="Adresse du lieux ou de l'établissement"
        >

        <input
            class="input-district"
            type="number" 
            placeholder="numero de l'arrondissement"
        >
    </div>

    <FooterComponent />
</template>

<script>


import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';





export default {

  name: 'ViewHome',
  components: {

    HeaderComponent,
    FooterComponent,

  },

  data() {

    return {
    
    isDesktop: window.innerWidth > 768,
    selectedTheme: "",

    }
  },

  computed: {



  },



  mounted() {




  },




  methods: {






  },
}

</script>

<style scoped>
/* config reset */

body {

  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: none;
}

.pagination {

  display: flex;
  justify-content: center;

}

.main-container {

  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.create-review-mobile {

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3.5%;
  background-color: rgb(137, 120, 148);
  width: max-content;
  height: 2.8rem;
  color: rgb(252, 255, 254);
  font-family: "kalam", sans-serif;
  font-size: 1.2rem;
  text-shadow: 4px 4px 3px rgba(015, 0, 0, 0.3);
  border-radius: 25px;
  font-weight: 400;
}

.header {

  width: 100vw;
}

.container-create-review-form{
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
}

.input-place,
.input-district,
.input-address {
  width: 30%;
  height:1.5rem;
  border-radius: 25px;
  margin-top: 0.7rem;
  font-size: 1.1rem;
}

.theme-select {
  width: 15%;
  height:1.9rem;
  border-radius: 25px;
  margin-top: 0.5rem;
  font-size: 1rem;
}
</style>