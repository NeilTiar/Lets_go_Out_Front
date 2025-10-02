<template>
  <div>
    {{ buttonName }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonComponent',
  props: {
    buttonName: {
      type: String,
      required: true, // si vous souhaitez que la prop soit obligatoire
    },
  },

  methods: {},
});
</script>

<style scoped>
.button-validation {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(51, 218, 154);
  height: 1.8rem;
  width: max-content;
  color: rgb(255, 255, 255);
  border-radius: 35px;
  text-align: center;
  font-size: 1.4rem;
  margin-left: 3rem;
  font-weight: 400;
  font-family: 'Courgette', cursive;
  padding: 0 1rem;
  border: 2px solid transparent;
  box-shadow: 0.1rem 9px #51ad70;
  margin-bottom: 1.5rem;
  user-select: none;
  /* Empêche la sélection du texte */
}

.button-validation:active {
  background-color: rgb(43, 238, 163);
  box-shadow: 0.2rem 5px #51ad70;
  transform: translateY(5px);
}

.button-delete {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(143, 53, 95);
  height: 1.8rem;
  width: max-content;
  color: rgb(255, 255, 255);
  border-radius: 35px;
  text-align: center;
  font-size: 1.4rem;
  margin-right: 3rem;
  font-weight: 400;
  font-family: 'Courgette', cursive;
  padding: 0 1rem;
  border: 2px solid transparent;
  box-shadow: 0.1rem 9px #ad5151;
  margin-bottom: 1.5rem;
  user-select: none;
  /* Empêche la sélection du texte */
}

.button-delete:active {
  background-color: rgb(238, 50, 43);
  box-shadow: 0.2rem 5px #94220e;
  transform: translateY(5px);
}
</style>
