<template>
    <HeaderComponent />
    <div>
        <div 
            v-if=" disableReviews"
            class="admin-container"
        >
            <div
               
                class="number-reviews-to-activate"
            >
                {{ disableReviews.length }}
            </div>
            <div class="activate-reviews">
                <a
                    href=""
                    class="link-activate-review"
                >en attente de validation</a>
            </div>
        </div>
    <!-- Your template content goes here -->
    </div>
</template>

<script>

import HeaderComponent from '@/components/Header-component.vue';

export default {


  name: 'AdminPage',
  // Your component logic goes here

  components : {
    HeaderComponent
  },


data() {

  return {
    
    disableReviews : [],
    
    }
},


beforeMount() {

this.fetchDisableReviews()
},

mounted() {


},


 
 methods : {

   async fetchDisableReviews() {

      try { //perte de temps enorme ( une aprés midi ) a cause de l'url qui indiqué localhost 

        

          const response = await fetch(`http://192.168.1.168:5001/review/disableReviews`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log('data from fetch on admin-page component: ', data);
          this.disableReviews = data;
          
         // console.log('totalReviewsFromStore: ', this.totalItems);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

 }

 
};
</script>

<style scoped>

.number-reviews-to-activate {

padding-top:0.5rem;
position: absolute;
right:0rem;
top:-1.2rem;
height:1.7rem;
width: 1.7rem;
border-radius: 30px;
background-color: rgb(199, 85, 85);
color:white;
font-size: 1.2rem;
text-align: center;
z-index: 4;
}

.link-activate-review {
   color:rgb(250, 255, 255);
  position:relative;
  font-family: 'Courgette',cursive;
  font-size: 1.5rem;
}

.admin-container {

  --offset:3px;
  position: relative;
  width: max-content;
  border-radius: 10px;
  padding: 1rem;
  margin:4rem 4rem;
  background-color:transparent;
  overflow: hidden;
}




.admin-container::before {
display: flex;
justify-content: center;
align-items: center;  
content:'Activate Reviews';
color:white;
font-family: 'Courgette',cursive;
font-size: 2rem;
background: rgb(148, 151, 189);
position: absolute;
top: 50%;
left: 52%;
transform: translate(-50%, -50%);
aspect-ratio: 1;
width: 90%;
height:90%;
z-index:2;
border-radius: 15px;


}


.admin-container::after {
  content:'';
  width: 200%;
  height: 200%;
  background-color: red;
  position:absolute;
  top: 0;
  background: conic-gradient( transparent 60deg,
  rgb(191, 207, 206),rgb(122, 147, 168),rgb(157, 226, 174),rgb(229, 214, 248), rgb(139, 190, 161),rgb(216, 184, 184));
  animation: rotate 5s linear infinite;
  border-radius:25px;
   filter: blur(5px);
 
}


@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }75%{

    transform: rotate(280deg);
  }100%{
transform: rotate(360deg);
    
  }
}



</style>