<template>

    <div class="test">Test from signup Vue</div>

    <form action="" class="signup-form" @submit.prevent="submitForm">


        <input class="signup-input email-input" type="text" v-model="email" required placeholder="email" />

        <input class="signup-input checkVerifyEmail-input" type="text" v-model="checkVerifyEmail" required
            placeholder="verification email" />

        <input class="signup-input password-input" type="password" v-model="password" required
            placeholder="mot de passe" />

        <input class="signup-input password-input" type="password" v-model="passwordConfirmation" required
            placeholder="confirmation du mdp" />


        <h3 class="signup-form-tag">Mes informations personelles</h3>


        <label id="gender-tag" for="gender-select">Precisez votre genre :</label>
        <select id="gender-select" v-model="gender" required title="select a gender">

            <option value="M">M</option>
            <option value="Mme">Mme</option>
            <option value="Mlle">Mlle</option>
            <option value="Autre">Autre</option>

        </select>

        <div class="input-container">

            <input class="signup-input first-name-input" type="text" v-model="firstname" required placeholder="Nom" />

            <input class="signup-input last-name-input" type="text" v-model="lastname" required placeholder="Prenom" />

            <input class="signup-input last-name-input" type="text" v-model="pseudo" required placeholder="pseudo" />
        </div>

        <input class="signup-input phone-input" type="number" v-model="phone" required
            placeholder="Numéro de téléphone" />

        <div class="right-side-card">

            <h3 class="signup-form-tag">Mon Adresse</h3>

            <!--input class="signup-input country-input" type="text" name="country" placeholder="Pays" -->


            <input class="signup-input adress-input" type="text" v-model="street_name" required placeholder="Adresse" />


            <div class="input-container">

                <input class="signup-input city-input" type="text" v-model="city" required placeholder="Ville" />

                <input class="signup-input last-name-input" type="number" v-model="postal_code" required
                    placeholder="Code-postal" />


            </div>


            <button class="signup-validation">Valider</button>

            <p class="signup-recaptcha-protection">protection par reCaptcha</p>
        </div>
        <div v-if="errorMessage" class="error-message">
            <ul>
                <li v-for="(error, index) in errorMessage" :key="index">{{ error }}</li>
            </ul>
        </div>

        <div v-if="successMessage" class="success-message">

            <p>{{ successMessage }}</p>
        </div>

       <vueRecaptcha></vueRecaptcha>


    </form>
</template>


<script>

import  vueRecaptcha  from '../components/Recaptcha-component.vue';


export default {

    name: 'Signup-page',
    components: {

        vueRecaptcha
    },

    data() {

        return {

            firstname: "",
            lastname: "",
            password: "",
            passwordConfirmation: "",
            pseudo: "",
            gender: "",
            email: "",
            checkVerifyEmail: "",
            phone: "",
            street_name: "",
            city: "",
            postal_code: "",
            errorMessage: [],
            successMessage: "",
            recaptchaToken: null
        }

    },

    mounted() {



    },



    methods: {

        async submitForm() {


            console.log("this.firstname: ", this.phone)

            try {
                const response = await fetch('http://localhost:5001/user/signup', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({

                        firstname: this.firstname,
                        lastname: this.lastname,
                        password: this.password,
                        passwordConfirmation: this.passwordConfirmation,
                        pseudo: this.pseudo,
                        gender: this.gender,
                        email: this.email,
                        checkVerifyEmail: this.checkVerifyEmail,
                        phone: this.phone,
                        street_name: this.street_name,
                        city: this.city,
                        postal_code: this.postal_code,

                    }),


                })


                if (response.ok) {

                    const responseData = await response.json();
                    this.successMessage = responseData.successMessage;
                    console.log("success, you've been registred", this.successMessage);
                    this.errorMessage = [];
                } else {

                    if (response.status === 400 && !this.successMessage) {


                        const errorData = await response.json();
                        this.errorMessage = errorData.msgError || [];
                        console.log('Erreur côté serveur :', this.errorMessage);

                    }


                }

            } catch (error) {

                console.log('Erreur lors de la requête :', error);

            }



        }
    },


};


</script>

<style scoped>
body {
    background-color: black;
}
</style>