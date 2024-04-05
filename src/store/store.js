import { createStore } from 'vuex';
import store from '@/store/store';
export default createStore({


    state: {

        isDarkMode: false,
        pseudo: 'visitor', // Initialise le pseudo à une valeur par défaut
        store: store,
        selectedReview: null,
    },


    mutations: {


        setSelectedReview(state, review) {
            state.selectedReview = review;

               // Stockage des données dans localStorage
            localStorage.setItem('selectedReview', JSON.stringify(review));
        },

        

        setPseudo(state, pseudo) {
            state.pseudo = pseudo;
        },

        setIsDarkMode(state, isDarkMode) {

            console.log("toggleDarkMode is called");
            state.isDarkMode = isDarkMode;

        },

        toggleDarkMode(state) {
            console.log("toggleDarkMode is called");
            state.isDarkMode = !state.isDarkMode;
        },


    },



    actions: {

        updatePseudo({ commit }, pseudo) {
            commit('setPseudo', pseudo);
        },

        setIsDarkMode({ commit }, isDarkMode) {
            console.log("toggleDarkMode is called");
            commit('setIsDarkMode', isDarkMode);
        },


        isDarkmodeActive() {

            const cardInfo = document.getElementsByClassName('card-info');
            const cardContainer = document.getElementsByClassName('card-container');

            this.isDarkMode = !this.isDarkMode
            this.darkTheme = !this.darkTheme
            document.body.style.transition = 'background-color 0.5s ease';

            // Changez la couleur du fond du body
            document.body.style.backgroundColor = this.isDarkMode ? '#332939' : '';

            // Changez la couleur de fond de la card-container

            if ((cardInfo.length > 0 && cardContainer)) {

                /*  Array.from(cardInfo).map(card => {
                      card.style.color = this.isDarkMode ? '#caded6' : '';
  
                       Array.from(cardContainer).map(card => {
                           card.style.backgroundColor = this.isDarkMode ? '#0f4044' : '';
   
                       })
  
                  })*/

            }


            document.querySelector('.logo-camera').style.filter = this.isDarkMode ? 'invert(100%)' : '';
            document.querySelector('.msg-user-logo').style.filter = this.isDarkMode ? 'invert(100%)' : '';
            console.log(document.querySelector('.logo-camera'))


            // Assurez-vous de réinitialiser la transition après la transition terminée pour éviter de l'appliquer à d'autres changements non souhaités
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
            console.log("from func :", this.isDarkMode)

        },

    },

    

});