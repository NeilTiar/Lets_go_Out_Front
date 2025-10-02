<template>
  <div v-if="showBanner" class="cookie-banner">
    <p class="cookie-text">
     Nous utilisons des cookies et d'autres technologies pour personnaliser notre contenu, mesurer l'efficacité de nos publicités et vous offrir une expérience optimisée. Certains cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés. En acceptant, vous acceptez la Politique de Let's go out en matière de cookies
    </p>
    <div class="actions">
      <button class="accept button" @click="acceptCookies">Accepter</button>
      <button class="refuse button" @click="refuseCookies">Refuser</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showBanner = ref(false);

onMounted(() => {
  const consent = localStorage.getItem("cookieConsent");
  if (consent !== "accepted") {
    showBanner.value = true; // affiche la bannière seulement si pas encore choisi
  } else if (consent === "accepted") {
    loadThirdPartyScripts();
  }
});

function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  showBanner.value = false;
  loadThirdPartyScripts();
}

function refuseCookies() {
  localStorage.setItem("cookieConsent", "refused");
  showBanner.value = false;
  console.log("Cookies non essentiels désactivés.");
}

function loadThirdPartyScripts() {
  // Exemple : Google Analytics (ligne commentée pour démo)
  const ga = document.createElement("script");
  // ga.src = "https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX"; 
  document.head.appendChild(ga);
}
</script>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #222;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 4;
}
.actions button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}
.actions button:first-child {
  background: #4caf50;
  color: white;
}
.actions button:last-child {
  background: #f44336;
  color: white;
}

.button {
border-radius: 25px;
margin: 0.3rem;
}

.cookie-text {

  font-family:var(--font-base) ;
  color: #000;
  width: 50%;
  margin: auto;
}

.cookie-banner {
  background-color: #fff;
  border-radius: 25px 25px 0 0 ;
  border: 1px solid var(--theme-header-variation);
  width: fit-content;
  margin: auto;
}

</style>
