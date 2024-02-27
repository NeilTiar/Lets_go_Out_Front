<template>
    <title>
        Découvrez les meilleurs endroits à Paris avec Let's Go Out in Paris
    </title>

    <div class="main">

        <div class="home-banner">
            <div class="home-link left-link">
                <a href="main" class="home-link reviews-acces">àcceder aux reviews</a>
            </div>
            <div class="right-link">
                <a href="../static_html/signup.html" class="home-link registration">inscription</a>
                <a href="../static_html/login.html" class="home-link connexion">connection</a>
            </div>
        </div>


        <div class="home_title-description-container">





            <div class="home_title-description">

                <header>
                    <p class="bienvenu">bienvenu sur </p>
                    <h1 class="home-title"> Let's Go Out in Paris</h1>
                </header>

                <article>
                    <p class="home-description">
                        Explorez la Ville Lumière comme jamais auparavant avec notre
                        plateforme interactive qui vous révèle les trésors cachés et les
                        joyaux de Paris. "Let's Go Out in Paris" vous offre une expérience
                        unique pour découvrir la vie parisienne d'une manière captivante.
                    </p>

                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeView', // or 'HomeContainer'
    // other component options
};
</script>

<style>


.main {

    background-image: url(../assets/lgopHomePagePicture.jpg);
    background-size: cover;
}

.home_title-description-container {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%
}



.home_title-description {

    font-family: "Courgette", cursive;
    height: 100vh;
    width: 60%;
    color: rgb(255, 255, 255);
    font-weight: bold;
    text-shadow: 1px 0.5px 4px rgb(25, 10, 54);
}

.home-title {
    font-size: 5rem;
    text-align: center;
}

.home-description {
    text-align: center;
    font-size: 2rem;
}

.home-banner {

    display: flex;
    justify-content: space-between;
    z-index: 1;

}

.home-link {
    font-size: 1.8rem;
    color: white;
    text-shadow: 1px 0.5px 4px rgb(25, 10, 54);
    font-weight: 600;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto
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
    gap: 1rem;
    margin-right: 1rem;
}

.reviews-acces {

    margin-left: 1rem;
}
</style>