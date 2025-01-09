<template>
  <a-button type="primary" @click="createPlan" style="margin-bottom: 8px;float: left;margin-left: 8px;margin-top: 8px;" danger><FormOutlined></FormOutlined>创建新计划</a-button>
  <!-- <a-button key="1" type="primary" style="margin-bottom: 8px;float: left;margin-left: 8px;margin-top: 8px;"><BulbOutlined></BulbOutlined>使用帮助</a-button> -->
  
  <a-dropdown @click="handleButtonClick">
    <a class="ant-dropdown-link" style="color: black;margin-bottom: 8px;float: right;margin-right: 15px;margin-top: 8px;" @click.prevent>
      <a-avatar src="../../touxiang.ico" />
        {{route.params.username}}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="router.push('/')">
          登出
        </a-menu-item>
        <!-- <a-menu-item key="2" @click="createPlan">
          添加计划
        </a-menu-item> -->
      </a-menu>
    </template>
  </a-dropdown>
  
  <a-table :columns="columns" :dataSource="dataSource" bordered >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'Count'">
        <div class="editable-cell">
          <div v-if="editableData[record.ID]" class="editable-cell-input-wrapper">
            <a-input v-model:value="editableData[record.ID].Count" @pressEnter="save(record.ID)" />
            <check-outlined class="editable-cell-icon-check" @click="save(record.ID)" />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <edit-outlined class="editable-cell-icon" @click="edit(record.ID)" />
          </div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'action'">
        <div class="editable-row-operations">
          <RouterLink :to="{path: `/startLottery`,query: {ID:record.ID,planID: record.PlanID,count: record.Count,planName:record.PlanName}}">
            <a-button type="primary">
              运行抽卡
            </a-button>
          </RouterLink>
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除?"
            @confirm="onDelete(record.ID)"
            >
            <a-button type="primary" style="margin-left: 8px;" danger>删除</a-button>
          </a-popconfirm> 
        </div>
      </template>
    </template>
  </a-table>
</template>
    
<script setup>  
import { ref, onMounted, reactive, toRaw } from 'vue';  
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';  
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { planStore } from '@/store/modules/plan';
import { CheckOutlined, EditOutlined, FormOutlined, BulbOutlined, DownOutlined, UserOutlined } from '@ant-design/icons-vue';

const pStore=planStore();
const { planList, planAdd, planUpdate, planDel } = pStore; 
const router = useRouter();
const route=useRoute();
const dataSource = ref([]);
const editableData = reactive({});
const shouldHideColumn = ref(true);
  
const columns = [  
  {  
    title: 'ID',  
    dataIndex: 'ID',  
    key: 'ID',  
  },  
  // {  
  //   title: 'PlanID',  
  //   dataIndex: 'PlanID',  
  //   key: 'PlanID',  
  // }, 
  {  
    title: 'PlanName',  
    dataIndex: 'PlanName',  
    key: 'PlanName',  
  },  
  {  
    title: 'Count(<=30W)', 
    dataIndex: 'Count',  
    key: 'Count',  
  },  
  {  
    title: 'LastTime', 
    dataIndex: 'LastTime',  
    key: 'LastTime',  
  },  
  {  
    title: 'Action',  
    dataIndex: 'action', 
  },
]; 
  
onMounted(() => {  
  planList().then((res) => {
    dataSource.value=res;
  }).catch((error) => {
    console.log(error);
  }).finally(()=>{
  })
});  
  
function requestFailed(err) {  
  console.log(err);
  message.error("请求失败");  
}  

function createPlan() {
  router.push("/startLottery");
}

const edit = key => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.ID)[0]);
};

const save = key => {
  if(editableData[key].Count>300000){
    message.error("抽卡次数不能超过三十万！");
    return;
  }
  Object.assign(dataSource.value.filter(item => key === item.ID)[0], editableData[key]);
  planUpdate(editableData[key]).then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
  }).finally(()=>{
  })
  delete editableData[key];
};

const cancel = key => {
    delete editableData[key];
};

const onDelete = key => {
  planDel(key).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    }).finally(()=>{
    })
  dataSource.value = dataSource.value.filter(item => item.ID !== key);
};

const handleButtonClick = e => {
  // console.log('click left button', e);
};

</script>
<style scoped>
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  /* .editable-cell-icon {
    margin-top: 4px;
    display: none;
  } */

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>