<!-- ci dessous composant specifique permetant le point d'entrée principal pour l'aplication -->

<!-- App.vue -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
</style>
