<template>
  <el-container>
    <div id="textOnly">
      <span>欢迎来到</span>
      <span>XXX</span>
      <span>这里的奢华，</span>
      <span>你来定义。</span>
    </div>
  </el-container>
</template>

<style lang="less">
html,
body {
  color: #fff;
}
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
</style>
