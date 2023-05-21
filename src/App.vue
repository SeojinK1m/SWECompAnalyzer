<template>
  <div class="min-h-screen">
    <nav class=" p-7 flex flex-row justify-between bg-white">
      <div class=" space-x-3">
        <router-link to="/">Home</router-link> 
        <router-link to="/offers" v-if="userSignedIn">offers</router-link>
        <router-link to="/compare" v-if="userSignedIn">compare</router-link>
      </div>
      <router-link to="register" v-if="!userSignedIn">log in</router-link>
      <router-link to="/" @click="logOut" v-if="userSignedIn">log out</router-link>
    </nav>
    <router-view 
      :userOfferData = "userOfferData" 
      :formFilled = "formFilled"
      @offerSubmit="setUserOfferData" 
      @userSignIn = "updateSignInStatus"  
      @resetFormFill = "resetFormFill"
    />
    <div class=" min-h-[200px] bg-emerald-800">

    </div>
  </div>
</template>

<script>
  import USIncomeDist from '@/assets/USIncomeDist.json'
  import { getAuth, onAuthStateChanged } from 'firebase/auth'
  export default {
    data() {
      return {
        userOfferData: {
          tc: 185000,
          data: {
            '401kMatch': '50',
            '401kMatchUntil': '22500',
            'HSAContribution': '2500',
            'location': {
              'state': "Massachusetts",
              'city': "Boston"
            },
            'salary': '118400',
            'startingBonus': '50000',
            'startingBonusPeriod': '2',
            'stock': '120000',
            'stockPeriod': '4',
            'targetBonus': '11840',
            'year': Date(),
            'company': 'Microsoft'
          },
          USIncomeData: USIncomeDist,
        },
        userSignedIn: getAuth().currentUser,
        formFilled: false,
      }
    },
    methods: {
      setUserOfferData(data) {
        console.log("emit reached app.vue")
        this.userOfferData.tc = Number(data.salary) + data.stock / 4 + data.startingBonus / data.startingBonusPeriod + Number(data.targetBonus)
        this.userOfferData.data = data
        console.log(this.userOfferData)
        this.formFilled = true
      },
      logOut() {
        getAuth().signOut()
          .then(() => {
            console.log("user signed out")
            this.$router.push('/')
            this.updateSignInStatus()
          })
          .catch((error) => {
            console.error('Sign Out Error', error);
          })
      },
      goToRegister() {
        this.$router.push('/register')
      },
      updateSignInStatus() {
        console.log("signInUpdated")
        console.log(getAuth().currentUser)
        this.userSignedIn = (getAuth().currentUser)
      },
      resetFormFill() {
        this.formFilled = false
      },
      calculateTC() {
        return Number(this.userOfferData.data.salary) + Number(this.userOfferData.data.stock / 4) + Number(this.userOfferData.data.startingBonus / this.userOfferData.data.startingBonusPeriod) + Number(this.userOfferData.data.targetBonus)
      }
    },
    created() {
      onAuthStateChanged(getAuth(), (user) => {
          console.log(user)
          if (user) {
              this.userSignedIn = true
          }
      })
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
