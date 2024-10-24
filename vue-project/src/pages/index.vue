<template>
  <div class="bg-color" h-97.7vh w-99.98vw flex items-center justify-center >
    <div rd-2 bg-white flex="~ items-center justify-around" pa-28 class="<lg:w-160" ml-220>
      <div flex="~ col justify-between" h-full>
        <div mb-8 text-15 color-black font-medium>
          Hello!
        </div>
        <div mb-8 text-8 color-black font-medium>
          《信长》项目抽卡模拟系统
        </div>
        <AForm :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off">
          <AFormItem label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
            <a-input v-model:value="formState.username" class="w-200px" placeholder="请输入用户名">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </AFormItem>

          <AFormItem label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
            <a-input-password v-model:value="formState.password" class="w-200px" placeholder="请输入密码">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </AFormItem>
        </AForm>

        <div size="large" class="button-shadow h-32px flex items-center justify-center btn" @click="handleLogin">
          登录
        </div>
      </div>
    </div>
  </div>
  <a-layout-footer class="foot" style="background: #d9d9d9;">@halobox.cn</a-layout-footer>
</template>

<script setup>
import { notification } from 'ant-design-vue'
import { useRouter } from 'vue-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { userStore } from '@/store/modules/user';  
const router = useRouter();
const uStore = userStore();  
const { userLogin } = uStore; 

const formState = reactive({
  username: '',
  password: '',
})
function handleLogin() {
  userLogin(formState)
  .then((res) => {
    notification.success({
      message: '登录成功',
      description: res,
      duration: 0,
    });
    router.push("/plan/"+formState.username);
  }).catch((error) => {
    notification.error({
      message: '登录失败',
      description: error.msg,
      duration: 0,
    })
  })
}
</script>

<style scoped>
.bg-color {
  top: 10;
  padding: 0;
  background-image: url("../../background.463e5eee.jpg");
  overflow: hidden;
}

.input-wrapper {
  min-width: 20.88rem;
  /* height: 3rem; */
  /* background: #ffffff; */
  box-shadow: 0px 0px 6px 1px rgba(85, 84, 84, 0.1);
  border-radius: 6px 6px 6px 6px;
}

.button-shadow {
  box-shadow: 0rem 0rem 0.5rem 0.06rem rgba(0, 0, 0, 0.16);
}

</style>