<template>
  <div ref="chartContainer" style="width: 500px; height: 400px;"></div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { lotteryStore } from '@/store/modules/lottery';
const chartContainer = ref(null);
const props =defineProps(['typeClass']);
const xAxisData=ref([]);
const seriesData=ref([]);
const lStore=lotteryStore();
const { qualityDatas, heroDatas } = lStore; 

// {
//   value: 200,
//   itemStyle: {
//     color: '#a90000'
//   }
// },

function getRandomColorFromPalette() {
    const palette = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFC300', '#DAF7A6', 
        '#C70039', '#900C3F', '#581845', '#a90000'
    ];
    const randomIndex = Math.floor(Math.random() * palette.length);
    return palette[randomIndex];
}

onMounted(() => {
  seriesData.value=[];
  xAxisData.value=[];
  if(props.typeClass=="Quality"){
    qualityDatas().then((res) => {
      res.result.forEach((item)=>{
        const seriesDataTemp={};
        seriesDataTemp["value"]=item.Count;
        const seriesItemStyle={};
        seriesItemStyle["color"]=getRandomColorFromPalette();
        seriesDataTemp["itemStyle"]=seriesItemStyle;
        seriesData.value.push(seriesDataTemp)
        if(item.IsBd==0){
            xAxisData.value.push(item.Quality);
        }else{
            xAxisData.value.push(item.Quality+"(Bd)");
        }
      })
    }).catch((error) => {
        console.log(error);
    }).finally(()=>{
        loadChart();
    })
  }else if(props.typeClass=="Hero"){
    heroDatas().then((res) => {
      res.result.forEach((item)=>{
        const seriesDataTemp={};
        seriesDataTemp["value"]=item.Count;
        const seriesItemStyle={};
        seriesItemStyle["color"]=getRandomColorFromPalette();
        seriesDataTemp["itemStyle"]=seriesItemStyle;
        seriesData.value.push(seriesDataTemp)
        if(item.IsBd==0){
            xAxisData.value.push(item.HeroID);
        }else{
            xAxisData.value.push(item.HeroID+"(Bd)");
        }
      })
    }).catch((error) => {
        console.log(error);
    }).finally(()=>{
        loadChart();
    })
  }
});

function loadChart(){
    const chartDom = chartContainer.value;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const option = {
        xAxis: {
          type: 'category',
          data: xAxisData.value
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: seriesData.value,
            type: 'bar'
          }
        ]
      };
      myChart.setOption(option);
    } else {
      console.error('chartContainer DOM element is not found.');
    }
}
</script>

<style scoped>
</style>
