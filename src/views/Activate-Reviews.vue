<template>
    <HeaderComponent />

    <div class="main-content-activate-reviews">
        <div class="reviews-grid">
            <ReviewsAwaitingActivationComponent
                v-for="review in reviews"
                :key="review.review_id"
                :theme="review.theme"
                :arrondissement-test="review.district_num"
                :place-name="review.place_name"
                :image-url="review.pictures"
                :author="review.author"
                :description="review.review"
                :address-place="review.address_place"
                :status="review.status"
                :review-id="review.review_id"
                @validation-button=" handleValidationAndDeleteButtons(review.review_id, ['validated', 'deleted'])"
                @delete-button=" handleValidationAndDeleteButtons(review.review_id, ['deleted', 'validated'])"
            />
        </div>
        <div />

        <FooterComponent class="FooterComponent" />
    </div>
</template>

<script>

import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import ReviewsAwaitingActivationComponent from '@/components/Reviews-awaiting-activation-component.vue';


// GESTION DU COMPORTEMENT A L'AJOUT ET A LA SUPPRESSION DES CARTE VIA BOUTTON A CORIGER !!!!

export default {

    name: 'ActivateReviews',
    components: {
        HeaderComponent,
        FooterComponent,
        ReviewsAwaitingActivationComponent

    },

    data() {
        return {
            reviews: [],
            totalItems: 0,
            pagesShown: 0,
            itemsPerPage: 10, // Define your items per page
            currentPage: 1, // Add currentPage to your data properties
            organizedPictures: {},
            cards: [],
            validate: [], //conserve la liste d'id pour valider des reviews et permetre leur publication.
            delete: [], //conserve la liste d'id pour effacer des reviews et permetre de les supprimer de la bdd.
            validatedReviews: [],
            deletedReviews: [],
        };
    },

    onMounted() {

        console.log("reviews from Activate Reviews :", this.reviews)
    },


    beforeMount() {
        this.displayReviews()
    },

    mounted() {
        this.fetchData()
        console.log('log REVIEWS:', JSON.stringify(this.reviews));

    },


    methods: {


    handleValidationAndDeleteButtons(currentReviewId, buttonFunction) {

    // Construire les noms de tableaux à partir des valeurs passées dans buttonFunction
    let targetArrayName = `${buttonFunction[0]}Reviews`;
    let otherArrayName = `${buttonFunction[1]}Reviews`;


    // Vérifier si les tableaux existent et sont bien des tableaux
    if (!Array.isArray(this[targetArrayName])) {
        console.error(`Property ${targetArrayName} is not an array or does not exist.`);
        return; // Arrêter l'exécution si la propriété n'est pas un tableau
    }

    if (!Array.isArray(this[otherArrayName])) {
        console.error(`Property ${otherArrayName} is not an array or does not exist.`);
        return; // Arrêter l'exécution si la propriété n'est pas un tableau
    }

    // Trouver l'index en indiquant l'identifiant courant dans le tableau cible
    const indexInCurrentArray = this[targetArrayName].indexOf(currentReviewId);

    // Trouver l'index en indiquant l'identifiant dans l'autre tableau
    const indexInOtherArray = this[otherArrayName].indexOf(currentReviewId);

    // Rechercher  la review actuelle par ID dans la collection de toutes les reviews
    const currentReview = this.reviews.find(review => review.review_id === currentReviewId);

    if (currentReview) {
        // Basculer le statut de la review actuelle
        currentReview.status = currentReview.status === buttonFunction[0] ? null : buttonFunction[0]; // buttonFonction[0] renvoi 'validated' et buttonFonction[1] => 'deleted'
    } else {
        console.error("Review not found for ID:", currentReviewId);
        return; // Arrêter l'exécution si la revue n'est pas trouvée
    }

    // Créer un ensemble combiné des deux tableaux ( activated et deleted ) pour vérifier si l'ID est déjà présent
    const combinedArrayValidateDelete = new Set([
        ...this[targetArrayName],
        ...this[otherArrayName]
    ]);

    // Vérifier si l'identifiant actuel est déjà présent dans l'un des tableaux
    const isAlreadyOnArray = combinedArrayValidateDelete.has(currentReviewId);
    console.log('isAlreadyOnArray:', isAlreadyOnArray);


    // Si l'identifiant est déjà dans un tableau et que le statut est correct, effectuer les opérations
    if (isAlreadyOnArray && currentReview.status === buttonFunction[0]) {

        // Supprimer l'ID du tableau autre s'il est présent, le -1 ci dessous represente (false) et non la derniere place du tableau, indexInOtherArray recoit 1(true) ou -1(false) suivant si l'index est present ou non dans le tableau.
        if (indexInOtherArray !== -1) {
            this[otherArrayName].splice(indexInOtherArray, 1);
        }

        // Ajouter l'ID au tableau cible
        this[targetArrayName].push(currentReviewId);
       //test console.log('currentReviewId ===============>>:', currentReviewId);
       //test console.log("After pushing, trying access to array with IDs ===>:", this[targetArrayName]);

    } else if (!isAlreadyOnArray && currentReview.status === buttonFunction[0]) {  

    // Ajouter l'ID au tableau cible si ce n'est pas déjà là et le statut est correct
     this[targetArrayName] = [...this[targetArrayName], currentReviewId];

     //test console.log('currentReviewId ===============>>:', currentReviewId);
      //test console.log("After pushing, access to array ===>:", this[targetArrayName]);

    } else if (currentReview.status === null) {
        // Supprimer l'ID du tableau cible si le statut est nul
        if (indexInCurrentArray !== -1) {
            this[targetArrayName].splice(indexInCurrentArray, 1);
        }
      //test console.log("After removing in Else If ====>:", this[targetArrayName]);
    }
},


        handleDeleteButon(currentReviewId) {


            const currentReview = this.reviews.find(review => review.review_id === currentReviewId)

            if (currentReview) {
                currentReviewId
                //test console.log("currentReview.status:", currentReview.review_id);

                // Toggle status if necessary
                currentReview.status = currentReview.status === 'deleted' ? null : 'deleted';
                //test console.log("Updated Status:", currentReview.status);
            } else {
                console.error("Review not found for ID:", currentReviewId);
            }

            console.log("CurrentReview.status from delete Button:", currentReview.status)
        },


        displayReviews() {

            const stratIndex = (this.currentPage * this.itemsPerPage) - this.itemsPerPage
            const endIndex = stratIndex + this.itemsPerPage
            return this.reviews.slice(stratIndex, endIndex)
        },




        async fetchData() {



            try { //perte de temps enorme ( une aprés midi ) a cause de l'url qui indiqué localhost au lieu de 192.168.1.168



                const response = await fetch(`http://192.168.1.168:5001/admin/disable-reviews`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('data: ', data);

                console.log('DATA TEST FIND PICTURES', data);
                this.totalItems = data.length;

                const totalRviewsFromStore = this.$store.state.totalReviews;

                this.totalItems = totalRviewsFromStore;

                // Utiliser un objet pour regrouper les données par review_id
                const reviewsMap = data.reduce((acc, item) => {
                    if (!acc[item.review_id]) {
                        acc[item.review_id] = {
                            review_id: item.review_id,
                            place_name: item.place_name,
                            review: item.review,
                            district_num: item.district_num,
                            creator_name: item.creator_name,
                            is_active: item.is_active,
                            author: item.creator_name,
                            theme: item.theme,
                            address_place: item.adress_place,
                            status: null, //status permet de determiner le style de la carte suivant son etat validate ou delete.
                            pictures: []
                        };
                    }
                    // Ajouter l'image à la liste des images de la revue
                    acc[item.review_id].pictures.push(item.secure_url);
                    return acc;
                }, {});



                // Convertir l'objet reviewsMap en un tableau
                // const orderedReviewsWithPics = ;

                this.reviews = Object.values(reviewsMap)

                // Afficher le résultat
                //console.log('orderedReviewsWithPics: ', orderedReviewsWithPics);



                //test console.log('totalReviewsFromStore: ', this.totalItems);

                /*  this.reviews.forEach(review => {
 
                 if (!this.organizedPictures[review.review_id]) {
 
                     this.organizedPictures[review.review_id] = [];
                }//if(review.is_main_picture){
                // this.organizedPictures[review.review_id].unshift(review.secure_url)
                 }
                 if( review.is_main_picture ){
 
                 //la props a alimenter /la clé dans le tableau/la valeur avec methode unshift pour placer en premier dans le tableau ( index[0]) 
                 this.organizedPictures[review.review_id].unshift(review.secure_url);
                 }else {
                  this.organizedPictures[review.review_id].push(review.secure_url);
                 }
 
                 return this.organizedPictures[review.review_id]
 
                 
             });*/





                if (this.totalItems == 0) {

                    this.pagesShown = Math.ceil(this.totalItems / this.itemsPerPage);


                }

                console.log('DATA TEST FIND PICTURES', JSON.stringify(this.organizedPictures));


            } catch (error) {
                console.error('Error fetching data:', error);
            }




        }

    }



}





</script>

<style scoped>
.FooterComponent {

    flex: 1;
}

.reviews-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    /* 2 items per row */

}

