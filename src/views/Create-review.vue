<template>
    <HeaderComponent />

    <div
        class="main-container-create-review"
        :class="{ 'dark-container-create-form': isDarkMode }"
    >
        <h2 class="title">Créer votre nouvelle review :</h2>

        <div
            class="container-create-review-form"
        >
            <form 
                class="
        create-form"
                @submit.prevent
            >
                <div class="select-theme">
                    <select
                        v-model="formData.theme"
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
                        <option value="food & drink">food & drink</option>
                        <option value="culture">culture</option>
                        <option value="loisir">loisir</option>
                    </select>
                </div>

                <input
                    v-model="formData.place_name"
                    class="input-place"
                    type="text"
                    placeholder="Nom du lieux ou de l'établissement"
                >

                <input
                    v-model="formData.address_place"
                    class="input-address"
                    type="text"
                    placeholder="Adresse du lieux ou de l'établissement"
                >

                <input
                    v-model="formData.district_num"
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
                            @change="onFileLoad($event, 'mainPicture')"
                        >

                        <img
                            src="../assets/abstract continuous line art camera.png"
                            alt="logo-camera"
                            class="camera-logo"
                        >

                        <button
                            class="button-main-picture"
                            @click="triggerFileInput($event)"
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
                                    @change="onFileLoad($event, 'secondPicture')"
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
                                    @change="onFileLoad($event, 'thirdPicture')"
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
                                    @change="onFileLoad($event, 'fourthPicture')"
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
                                    class="picture4"
                                    alt="uploaded"
                                >
                            </div>
                            <div class="container-picture5 pictures-container">
                                <input
                                    ref="fileInputFifth"
                                    class="input-main-picture"
                                    type="file"
                                    accept="image/*"
                                    @change="onFileLoad($event, 'fifthPicture')"
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

        <div
            v-if="!isDesktop"
            class="container-mobile-picture"
        >
            <div
                class="container-pictures"
                @click="addMobilePictures(), triggerFileInputMobile($event)"
            >
                <input
                    ref="fileInputMobile"
                    class="input-mobile-pictures"
                    type="file"
                    accept="image/*"
                    multiple
                    @change="onMobileFileLoad($event, 'mobilePictures')"
                >

                <p class="add-picture-msg">Ajouter des Photos</p>
                <img
                    class="add-picture-img"
                    src="../assets/apareil-photo-noir.jpg"
                    alt="add pictures"
                >
            </div>
        </div>

        <div 
            v-for="(picture, index) in formData.temporary.mobilePictures"
            :key="index"
            class="container-img"
        >
            <div
                class="picture-container"
            >
                <img
                    :key="index"
                    :src="picture"
                    alt="Uploaded Image"
                    class="uploaded-picture"
                >
            </div>
        </div>
  
        <div class="container-text">
            <textarea
                v-model="formData.text_description"
                class="text"
                cols="30"
                rows="10"
                placeholder="Votre description ici...."
                @input="logTextDescription"
            />
        </div>

        <div 
            v-if="isDesktop"
            class="container-button-submit"
        >
            <button
                class="submit-form"
                @click="submitForm($event), logFormData()"
                @change="onFileLoad()"
            >
                Enregistrer votre Review
            </button>
        </div>

        <div 
            v-if="!isDesktop"
            class="container-mobile-button-submit"
        >
            <button
                class="submit-mobile-form"
                @click="submitMobileForm($event), logFormData()"
                @change="onMobileFileLoad($event)"
            >
                Enregistrer votre Review
            </button>
        </div>
    </div>
    <FooterComponent />
</template>

<script>


import HeaderComponent from '@/components/Header-component.vue';
import FooterComponent from '@/components/Footer-component.vue';
import { onBeforeUnmount } from 'vue';
import store from '@/store/store';

