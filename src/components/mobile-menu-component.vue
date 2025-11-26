<template>
  <div class="mobile-user-menu" v-if="isUserMenu ">
      <button class="close-button" @click="$emit('close')">X</button>
        <div class="mobile-user-menu-content">
        <nav class="mobile-nav-links">
            <ul>
            <li><a class="food" href="#Food&Drink" @click="$emit('close')">Food&Drink</a></li>
            <li><a class="culture" href="#Culture" @click="$emit('close')">Culture</a></li>
            <li><a class="loisir" href="#Loisir" @click="$emit('close')">Loisir</a></li>
            <li><a href="#Favorites" @click="$emit('close')">mes coups de coeur</a></li>
            <li><a href="#Activation-Review" @click="$emit('close')">Activation des Reviews</a></li>
            </ul>
        </nav>
        </div>
    </div>  
</template>


<script>

///////////////////////component call exemple with transition //////////////////////////////

/*

<transition name="fade-menu">
  <MobileMenuComponent 
    :is-user-menu="userMenu" 
    @close="userMenu = false" 
    ></MobileMenuComponent>
</transition>  

*/

//////////////////////// animation Style need to be in the parent component ///////////////////////

/* 

.fade-menu-enter-active,
.fade-menu-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.fade-menu-enter-from,
.fade-menu-leave-to {
  opacity: 0;
  transform: translateZ(45px);
}


*///////////////////////////////////////////////////////////////////////////////////////////////


export default {
  name: "MobileMenuComponent",
  props: {
    isUserMenu: {
      type: Boolean,
      required: true,
    },
  },
};      

</script>

<style scoped>

.mobile-user-menu {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(46, 12, 70, 0.349);
  /* Couleur de fond semi-transparente */
  backdrop-filter: blur(15px);
  /* Applique un flou */
  overflow-y: hidden;
  z-index: 4;
}

.mobile-user-menu-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

.mobile-nav-links ul {
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 80px;
    width: 100%;
}

li {
   
    list-style: none;
    font-family: var(--font-title);
    
}

a {
    text-decoration: none;
    color: var(--color-text-dark);
    font-size: 2rem;
}

a.food {
    color: #ca8686;
}

a.culture {
    color: #c9bc7e;
}

a.loisir {
    color: #9e94c2;
}

.close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    font-size: 2.5rem;
    cursor: pointer;
    color:#fff;
    font-family: var(--font-title);
}



</style>
