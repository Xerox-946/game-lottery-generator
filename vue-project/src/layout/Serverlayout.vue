<template>
    <a-layout>
        <a-layout>
            <!-- <a-layout-sider style="background: #ffffff;" theme="light">
                <a-menu style="height:90vh" v-model:openKeys="state.openKeys" v-model:selectedKeys="state.selectedKeys"
                    mode="inline" theme="light" :inline-collapsed="state.collapsed" :items="items" @select="handleSelect"></a-menu>
            </a-layout-sider> -->
            <a-layout-content style="height:90vh;background: #ffffff;">
                <router-view />
            </a-layout-content>
        </a-layout>
        <a-layout-footer style="height:10vh;background: #ffffff;">@halobox.cn</a-layout-footer>
    </a-layout>
</template>

<script setup>
import { reactive, watch, h } from 'vue';
import { useRouter } from 'vue-router';  
import {
    PieChartOutlined
} from '@ant-design/icons-vue';
const router = useRouter();
const state = reactive({
    collapsed: false,
    selectedKeys: ['1'],
    openKeys: ['sub1'],
    preOpenKeys: ['sub1'],
});
const items = reactive([
    {
        key: '1',
        icon: () => h(PieChartOutlined),
        label: 'Plan',
        title: 'PlanList',
    },
]);

function handleSelect() {
    const selectedKey = state.selectedKeys[state.selectedKeys.length - 1];
    const routes = {  
        '1': '/plan',
    };  
    if (routes[selectedKey]) {  
        router.push(routes[selectedKey]);  
    }  
}  
</script>
