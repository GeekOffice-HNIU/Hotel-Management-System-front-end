<template>
  <el-container id="rooms">
    <div id="textOnly">
      <span>欢迎来到</span>
      <span>XXX</span>
      <span>房间很大，</span>
      <span>大中之大。</span>
    </div>
    <div id="btn">
      <el-button id="orderBtn" round="true" auto-insert-space @click="bookRoom"> 现在预定 </el-button>
    </div>
  </el-container>
</template>

<script>
// import { reactive, ref, unref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const bookRoom = () => {
      console.log("[INFO] bookRoom");
      let loginState = store.state.loginStatus.isLogin;
      if (!loginState) router.push("/login");
      else router.push("/book");
    };
    return {
      bookRoom
    };
  }
}
</script>

<style lang="less">
html,
body {
  color: #fff;
}

#rooms {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  #textOnly {
    margin-top: 7%;
    margin-left: 20%;
    display: flex;
    flex-direction: column;
    text-align: left;
    span {
      &:first-child {
        font-size: 80px;
      }
      &:nth-child(2) {
        font-size: 90px;
      }
      &:nth-child(3) {
        font-size: 70px;
      }
      &:nth-child(4) {
        font-size: 70px;
      }
    }
  }

  #btn {
    #orderBtn {
      /* Book now */
      width: 286px;
      height: 78px;
      margin: 0 auto;
      margin-top: 16px;
      color: #FFF;
      background: #E0B973;
      font-size: 25px;
    }
  }
}
</style>
