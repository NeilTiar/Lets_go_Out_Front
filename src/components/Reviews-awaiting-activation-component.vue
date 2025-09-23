<template>
  <div
    class="validation-card-container transition-background"
    :class="[{ 'dark-mode-class': isDarkMode }, getClassForReview(status)]"
    @validate-background="handleValidationBackgroundColor()"
    @delete-background="handleDeleteBackgroundColor()"
    @default-background="handleDefaultBackgroundColor()"
  >
    <h2 class="header-card detail place-name">{{ placeName }}</h2>
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
      />
    </div>
    <h3
      :class="[
        {
          culture: theme === 'Culture',
          loisir: theme === 'Loisir',
          'food-drink': theme === 'Food&drink',
        },
        'card-theme',
      ]"
    >
      <p class="theme">{{ theme }}</p>
    </h3>
    <div
      class="activation-card-details"
      :class="{ 'dark-card-details': isDarkMode }"
    >
      <div
        class="activation-card-info"
        :class="{ 'dark-card-info': isDarkMode }"
      >
        <p class="activation-card-description">{{ description }}</p>

        <p class="creator-name">{{ author }}</p>
      </div>

      <div class="container-activation-buttons">
        <button-component
          button-name="Valider"
          class="button-validation"
          @click="toggleValidationButton()"
        />

        <button-component
          button-name="Supprimer"
          class="button-delete"
          @click="toggleDeleteButton()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import buttonComponent from './button-component.vue';

export default {
  components: { buttonComponent },
props: {
  reviewId: { type: Number, default: null },
  theme: { type: String, default: '' },
  arrondissementTest: { type: String, default: '' },
  placeName: { type: String, default: '' },
  imageUrl: { type: Array, default: () => [] },
  pictures: { type: Array, default: () => [] },
  author: { type: String, default: '' },
  description: { type: String, default: '' },
  addressPlace: { type: String, default: '' },
  reviews: { type: Array, default: () => [] },
  status: { type: String, default: null },
},

  emits: ['validation-button', 'delete-button'],

  data() {
    return {
      isActive: false,
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
      console.log('test ', this.$store.state.isDarkMode, newVal);
    },
  },

  mounted() {},

  methods: {
    getClassForReview(status) {
      return {
        'validated-class': status === 'validated',
        'pending-class': status === null,
        'deleted-class': status === 'deleted',
      };
    },

    toggleValidationButton() {
      this.$emit('validation-button'); // Émet l'événement
    },

    toggleDeleteButton() {
      this.$emit('delete-button');
    },

    isDarkmodeActive() {
      console.log(
        "test depuis un composant pour acceder a l'etat de isDarkmode depuuis le store :",
        this.$store.state.isDarkMode
      );
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
.transition-background {
  transition: background-color 0.5s ease;
}

.theme {
  text-shadow:
    1px 0px 1px #cccccc,
    0px 1px 1px #eeeeee,
    2px 1px 1px #cccccc,
    1px 2px 1px #eeeeee,
    3px 2px 1px #cccccc,
    2px 3px 1px #eeeeee,
    4px 3px 1px #cccccc,
    3px 4px 1px #eeeeee,
    5px 4px 1px #cccccc,
    4px 5px 1px #eeeeee,
    6px 5px 1px #cccccc,
    5px 6px 1px #eeeeee,
    7px 6px 1px #cccccc;
  margin-left: -0.1rem;
  color: rgb(36, 131, 99);
}

.card-theme {
  margin-left: 0.5rem;
  font-size: 2rem;
}

.validation-button {
  background-color: brown;
}

.card-image {
  height: auto;
  max-height: 30rem;
  width: 96%;
  margin: auto;
  max-width: 80%;
  object-fit: cover;
  box-shadow: 10px 5px 10px rgb(43, 43, 43);
}

.pictures-container {
  margin-top: 4rem;
  height: auto;
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(100px, 1fr)
  ); /* 2 items per row */
  grid-auto-rows: max-content;
}

.activation-card-details {
  position: absolute;
  width: 100%;
  bottom: 1rem;
}

.creator-name {
  display: flex;
  justify-content: flex-end;
  margin: 0 1.5rem 2rem 0;
}

.validation-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: rgb(178, 171, 185);
  border-radius: 25px;
  width: 95%;
  height: 75rem;
  margin: 1rem auto;
}

.activation-card-description {
  width: 90%;
  height: max-content;
  width: 92%;
  font-size: 1.5rem;
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 1.2rem;
}

.container-activation {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: aquamarine;
  display: flex;
  justify-content: flex-end;
  height: 4rem;
}

.container-activation-buttons {
  display: flex;
  justify-content: space-between;
  height: 4rem;
  margin-top: 3.5rem;
}

.activation-card-button {
  display: inline-flex;
}

.activation-button,
.delete-button {
  border-radius: 25px;
  width: 30%;
}

.header-card {
  font-family: 'Courgette', cursive;
  margin-left: 2rem;
}

.arrondissement {
  color: black;
}

@import url('../styles/Review-card.css');
</style>
