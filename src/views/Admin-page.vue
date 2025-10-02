<template>
  <HeaderComponent />

  <div class="number-reviews-to-activate">
    {{ disableReviews.length }}
  </div>
  <div class="activate-button-container">
    <div
      v-if="disableReviews"
      class="admin-container"
      @click="getActivationPage"
    >
      <div class="activate-reviews" />
    </div>
    <!-- Your template content goes here -->
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header-component.vue';

export default {
  name: 'AdminPage',
  // Your component logic goes here

  components: {
    HeaderComponent,
  },

  data() {
    return {
      disableReviews: [],
    };
  },

  beforeMount() {
    this.fetchDisableReviews();
  },

  methods: {
    async fetchDisableReviews() {
      try {
        // perte de temps enorme ( une aprés midi ) a cause de l'url qui indiqué localhost

        const response = await fetch(
          `http://localhost:5001/admin/disable-reviews`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data from fetch on admin-page component: ', data);
        this.disableReviews = data;

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
              pictures: [],
            };
          }
          // Ajouter l'image à la liste des images de la revue
          acc[item.review_id].pictures.push(item.secure_url);
          return acc;
        }, {});

        // Convertir l'objet reviewsMap en un tableau
        // const orderedReviewsWithPics = ;

        this.disableReviews = Object.values(reviewsMap);

        // console.log('totalReviewsFromStore: ', this.totalItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    getActivationPage() {
      // test console.log('click on activation button');
      this.$router.push('admin/activate-reviews');
    },
  },
};
</script>

<style scoped>
.number-reviews-to-activate {
  padding-top: 0.5rem;
  position: relative;
  right: -5rem;
  top: 1.5rem;
  height: 1.7rem;
  width: 2rem;
  border-radius: 30px;
  background-color: rgb(199, 85, 85);
  color: white;
  font-size: 1.2rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  z-index: 5;
  box-shadow: 9px 4px 25px rgb(87, 84, 84);
  animation: bounce 3.5s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.link-activate-review {
  color: rgb(250, 255, 255);
  position: relative;
  font-family: 'Courgette', cursive;
  font-size: 1.5rem;
}

.admin-container {
  position: relative;
  width: 16rem;
  height: 4rem;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 0rem 4rem;
  background-color: transparent;
  overflow: hidden;
  transition: transform 0.3s ease; /* Animation de transition */
}

.admin-container::before {
  display: flex;
  justify-content: center;
  align-items: center;
  content: 'Activate Reviews';
  color: white;
  font-family: 'Courgette', cursive;
  font-size: 2rem;
  background: rgb(164, 160, 182);
  position: absolute;
  top: 50%;
  left: 52%;
  transform: translate(-52%, -50%);
  aspect-ratio: 1;
  width: 95%;
  height: 90%;
  z-index: 2;
  border-radius: 15px;
  transition:
    background 1.3s ease-in-out,
    color 0.3s ease;
}

.admin-container:hover::before {
  background: linear-gradient(170deg, rgb(0, 255, 200), white);
  color: rgb(255, 255, 255);
}

.admin-container:hover {
  transform: scale(1.1);
}

.admin-container::after {
  content: '';
  width: 200%;
  height: 200%;
  background-color: red;
  position: absolute;
  top: 0;
  background: conic-gradient(
    transparent 60deg,
    rgb(240, 241, 241),
    rgb(163, 147, 201),
    rgb(180, 91, 121),
    rgb(229, 214, 248),
    rgb(190, 139, 139),
    rgb(216, 184, 184)
  );
  animation: rotate 5s linear infinite;
  border-radius: 25px;
  filter: blur(5px);
  box-shadow: 9px 4px 25px rgb(145, 33, 33);
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(280deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.activate-button-container {
  width: max-content;
  height: 5rem;
}

.activate-reviews {
  width: 18rem;
}
</style>
