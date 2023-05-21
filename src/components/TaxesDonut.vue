<template>
    <Doughnut :data="chartData" />
</template>
  
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
name: 'TaxDonut',
components: {
    Doughnut
},
data() {
    return {
        chartData: {

            datasets:[{ 
                data: this.data, 
                backgroundColor: ['#FF9999', '#99FF99'],
                borderWidth: 0,
                borderRadius: 0,
                borderJoinStyle: 'bevel'
            }],
        },
        chartOptions: {
            plugins: {
                legend: {
                        display: false
                }
            },
            layout: {
                padding: {
                    top: -100
                }
            }
        }
    }
},
props: ['data']
}
</script>