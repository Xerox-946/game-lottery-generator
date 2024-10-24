<template>
  <div ref="chartContainer" style="width: 500px; height: 400px;"></div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { lotteryStore } from '@/store/modules/lottery';
const chartContainer = ref(null);
const props =defineProps(['typeClass']);
const seriesData=ref([]);
const lStore=lotteryStore();
const { qualityDatas, heroDatas } = lStore; 

onMounted(() => {
  seriesData.value=[];
  if(props.typeClass=="Quality"){
    qualityDatas().then((res) => {
      res.result.forEach((item)=>{
        const seriesDataTemp={};
        seriesDataTemp["value"]=item.Count;
        if(item.IsBd==0){
          seriesDataTemp["name"]=item.Quality;
        }else{
          seriesDataTemp["name"]=item.Quality+"(Bd)";
        }
        seriesData.value.push(seriesDataTemp);
      })
    }).catch((error) => {
        console.log(error);
    }).finally(()=>{
        loadChart(props.typeClass);
    })
  }else if(props.typeClass=="Hero"){
    heroDatas().then((res) => {
      res.result.forEach((item)=>{
        const seriesDataTemp={};
        seriesDataTemp["value"]=item.Count;
        if(item.IsBd==0){
          seriesDataTemp["name"]=item.HeroID;
        }else{
          seriesDataTemp["name"]=item.HeroID+"(Bd)";
        }
        seriesData.value.push(seriesDataTemp)
      })
    }).catch((error) => {
        console.log(error);
    }).finally(()=>{
        loadChart(props.typeClass);
    })
  }
});

function loadChart(typeClass){
    const chartDom = chartContainer.value;
    if (chartDom) {
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: typeClass+'信息表',
          subtext: typeClass +' Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: seriesData.value,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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