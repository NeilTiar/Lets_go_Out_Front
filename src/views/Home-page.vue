<template>
  <title>
    Découvrez les meilleurs endroits à Paris avec Let's Go Out in Paris
  </title>

  <div class="main">
    <div class="top-title-login-connexion">
      <h1 class="title">Let's go out in paris</h1>

      <div class="right-link">
        <a href="signup" class="home-link registration">Inscription</a>
        <a href="login" class="home-link connexion">S'identifier</a>
      </div>
    </div>

    <div class="container-img">
      <video
        preload="auto"
        class="home-background-img"
        src="../../public/home_video/Paris_LGOP.mp4"
        autoplay
        loop
        muted
      >
        Votre navigateur ne supporte pas la vidéo. Vidéo description : par une
        journée ensoleillée, des cyclistes circulent sur un pont avec la tour
        Eiffel en arrière-plan.
      </video>

      <div class="home-title-description">
        <article>
          <p class="home-description">
            Explorez la Ville Lumière grace à votre plateforme interactive qui
            vous propose de préparez vos prochaines sorties plus simplement.
          </p>
        </article>
      </div>
    </div>
  </div>

  <div class="access-reviews">
    <a
      href="main"
      class="home-link reviews-acces"
      @click="checkTokensBeforeSubmit"
      >acceder aux reviews</a
    >
  </div>
</template>

<script>
import { checkTokensBeforeSubmit } from '../utils/jwt/CheckTokens.ts';

export default {
  name: 'HomeView', // or 'HomeContainer'
  // other component options

  methods: {
    checkTokensBeforeSubmit,
  },
};
</script>

<style scoped>
@media screen and (min-width: 600px) {
  .access-reviews {
    margin: 12rem 0 0 11rem;
    height: max-content;
  }

  .title {
    font-family: 'Courgette', cursive;
    background: linear-gradient(to right, rgb(174, 218, 202), rgb(62, 24, 112));
    -webkit-background-clip: text;
    /* Safari and older versions of Chrome, Edge, and Opera */
    color: transparent;
    /* Rend le texte transparent */
    display: inline-block;
    font-size: 5.2rem;
    margin-left: 3rem;
    padding-right: 1rem;
  }

  .top-title-login-connexion {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    height: 4rem;
    border-radius: 0 0 9px 6px;
  }

  .home-background-img {
    position: absolute;
    background-size: cover;
    background-position: center 8rem;
    background-repeat: no-repeat;
    height: 85vh;
    z-index: -2;
    object-fit: cover;
  }

  .home_title-description-container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .home-title-description {
    position: relative;
    margin-top: 5rem;
    font-family: 'Times New Roman', Times, serif;
    color: rgb(255, 255, 255);
    font-weight: bold;
    text-shadow: 1px 0.5px 0.6px rgb(193, 187, 204);
    z-index: 1;
  }

  .home-title {
    font-size: 2.5rem;
    font-family: 'Courgette', cursive;
    color: rgb(29, 138, 120);
    margin: 0;
    padding: 0;
  }

  .home-description {
    margin-top: 4rem;
    width: 80%;
    text-align: center;
  }

  article {
    justify-content: start;
    align-items: center;
    margin: 8rem 0 0 1rem;
    width: 40%;
    color: #010703;
    font-size: 2.3rem;
    font-weight: 350;
    display: inline-block;
    font-family: 'Poiret One', sans-serif;
  }

  .home-banner {
    display: flex;
    justify-content: space-between;
    z-index: 1;
    height: 2rem;
  }

  .home-link {
    font-size: 1.7rem;
    color: rgba(4, 250, 147, 0.836);
    font-family: 'Exo 2', sans-serif;
    font-weight: 800;
    text-shadow: none;
    transition: all 0.2s ease-in-out;
  }

  .home-link:hover {
    font-size: 2.6rem;
    background: linear-gradient(
      90deg,
      rgb(60, 197, 128),
      rgb(163, 147, 201),
      rgb(59, 170, 114),
      rgb(52, 22, 92),
      rgb(132, 61, 173),
      rgb(60, 197, 128)
    );
    background-size: 200% 200%;
    /* Permet d'avoir assez de "matériau" pour animer */
    background-clip: text;
    -webkit-background-clip: text;
    /* Nécessaire pour Safari */
    color: transparent;
    /* Le texte devient transparent pour révéler le fond en dégradé */
    animation: gradientMove 2s linear infinite;
    /* Ajoute l'animation du dégradé */
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 0%;
    }

    100% {
      background-position: 100% 0%;
    }
  }

  header {
    margin-top: 16rem;
  }

  .bienvenu {
    text-align: center;
    font-size: 3rem;
  }

  .right-link {
    display: flex;
    gap: 4rem;
    margin-right: 4rem;
  }

  .registration,
  .connexion {
    color: rgb(49, 20, 95);
  }

  .container-home-background-img {
    justify-content: flex-end;
    border-radius: 15px 0 0 15px;
    margin-top: 3rem;
  }

  .container-home-background-img ::before {
    background-image: url('../assets/lgopHomePagePicture.jpg');
  }

  .home-background-img {
    margin-top: 6rem;
    position: absolute;
    border-radius: 25px 0 0 25px;
    width: 65%;
    height: 65%;
    right: 0;
    z-index: -2;
  }
}

/* ////////////////////////////////////  mobile and tabs css style /////////////////////////////////////////////////////// */

@media screen and (max-width: 1300px) {
  .access-reviews {
    margin: 1rem 0 0 4rem;
    font-size: 0.7rem;
  }
}

@media screen and (max-width: 500px) {
  .title {
    font-family: 'Courgette', cursive;
    background: linear-gradient(to right, rgb(174, 218, 202), rgb(62, 24, 112));
    -webkit-background-clip: text;
    /* Safari and older versions of Chrome, Edge, and Opera */
    color: transparent;
    /* Rend le texte transparent */
    display: inline-block;
    font-size: 2.8rem;
    margin: 1rem auto 0 auto;
  }

  .top-title-login-connexion {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .home-background-img {
    position: relative;
    display: flex;
    margin: 0 0 2rem auto;
    border-radius: 9px 0 0 9px;
    width: 97vw;
    height: 40vh;
    object-fit: cover;
  }

  .right-link {
    margin: 2rem 1.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    font-family: 'Courgette', cursive;
  }

  .home-description {
    font-size: clamp(0.8rem, 1.5rem, 2rem);
    margin-top: 2rem;
    width: 80%;
    text-align: center;
  }

  article {
    display: flex;
    justify-content: center;
    font-family: 'Poiret One', sans-serif;
    height: max-content;
  }

  .home-link {
    font-family: 'Exo 2', sans-serif;
    color: rgb(88, 71, 88);
    font-weight: bolder;
  }

  .access-reviews {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    font-size: 1.7rem;
  }

  .reviews-access {
    color: rgb(59, 170, 114);
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 33% 0%;
    }

    50% {
      background-position: 90% 100%;
    }

    100% {
      background-position: 30% 0%;
    }
  }

  @-moz-keyframes AnimationName {
    0% {
      background-position: 11% 0%;
    }

    50% {
      background-position: 90% 100%;
    }

    100% {
      background-position: 11% 0%;
    }
  }
}
</style>
