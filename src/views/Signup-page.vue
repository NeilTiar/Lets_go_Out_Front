<template>
    <h1 class="title">Let's go out in paris</h1>

    <h2 class="signup-title">crée un compte </h2>

    <form
        action=""
        class="signup-form"
        @submit.prevent="submitForm"
    >
        <div :class="{ 'container-mobile-form': !isDesktop, 'container-desktop-form': isDesktop }">
            <div :class="{ 'fields-container': isDesktop }">
                <div :class="{ 'left-part-form': isDesktop }">
                    <div :class="{ 'container-left-part-form': isDesktop }">
                        <h3 class="signup-form-tag">informations relative a votre compte</h3>

                        <input
                            v-model="pseudo"
                            class="signup-input last-name-input"
                            type="text"
                            required
                            placeholder="pseudo"
                        >


                        <input
                            v-model="email"
                            class="signup-input email-input"
                            type="text"
                            required
                            placeholder="email"
                        >

                        <input
                            v-model="checkVerifyEmail"
                            class="signup-input checkVerifyEmail-input"
                            type="text"
                            required
                            placeholder="verification email"
                        >

                        <input
                            v-model="password"
                            class="signup-input password-input"
                            type="password"
                            required
                            placeholder="mot de passe"
                        >

                        <input
                            v-model="passwordConfirmation"
                            class="signup-input password-input"
                            type="password"
                            required
                            placeholder="confirmation du mdp"
                        >

                        <h3 class="signup-form-tag">Mon Adresse</h3>

                        <!--input class="signup-input country-input" type="text" name="country" placeholder="Pays" -->


                        <input
                            v-model="street_name"
                            class="signup-input adress-input"
                            type="text"
                            required
                            placeholder="Adresse"
                        >




                        <input
                            v-model="city"
                            class="signup-input city-input"
                            type="text"
                            required
                            placeholder="Ville"
                        >

                        <input
                            v-model="postal_code"
                            class="signup-input last-name-input"
                            type="number"
                            required
                            placeholder="Code-postal"
                        >
                    </div>
                </div>


                <div :class="{ 'right-part-form': isDesktop }">
                    <div :class="{ 'container-right-part-form': isDesktop }">
                        <h3 class="signup-form-tag">Mes informations personelles</h3>



                        <select
                            id="gender-select"
                            v-model="gender"
                            plac
                            required
                            title="select a gender"
                        >
                            <option
                                value=""
                                disabled
                                selected
                            >
                                Genre
                            </option>
                            <option value="M">M</option>
                            <option value="Mme">Mme</option>
                            <option value="Mlle">Mlle</option>
                            <option value="Autre">Autre</option>
                        </select>



                        <input
                            v-model="firstname"
                            class="signup-input first-name-input"
                            type="text"
                            required
                            placeholder="Nom"
                        >

                        <input
                            v-model="lastname"
                            class="signup-input last-name-input"
                            type="text"
                            required
                            placeholder="Prenom"
                        >



                        <input
                            v-model="phone"
                            class="signup-input phone-input"
                            type="number"
                            required
                            placeholder="Numéro de téléphone"
                        >


                        <div
                            v-if="successMessage"
                            class="success-message"
                        >
                            <p>{{ successMessage }}</p>
                        </div>


                        <div v-if="captchaVerified">captcha Validé !</div>
                        <div
                            v-if="captchaMissed"
                            class="missed-captcha-msg"
                        >
                            Veullez remplir le captcha
                        </div>




                        <div
                            class="captcha-container"
                            :class="{ 'desktop-captcha-container': isDesktop }"
                        >
                            <recaptchaComponent
                                class="recaptcha-component"
                                @captcha-verification="handleCaptchaVerification"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p class="signup-recaptcha-protection">protection par reCaptcha</p>



        <div
            v-if="errorMessage"
            class="error-message"
        >
            <ul>
                <li
                    v-for="(msgError, index) in errorMessage"
                    :key="index"
                >
                    {{ msgError }}
                </li>
            </ul>
        </div>
    </form>
    <FooterComponent />
</template>


<script>


import FooterComponent from '@/components/Footer-component.vue';
import recaptchaComponent from '../components/Recaptcha-component.vue';



export default {

    name: 'SignupPage',
    components: {

        recaptchaComponent,
        FooterComponent
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
            errorMessage: "",
            successMessage: "",
            recaptchaToken: null,
            captchaVerified: "", // Initialisation de la variable
            captchaMissed: "",
            isDesktop: window.innerWidth > 768,
        }
    },

    mounted() {

        console.log(this.isDesktop)

    },



    methods: {


        handleCaptchaVerification() {

            console.log("handleCaptchaVerified")

            this.captchaVerified = true;
            this.captchaMissed = null;
            // Met à jour la variable captchaVerified en fonction de l'événement émis par le composant Captcha
            console.log("captachVerified : ", this.captchaVerified)
        },

        async submitForm() {


            // Vérifie si le captcha est validé
            if (!this.captchaVerified) {

                // Affiche un message d'erreur ou effectue une action appropriée
                this.captchaMissed = "Veuillez remplir le captcha avant de soumettre le formulaire.";
                console.log(this.captchaMissed)
                return this.captchaMissed; // Arrête l'exécution de la méthode si le captcha n'est pas validé
            }


            const isCaptchaVerified = this.handleCaptchaVerification(this.captchaVerified)

            console.log("valeur du captcha depuis submitForm(): ", isCaptchaVerified)



            try {
                

                const response = await fetch('http://192.168.1.168:5001/user/signup', {

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


                if (response.ok && this.captchaVerified) {

                    console.log("this.SubmitForm if")

                    const responseData = await response.json();
                    this.successMessage = responseData.successMessage;
                    console.log("success, you've been registred", this.successMessage);

                } else {

                    if (!response.ok) {

                        console.log("this.SubmitForm else ")
                        const errorData = await response.json();
                        this.errorMessage = errorData.msgError.slice(0, 3) || [];
                        console.log('msg d Erreur trasmise depuis le  serveur :', this.errorMessage);
                        console.log('msg d Erreur xxxxxxxxxxxxxxx:',);
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
@import '../styles/signup-style.scss';



.missed-captcha-msg {
    color: red;
    font-size: 1.3rem;

}
</style>