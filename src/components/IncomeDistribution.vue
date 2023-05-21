<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        datasets:[{ 
            data: this.USIncomeData, 
            TC: this.TC,
            backgroundColor: Array(this.USIncomeData.length).fill('#FF7744', Math.floor(this.TC/15000), Math.floor(this.TC/15000) + 1).fill('#99FF99', 0, Math.floor(this.TC/15000)).fill('#99FF99', Math.floor(this.TC/15000)+1,18), 
        }],
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
      },
      chartOptions: {
        maintainAspectRatio: true,
        responsive: true,
        scales: {
            y: {
                ticks: {
                    callback: (value) => "" //value + '%',
                },
                grid: {
                    display: false
                }
            },
            x: {
                ticks: {
                    callback: (value) => "",
                    fontSize: 5,
                    maxRotation: 90,
                    minRotation: 90
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {
          legend: {
                display: false
          }
        },
        layout: {
            padding: {
              left: -50,
            }
        }
      }
    }
  },
  props: ['USIncomeData', 'TC'],
  computed: {
    TCBucket() {
        return Math.floor(this.TC / 15000)
    }
  }
}
</script>