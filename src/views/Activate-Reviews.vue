<template>
  <HeaderComponent />

  <div v-if="isModal" id="modal-container" class="modal-container">
    <div class="validation-modal">
      <p class="modal-validation-msg">voulez vous valider votre selection :</p>
      <p class="modal-validation-details">
        {{ validatedReviews.length }} review(s) validée(s) et
        {{ deletedReviews.length }} suprimée(s)
      </p>

      <div class="buttons-container">
        <button class="modal-btn btn-modal-validation" @click="modalValidation">
          valider
        </button>
        <button class="modal-btn btn-modal-cancel" @click="modalCancel">
          annuler
        </button>
      </div>
    </div>
  </div>

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
        
        @validation-button="
          handleValidationAndDeleteButtons(review.review_id, [
            'validated',
            'deleted',
          ])
        "
        @delete-button="
          handleValidationAndDeleteButtons(review.review_id, [
            'deleted',
            'validated',
          ])
        "
      />
    </div>
    <div
      class="container-selection-validation"
      @click="handleReviewsBtnActivateOrDelete()"
    >
      <div class="reviews-state-msg">
        il y a
        <span class="validate-num">{{ validatedReviews.length }}</span> reviews
        validée(s) et
        <span class="delete-num">{{ deletedReviews.length }}</span> en attentee
        de suppression
      </div>
    </div>
    <div />

    <FooterComponent class="FooterComponent" />
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import ReviewsAwaitingActivationComponent from '@/components/Reviews-awaiting-activation-component.vue';
//import { checkTokensBeforeSubmit } from "@/utils/auth.js";

// GESTION DU COMPORTEMENT A L'AJOUT ET A LA SUPPRESSION DES CARTE VIA BOUTTON A CORIGER !!!!

