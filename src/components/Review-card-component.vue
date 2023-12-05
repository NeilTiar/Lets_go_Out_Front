<template>
  <div class="card-container">

    <div class="card-review">
      <img :src="require(`@/assets/photos-reviews/${imageUrl}`)" :alt="generateAltText()" class="card-image" />
      <h3
        :class="[{ 'culture': this.theme === 'Culture', 'loisir': this.theme === 'Loisir', 'food-drink': this.theme === 'Food&drink' }, 'card-theme']">

        {{ this.theme }}
      </h3>
    </div>

    <div class="card-details">

      <div class="card-info">

        <p class="detail place-name"> {{ placeName }}</p>
        <p class="detail arrondissement">{{ arrondissement }} eme</p>
      </div>

    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      mouseX: 0,
      mouseY: 0,
      
    };
  },
  computed: {
    carteStyle() {
      const rotateX = this.mouseY * 30;
      const rotateY = this.mouseX * 30;

      return {
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      };
    },
  },

  props: {
    theme: String,
    arrondissement: String,
    placeName: String,
    imageUrl: String,
  },


  methods: {

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
