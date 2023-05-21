<template>
    <div class=" w-11/12 sm:w-4/5 bg-emerald-800 p-4 my-6 rounded-lg font-semibold mx-auto shadow-xl shadow-emerald-500">
        <div class="flex flex-row">
            <h2 class=" text-white">{{ offerInfo.company }}, {{ offerInfo.location.city }}</h2>
            <h3>{{ offerInfo.tc }}</h3>
        </div>
        <table class=" bg-emerald-600 text-white w-full rounded-lg table-fixed border-collapse">
            <tr class=" bg-emerald-500">
                <td class="p-3 rounded-tl-lg border-r border-b border-emerald-200">salary</td>
                <td class=" border-emerald-200 border-b">stock/year</td>
                <td class=" rounded-tr-lg border-l border-emerald-200 border-b">start bonus</td>
            </tr>
            <tr>
                <td class="p-3 border-r border-emerald-200">{{offerInfo.salary}}</td>
                <td>{{offerInfo.stock / 4}}</td>
                <td class="border-l border-emerald-200">{{offerInfo.startingBonus}}</td>
            </tr>
        </table>
    </div>
    
</template>

<script>
export default {
    name: 'OfferSummary',
    data() {
        return {
            offerInfo: this.offerInfo
        }
    },
    props: ['offerInfo'],
    methods: {
        tc() {
            return Number(this.offerInfo.salary) + Number(this.offerInfo.stock / 4) + Number(this.offerInfo.startingBonus / this.offerInfo.startingBonusPeriod) + Number(this.offerInfo.targetBonus)
        }
    }
}
</script>