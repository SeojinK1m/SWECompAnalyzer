<template>
    <div class = "md:w-96 w-full font-semibold">
        <div class="input bg-emerald-800 p-5 rounded-t-xl md:w-96 w-full h-[400px] shadow-xl shadow-black" v-show="formstate==0">
            <h2 class="mb-3 text-left text-white font-bold">Offer</h2>
            <NumberField placeholder="Salary" v-model="offerInfo.salary" symbol="$"/>
            <div class="w-full mx-auto justify-between flex">
                <NumberField placeholder="Total RSU" v-model="offerInfo.stock" symbol="$"/>
                <select class="text-sm rounded-lg w-1/4 h-10 text-gray-400 ml-3" v-model="offerInfo.stockPeriod">
                    <option value="Over" disabled selected class=" opacity-60">Over</option>
                    <option value=1>1 year</option>
                    <option value=2>2 years</option>
                    <option value=3>3 years</option>
                    <option value=4>4 years</option>
                </select>
            </div>
            <div class="w-full mx-auto justify-between flex">
                <NumberField placeholder="Starting Bonus" v-model="offerInfo.startingBonus" symbol="$" />
                <select class="text-sm rounded-lg w-1/4 h-10 text-gray-400 ml-3" v-model="offerInfo.startingBonusPeriod">
                    <option value="Over" disabled selected class=" opacity-60">Over</option>
                    <option value=1>1 year</option>
                    <option value=2>2 years</option>
                </select>
            </div>
            <NumberField placeholder="Target Bonus" v-model="offerInfo.targetBonus" symbol="$" />
        </div>
        <div class="input bg-emerald-800 p-5 rounded-t-xl md:w-96 w-full h-[400px] shadow-xl shadow-black" v-show="formstate==1">
            <h2 class="mb-3 text-left text-white">401(k)</h2>
            <NumberField placeholder="Percent Match" v-model="this.offerInfo['401kMatch']" symbol="%" right="true" />
            <NumberField placeholder="Until" v-model="this.offerInfo['401kMatchUntil']" symbol="$" />
            <hr class="mb-3 bg-gray-300 h-px border-none">
            <h2 class="mb-3 text-left text-white">HSA</h2>
            <NumberField placeholder="Employer Contribution" v-model="this.offerInfo['HSAContribution']" symbol="$" />
        </div>
        <div class="input bg-emerald-800 p-5 rounded-t-xl md:w-96 w-full h-[400px] shadow-xl shadow-black" v-show="formstate==2">
            <h2 class="mb-3 text-left text-white font-bold">Company</h2>
            <select class="text-sm rounded-lg w-full h-10 text-gray-400 mb-3" v-model="this.offerInfo.company">
                <option v-for="company in companies" :value=company>{{ company }}</option>
            </select>
            <hr class="mt-3 mb-3 bg-gray-300 h-px border-none">
            <h2 class="mb-3 text-left text-white font-bold">Location</h2>
            <select class="text-sm rounded-lg w-full h-10 text-gray-400" v-model="this.offerInfo.location.city">
                <option v-for="city in cities" :value=city>{{ city }}</option>
            </select>
        </div>
        <button 
            class="w-full h-12 bg-emerald-500 rounded-b-xl text-white font-semibold shadow-lg" 
            @click="advanceForm"
        >
            {{buttontext}}
        </button>
    </div>
</template>

<script>
    import { postOffer } from '@/firebase';
    import NumberField from './NumberField.vue';
    import CityToState from '../assets/CityToState.json'
    import { getAuth } from 'firebase/auth'
    import Companies from '../assets/companies.json'
    
    export default {
    name: "Form",
    data() {
        return {
            formstate: 0,
            offerInfo: {
                '401kMatch': null,
                '401kMatchUntil': null,
                'HSAContribution': null,
                'location': {
                    'state': null,
                    'city': null
                },
                'salary': null,
                'startingBonus': null,
                'startingBonusPeriod': null,
                'stock': null,
                'stockPeriod': null,
                'targetBonus': null,
                'year': Date()
            },
            query: "",
            companies: ['other'].concat([...new Set(Companies)].sort()),
            cities: Object.keys(CityToState)
        };
    },
    methods: {
        advanceForm() {
            if (this.buttonDisabled) {
                alert("you must fill in all input fields")
                return
            }
            if (this.formstate < 2) {
                this.formstate += 1;
            }
            else {
                this.offerInfo.location.state = CityToState[this.offerInfo.location.city]
                this.$emit('offerSubmit', this.offerInfo)

                if (getAuth().currentUser) {
                    console.log(getAuth().currentUser)
                    postOffer(this.offerInfo, getAuth().currentUser.uid);
                    this.$router.push({
                        name: "about"
                    })
                } else {
                    this.$router.push({
                        name: "register",
                    })
                }
                
            }
        }
    },
    computed: {
        buttontext() {
            return this.formstate < 2 ? "continue" : "analyze";
        },
        buttonDisabled() {
            if (this.formstate == 0) {
                return !(
                    this.offerInfo.salary && 
                    this.offerInfo.startingBonus && 
                    this.offerInfo.stock && 
                    this.offerInfo.stockPeriod &&
                    this.offerInfo.startingBonusPeriod &&
                    this.offerInfo.targetBonus
                )
            } else if (this.formstate == 1) {
                return !(
                    this.offerInfo['401kMatch'] &&
                    this.offerInfo['401kMatchUntil'] &&
                    this.offerInfo['HSAContribution']
                )
            } else if (this.formstate == 2) {
                return !(
                    this.offerInfo.company &&
                    this.offerInfo.location
                )
            }
            return true
        }
    },
    components: { NumberField }
}
</script>

<style scoped>

    .next {
        width: 100%;
        height: 40px;
        border: none;
    }
</style>
  