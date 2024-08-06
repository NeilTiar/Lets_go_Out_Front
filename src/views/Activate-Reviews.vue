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
                @validation-button=" handleValidationAndDeleteButtons(review.review_id,'validated')"
                @delete-button=" handleValidationAndDeleteButtons(review.review_id, 'deleted')"
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

            let targetArrayName = buttonFunction + 'Reviews'; 

            //permet de cibler la review dans le tableau reviews.

            const currentReview = this.reviews.find(review => review.review_id === currentReviewId)

            if (currentReview) {
                //test console.log("currentReview.status:", currentReview.review_id);

                // Toggle status if necessary
                currentReview.status = currentReview.status === buttonFunction ? null : buttonFunction;
                
                //test console.log("Updated Status:", currentReview.status);
            } else {
                console.error("Review not found for ID:", currentReviewId);
            }


    /* test Vérifier si `this[targetArrayName]` est bien un tableau
    if (!Array.isArray(this[targetArrayName])) {
        console.error(`Property ${targetArrayName} is not an array.`);
        return; // Sortir de la fonction si ce n'est pas un tableau.
    }*/

            // testconsole.log( "CurrentReview.status from validation Button :", currentReview.status)

            const isAlreadyOnArray = [...this[targetArrayName]].includes(currentReviewId)

            if (currentReview.status === buttonFunction && !isAlreadyOnArray) {

                

              this[targetArrayName] = [...this[targetArrayName], currentReviewId];
            console.log("After pushing:", this[targetArrayName]);



               

                 console.log("After pushing:", [...this[buttonFunction+'Reviews']])


            } else if (currentReview.status === null) {

                

                const indexInValidateReviews = this[targetArrayName].findIndex(review => review === currentReviewId)

                this[targetArrayName].splice(indexInValidateReviews, 1)
                console.log("After pushing Else If ====>:", this[targetArrayName])
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
