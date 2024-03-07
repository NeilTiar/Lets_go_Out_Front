import { createStore } from 'vuex';

export default createStore({


    state: {

        pseudo: '', // Initialise le pseudo à une valeur par défaut
    },


    mutations: {

        setPseudo(state, pseudo) {
            state.pseudo = pseudo;
        },
    },



    actions: {

        updatePseudo({ commit }, pseudo) {
            commit('setPseudo', pseudo);
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
                Array.from(cardInfo).map(card => {
                    card.style.color = this.isDarkMode ? '#caded6' : '';

                    Array.from(cardContainer).map(card => {
                        card.style.backgroundColor = this.isDarkMode ? '#0f4044' : '';

                    })

                })
            }


            // Assurez-vous de réinitialiser la transition après la transition terminée pour éviter de l'appliquer à d'autres changements non souhaités
            setTimeout(() => {
                document.body.style.transition = '';
            }, 500);
            console.log("from func :", this.isDarkMode)

        },

    },

});