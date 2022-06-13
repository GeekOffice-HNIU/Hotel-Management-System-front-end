import $ from 'jquery';
<template>
  <el-container
    id="elContainer"
    :class="{ loginBG: loginPageCSS, loginMask: loginPageCSS }"
    :style="{ backgroundImage: 'url(' + bgImg + ')' }"
  >
    <div id="bgMask">
      <el-header height="149">
        <el-row justify="space-between">
          <el-col :span="12">
            <el-image
              id="Logo"
              :src="require('./assets/images/logo.png')"
              error="(e)={console.log(e)}"
              placeholder="error"
            />
          </el-col>
          <el-col :span="12">
            <el-space class="navBar" :size="57">
              <span>
                <router-link to="/" :data-linkID="0" @click="changePageInfo"
                  >Home</router-link
                >
              </span>
              <span>
                <router-link
                  to="/rooms"
                  :data-linkID="1"
                  @click="changePageInfo"
                  >Rooms</router-link
                >
              </span>
              <span>
                <router-link
                  to="/about"
                  :data-linkID="2"
                  @click="changePageInfo"
                  >About</router-link
                >
              </span>
              <span>
                <router-link
                  to="/login"
                  :data-linkID="3"
                  @click="changePageInfo"
                  >Login</router-link
                >
              </span>
            </el-space>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </div>
  </el-container>
</template>

<style lang="less">
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: "SF Pro Display Regular";
}

#elContainer {
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 39, 74, 0.5);

  el-header {
    height: 149px;
    z-index: 1;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  .router-link-active {
    color: #fff;
    text-decoration: underline;
  }

  #bgMask {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-color: rgba(20, 39, 74, 0.5);
  }

  #Logo {
    width: 256px;
    height: 149px;
  }

  .navBar {
    margin: 0 auto;
    margin-top: 3.5%;
    font-size: 25px;
  }

  .loginBG {
    background: none !important;
  }
}
</style>

<script>
export default {
  data() {
    return {
      loginPageCSS: false,
      bgImg: require("./assets/images/homeBackground.png"),
    };
  },
  methods: {
    changePageInfo(res) {
      let linkID = res.target.dataset.linkid;
      console.log("[INFO] linkID:", linkID);
      switch (linkID) {
        case "0":
          {
            console.log("[INFO] Home");
            this.loginPageCSS = false;
            this.bgImg = require("./assets/images/homeBackground.png");
          }
          break;
        case "1":
          {
            this.loginPageCSS = false;
            this.bgImg = require("./assets/images/roomsBackground.png");
            console.log("[INFO] bgImg:");
          }
          break;
        case "2":
          this.loginPageCSS = false;
          break;
        case "3":
          {
            this.loginPageCSS = true;
            this.bgImg = require("./assets/images/loginBackground.png");
          }
          break;
      }
    },
  },
};
</script>