.validation-card-container {
    transition: background-color 25s ease-in-out;
}

.validated-class {
    background: linear-gradient(180deg, #259b77, #c1e2d8, #63bb92, #55bba5, #eef5f1);
    background-size: 200% 250%;

    -webkit-animation: AnimationName 25s ease-in-out infinite;
    -moz-animation: AnimationName 25s ease-in-out infinite;
    animation: AnimationName 25s ease-in-out infinite;
}

.deleted-class {
    background: linear-gradient(-180deg, #8a224d, #a50052, #96778d, #960454, #cabcc6, #5c3455);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 25s ease-in-out infinite;
    -moz-animation: AnimationName 25s ease-in-out infinite;
    animation: AnimationName 25s ease-in-out infinite;
}


.pending-class {


    background: linear-gradient(20deg, #9cb9a1, #a5b5d8, #cec8e6, #a5b5d8, #8ea7d4);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 25s ease-in-out infinite;
    -moz-animation: AnimationName 25s ease-in-out infinite;
    animation: AnimationName 25s ease-in-out infinite;
}

@-webkit-keyframes AnimationName {
    0% {
        background-position: 33% 0%
    }

    50% {
        background-position: 90% 100%
    }

    100% {
        background-position: 30% 0%
    }
}

@-moz-keyframes AnimationName {
    0% {
        background-position: 11% 0%
    }

    50% {
        background-position: 90% 100%
    }

    100% {
        background-position: 11% 0%
    }
}

@keyframes AnimationName {
    0% {
        background-position: 11% 0%
    }

    50% {
        background-position: 90% 100%
    }

    100% {
        background-position: 11% 0%
    }
}


@-webkit-keyframes AnimationName {
    0% {
        background-position: 0% 82%
    }

    50% {
        background-position: 100% 19%
    }

    100% {
        background-position: 0% 82%
    }
}

@-moz-keyframes AnimationName {
    0% {
        background-position: 0% 82%
    }

    50% {
        background-position: 100% 19%
    }

    100% {
        background-position: 0% 82%
    }
}

@keyframes AnimationName {
    0% {
        background-position: 0% 82%
    }

    50% {
        background-position: 100% 19%
    }

    100% {
        background-position: 0% 82%
    }
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
</style>
