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

            <div
                v-if="isDesktop"
                class="container-pictures"
            >
                <div class="container-main-picture">
                    <input
                        ref="fileInput"
                        class="input-main-picture"
                        type="file"
                        accept="image/*"
                        @change="onFileLoad($event,'mainPicture')"
                    >

                    <img
                        src="../assets/abstract continuous line art camera.png"
                        alt="logo-camera"
                        class="camera-logo"
                    >

                    <button
                        class="button-main-picture"
                        @click="triggerFileInput"
                    >
                        ajouter une photo principale
                    </button>

                    <img
                        v-if="formData.temporary.mainPicture"
                        :src="formData.temporary.mainPicture"
                        class="main-picture"
                        alt="uploaded"
                    >
                </div>
                <div class="container-gallery">
                    <div class="container-top-pictures">
                        <div class="container-picture2 pictures-container">
                            <input
                                ref="fileInputSecond"
                                class="input-main-picture"
                                type="file"
                                accept="image/*"
                                @change="onFileLoad($event ,'secondPicture')"
                            >

                            <img
                                src="../assets/abstract continuous line art camera.png"
                                alt="logo-camera"
                                class="camera-logo"
                            >

                            <button
                                class="button-gallery"
                                @click="triggerFileInputSecond"
                            >
                                ajouter une photo
                            </button>

                            <img
                                v-if="formData.temporary.secondPicture"
                                :src="formData.temporary.secondPicture"
                                alt="uploaded"
                            >
                        </div>
                        <div class="container-picture3 pictures-container">
                            <input
                                ref="fileInputThird"
                                class="input-main-picture"
                                type="file"
                                accept="image/*"
                                @change="onFileLoad($event,'thirdPicture')"
                            >

                            <img
                                src="../assets/abstract continuous line art camera.png"
                                alt="logo-camera"
                                class="camera-logo"
                            >

                            <button
                                class="button-gallery"
                                @click="triggerFileInputThird"
                            >
                                ajouter une photo
                            </button>

                            <img
                                v-if="formData.temporary.thirdPicture"
                                :src="formData.temporary.thirdPicture"
                                class="picture3"
                                alt="uploaded"
                            >
                        </div>
                    </div>

                    <div class="container-bottom-pictures">
                        <div class="container-picture4 pictures-container">
                            <input
                                ref="fileInputFourth"
                                class="input-main-picture"
                                type="file"
                                accept="image/*"
                                @change="onFileLoad($event,'fourthPicture')"
                            >


                            <img
                                src="../assets/abstract continuous line art camera.png"
                                alt="logo-camera"
                                class="camera-logo"
                            >

                            <button
                                class="button-gallery"
                                @click="triggerFileInputFourth"
                            >
                                ajouter une photo
                            </button>

                            <img
                                v-if="formData.temporary.fourthPicture"
                                :src="formData.temporary.fourthPicture"
                                alt="uploaded"
                            >
                        </div>
                        <div class="container-picture5 pictures-container">
                            <input
                                ref="fileInputFifth"
                                class="input-main-picture"
                                type="file"
                                accept="image/*"
                                @change="onFileLoad($event,'fifthPicture')"
                            >

                            <img
                                src="../assets/abstract continuous line art camera.png"
                                alt="logo-camera"
                                class="camera-logo"
                            >

                            <button
                                class="button-gallery"
                                @click="triggerFileInputFifth"
                            >
                                ajouter une photo
                            </button>

                            <img
                                v-if="formData.temporary.fifthPicture"
                                class="picture5"
                                :src="formData.temporary.fifthPicture"
                                alt="uploaded"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>


    <div class="container-text">
        <textarea
            v-model="formData.textDescription"
            class="text"
            cols="30"
            rows="10"
            placeholder="Votre description ici...."
            @input="logTextDescription"
        />
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
        textDescription: "",

//temporary pour stocker les images temporaire avant enregistrement ( url creer au format blob avec create URL)

       temporary: {
        mainPicture: "",
        secondPicture: "",
        thirdPicture: "",
        fourthPicture: "",
        fifthPicture: "",
       },

