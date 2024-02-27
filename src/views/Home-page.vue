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



        <div class="container-home-background-img">

            <img class="home-background-img" src="../assets/lgopHomePagePicture.jpg"
                alt="par une journée ensoleillée ,des cyclistes circule sur un pont avec la tour efeil en arriere plan">

        </div>

        <div class="home-title-description">


            <article>
                <p class="home-description">
                    Explorez la Ville Lumière grace à votre plateforme interactive qui vous propose de préparez vos prochaines sorties plus simplement.
                </p>
            </article>



        </div>


 

    </div>

<div class="access-reviews"><a href="main" class="home-link reviews-acces">àcceder aux reviews</a></div>


   
</template>

<script>


export default {

    name: 'HomeView', // or 'HomeContainer'
    // other component options
};
</script>

<style scoped>

.access-reviews{
    margin: 12rem 0 0 11rem ;
    height: max-content
}


.title {

    font-family: "Courgette", cursive;
    background: linear-gradient(to right, rgb(174, 218, 202), rgb(62, 24, 112));
    -webkit-background-clip: text;
    /* Safari and older versions of Chrome, Edge, and Opera */
    color: transparent;
    /* Rend le texte transparent */
    display: inline-block;
    font-size: 3.2rem;
    margin-left: 4rem;

}


.top-title-login-connexion {

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    height: 4rem;
    border-radius: 0  0 9px  6px ;

}


.home-background-img {
    position: absolute;
    background-size: cover;
    background-position: center 8rem;
    background-repeat: no-repeat;
    height: 85vh;
    z-index: -2
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
    font-family: "Courgette", cursive;
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
    margin: 8rem 0  0 1rem;
    width: 40%;
    color :#010703;
    font-size: 2.3rem;
    font-weight: 350;
    display: inline-block;
    font-family: "Poiret One", sans-serif;

}

.home-banner {

    display: flex;
    justify-content: space-between;
    z-index: 1;
    height: 2rem;

}

.home-link {

    font-size: 1.8rem;
    color: rgba(22, 182, 168, 0.534);
    font-family: "Exo 2", sans-serif;
    font-weight: 600;
   
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
    gap: 3rem;
    margin-right: 1rem;
    
}



.container-home-background-img {

    justify-content: end;
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
</style>