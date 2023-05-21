<template>
    <div class=" bg-[#99ffcc]  min-h-screen p-5">
        <OfferSummary 
            v-for="offer in offers" 
            :offerInfo="offer" 
            @click="handleClick(offer)"
        />
    </div>
    
</template>

<script>
import { getAllOffers } from '@/firebase';
import { getAuth } from 'firebase/auth'
import OfferSummary from '@/components/OfferSummary.vue';
export default {
    name: 'offers',
    data() {
        return {
            offers: []
        }
    },
    async created() {
        const Offers = await getAllOffers(getAuth().currentUser.uid)
        this.offers = Offers
    },
    components: {
        OfferSummary
    },
    methods: {
        handleClick(offer) {
            this.$emit('offerSubmit', offer)
            console.log(offer)
            this.$router.push('/about')
        }
    }
}
</script>