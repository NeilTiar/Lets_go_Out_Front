<template>
    <div
        class="validation-card-container"
        :class="{ 'dark-mode-class': isDarkMode }"
    >   
        <h2 class="header-card detail place-name"> {{ placeName }}</h2>
        <h2 class="header-card address">{{ addressPlace }}</h2>
        <p
            class="header-card detail arrondissement"
            :class="{ 'dark-arrondissement': isDarkMode }"
        >
            {{ arrondissementTest }} eme
        </p>

        <div class="pictures-container">
            <img
                v-for="(photoUrl, index) in imageUrl"
                :key="index"
                :src="photoUrl"
                :alt="generateAltText()"
                class="card-image"
            >
        </div>
        <h3
            :class="[{ 'culture': theme === 'Culture', 'loisir': theme === 'Loisir', 'food-drink': theme === 'Food&drink' }, 'card-theme']"
        >
            {{ theme }}
        </h3>
        <div
            class="activation-card-details"
            :class="{ 'dark-card-details': isDarkMode }"
        >
            <div
                class="activation-card-info"
                :class="{ 'dark-card-info': isDarkMode }"
            >
                <p class="activation-card-description"> {{ description }}</p>

                <p class="creator-name">{{ author }}</p>
            </div>
            

            <div class="container-activation-buttons">
                <button class="activation-button">activer</button>
                <button class="delete-button">suprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    theme: String,
    arrondissementTest: String,
    placeName: String,
    imageUrl: Array,
    pictures: Array,
    author: String,
    description:String,
    addressPlace:String,
    reviews:Array
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

  watch: {
    isDarkMode(newVal) {
      console.log("test ", this.$store.state.isDarkMode, newVal);
    }
  },

  mounted() {

  },

  methods: {
   

    isDarkmodeActive() {
      console.log("test depuis un composant pour acceder a l'etat de isDarkmode depuuis le store :", this.$store.state.isDarkMode);
      this.$store.commit('toggleDarkMode');
    },

    generateAltText() {
      return `Description de l'image ${this.placeName}`;
    },

    handleMouseMove(event) {
      this.mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    },
  },
};
</script>

<style scoped>

.card-image {
  
  height: auto;
  width: 96%;
  margin: 0.1rem;
  max-width: 80%;
  object-fit: cover;

}

.pictures-container{
  
  height: auto;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));  /* 2 items per row */
   grid-auto-rows: max-content;
}

.activation-card-details {
  position: absolute;
  width: 100%;
  bottom:3rem;
}

.creator-name {
display:flex;
justify-content: flex-end;
margin-right: 1.5rem;
}


.validation-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  border:2px solid black;
  border-radius: 25px;
  width: 95%;
  height: 50em;
  margin: 1rem auto
}


.activation-card-description {
  width: 100%;
  height:max-content;
  width: 92%; 
  font-size: 1.3rem;
  padding-left: 1.2rem;
  
}

.container-activation {
  width: 100%;
  display:flex;
  justify-content:space-between;
  background-color: aquamarine;
  display: flex;
  justify-content: flex-end;
  height:4rem;
}

.container-activation-buttons {
    display:flex;
  justify-content:space-between;

  display: flex;
  justify-content: space-around;
  height:4rem;
}

.activation-card-button {
  
  display:inline-flex;
}

.activation-button, .delete-button {
border-radius:25px;
width: 30%;
}

.header-card {

  margin-left: 2rem;
}







@import url('../styles/Review-card.css');
</style>
