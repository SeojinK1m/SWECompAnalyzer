<template>
  <div class=" bg-[#99FFCC] min-h-screen w-full">
    <div class=" lg:w-3/5 mx-auto min-h-screen text-left lg:p-10 p-3">
      <div v-if="this.canLive">
        <div class="infoContainer" id="TC">
          <h1>{{ this.userOfferData.total401k }}</h1>
          <h1>Total Comp</h1>
          <hr>
          <h2>Your total compensation is</h2>
          <h1>
            {{ '$' + this.userOfferData.tc }}
          </h1>
          <IncomeDistribution 
            :USIncomeData = this.userOfferData.USIncomeData
            :TC = this.userOfferData.tc
          />
          <hr>
          <h2>Your income is in the {{ Math.round(this.userOfferData.USIncomeData.slice(0, Math.floor(this.userOfferData.tc / 15000)).reduce((a,b) => {return a + b}, 0)) }}th percentile of all US households</h2>
        </div>

        <div class="infoContainer" id="deductions">
          <h1>Deductions</h1>
          <hr>
          <h2>It is recommended that you contribute at least the full company match into your 401k. In your case, this would be</h2>
          <h1>
            {{ '$' + this.calculate401kContribution() }}
          </h1>
          <h2>For a total of</h2>
          <h1>
            {{ '$' + this.calculateTotal401k() }}
          </h1>
          <h2>in your 401(k) account</h2>

          <div class=" bg-white rounded-lg p-3 text-emerald-800" @click="this.f01kToggled = !this.f01kToggled">
            <div class=" flex flex-row justify-between">
              <p class="text-emerald-800">
                What's a 401(k)?
              </p>
              <p>
                ?
              </p>
            </div>
            <p v-if="this.f01kToggled" class=" pt-3">
              401(k) plan contributions reduce your taxable income. This is known as tax deferral. You are not taxed on the money you contrbute now, but will pay taxes when you take money out.
            </p>
          </div>

          <hr>

          <h2>You should also max out your yearly HSA contribution. It's one of the most efficient retirement accounts in existence.</h2>
          <h2>Contribute {{ '$' + (3850 - this.userOfferData.data['HSAContribution']) }}, along with {{ this.userOfferData.data['company'] }}'s {{ '$' + this.userOfferData.data['HSAContribution'] }} contribution, to max out your triple tax advantaged HSA account.</h2>
          
          <hr>

          <h2>It is recommended that you put away at least 15% of your pre tax income into tax advantaged retirement accounts.</h2>
          <h2>You should contribute at least {{ '$' + this.calculateRemainingSavings(0.15) }} more into a traditional IRA</h2>
        </div>

        <div class="infoContainer">
          <h1>Taxable Income</h1>
          <hr>
          <h2>After the recommended deductions, your taxable income is</h2>
          <h1>{{ '$' + this.calculateTaxableIncome() }}</h1>
        </div>

        <div class="infoContainer">
          <h1>Taxes</h1>
          <hr>
          <div class=" flex flex-wrap justify-between">
            <div class="lg:w-2/3 inline-block">
              <h2>Your federal tax burden is {{ '$' + this.calculateFederalTaxes(this.calculateTaxableIncome()) }}</h2>
              <h2>Your state tax burden is {{ '$' + this.calculateStateTaxes(this.calculateTaxableIncome()) }}</h2>
              <h2>Your total tax burden is</h2>
              <h1>{{ '$' + this.calculateTotalTaxes(this.calculateTaxableIncome()) }}</h1>
            </div>
            <div class="w-52 m-auto">
              <TaxDonut :data="[this.calculateTotalTaxes(this.calculateTaxableIncome()), this.userOfferData.tc - this.calculateTotalTaxes(this.calculateTaxableIncome())]"/>
            </div>
          </div>
          
          <hr>
          <h2>Without any tax advantaged deductions, your tax burden would have been</h2>
          <h1>{{  '$' + this.calculateTotalTaxes(this.userOfferData.tc) }}</h1>
          <h2>By investing in your tax advantaged accounts, you've saved</h2>
          <h1>{{ '$' + (this.calculateTotalTaxes(this.userOfferData.tc) - this.calculateTotalTaxes(this.calculateTaxableIncome())) }}</h1>
        </div>

        <div class="infoContainer">
          <h1>Post Tax Income</h1>
          <hr>
          <h2>After investing in tax advantaged accounts and paying your fair share, you are left with</h2>
          <h1>{{ '$' + (this.calculateTaxableIncome() - this.calculateTotalTaxes(this.calculateTaxableIncome())) }}</h1>
        </div>

        <div class="infoContainer">
          <h1>Necessary Spending</h1>
          <hr>
          <h2>The average rent for a one-bedroom apartment in {{ this.city + ", " + this.state }} is</h2>
          <h1>{{ '$' + this.monthlyRent }}/month</h1>
          <hr>
          <h2>The average food costs in {{ this.city + ", " + this.state }} is</h2>
          <h1>{{ '$' + this.monthlyFoodCost }}/month</h1>
          <hr>
          <h2>The average utility costs in {{ this.city + ", " + this.state }} is</h2>
          <h1>{{ '$' + this.monthlyUtility }}/month</h1>
          <h3>**Utility in this case includes gas, water, electricity, home internet, waterwaste, phone plan, and streaming services</h3>
          <hr>
          <h2>In total, your expected necessary spending per year is</h2>
          <h1>{{ '$' + (12 * calculateTotalMonthlyNecessarySpending()) }}</h1>
        </div>

        <div class="infoContainer">
          <h1>Discretionary Income</h1>
          <hr>
          <h2>After putting away some money for retirement, paying your fair share, and spending on necessities, you are left with</h2>
          <h1>{{ '$' + (this.calculateTaxableIncome() - this.calculateTotalTaxes(this.calculateTaxableIncome()) - (12 * (this.calculateTotalMonthlyNecessarySpending()))) }}</h1>
          <h2>in discretionary income</h2>
        </div>

        <div class="infoContainer">
          <h1>Other</h1>
          <hr>
          <h2>It is a great idea to have an emergency savings account worth 3-6 months of your necessary spending. Since you can afford it, why not build yourself a solid lifeline?</h2>

        </div>
      </div>
      <div v-if="!this.canLive">
        <div class="infoContainer">
          <h1>You don't make enough to live and save comfortably in {{ this.city + ", " + this.state }}</h1>
          <img src="@/assets/404cat.jpeg" class="my-10 rounded-xl"/>
        </div>
        <div class="infoContainer">
          <h2>Your after tax income: {{ this.afterTaxIncomeNoDeduction }}</h2>
          <h2>Annual cost of living: {{ this.calculateTotalMonthlyNecessarySpending() * 12 }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IncomeDistribution from '@/components/IncomeDistribution.vue';
import TaxBrackets from '@/assets/taxbrackets.json'
import CoL from '@/assets/CoL.json'
import TaxDonut from '@/components/TaxesDonut.vue'

export default {
  name: "about",
  data() {
      return {
          coL: CoL,
          taxBrackets: TaxBrackets,
          monthlyFoodCost: CoL["Food"][this.userOfferData.data.location['city']],
          monthlyRent: CoL["Rent"][this.userOfferData.data.location['city']],
          monthlyUtility: CoL["Utility"][this.userOfferData.data.location['city']],
          city: this.userOfferData.data.location['city'],
          state: this.userOfferData.data.location['state'],
          companyHSAContribution: this.userOfferData.data['HSAContribution'],
          stateTaxBracket: TaxBrackets['state'][this.userOfferData.data.location['state']],
          federalTaxBracket: TaxBrackets['federal'],
          
          f01kToggled: false
      };
  },
  props: ["userOfferData"],
  components: { IncomeDistribution, TaxDonut },
  computed: {
    totalMonthlyNecessarySpending() {
      return this.monthlyRent + this.monthlyFoodCost + this.monthlyUtility
    },
    taxableIncome() {
      const tc = this.userOfferData.tc
      return tc - this.companyHSAContribution
    },
    canLive() {
      console.log(this.afterTaxIncomeNoDeduction)
      return (this.totalMonthlyNecessarySpending * 12) <= (this.afterTaxIncomeNoDeduction)
    },
    afterTaxIncomeNoDeduction() {
      const federalTaxes = this.calculateFederalTaxes(this.userOfferData.tc)
      const stateTaxes = this.calculateStateTaxes(this.userOfferData.tc)
      console.log(federalTaxes, stateTaxes)
      return this.userOfferData.tc - federalTaxes - stateTaxes
    }
  },
  methods: {
    calculateTaxes(taxableIncome, brackets) {
      var taxBurden = 0
      var prev = 0
      Object.keys(brackets).forEach( bracketMax => {
        taxBurden += (Math.max(Math.min(bracketMax - prev, taxableIncome - prev), 0) * brackets[bracketMax])
        prev = bracketMax
      })
      return taxBurden
    },
    calculateTaxableIncome() {
      const taxableIncome = this.userOfferData.tc - (3850 - this.userOfferData.data['HSAContribution']) - this.userOfferData.data['401kMatchUntil'] - (this.userOfferData.tc * 0.15 - this.userOfferData.data['401kMatchUntil']) - (3850 - this.userOfferData.data['HSAContribution'])
      return taxableIncome
    },
    calculateTotalTaxes(taxableIncome) {
      return this.calculateStateTaxes(taxableIncome) + this.calculateFederalTaxes(taxableIncome)
    },
    calculate401kContribution() {
      return Math.min(this.userOfferData.tc * 0.15, this.userOfferData.data['401kMatchUntil'])
    },
    calculateTotal401k() {
      return this.calculate401kContribution() + (Number(this.userOfferData.data['401kMatch'])/100) * this.calculate401kContribution()
    },
    calculateRemainingSavings(savingsRate) {
      return Math.max(0, ((this.userOfferData.tc * savingsRate) - this.calculateTotal401k() - 3850))
    },
    calculateStateTaxes(taxableIncome) {
      return Math.round(this.calculateTaxes(taxableIncome,  this.stateTaxBracket))
    },
    calculateFederalTaxes(taxableIncome) {
      return Math.round(this.calculateTaxes(taxableIncome, this.federalTaxBracket))
    },
    calculateTotalMonthlyNecessarySpending() {
      return this.monthlyFoodCost + this.monthlyRent + this.monthlyUtility
    }
  },
}
</script>

<style scoped>
  h2, h1 {
    color: white;
  }

</style>
