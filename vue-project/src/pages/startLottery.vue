<template>
  <div style="padding-left: 23%;text-align: center;">
  <a-spin :spinning="fetchLoading" tip="加载中..." style="margin-top: 20%;margin-left: -15%;" size="large">
        <a-page-header style="border: 1px solid rgb(235, 237, 240);position: fixed;top: 0;left: 0;right: 0; z-index: 1000;background-color: white; " title="返回" @back="() => router.go(0)" @click="() => router.go(-1)">
            <!-- <template #extra>
                <a-button key="1" type="primary" @click="router.push('/')">Home</a-button>
                <a-button key="2" type="primary" @click="downloadToCsv" v-show="downloadVisible" :loading="downloadLoading" :disabled="downloadLoading">Download Table</a-button>
            </template> -->
        </a-page-header>
        <div style="margin:100px 0px 20px 0px;">
            <a-form
              layout="inline"
            >
              <a-form-item label="ChoosePlan" name="region">
                <a-select v-model:value="planName" placeholder="please select your plan" style="width: 200px;" :disabled="route.query.planName!=undefined" @change="loadHeroOdd">
                  <a-select-option v-for="item in planList" :key="item.PlanID" :value="item.PlanID">
                    <a-tooltip placement="right">
                      <template #title v-if="item.Desc">
                        <span>{{ item.Desc }}</span>
                      </template>
                        {{ item.Name }}
                    </a-tooltip>
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="InputCount(<=30W)">
                <a-input-number v-model:value="count" :max="300000" placeholder="Count" @change="isLoadOdd=false"/>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  @click="startLottery()"
                  :loading="fetchLoading"
                  :disabled="fetchLoading"
                >
                <template #icon><PoweroffOutlined/></template>
                  运行抽卡
                </a-button>
              </a-form-item>
              <a-button key="2" type="primary" @click="downloadToCsv" v-show="downloadVisible&&!fetchLoading" :loading="downloadLoading" :disabled="downloadLoading">下载表格</a-button>
            </a-form>
        </div>
        <!-- 计划表 -->
        <div style="width: 70%;height: 110px;float: left;" v-show="downloadVisible&&!fetchLoading">
            <a-table :dataSource="planInfoData" :columns="planInfoColumns" :pagination="false" bordered/>
        </div>
        <!-- 品质表 -->
        <div style="width: 70%;height: 350px;float: left;align-content: center;" v-show="downloadVisible&&!fetchLoading">
            <a-table :dataSource="qualityInfoData" :columns="qualityInfoColumns" :pagination="false" bordered>
              <template #bodyCell="{ column, record, index }">
                <template v-if="column.key === 'Rate'">
                    {{ (qualityTotals.totalCount===0?0:Math.floor(record.Count / qualityTotals.totalCount * 1000000) / 10000).toFixed(4) }}%
                </template>
                <template v-if="column.key === 'BdRate'">
                    {{ (qualityTotals.totalBdCount===0?0:Math.floor(record.BdCount / qualityTotals.totalBdCount * 1000000) / 10000).toFixed(4) }}%
                </template>
                <template v-if="column.key === 'TotalOdd'">
                    {{ (Math.floor(record.TotalOdd * 1000000) / 10000).toFixed(4) }}%
                </template>
                <template v-if="column.key === 'TotalBdOdd'">
                    {{ (Math.floor(record.TotalBdOdd * 1000000) / 10000).toFixed(4) }}%
                </template>
              </template>
              <template #summary>
                <a-table-summary-row>
                  <a-table-summary-cell>Total</a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text type="danger">{{ qualityTotals.totalCount }}</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(qualityTotals.totalRate*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(qualityTotals.totalOdds*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text type="danger">{{ qualityTotals.totalBdCount }}</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(qualityTotals.totalBdRate*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(qualityTotals.totalBdOdds*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                </a-table-summary-row>
              </template>
            </a-table>
        </div>
        <!-- 武将表 -->
        <div style="width: 70%;height: 1000px;float: left;" v-show="downloadVisible&&!fetchLoading">
            <a-table :dataSource="heroInfoData" :columns="heroInfoColumns" :pagination="false" bordered>
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Rate'">
                    {{ heroTotals.totalCount===0?(Math.floor(0)).toFixed(4):(Math.floor(record.Count / heroTotals.totalCount * 1000000) / 10000).toFixed(4) }}%
                </template>
                <template v-if="column.key === 'BdRate'">
                    {{ heroTotals.totalBdCount===0?(Math.floor(0)).toFixed(4):(Math.floor(record.BdCount / heroTotals.totalBdCount * 1000000) / 10000).toFixed(4) }}%
                </template>
                <template v-if="column.key === 'Odd'">
                    {{ (Math.floor(record.Odd * 1000000) / 10000).toFixed(4) }}%
                </template>
                <template v-if="column.key === 'BdOdd'">
                    {{ (Math.floor(record.BdOdd * 1000000) / 10000).toFixed(4) }}%
                </template>
              </template>
              <template #summary>
                <a-table-summary-row>
                  <a-table-summary-cell :col-span="3">Total</a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text type="danger">{{ heroTotals.totalCount }}</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(heroTotals.totalRate*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(1*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text type="danger">{{ heroTotals.totalBdCount }}</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(heroTotals.totalBdRate*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                  <a-table-summary-cell>
                    <a-typography-text>{{ (Math.floor(1*1000000)/10000).toFixed(4) }}%</a-typography-text>
                  </a-table-summary-cell>
                </a-table-summary-row>
              </template>
            </a-table>
        </div>
        <!-- 抽卡表 -->
        <!-- <div style="width: 40%;height: 1000px;float: right;"  v-show="downloadVisible">
            <a-table :dataSource="lotteryInfoData" :columns="lotteryInfoColumns"
             :pagination="pagination" :loading="heroInfoLoading" @change="handleTableChange"
             />
        </div> -->
      </a-spin>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { ref, reactive, nextTick, onMounted, toRaw } from 'vue';
import { gameHttp } from '@/api/game';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { message } from 'ant-design-vue';
import { planStore } from '@/store/modules/plan';
import { lotteryStore } from '@/store/modules/lottery';
import { heroStore } from '@/store/modules/hero';
import { LoadingOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
import * as XLSX from 'xlsx';
import { toFixed } from 'ant-design-vue/es/input-number/src/utils/MiniDecimal';

const router = useRouter();
const route = useRoute();
const pStore=planStore();
const { planAdd,planUpdate } = pStore; 
const lStore=lotteryStore();
const { startLotterys, lotteryDatas, qualityDatas, heroDatas, lotteryPlan, getTargetLottery } = lStore; 
const hStore=heroStore();
const { getHeroList } = hStore; 
const planID = ref();
const planName = ref();
const count = ref();
const isLoadOdd = ref(false);
const downloadVisible=ref(false);
const downloadLoading=ref(false);
const oddRate = reactive({});
const selectPlat = ref("http://192.168.19.230:10200");
const planInfoData = ref([]);  
const qualityInfoData = ref([]);  
const heroInfoData = ref([]);  
const lotteryInfoData = ref([]);  
const heroMap=reactive({});
const planList=ref([]);
const heroInfoLoading= ref(false);
const fetchLoading=ref(false);
const lotteryTotal=ref(0);
const pagination=reactive({
  current: 1, 
  pageSize: 10, 
  total: lotteryTotal.value, 
});
const planInfoColumns = [  
  {  
    title: 'PlanID',  
    dataIndex: 'PlanID',  
    key: 'PlanID',  
  },  
  {  
    title: 'Count',  
    dataIndex: 'Count',  
    key: 'Count',  
  }, 
  {  
    title: 'CreateTime',  
    dataIndex: 'CreateTime',  
    key: 'CreateTime',  
  }
];

const qualityInfoColumns = [  
  {  
    title: 'Quality',  
    dataIndex: 'Quality',  
    key: 'Quality',  
  },  
  {  
    title: 'Count',  
    dataIndex: 'Count',  
    key: 'Count',  
  }, 
  {  
    title: 'Rate',  
    dataIndex: 'Rate',  
    key: 'Rate',  
  },  
  {  
    title: 'TotalOdd',  
    dataIndex: 'TotalOdd',  
    key: 'TotalOdd',  
  }, 
  {  
    title: 'BdCount',  
    dataIndex: 'BdCount',  
    key: 'BdCount',  
  }, 
  {  
    title: 'BdRate',  
    dataIndex: 'BdRate',  
    key: 'BdRate',  
  },
  {  
    title: 'TotalBdOdd',  
    dataIndex: 'TotalBdOdd',  
    key: 'TotalBdOdd',  
  },
];

const heroInfoColumns = [  
  {  
    title: 'HeroID',  
    dataIndex: 'HeroID',  
    key: 'HeroID'
  },  
  {  
    title: 'Name',  
    dataIndex: 'Name',  
    key: 'Name'
  }, 
  {  
    title: 'Quality',  
    dataIndex: 'Quality',  
    key: 'Quality',  
  },  
  {
    title:'Total',
    children:[
      {  
        title: 'Count',  
        dataIndex: 'Count',  
        key: 'Count',  
      }, 
      {  
        title: 'Rate',  
        dataIndex: 'Rate',  
        key: 'Rate',  
      },  
      {  
        title: 'Odd',  
        dataIndex: 'Odd',  
        key: 'Odd',  
      },  
    ]
  },
  {
    title:'BdTotal',
    children:[
      {  
        title: 'BdCount',  
        dataIndex: 'BdCount',  
        key: 'BdCount',  
      }, 
      {  
        title: 'BdRate',  
        dataIndex: 'BdRate',  
        key: 'BdRate',  
      },  
      {  
        title: 'BdOdd',  
        dataIndex: 'BdOdd',  
        key: 'BdOdd',  
      },
    ]
  },
];

const lotteryInfoColumns = [  
  {  
    title: 'ID',  
    dataIndex: 'ID',  
    key: 'ID',  
  }, 
  {  
    title: 'HeroID',  
    dataIndex: 'HeroID',  
    key: 'HeroID',  
  },  
  {  
    title: 'IsBd',  
    dataIndex: 'IsBd',  
    key: 'IsBd',  
  }, 
  {  
    title: 'Name',  
    dataIndex: 'Name',  
    key: 'Name',  
  },  
  {  
    title: 'Quality',  
    dataIndex: 'Quality',  
    key: 'Quality',  
  }, 
];

onMounted(() => {
  heroListToMap();
  fetchPlanList();
  if(route.query.planName!=undefined && route.query.count!=undefined){
    planName.value=route.query.planName;
    count.value=route.query.count;
  }
});

function handleTableChange(curPagination) {
  pagination.current=curPagination.current;
  pagination.pageSize=curPagination.pageSize;
  fetchLottery();
}

const qualityTotals = computed(() => {
  let totalCount = 0;
  let totalBdCount = 0;
  let totalOdds = 0;
  let totalBdOdds = 0;

  qualityInfoData.value.forEach(({ Count, BdCount, TotalOdd, TotalBdOdd }) => {
    totalCount += Count;
    totalBdCount += BdCount;
    totalOdds+=TotalOdd;
    totalBdOdds+=TotalBdOdd;
  });

  const totalRate = totalCount ? (totalCount / totalCount) : 0;
  const totalBdRate = totalBdCount ? (totalBdCount / totalBdCount) : 0;

  return {
    totalCount,
    totalRate,
    totalBdCount,
    totalBdRate,
    totalOdds,
    totalBdOdds
  };
});

const heroTotals = computed(() => {
  let totalCount = 0;
  let totalBdCount = 0;
  let totalOdd=0;
  let totalBdOdd=0;

  heroInfoData.value.forEach(({ Count, BdCount,Odd,BdOdd }) => {
    totalCount += Count;
    totalBdCount += BdCount;
    totalOdd+=Odd;
    totalBdOdd+=BdOdd;
  });

  const totalRate = totalCount ? (totalCount / totalCount) : 0;
  const totalBdRate = totalBdCount ? (totalBdCount / totalBdCount) : 0;

  return {
    totalCount,
    totalOdd,
    totalRate,
    totalBdCount,
    totalBdOdd,
    totalBdRate
  };
});

const startLottery = () => {
    if(planName.value==null){
      message.error("请先选择planID")
      return;
    }
    if(count.value==null){
      count.value=100000;
    }
    if(count.value>300000){
      message.error("抽卡次数不得超过三十万！")
      count.value=0
      return;
    }
    if(!isLoadOdd.value){
      loadHeroOdd();
    }
    const planTemp={};
    fetchLoading.value=true;
    startLotterys(planID.value,count.value).then((res) => {
        message.success(res.msg);
        const tempInfo={};
        tempInfo["PlanID"]=planID.value;
        tempInfo["Count"]=count.value;
        tempInfo["CreateTime"]=getCurTime();
        planInfoData.value.push(tempInfo);
        downloadVisible.value=true;
        fetchHeroData();
        fetchQuality();
        // fetchLottery();
      }).catch((error) => {
        console.log(error);
      }).finally(()=>{
        fetchLoading.value=false;
        isLoadOdd.value=false;
        if(route.query.planID!==undefined){
          planTemp["ID"]=parseInt(route.query.ID);
          planTemp["PlanID"]=parseInt(planID.value);
          planTemp["PlanName"]=planName.value;
          planTemp["LastTime"]=getCurTime();
          planTemp["Count"]=count.value;
          planUpdate(planTemp).then((res) => {
            console.log(res);
          }).catch((error) => {
            console.log(error);
          }).finally(()=>{
          })
        }else{
          planTemp["PlanID"]=planID.value;
          const planInfoTemp=planList.value.filter(item => planID.value === item.PlanID)[0];
          planTemp["PlanName"]=planInfoTemp.Name;
          planTemp["LastTime"]=getCurTime();
          planTemp["Count"]=count.value;
          planAdd(planTemp).then((res) => {
            console.log(res);
          }).catch((error) => {
            console.log(error);
          }).finally(()=>{
          })
        }
      })
}

function getCurTime(){
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

function clearAllTableData(){
  downloadVisible.value=false;
  planInfoData.value=[];
  qualityInfoData.value=[];
  heroInfoData.value=[];
  lotteryInfoData.value=[];
}

function downloadToCsv() {
    downloadLoading.value=true;
    const planData = Array.isArray(planInfoData.value) ? planInfoData.value.map(row => ({
      'PlanID': row.PlanID,
      'Count': row.Count,
      'CreateTime':row.CreateTime,
    })) : [];

    const qualityData = Array.isArray(qualityInfoData.value) ? qualityInfoData.value.map(row => ({
      'Quality': row.Quality,
      'Count': row.Count,
      'Rate': `${qualityTotals._value.totalCount===0?(Math.floor(0)).toFixed(4):(Math.floor(row.Count / qualityTotals._value.totalCount * 1000000) / 10000).toFixed(4)}%`,
      'TotalOdd':`${(Math.floor(row.TotalOdd*1000000)/10000).toFixed(4)}%`,
      'BdCount': row.BdCount,
      'BdRate': `${qualityTotals._value.totalBdCount===0?(Math.floor(0)).toFixed(4):(Math.floor(row.BdCount / qualityTotals._value.totalBdCount * 1000000) / 10000).toFixed(4)}%`,
      'TotalBdOdd':`${(Math.floor(row.TotalBdOdd*1000000)/10000).toFixed(4)}%`,
    })) : [];
    const qualityTotalTemp={};
    qualityTotalTemp["Quality"]="Total";
    qualityTotalTemp["Count"]=qualityTotals._value.totalCount;
    qualityTotalTemp["Rate"]=`${(Math.floor(qualityTotals._value.totalRate * 1000000) / 10000).toFixed(4)}%`;
    qualityTotalTemp["TotalOdd"]=`${(Math.floor(qualityTotals._value.totalOdds * 1000000) / 10000).toFixed(4)}%`;
    qualityTotalTemp["BdCount"]=qualityTotals._value.totalBdCount;
    qualityTotalTemp["BdRate"]=`${(Math.floor(qualityTotals._value.totalBdRate * 1000000) / 10000).toFixed(4)}%`;
    qualityTotalTemp["TotalBdOdd"]=`${(Math.floor(qualityTotals._value.totalBdOdds * 1000000) / 10000).toFixed(4)}%`;
    qualityData.push(qualityTotalTemp);

    const heroData = Array.isArray(heroInfoData.value) ? heroInfoData.value.map(row => ({
      'HeroID':row.HeroID,
      'Name':row.Name,
      'Quality':row.Quality,
      'Count': row.Count,
      'Rate': `${heroTotals._value.totalCount===0?(Math.floor(0)).toFixed(4):(Math.floor(row.Count / heroTotals._value.totalCount * 1000000) / 10000).toFixed(4)}%`,
      'Odd': `${(Math.floor(row.Odd * 1000000) / 10000).toFixed(4)}%`,
      'BdCount': row.BdCount,
      'BdRate': `${heroTotals._value.totalBdCount===0?(Math.floor(0)).toFixed(4):(Math.floor(row.BdCount / heroTotals._value.totalBdCount * 1000000) / 10000).toFixed(4)}%`,
      'BdOdd': `${(Math.floor(row.BdOdd * 1000000) / 10000).toFixed(4)}%`,
    })) : [];
    const heroTotalTemp={};
    heroTotalTemp["Quality"]="Total";
    heroTotalTemp["Count"]=heroTotals._value.totalCount;
    heroTotalTemp["Rate"]=`${(Math.floor(heroTotals._value.totalRate * 1000000) / 10000).toFixed(4)}%`;
    heroTotalTemp["Odd"]=`${(Math.floor(1 * 1000000) / 10000).toFixed(4)}%`;
    heroTotalTemp["BdCount"]=heroTotals._value.totalBdCount;
    heroTotalTemp["BdRate"]=`${(Math.floor(heroTotals._value.totalBdRate * 1000000) / 10000).toFixed(4)}%`;
    heroTotalTemp["BdOdd"]=`${(Math.floor(1 * 1000000) / 10000).toFixed(4)}%`
    heroData.push(heroTotalTemp);
    const wb = XLSX.utils.book_new();
    const wb1 = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_json(ws,planData, { header: ['PlanID','Count','CreateTime'],origin: { r: 0, c: 0 },raw: false });
    XLSX.utils.sheet_add_json(ws,qualityData, { header: ['Quality','Count', 'Rate', 'TotalOdd', 'BdCount', 'BdRate', 'TotalBdOdd'] ,origin: { r: 0, c: 10 } ,raw: false});
    XLSX.utils.sheet_add_json(ws,heroData, { header: ['HeroID','Name','Quality','Count', 'Rate','Odd','BdCount', 'BdRate', 'BdOdd' ],origin: { r: qualityData.length+2, c: 0 },raw: false });
    XLSX.utils.book_append_sheet(wb, ws, 'TotalData');
    const totalCsv = XLSX.write(wb, { bookType: 'csv', type: 'binary' });
    
    var lotteryInfoTemp=[];
    lotteryDatas().then((res) => {
      lotteryInfoTemp=res.result;
      lotteryInfoTemp.forEach(element => {
        element["Name"] = heroMap[element.HeroID];
      });
    }).catch((error) => {
      console.log(error);
    }).finally(()=>{
      const lotteryData = Array.isArray(lotteryInfoTemp) ? lotteryInfoTemp.map(row => ({
        'LotteryID': row.ID,
        'Name': row.Name,
        'IsBd':row.IsBd,
        'HeroID':row.HeroID,
        'Quality':row.Quality,
      })) : [];
      const ws1 = XLSX.utils.json_to_sheet(lotteryData, { header: ['LotteryID','Name', 'IsBd', 'HeroID', 'Quality'],raw: false });
      XLSX.utils.book_append_sheet(wb1, ws1, 'Lottery Data');
      
      const lotteryCsv = XLSX.write(wb1, { bookType: 'csv', type: 'binary' });

      const zip = new JSZip();
      zip.file("Total.csv", new Blob([s2ab(totalCsv)], { type: 'text/csv;charset=utf-8;' }));
      zip.file("LotteryData.csv", new Blob([s2ab(lotteryCsv)], { type: 'text/csv;charset=utf-8;' }));
      zip.generateAsync({ type: "blob" }).then(function(content) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = 'ExportData.zip';
          link.click();
      });
      downloadLoading.value=false;
    })
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

function fetchLottery(){
  pagination.total = lotteryTotal;
  heroInfoLoading.value=true;
  lotteryDatas(pagination).then((res) => {
    lotteryInfoData.value=res.result;
    lotteryInfoData.value.forEach(element => {
      element["Name"] = heroMap[element.HeroID];
    });
  }).catch((error) => {
    console.log(error);
  }).finally(()=>{
    heroInfoLoading.value=false
  })
}

function fetchQuality(){
  qualityDatas().then((res) => {
    qualityInfoData.value.forEach((qualityItem)=>{
      const qualityTemp=res.result.filter((item)=>item.Quality==qualityItem.Quality);
      if(qualityItem.Quality==5){
        qualityItem.TotalBdOdd=1;
      }
      if(qualityTemp.length>0){
        qualityTemp.forEach((qualitydate)=>{
          if(qualitydate.IsBd>0){
            qualityItem["BdCount"]=qualitydate.Count;
          }else{
            qualityItem["Count"]=qualitydate.Count;
            qualityItem["BdCount"]=0;
          }
        })
      }else{
        qualityItem["Count"]=0;
        qualityItem["BdCount"]=0;
      }
    })
  }).catch((error) => {
    console.log(error);
  })
}

function fetchHeroData(){
  heroDatas().then((res) => {
    heroInfoData.value.forEach((heroItem)=>{
      heroItem["Name"]=heroMap[heroItem.HeroID];
      var heroTemp=res.result.filter((item)=>item.HeroID==heroItem.HeroID);
      if(heroTemp.length>0){
        heroTemp.forEach((item)=>{
          heroItem["IsBd"]=item.IsBd;
          if(item.IsBd>0){
            heroItem["BdCount"]=item.Count;
            if(heroItem.Count==undefined){
              heroItem["Count"]=0;
            }
          }else{
            heroItem["Count"]=item.Count;
            heroItem["BdCount"]=0;
          }
        })
      }else{
        heroItem["Count"]=0;
        heroItem["BdCount"]=0;
        heroItem["IsBd"]=0;
      }
    });
    heroInfoData.value.sort((a, b) => b.Count - a.Count);
  }).catch((error) => {
    console.log(error);
  })
}

function heroListToMap(){
  getHeroList().then((res) => {
    for(let i=0;i<res.result.length;i++){
      heroMap[res.result[i].HeroID]=res.result[i].Name;
    }
  }).catch((error) => {
    console.log(error);
  });
}

function fetchPlanList(){
  lotteryPlan().then((res) => {
    planList.value=res.result;
    if(route.query.planID!=undefined){
      loadHeroOdd();
    }
  }).catch((error) => {
    console.log(error);
  });
}

function loadHeroOdd(){
  clearAllTableData();
  isLoadOdd.value=true;
  if(route.query.planID==undefined){
    planID.value=planName.value;
  }else{
    planID.value=route.query.planID;
  }
  const planTemp=planList.value.filter((item)=>item.PlanID==planID.value)[0];
  const classList=[];
  classList.push(planTemp.ClassID);
  if(planTemp.MergeIDs!=""){
    JSON.parse(planTemp.MergeIDs).forEach((item)=>{
      classList.push(item);
    })
  }
  getTargetLottery(classList).then((res) => {
    const totalOdd = res.result.reduce((map, currentItem) => {
      if(map[currentItem.Grade]==undefined){
        map[currentItem.Grade]=0;
      }
      map[currentItem.Grade]+=currentItem.Odd;
      return map;
    }, {});
    const gradeOdd=JSON.parse(planTemp.Params).GradeOdd;
    var oddSum=0;
    for(let item in gradeOdd){
      oddSum+=gradeOdd[item];
    }
    for(let item in gradeOdd){
      const qualityDataTemp={};
      oddRate[item]=gradeOdd[item]/oddSum;
      qualityDataTemp["Quality"]=item;
      qualityDataTemp["TotalOdd"]=oddRate[item];
      qualityDataTemp["TotalBdOdd"]=0;
      qualityInfoData.value.push(qualityDataTemp);
    }
    res.result.forEach((resItem)=>{
      if(resItem.Type=="Hero"){
        resItem["HeroID"]=resItem.Param;
        if(resItem.Grade=="5"){
          resItem["BdOdd"]=resItem.Odd/totalOdd[resItem.Grade];
        }else{
          resItem["BdOdd"]=0;
        }
        resItem.Odd=resItem.Odd/totalOdd[resItem.Grade]*oddRate[resItem.Grade];
        resItem["Quality"]=resItem.Grade;
        heroInfoData.value.push(resItem);
      }
    })
  }).catch((error) => {
    console.log(error);
  });
}

</script>

<style scoped>
.logo {
    display: flex;
    height: 3.5rem;
    pointer-events: none;
    margin: 0 1rem;
}

#components-page-header-demo-responsive .extra {
    width: 100%;
    margin-left: 0;
    text-align: left;
}

.body{
  background-color: gray;
}
</style>
