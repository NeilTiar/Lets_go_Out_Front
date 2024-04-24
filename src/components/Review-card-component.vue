<template>
    <div
        class="card-container "
        :class="{ 'dark-mode-class': isDarkMode }"
    >
        <div class="card-review">
            <img
                :src="imageUrl"
                :alt="generateAltText()"
                class="card-image"
            >
            <h3
                :class="[{ 'culture': theme === 'Culture', 'loisir': theme === 'Loisir', 'food-drink': theme === 'Food&drink' }, 'card-theme']"
            >
                {{ theme }}
            </h3>
        </div>

        <div class="card-details">
            <div
                class="card-info"
                :class="{ 'dark-card-info': isDarkMode }"
            >
                <h2 class="detail place-name"> {{ placeName }}</h2>
                <p
                    class="detail arrondissement"
                    :class="{ 'dark-arrondissement': isDarkMode }"
                >
                    {{ arrondissement }} eme
                </p>
            </div>
        </div>
    </div>
</template>

<script>

export default {

  props: {

    theme: String,
    arrondissement: String,
    placeName: String,
    imageUrl: String,
  },

  data() {
    return {
      mouseX: 0,
      mouseY: 0,

    };
  },


  computed: {

     isDarkMode() {
      return this.$store.state.isDarkMode;
      
    },

 

    carteStyle() {
      const rotateX = this.mouseY * 30;
      const rotateY = this.mouseX * 30;

      return {
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      };
    },
  },

  watch : {

    isDarkMode(newVal) {
     console.log("test ",this.$store.state.isDarkMode, newVal)
    
    }
  },

  mounted() {

    
  },


  methods: {


    isDarkmodeActive() {
      

      console.log("test depuis un composant pour acceder a l'etat de isDarkmode depuuis le store :",this.$store.state.isDarkMode)
      // Access and update the state from the Vuex store
      this.$store.commit('toggleDarkMode');
      // Your other dark mode logic here
    },

    generateAltText() {
      return `Description de l'image ${this.placeName}`;
    },
    generateTheme() {
      return `${this.theme}`;
    },
    generateUrlImage() {
      return `${this.imageUrl}`
    },
    handleMouseMove(event) {
      this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    },



  },
};


</script>

<style scoped>
@import url('../styles/Review-card.css');
</style>
