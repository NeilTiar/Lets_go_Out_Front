<template>
    <HeaderComponent />

    <div class="message-container">
        <div class="chatRoom-title"> ChatRoom </div>
        <div v-for="(message, index) in messages" :key="index" class="user-message">
            <div v-if="message.IsAdminSender === false">
                <p>{{ message.text }}</p>
            </div>
            <div v-else class="admin-message">
                <p>{{ message.text }}</p>
            </div>
        </div>

    </div>

    <div class="container-text-input">
        <textarea class="texte" v-model="message.text" placeholder="votre message..."></textarea>
        <button @click="sendMessage">Envoyer</button>
    </div>


    <FooterComponent />
</template>

<script>
import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';

export default {
    name: 'ViewHome',
    components: {
        HeaderComponent,
        FooterComponent
    },

    data() {
        return {
            message: {
                text: "",
               IsAdminSender: this.$store.state.isAdmin,
            },
            messages: [] // Un tableau local au composant
        };
    },


    methods: {
        sendMessage() {
            if (this.message.text.trim() !== "") {

                //object.assign is used because message is an object not a simple string ,it change the reference of the object, if it was a simple string this.messages.push(this.message) would have been enough
                if (this.message.IsAdminSender === false) {
                    this.messages.push(Object.assign({}, this.message));
                } else {
                    this.message.IsAdminSender === true;
                    this.messages.push(Object.assign({}, this.message));
                };
                this.message.text = ""; // Réinitialisation après envoi

                const adminStatusFromStore = this.$store.state.isAdmin
                console.log('adminStatusFromStore: ', adminStatusFromStore);
            }
        }
    }
};




</script>

<style scoped>
.container-text-input {
    height: auto;

    display: flex;
    justify-content: center;

}

.texte {
    height: 5rem;
    width: 50%;
    border-radius: 10px;
}

.message-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    height: 60vh;
    background-color: rgb(247, 247, 247);
}

.user-message {
    background-color: rgb(121, 102, 134);
    width: fit-content;
    /* S'adapte au texte */
    max-width: 50%;
    /* Ne dépasse pas 50% du parent */
    height: max-content;
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 20px;
    color: rgb(255, 255, 255);
    text-shadow: black -2px 4px 6px;
    font-size: 1.5rem;
    display: inline-block;
    font-family: 'Courgette', cursive;
    word-wrap: break-word;
    /* Permet de couper les mots pour éviter qu'ils ne dépassent */
    overflow-wrap: break-word;
    /* Propriété similaire pour la compatibilité */
    box-shadow: 3px 2px 10px rgb(32, 23, 39);
}

.admin-message {
    background-color: rgb(255, 0, 179);
}

.chatRoom-title {

    color: rgb(17, 17, 92);
    font-family: 'Courgette', cursive;
    font-size: 1.5rem;
    font-weight: bolder;
    margin-left: 0.6rem;
}
</style>