<template>
    <HeaderComponent />


    <h2 class="title">Créer votre nouvelle review :</h2>

    <div class="container-create-review-form">
        <form
            class="create-form"
            @submit.prevent="submitForm"
        >
            <div class="select-theme">
                <select
                    v-model="formData.selectedTheme"
                    class="theme-select"
                >
                    <option
                        disabled
                        selected
                        value=""
                        hidden
                    >
                        Sélectionnez un theme
                    </option>
                    <option value="Food&Drinks">Food&drinks</option>
                    <option value="Loisirs">Loisirs</option>
                    <option value="Culture">Culture</option>
                </select>
            </div>

            <input
                v-model="formData.placeName"
                class="input-place"
                type="text"
                placeholder="Nom du lieux ou de l'établissement"
            >

            <input
                v-model="formData.address"
                class="input-address"
                type="text"
                placeholder="Adresse du lieux ou de l'établissement"
            >

            <input
                v-model="formData.district"
                class="input-district"
                type="number"
                placeholder="numero de l'arrondissement"
            >

            <div class="container-pictures">
                <div class="container-main-picture">
                    <input
                        ref="fileInput"
                        class="input-main-picture"
                        type="file"
                        accept="image/*"
                        @change="onFileLoad" 
                    >


                    <button
                        class="button-main-picture"
                        @click="triggerFileInput"
                    >
                        photo principal
                    </button>

                    <img
                        v-if="imageURL"
                        :src="imageURL"
                        alt="uploaded"
                    >
                </div>

                <div class="container-main-picture">
                    <input
                        ref="fileInputSecond"
                        class="input-main-picture"
                        type="file"
                        accept="image/*"
                        @change="onFileLoadSecond" 
                    >


                    <button
                        class="button-seconde-picture"
                        @click="triggerFileInputSecond"
                    >
                        photo secondaire
                    </button>

                    <img
                        v-if="secondPicture"
                        :src="secondPicture"
                        alt="uploaded"
                    >
                </div>
            </div>
        </form>
    </div>


    <button
        class="submit-form"
        @click="submitForm"
    >
        Enregistrer votre Review
    </button>


    <FooterComponent />
</template>

<script>


import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';





export default {

  name: 'ViewHome',
  components: {

    HeaderComponent,
    FooterComponent,

  },

  data() {

    return {

      formData: {

        selectedTheme: "",
        placeName: "",
        district: "",
        address: "",
       
      },

      isDesktop: window.innerWidth > 768,
      selectedTheme: "",
      imageURL: "",
      mainPicture: "",
      secondPicture: "",
      thirdPicture:"",
      fourthPicture:"",
      fifthPicture:"",

    }
  },

  computed: {



  },



  mounted() {




  },




  methods: {

    onFileLoad(event) {
    // Vérifiez si l'événement est vide
    if (!event.target.files[0]) {
        return; // Sortez de la fonction si aucun fichier n'est sélectionné
    }

    // Si un fichier est sélectionné, procédez avec la création de l'URL de l'objet
    const file = event.target.files[0];
    this.imageURL = URL.createObjectURL(file);
},

 onFileLoadSecond(event) {
        if (!event.target.files[0]) {
            return;
        }
        const file = event.target.files[0];
        this.secondPicture = URL.createObjectURL(file);
    },

       triggerFileInput() {
      this.$refs.fileInput.click();
    },

     triggerFileInputSecond() {
        this.$refs.fileInputSecond.click();
    },


    submitForm() {
      // Effectuez ici toute action que vous souhaitez effectuer lorsque le formulaire est soumis
      // Vous pouvez accéder aux données du formulaire via this.formData
      console.log('Données du formulaire :', this.formData);

      // Réinitialiser les données du formulaire après la soumission si nécessaire
      // Réinitialiser toutes les propriétés du formulaire, object assign permet de reinitialiser en un seul temps 
      /*   
      c'est l'equivalent des lignes ci dessous :
           this.formData.district = '';
           this.formData.address = '';
           this.formData.placeName = '';  etc.....*/


      Object.assign(this.formData, {
        district: '',
        address: '',
        placeName: '',
        selectedTheme: '',
      });
    }



  },
}

</script>

<style scoped>
/* config reset */

body {

  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: none;
}

.pagination {

  display: flex;
  justify-content: center;

}

.main-container {

  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.create-review-mobile {

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 3.5%;
  background-color: rgb(137, 120, 148);
  width: max-content;
  height: 2.8rem;
  color: rgb(252, 255, 254);
  font-family: "kalam", sans-serif;
  font-size: 1.2rem;
  text-shadow: 4px 4px 3px rgba(015, 0, 0, 0.3);
  border-radius: 25px;
  font-weight: 400;
}

.header {

  width: 100vw;
}

.container-create-review-form {
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
}

.input-place,
.input-district,
.input-address {
  width: 30%;
  height: 1.5rem;
  border-radius: 25px;
  margin-top: 0.7rem;
  font-size: 1.1rem;
}

.theme-select {
  width: 15%;
  height: 1.9rem;
  border-radius: 25px;
  margin-top: 0.5rem;
  font-size: 1rem;
}

.create-form {

  display: flex;
  flex-direction: column;
}

.container-main-picture {
  position:relative;
 /* display: flex;
  justify-content: flex-end;
  align-items: flex-end;*/
  width: 50%;
  height: 27rem;
  border: 1px solid black;
  
 
}

img {
  
  object-fit: cover;
  width: 100%;
  height: 100%;
 
}

.input-main-picture {
  display: none ;

}

.button-main-picture{
 height:1.7rem;
 position: absolute;
 bottom :1rem;
 right: 1rem;
 border-radius: 25px;
}

.container-pictures {
  display: inline-flex;
  margin-top: 2rem;
  background-color: aqua;
  width: 95%;
}
</style>