export default {

  name: 'ViewHome',
  components: {

    HeaderComponent,
    FooterComponent,

  },


  data() {

    return {

      token: store.state.accessToken,

      formData: {

        theme: "",
        place_name: "",
        district_num: "",
        address_place: "",
        text_description: "",


        //temporary pour stocker les images temporaire avant enregistrement ( url creer au format blob avec create URL)

        temporary: {
          mainPicture: "",
          secondPicture: "",
          thirdPicture: "",
          fourthPicture: "",
          fifthPicture: "",
          mobilePictures: [],
        },


        // les props ci dessous pour stocker les urls qui seront transmit à l'api via fetch pour stockage sur serveurs Cloudinary

        mainPicture: "",
        secondPicture: "",
        thirdPicture: "",
        fourthPicture: "",
        fifthPicture: "",
        mobilePictures: [],

      },

      isDesktop: window.innerWidth > 768,
      imageURL: "",
      isDarkMode: this.$store.state.isDarkMode,
    }
  },

  computed: {



  },



  mounted() {




  },


  methods: {

    logFormData() {

      const formDataCopy = JSON.parse(JSON.stringify(this.formData));
      console.log("FormData ", formDataCopy)
    },


    resetForm() {

      this.formData.theme = "";
      this.formData.place_name = "";
      this.formData.address_place = "";
      this.formData.district_num = "";
      this.formData.text_description = "";

      // Réinitialiser les champs temporaires d'image
      this.formData.temporary.mainPicture = "";
      this.formData.temporary.secondPicture = "";
      this.formData.temporary.thirdPicture = "";
      this.formData.temporary.fourthPicture = "";
      this.formData.temporary.fifthPicture = "";
      this.formData.temporary.mobilePictures = "";
 
      // Réinitialiser les URLs d'image finales
      this.formData.mainPicture = "";
      this.formData.secondPicture = "";
      this.formData.thirdPicture = "";
      this.formData.fourthPicture = "";
      this.formData.fifthPicture = "";
      this.formData.mobilePictures = "";

      // Réinitialiser les éléments input file
      this.$refs.fileInput.value = "";
      this.$refs.fileInputSecond.value = "";
      this.$refs.fileInputThird.value = "";
      this.$refs.fileInputFourth.value = "";
      this.$refs.fileInputFifth.value = "";
      this.$refs.fileInputMobile = "";
    },

    onTextLoad(event) {
      const file = event.target.files[0];
      if (!file) {
        return; // Exit if no file is selected
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        this.text_description = e.target.result;
        console.log("File content: ", this.text_description); // Log the file content
      };

      reader.readAsText(file);

    },


    //test loading textDescription property
    logTextDescription() {
      console.log(this.text_description); // Log the textDescription whenever it changes
    },



    onFileLoad(event, pictureField) {



      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      const file = event.target.files[0];
      this[pictureField] = file

      const currentImageUrl = URL.createObjectURL(file);

      // Assurez-vous que l'objet temporary existe avant d'ajouter la valeur
      if (!this.formData.temporary) {
        this.$set(this.formData, 'temporary', {});
      }

      this.formData.temporary[pictureField] = currentImageUrl;
      // test console.log("THIS.MAINPICTURE: ", this.mainPicture)
      //test console.log("xxxxxxxxxxxxxxxx place_name : ", this.place_name)

      // Révoquez l'URL lorsque l'image n'est plus nécessaire (lors de la destruction du composant)
      onBeforeUnmount(() => {
        URL.revokeObjectURL(currentImageUrl);
      });

    },


    // work in progress ...............................................................................................
    onMobileFileLoad(event) {
      
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

     const files = event.target.files;


      if (files && files.length) {

        const array = Array.from(files).map(file => URL.createObjectURL(file));
        console.log("ARRAY ARRAY :", array)
        this.formData.temporary.mobilePictures = array;
        this.formData.mobilePictures = files;
      }
  
  },



    triggerFileInput() {

      /*permet de simuler un click sur l'element 'fileInput' ,  
      In this case, when triggerFileInputFifth() is called, it simulates a click on the fileInputFifth element.*/

      this.$refs.fileInput.click();
      this.mainPicture = this.$refs.fileInput;
    },

    triggerFileInputSecond() {
      this.$refs.fileInputSecond.click();
      this.secondPicture = this.$refs.fileInputSecond;
    },

    triggerFileInputThird() {
      this.$refs.fileInputThird.click();
      this.thirdPicture = this.$refs.fileInputThird;
    },

    triggerFileInputFourth() {
      this.$refs.fileInputFourth.click();
      this.fourthPicture = this.$refs.fileInputFourth;
    },

    triggerFileInputFifth() {
      this.$refs.fileInputFifth.click();
      this.fifthPicture = this.$refs.fileInputFifth;
    },

    triggerFileInputMobile() {

       this.$refs.fileInputMobile.click();
      this.mobilePictures = this.$refs.fileInputMobile;
    },


    addMobilePictures() {
      console.log('Mobile Pictures:', this.formData.mobilePictures);
      console.log("img clicked")
    },


    async submitForm() {

      console.log("PASSE PAR SUBMIT FORM !!!!!!")


      // Construct FormData
      const formData = new FormData();
      formData.append('theme', this.formData.theme);
      formData.append('place_name', this.formData.place_name);
      formData.append('adress_place', this.formData.address_place);
      formData.append('district_num', this.formData.district_num);
      formData.append('text_description', this.formData.text_description);


      // Append images if they exist
      if (this.$refs.fileInput.files[0]) {
        formData.append('mainPicture', this.mainPicture);
      }

      if (this.$refs.fileInputSecond.files[0]) {
        formData.append('secondPicture', this.$refs.fileInputSecond.files[0]);
      }

      if (this.$refs.fileInputThird.files[0]) {
        formData.append('thirdPicture', this.$refs.fileInputThird.files[0]);
      }

      if (this.$refs.fileInputFourth.files[0]) {
        formData.append('fourthPicture', this.$refs.fileInputFourth.files[0]);
      }

      if (this.$refs.fileInputFifth.files[0]) {
        formData.append('fifthPicture', this.$refs.fileInputFifth.files[0]);
      }

     if (this.formData.mobilePictures && this.formData.mobilePictures.length > 0) {
    this.formData.mobilePictures.forEach((file, index) => {
      formData.append(`mobilePicture${index}`, file);
      
    });  
     }
  

      // Visualiser le contenu de formData dans la console
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }



      //verifier le refreshToken ici
      /* comme il n'est pas possible d'efectuer la verification ici car je ne peux pas cumuler les reponses de l'api,
      je vais inclure la verification depuis l'api au niveau de la fonction pour creer une review */



      try {

        let token = this.token;


        console.log("XXXXXXXXXXXXXxxxxxxXXXXXXXXXXXXXXXXXXXXXX   token => ", token)

        const url = 'http://192.168.1.168:5001/review/create';

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData, // No need to set Content-Type header manually
        });

        if (response.ok) {

          const responseData = await response.json();
          token = response.accessToken;
          this.successMessage = responseData.successMessage;
          token = responseData.AccessToken;
          console.log("Success, review created:", this.successMessage, responseData);
          this.resetForm();

        } else {

          const errorData = await response.json();
          console.log("Pictures not shared to API, try again.  !!!!!!!", errorData);
          // this.errorMessage = errorData.msgError.slice(0, 3) || [];
        }
      } catch (error) {
        console.log('Error during the request:', error);
      }

    },

    async submitMobileForm() {

     


      // Construct FormData
      const formData = new FormData();
      formData.append('theme', this.formData.theme);
      formData.append('place_name', this.formData.place_name);
      formData.append('adress_place', this.formData.address_place);
      formData.append('district_num', this.formData.district_num);
      formData.append('text_description', this.formData.text_description);


      // Append images if they exist
      if (this.formData.mobilePictures[0]) {
        formData.append('mainPicture', this.formData.mobilePictures[0]);
      }

      if (this.formData.mobilePictures[1]) {
        formData.append('secondPicture', this.formData.mobilePictures[1]);
      }

      if (this.formData.mobilePictures[2]) {
        formData.append('thirdPicture', this.formData.mobilePictures[2]);
      }

      if (this.formData.mobilePictures[3]) {
        formData.append('fourthPicture', this.formData.mobilePictures[3]);
      }

      if (this.formData.mobilePictures[4]) {
        formData.append('fifthPicture', this.formData.mobilePictures[4]);
      }



      // Visualiser le contenu de formData dans la console
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }



      //verifier le refreshToken ici
      /* comme il n'est pas possible d'efectuer la verification ici car je ne peux pas cumuler les reponses de l'api,
      je vais inclure la verification depuis l'api au niveau de la fonction pour creer une review */



      try {

        let token = this.token;


        console.log("XXXXXXXXXXXXXxxxxxxXXXXXXXXXXXXXXXXXXXXXX   token => ", token)

        const url = 'http://192.168.1.168:5001/review/create';

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData, // No need to set Content-Type header manually
        });

        if (response.ok) {

          const responseData = await response.json();
          token = response.accessToken;
          this.successMessage = responseData.successMessage;
          token = responseData.AccessToken;
          console.log("Success, review created:", this.successMessage, responseData);
          this.resetForm();

        } else {

          const errorData = await response.json();
          console.log("Pictures not shared to API, try again.  !!!!!!!", errorData);
          // this.errorMessage = errorData.msgError.slice(0, 3) || [];
        }
      } catch (error) {
        console.log('Error during the request:', error);
      }

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



