<template>
    <div class="bg-[#99FFcc] min-h-screen flex flex-col justify-center items-center">
        <div class="sm:w-96 w-4/5">
            <div class=" bg-emerald-800 p-5 rounded-t-xl flex flex-col space-y-10 h-[300px] text-left">
                <h2 class="text-white font-bold">log in or register</h2>
                <input type="email" class="bg-white text-sm rounded-lg w-full p-2.5" placeholder="email" v-model="registerInfo.email">
                <input type="password" class="bg-white text-sm rounded-lg w-full p-2.5" placeholder="password" v-model="registerInfo.password">
            </div>
            <div class=" w-full flex flex-row justify-around bg-emerald-500 rounded-b-xl py-3">
                <button class=" text-white font-bold w-auto hover:cursor-pointer" :disabled="registerDisabled" @click="signin">log in</button>
                <button class=" text-white font-bold w-auto hover:cursor-pointer" :disabled="registerDisabled" @click="register">register</button>
            </div>
        </div>
    </div>
</template>

<script>
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    GoogleAuthProvider, 
    signInWithRedirect, 
    signInWithEmailAndPassword,
} 
from "firebase/auth"
import { postOffer } from "@/firebase"

export default {
    name: "Register",
    data() {
        return {
            registerInfo: {
                "email": "",
                "password": ""
            },
            formFilled: this.formFilled,
            offerData: this.userOfferData
        }
    },
    props: ['formFilled', 'userOfferData'],
    methods: {
        register() {
            createUserWithEmailAndPassword(getAuth(), this.registerInfo.email, this.registerInfo.password)
                .then((data) => {
                    this.$emit('userSignIn', data.user.uid)
                    if (this.formFilled) {
                        postOffer(this.offerData.data, data.user.uid)
                        this.$emit('resetFormFill')
                        this.$router.push('/about')
                    } else {
                        this.$router.push('/')
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                    alert(error.message, error.code)
                })
        },
        signin() {
            signInWithEmailAndPassword(getAuth(), this.registerInfo.email, this.registerInfo.password)
                .then((data) => {
                    this.$emit('userSignIn', data.user.uid)
                    if (this.formFilled) {
                        postOffer(this.offerData.data, data.user.uid)
                        this.$emit('resetFormFill')
                        this.$router.push('/about')
                    } else {
                        this.$router.push('/')
                    }
                })
                .catch((error) => {
                    console.log(error.message)
                    alert(error.message, error.code)
                })
        },
        signinWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithRedirect(getAuth(), provider)
            getRedirectResult(getAuth())
                .then((data) => {
                    console.log(data)
                    this.$emit('userSignIn', userCred.user.uid)
                    this.$router.push('/about')
                })
                .catch((error) => {
                    console.log(error.message)
                    alert(error.message, error.code)
                })
        }
    },
    computed: {
        registerDisabledOpacity() {
            return (this.registerInfo.email == "" || this.registerInfo.password == "") ? "opacity-60" : "opacity-100"
        },
        registerDisabled() {
            return this.registerInfo.email == "" || this.registerInfo.password == ""
        }
    }
}
</script>