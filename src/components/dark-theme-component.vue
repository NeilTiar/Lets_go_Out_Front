<template>
  <div class="button-container">
    <button @click="toggle" :class="{ 'dark-theme-container': true, 'light-mode': isActive, 'dark-mode': !isActive }">

      <template v-if="isActive">
        <span class="light-mode-tag">Light Theme</span>
      </template>

      <template v-if="!isActive">
        <span class="dark-mode-tag">Dark Theme</span>
      </template>



      <div :class="{ 'sun-moon-container': true, 'moved-right': isActive, 'moved-left': !isActive }">
        <img v-if="isActive" src="../assets/sun.png" alt="Sun" class="sun " />
        <img v-if="!isActive" src="../assets/moon.png" alt="Moon" class="moon " />
      </div>

    </button>
  </div>
</template>

<script>

export default {

  data() {

    return {
      isActive: false,
      isRightPosition: false,
      movedButton: false,
    };
  },

  methods: {

    toggle() {
      this.isActive = !this.isActive;
      this.$emit('toggle', this.isActive);
      // Alterne l'état de déplacement du boutton dark mode
    },



  },

};
</script>

<style scoped>

button {

  display: flex;
  align-items: center;
  position: relative;
  border-radius: 25px;
  border: none;

}

.button-container {

  position: absolute;
  right: 10px;
  align-items: center;
}


.dark-mode {

  display: flex;
  justify-content: flex-end;
  background: rgb(137, 120, 148);
  color: aliceblue;
  width: auto;
  height: auto;
}


.light-mode {

  display: flex;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  width: auto;
  height: auto;
  color: rgb(137, 120, 148);
}


.right-position {
  display: inline-flex;
  justify-content: flex-end;
}


.sun {
  width: 1.7rem;
  max-height: 70%;
  border: 2.6px solid rgb(137, 120, 148);
  border-radius: 50%;
  box-shadow: -10px 3px 19px rgba(0, 0, 0, 0.5)
}

.moon {

  max-height: 70%;
  width: 1.7rem;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 10px 3px 13px rgba(0, 0, 0, 0.5)
}

.sun-moon-container {

  height: 100%;
  width: 7rem;
  transform: translateX(calc(+100% - 100px));
  transition: transform 0.4s ease-in-out;

}

.moved-right {

  transform: translateX(45px);

}

.moved-left {

  transform: translateX(calc(50% - 100px));
}

.light-mode-tag {

  font-family: "Courgette";
  font-weight: 800;
  position: absolute;
  left: 13px;

}

.dark-mode-tag {

  font-family: "Courgette";
  font-weight: 800;
  position: absolute;
  margin-right: 5px;


}
</style>