.container-create-review-form {
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
}

.theme-select,
.input-place,
.input-district,
.input-address {
  width: 30%;
  height: 1.5rem;
  border-radius: 25px;
  margin-top: 0.7rem;
  font-size: 1.1rem;
  text-align: center;
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
  display: flex;
  justify-content: center;
  width: 100%;
}

.text {
  width: 80%;
  height: 15rem;
  border-radius: 15px;
  border: 1.5px solid black;
  font-size: 1.2rem;
}

.submit-form {
  margin: 2rem 0 0 12rem;
  font-size: 1.2rem;
  border-radius: 25px;
  background-color: rgb(110, 230, 176);
  font-family: "Courgette";
  height: 3rem;
  color: rgb(128, 21, 160);

}

.container-mobile-picture {
  color: black
}

@media screen and (max-width: 1000px) {



  .title {
    font-size: 1.6rem;
    margin: 2rem 1.5rem 2rem 1.5rem;
  }

  .top-main {

    margin: 0;
  }

  .theme-select,
  .input-place,
  .input-address,
  .input-district {

    width: 85%;
    text-align: center;
  }


  .container-pictures {
    height: 10rem;
    width: 80%;
    border: 2px solid black;
    flex-direction: column;

  }

  .container-mobile-picture {
    display: flex;
    justify-content: center;
  }

  .container-button-submit {

    display: flex;
    width: 100%;
  }

  .submit-form {

    margin: 2rem auto;
  }

  .container-create-review-form {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .create-form {

    width: 100%;
    display: flex;
    align-items: center;
  }

  .theme-select {
    width: max-content;
    text-align: center;
  }

  .add-picture-img {

    width: 100%;
    height: 7.5rem;
    position: relative;
    bottom: 0;
    margin: 0rem;
    border-radius: 25px;
  }

  .add-picture-msg {
    margin: 0.2rem;
    text-align: center;
    font-family: 'Courgette', sans-serif, cursive;
    padding-bottom: 0.3rem;
    font-size: 1.3rem;
  }


    .uploaded-picture {

    object-fit:cover;
    width: 95%;
    height:10rem;
    margin: auto
  }

  .input-mobile-pictures {
    display :none;
  }

  .uploaded-container-pictures {
   
    height:10rem;
  }

  .container-img {
    
    height:11rem;
  }

  .submit-mobile-form {
    border-radius: 25px;
    margin: 2rem;
    height:2.5rem;
    background-color: rgb(36, 255, 200);
    font-family: 'Courgette',cursive;
    border: 0.5px solid purple;
    font-size: 1rem;
  }

  .container-mobile-button-submit {

    display:flex;
    justify-content: center;
  }

  .dark-container-create-form {

    background-color: black
  }
}
</style>