// les props ci dessous pour stocker les urls qui seront transmit à l'api via fetch pour stockage sur serveurs Cloudinary

        mainPicture: "",
        secondPicture: "",
        thirdPicture: "",
        fourthPicture: "",
        fifthPicture: "",
        
      },

      isDesktop: window.innerWidth > 768,
      imageURL:"",
    
    }
  },

  computed: {



  },



  mounted() {




  },




  methods: {

    onTextLoad(event) {
      const file = event.target.files[0];
      if (!file) {
        return; // Exit if no file is selected
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.textDescription = e.target.result;
        console.log("File content: ", this.textDescription); // Log the file content
      };

      reader.readAsText(file);
      
    },
    

    //test loading textDescription property
       logTextDescription() {
      console.log(this.textDescription); // Log the textDescription whenever it changes
    },



 onFileLoad(event ,pictureField ) {

console.log(event, "formdata.",pictureField)


      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      const file = event.target.files[0];
      const currentImageUrl = URL.createObjectURL(file);

         // Assurez-vous que l'objet temporary existe avant d'ajouter la valeur
    if (!this.formData.temporary) {
        this.$set(this.formData, 'temporary', {});
    }

      this.formData.temporary[pictureField]= currentImageUrl;



      
    },


    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    triggerFileInputSecond() {
      this.$refs.fileInputSecond.click();
    },

       triggerFileInputThird() {
      this.$refs.fileInputThird.click();
    },
    
         triggerFileInputFourth() {
      this.$refs.fileInputFourth.click();
    },

         triggerFileInputFifth() {
      this.$refs.fileInputFifth.click();
    },
    



    submitForm() {
      // Effectuez ici toute action que vous souhaitez effectuer lorsque le formulaire est soumis
      // Vous pouvez accéder aux données du formulaire via this.formData
      console.log('Données du formulaire :', JSON.stringify(this.formData));

      // Réinitialiser les données du formulaire après la soumission si nécessaire
      // Réinitialiser toutes les propriétés du formulaire, object assign permet de reinitialiser en un seul temps 
      /*   
      c'est l'equivalent des lignes ci dessous :
           this.formData.district = '';
           this.formData.address = '';
           this.formData.placeName = '';  etc.....*/

       // ci dessou a activer apres validation du formulaire pour effacer la derniere review creer dans la memoire du client , ainsi si il creer une nouvelle review pendant la session courante ,les donné renseigner pour creer  la precedente review n'apparaisset pas .
      /*Object.assign(this.formData, {
        district: '',
        address: '',
        placeName: '',
        selectedTheme: '',
      });*/




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
  position: relative;
  /* display: flex;
  justify-content: flex-end;
  align-items: flex-end;*/
  width: 80%;
  height: 27rem;
  border: 1px solid black;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

img {

  object-fit: cover;
  width: 100%;
  height: 100%;

}

.main-picture {
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

.picture2 {
  border-top-right-radius: 25px;
}

.picture3 {
  border-top-right-radius: 25px;
}

.picture3 {
  border-top-right-radius: 25px;
}

.picture5 {
  border-bottom-right-radius: 25px;
}

.input-main-picture {
  display: none;

}

.button-main-picture {
  height: 1.7rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border-radius: 25px;
  z-index: 2;
  font-family: "Courgette";
  font-size: 1.3rem;
}

.button-gallery {
  position: absolute;
  height: 1.7rem;
  border-radius: 25px;
  z-index: 2;
  margin: 0 1rem 1rem 0;
  font-family: "Courgette";
  font-size: 1.3rem;


}

.container-pictures {
  display: inline-flex;
  margin-top: 2rem;
  width: 95%;
  border-radius: 25px;
}

.container-gallery {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.container-picture2 {
  box-sizing: border-box;
  flex: 1;
  width: 50%;
  border: 1px solid black;
}

.container-picture3 {

  width: 50%;
  box-sizing: border-box;
  flex: 1;
  border-top-right-radius: 25px;
  border: 1px solid black;
}

.container-picture4 {
  border: 1px solid black;
  width: 50%;
  box-sizing: border-box;
  flex: 1;
}

.container-picture5 {
  border: 1px solid black;
  width: 50%;
  box-sizing: border-box;
  flex: 1;
  border-bottom-right-radius: 25px;
}


.container-top-pictures {
  display: flex;
  width: 100%;
  height: 50%;
}

.container-bottom-pictures {

  display: flex;
  width: 100%;
  height: 50%
}

.pictures-container {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

}

img {
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  position: absolute;
}

.camera-logo {
  position: absolute;
  top: 0;
  left: 0;
  height: 80%;
  width: 80%;
}

.container-text {
 
  margin-top: 2rem;
  display:flex;
  justify-content: center;
  width: 100%;
}

.text {
  width: 70%;
  height:15rem;
  border-radius: 15px;
  border:1.5px solid black;
  font-size: 1.2rem;
}

.submit-form {
margin: 2rem 0 0 12rem;
font-size: 1.2rem;
border-radius: 25px;
background-color: rgb(27, 238, 143);
font-family: "Courgette";
height: 3rem;

}
</style>