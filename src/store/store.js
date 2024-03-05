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
    },

});