export default {
  name: 'ActivateReviews',
  components: {
    HeaderComponent,
    FooterComponent,
    ReviewsAwaitingActivationComponent,
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
      validatedReviews: [], // conserve la liste d'id pour valider des reviews et permetre leur publication.
      deletedReviews: [], // conserve la liste d'id pour effacer des reviews et permetre de les supprimer de la bdd.
      isModal: false,
    };
  },

  onMounted() {
    console.log('reviews from Activate Reviews :', this.reviews);
    
  },

  beforeMount() {
    this.displayReviews();
  },

  mounted() {

    this.fetchData();
    // console.log('log REVIEWS:', JSON.stringify(this.reviews));
  },

  methods: {

modalValidation: async function() {
  try {
    // Valider en premier
    if (this.validatedReviews.length > 0) {
      await this.handleValidatedSelection();
    }

    // Supprimer ensuite
    if (this.deletedReviews.length > 0) {
      await this.handleDeletedSelection();
    }

    // Recharge APRÈS les deux opérations
  
      window.location.reload();
   

  } catch (err) {
    console.error("Erreur dans modalValidation :", err);
  }
},


    modalCancel() {
      document
        .querySelectorAll('.reviews-grid, .container-selection-validation')
        .forEach((el) => {
          el.style.filter = 'blur(0px)';
        }); // Appliquer à chaque élément
      this.isModal = false;
    },

    handleReviewsBtnActivateOrDelete() {

     
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Ajoute une animation de défilement fluide
      });
      this.isModal = true;
      document
        .querySelectorAll('.reviews-grid, .container-selection-validation')
        .forEach((el) => {
          el.style.filter = 'blur(5px)';



        });

    },

    async handleValidatedSelection() {      

      try {


        /*
          const ok = await checkTokensBeforeSubmit();
          if (!ok) return; // Le token est invalide → stop*/


        const token = localStorage.getItem("accessToken"); 

        console.log("TOKEN AVANT VALIDATION ===========>>>=",token);


        const api = import.meta.env.VITE_API_URL;
        const rawValidateReviews = this.validatedReviews.slice();
        
        const url = `${api}/review/activateReviews`;


        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json', // Spécifie que le corps de la requête est en JSON
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({
            arrayWithReviewIdToActivate: rawValidateReviews,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`${result.validated},Reviews ont été validées`);
        } else {
          console.log('Erreur lors de la validation des reviews');
        } 
 

      } catch (error) {
        console.log(error);
      }
    },


    async handleDeletedSelection() {

      try {


         /* const ok = await checkTokensBeforeSubmit();
         if (!ok) return; // Le token est invalide → stop*/

        const rawDeletedReviews = this.deletedReviews.slice();
        console.log('rawDeletedReviews: ', rawDeletedReviews);

        const api = import.meta.env.VITE_API_URL;

        const url = `${api}/review/deleteReviews`;

        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', // Spécifie que le corps de la requête est en JSON
          },
          body: JSON.stringify({
            arrayWithReviewIdToDelete: rawDeletedReviews,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    },



    handleValidationAndDeleteButtons(currentReviewId, buttonFunction) {

          
      // Construire les noms de tableaux à partir des valeurs passées dans buttonFunction
      let targetArrayName = `${buttonFunction[0]}Reviews`;
      let otherArrayName = `${buttonFunction[1]}Reviews`;


      // Vérifier si les tableaux existent et sont bien des tableaux
      if (!Array.isArray(this[targetArrayName])) {
        console.error(
          `Property ${targetArrayName} is not an array or does not exist.`
        );
        return; // Arrêter l'exécution si la propriété n'est pas un tableau
      }

      if (!Array.isArray(this[otherArrayName])) {
        console.error(
          `Property ${otherArrayName} is not an array or does not exist.`
        );
        return; // Arrêter l'exécution si la propriété n'est pas un tableau
      }

      // Trouver l'index en indiquant l'identifiant courant dans le tableau cible
      const indexInCurrentArray = this[targetArrayName].indexOf(currentReviewId);

      // Trouver l'index en indiquant l'identifiant dans l'autre tableau
      const indexInOtherArray = this[otherArrayName].indexOf(currentReviewId);

      // Rechercher  la review actuelle par ID dans la collection de toutes les reviews
      const currentReview = this.reviews.find(
        (review) => review.review_id === currentReviewId

      );

      

      if (currentReview) {

        console.log("REVIEW OBJECT =", JSON.stringify(currentReview, null, 2));

        // Basculer le statut de la review actuelle
        currentReview.status = currentReview.status === buttonFunction[0] ? null : buttonFunction[0]; // buttonFonction[0] renvoi 'validated' et buttonFonction[1] => 'deleted'
        
        console.log("STATUS IMMEDIAT :", currentReview.status);

        setTimeout(() => {
  console.log("STATUS 50ms PLUS TARD :", currentReview.status);
}, 50);
      } else {
        console.error('Review not found for ID:', currentReviewId);
        return; // Arrêter l'exécution si la revue n'est pas trouvée
      }

      // Créer un ensemble combiné des deux tableaux ( activated et deleted ) pour vérifier si l'ID est déjà présent
      const combinedArrayValidateDelete = new Set([
        ...this[targetArrayName],
        ...this[otherArrayName],
      ]);

      // Vérifier si l'identifiant actuel est déjà présent dans l'un des tableaux
      const isAlreadyOnArray = combinedArrayValidateDelete.has(currentReviewId);
      console.log('isAlreadyOnArray =========>>>:', isAlreadyOnArray);


      // Si l'identifiant est déjà dans un tableau et que le statut est correct, effectuer les opérations
      if (isAlreadyOnArray && currentReview.status === buttonFunction[0]) {
        // Supprimer l'ID du tableau autre s'il est présent, le -1 ci dessous represente (false) et non la derniere place du tableau, indexInOtherArray recoit 1(true) ou -1(false) suivant si l'index est present ou non dans le tableau.
        if (indexInOtherArray !== -1) {
          this[otherArrayName].splice(indexInOtherArray, 1);
        }


        // Ajouter l'ID au tableau cible
        this[targetArrayName] = [...this[targetArrayName], currentReviewId];
        // test console.log('currentReviewId ===============>>:', currentReviewId);
        console.log(
          'After pushing, trying access to array with IDs ===>:', this[targetArrayName]
        );


      } else if (
        !isAlreadyOnArray && currentReview.status === buttonFunction[0]
      ) {
        // Ajouter l'ID au tableau cible si ce n'est pas déjà là et le statut est correct
        this[targetArrayName] = [...this[targetArrayName], currentReviewId];

        // test console.log('currentReviewId ===============>>:', currentReviewId);
        console.log(
          'After pushing, access to array ===>:',
          this[targetArrayName]
        );
      } else if (currentReview.status === null) {
        // Supprimer l'ID du tableau cible si le statut est nul
        if (indexInCurrentArray !== -1) {
          this[targetArrayName].splice(indexInCurrentArray, 1);
        }
        console.log('After removing in Else If ====>:', this[targetArrayName]);
      }

      console.log(' validated review : ',  this.validatedReviews.length );
      console.log(' deleted review : ',  this.deletedReviews.length );
    },

  

    displayReviews() {

      const stratIndex = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      const endIndex = stratIndex + this.itemsPerPage;
      return this.reviews.slice(stratIndex, endIndex);
    },

    async fetchData() {
      try {
        // perte de temps enorme ( une aprés midi ) a cause de l'url qui indiqué localhost au lieu de localhost

        const api = import.meta.env.VITE_API_URL;

        const response = await fetch( `${api}/admin/disable-reviews`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        // console.log('data: ', data);

        // console.log('DATA TEST FIND PICTURES', data);
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
             status: acc[item.review_id]?.status || null,   // ← important // status permet de determiner le style de la carte suivant son etat validate ou delete.
              pictures: [],
            };
          }
          // Ajouter l'image à la liste des images de la revue
          acc[item.review_id].pictures.push(item.secure_url);
          return acc;
        }, {});

        // Convertir l'objet reviewsMap en un tableau
        // const orderedReviewsWithPics = ;

        this.reviews = Object.values(reviewsMap);

        // Afficher le résultat
        // console.log('orderedReviewsWithPics: ', orderedReviewsWithPics);

        // test console.log('totalReviewsFromStore: ', this.totalItems);

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
 
                 
             }); */

        if (this.totalItems == 0) {
          this.pagesShown = Math.ceil(this.totalItems / this.itemsPerPage);
        }

        console.log(
          'DATA TEST FIND PICTURES',
          JSON.stringify(this.organizedPictures)
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>

<style scoped>
.modal-container {
  position: absolute;
  display: flex;
  width: 70%;
  height: 70%;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  background-color: white;
  border-radius: 25px;
  font-size: 2.3rem;
  font-family: 'Courgette';
}

.validation-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.buttons-container {
  display: flex;
}

.modal-validation-msg {
  margin-bottom: 0.5rem;
}

.modal-validation-details {
  margin: 0.5rem 0 6rem 0;
}

.modal-btn {
  display: flex;
  width: 30%;
  margin: auto;
  justify-content: center;
  align-items: center;
  height: 2rem;
  border-radius: 25px;
  border: 0.3px solid black;
  font-family: 'Courgette';
  font-size: 1.1rem;
}

.container-selection-validation {
  width: max-content;
  height: 3rem;
  padding: 1rem 1rem 0rem 1rem;
  background: linear-gradient(
    to left,
    rgb(255, 255, 255) 10%,
    rgb(204, 216, 208) 70%,
    rgb(236, 236, 236) 95%,
    rgb(211, 189, 196) 100%
  );

  position: sticky;
  bottom: 0.5rem;
  border-radius: 25px;
  margin-left: 2rem;
  border: 1px solid purple;
  cursor: pointer;
}

:deep(.card-theme) {
  width: 90%;
  writing-mode:horizontal-tb;
  position:absolute;
  display: flex;
  align-items: end;
  justify-content: flex-end;
}

:deep(.theme) {
 color: #c2b7d1;
text-shadow: inset 10px 10px 10px 5px rgba(0, 0, 0, 0.5);

}

.container-selection-validation:hover {
  background: linear-gradient(180deg, #a781e4, #7a3cac, #a77689, #5e2ad6);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 25s ease-in-out infinite;
  -moz-animation: AnimationName 25s ease-in-out infinite;
  animation: AnimationName 3s ease-in-out infinite;

  box-shadow: inset 10px 10px 10px 5px rgba(0, 0, 0, 0.5);
}

.container-selection-validation:hover .reviews-state-msg {
  color: rgb(215, 201, 233);
}

.validate-num {
  color: #1bdaa1;
}

.delete-num {
  color: #ca6178;
}

.reviews-state-msg {
  font-family: 'Courgette', cursive;
  color: rgb(143, 113, 156);
  font-size: 1.6rem;
}

.main-content-activate-review {
  overflow: hidden;
}

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
  box-shadow: inset 0 5px 15px #2b2531;
}

.validated-class {
  background: linear-gradient(
    -180deg,
    #31b175,
    #a7f0bd,
    #1bdaa1,
    #c4e0a9,
    #34d168,
    #90a6c4
  );
  background-size: 400% 400%;

  -webkit-animation: AnimationName 25s ease-in-out infinite;
  -moz-animation: AnimationName 25s ease-in-out infinite;
  animation: AnimationName 25s ease-in-out infinite;
}

.deleted-class {
  background: linear-gradient(180deg, #b12c49, #ac3c43, #a77689, #d62a2a);
  background-size: 400% 400%;

  -webkit-animation: AnimationName 25s ease-in-out infinite;
  -moz-animation: AnimationName 25s ease-in-out infinite;
  animation: AnimationName 25s ease-in-out infinite;
}

.pending-class {
  background: linear-gradient(
    20deg,
    #8aa7c9,
    #f3f2f3,
    #f4f3f7,
    #e6e5e5,
    #bac4d6
  );
  background-size: 400% 400%;

  -webkit-animation: AnimationName 25s ease-in-out infinite;
  -moz-animation: AnimationName 25s ease-in-out infinite;
  animation: AnimationName 25s ease-in-out infinite;
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

@keyframes AnimationName {
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

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 82%;
  }

  50% {
    background-position: 100% 19%;
  }

  100% {
    background-position: 0% 82%;
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 82%;
  }

  50% {
    background-position: 100% 19%;
  }

  100% {
    background-position: 0% 82%;
  }
}

@keyframes AnimationName {
  0% {
    background-position: 0% 82%;
  }

  50% {
    background-position: 100% 19%;
  }

  100% {
    background-position: 0% 82%;
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
