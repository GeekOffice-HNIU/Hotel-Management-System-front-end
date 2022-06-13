<template>
  <el-container>
    <el-header height="465"> 访问您的{{loginTitle}}账户 </el-header>
    <el-divider id="divider" />
    <el-main class="loginBody">
      <div class="formDiv">
        <el-form
          id="elForm"
          :model="loginFormData"
          :rules="formRules"
          ref="baseForm"
          status-icon="true"
        >
          <el-space direction="vertical" size="50">
            <el-row justify="center">
              <el-form-item
                class="formLabel"
                label="用户名"
                prop="username"
                required
              >
                <el-input
                  id="input"
                  v-model="loginFormData.username"
                  autofocusdsad
                />
              </el-form-item>
            </el-row>
            <el-row justify="center">
              <el-form-item
                class="formLabel"
                label="密&emsp;码"
                prop="password"
                required
              >
                <el-input
                  id="input"
                  type="password"
                  v-model="loginFormData.password"
                  autofocusdsad
                />
              </el-form-item>
            </el-row>
            <el-button id="loginBtn" auto-insert-space @click="login"
              >登录</el-button
            >
            <router-link to="/register">
              <span id="register"> 注册账号 </span>
              <span id="adminLogin"> {{loginIdentify}}登录 </span>
            </router-link>
          </el-space>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { reactive, ref, unref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import localStorage from "../utils/localStorage";
import { useStore } from 'vuex';
// import axios from "../request/axios";
export default {
  setup() {
    const baseForm = ref(null);
    const loginFormData = reactive({
      username: "",
      password: "",
      type: 0
    });

    let loginTitle = '';
    let loginIdentify = '管理员';
    const storage = localStorage;
    const router = useRouter();
    const store = useStore();

    const formRules = {
      username: [
        {
          pattern: "^[\\u4E00-\\u9FA5A-Za-z\\s]+(·[\\u4E00-\\u9FA5A-Za-z]+)*$",
          required: true,
          message: "我们需要知道您的用户名",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "您的密码同您的账号信息不匹配",
          trigger: "blur",
        },
      ],
    };

    const login = async () => {
      const loginForm = unref(baseForm);
      console.log("[INFO] loginForm: ", loginForm);
      console.log("[INFO] loginFormData: ", loginFormData);
      
      axios.post("http://hotel.lynnrin.top/api/user/searchUser",{
        username: loginFormData.username,
        password: loginFormData.password,
        type: loginFormData.type
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log("[INFO] res: ", res);
        if (res.data.status === 0) {
          console.log("[INFO] 登录成功");
          storage.setCookie("login",loginFormData.username);
          store.commit("setLogin",loginFormData.username);
          router.go(-1);
        } else {
          console.log("[INFO] 登录失败");
        }
      });
      if (!loginForm) return;
      try {
        await loginForm.validate();
        const { username, password } = loginFormData;
        console.log("[INFO] username: " + username + ", password: " + password);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      baseForm,
      loginFormData,
      formRules,
      loginTitle,
      loginIdentify,
      login,
    };
  },
};
</script>

<style lang="less">
html,
body {
  font-family: "SF Pro Display Regular";
  font-size: 42px;
  text-align: center;
}

#divider {
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 3px;
  border-color: #7e8ca7;
  width: 700px;
}

.loginBody {
  .formDiv {
    .el-form-item__label {
      text-align: justify;
      color: #fff;
      font-size: 29px;
    }
    .el-form-item.is-required .el-form-item__label:before {
      content: none !important;
    }
    .el-input {
      width: 240px;
    }
    .el-form-item__error {
      color: #c73e3a;
      font-size: 17px;
      margin-top: 3px;
      margin-bottom: 3px;
    }

    #elForm {
      #loginBtn {
        margin-top: 27px;
        margin-left: 60px;
        width: 200px;
        height: 50px;
        font-size: 21px;
        font-family: "SF Pro Display Regular";
        color: #fff;
        background-color: #e0b973;
        border: 1px solid #e0b973;
        border-radius: 13px;
      }
      #register {
        font-size: 17px;
        margin-left: 55px;
      }
      #adminLogin {
        font-size: 17px;
        margin-left: 55px;
      }
    }
  }
}
</style>
