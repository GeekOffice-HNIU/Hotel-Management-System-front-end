<template>
  <el-container>
    <el-header>请告诉我们您想要的预定</el-header>
    <el-divider id="divider" />
    <el-main>
      <div class="formDiv">
        <el-form
          id="elForm"
          :model="bookFormData"
          :rules="formRules"
          ref="baseForm"
          status-icon="true"
        >
          <el-space direction="vertical" size="50">
            <el-row justify="center">
              <el-form-item
                class="formLabel"
                label="您的姓名"
                prop="name"
                required
              >
                <el-input
                  id="input"
                  v-model="bookFormData.name"
                  autofocusdsad
                />
              </el-form-item>
            </el-row>
            <el-row justify="center">
              <el-form-item
                class="formLabel"
                label="联系电话"
                prop="phone"
                required
              >
                <el-input
                  id="input"
                  v-model="bookFormData.phone"
                  autofocusdsad
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item
                class="formLable"
                label="预定房型"
                prop="roomType"
                required
              >
                <el-select
                  v-model="bookFormData.roomType"
                  placeholder="请选择您要入住的房型"
                >
                  <el-option
                    v-for="item in roomTypeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="formLable" label="选择房号">
                <el-select v-model="bookFormData.roomNum" placeholder="请选择您喜欢的房间号">
                  <el-option 
                v-for="item in roomNumberList"
                :key="item.rid"
                :label="item.rname"
                  />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="formLable" label="入住时间">
                <el-date-picker
                  v-model="bookFormData.checkInDay"
                  default-value="bookFormData.checkInDay"
                  type="date"
                />
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item class="formLable" label="退房时间">
                <el-date-picker v-model="bookFormData.checkOutDay" />
              </el-form-item>
            </el-row>
            <el-row>
              <span id="priceSpan">价格：{{ totalPrice }} 元</span>
            </el-row>
            <el-button id="loginBtn" auto-insert-space @click="order"
              >立即预定</el-button
            >
          </el-space>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { reactive, ref, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const baseForm = ref(null);
    const bookFormData = reactive({
      name: "",
      phone: "",
      roomType: 1,
      roomNum: '',
      checkInDay: new Date().setTime(new Date().getTime()),
      checkOutDay: new Date().setTime(new Date().getTime() + 3600 * 1000 * 24),
    });
    bookFormData.name = store.state.loginStatus.username;
    const roomTypeOption = [
      {
        value: 1,
        label: "单人间",
      },
      {
        value: 2,
        label: "双人间",
      },
      {
        value: 3,
        label: "商务间",
      },
      {
        value: 4,
        label: "豪华间",
      },
      {
        value: 5,
        label: "行政间",
      },
      {
        value: 6,
        label: "套间",
      },
      {
        value: 7,
        label: "双套间",
      },
      {
        value: 8,
        label: "高级套间",
      },
      {
        value: 9,
        label: "复式套间",
      },
    ];
    const roomPrice = [112, 225, 338, 450, 562, 675, 788, 900, 1022, 1134];
    const formRules = {
      name: [
        {
          pattern: "^[\\u4E00-\\u9FA5A-Za-z\\s]+(·[\\u4E00-\\u9FA5A-Za-z]+)*$",
          required: true,
          message: "我们需要知道您的姓名",
          trigger: "blur",
        },
      ],
      phone: [
        {
          pattern:
            "^(?:(?:\\+|00)86)?1(?:(?:3[\\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\\d])|(?:9[189]))\\d{8}$",
          required: true,
          message: "我们无法验证这个手机号码",
          trigger: "blur",
        },
      ],
      roomType: [
        {
          required: true,
          message: "请选择您要入住的房型",
          trigger: "change",
        },
      ],
    };

    let totalPrice = computed(() => {
      let price = 0;
      let stayDays = 1;
      let roomType = bookFormData.roomType;
      stayDays = Math.ceil(
        (bookFormData.checkOutDay - bookFormData.checkInDay) /
          (3600 * 1000 * 24)
      );
      price = stayDays * roomPrice[roomType - 1];
      return price;
    });

    

    const roomList = axios.post("http://hotel.lynnrin.top/api/room/searchRoom")

    console.log("[DEBUG] roomList", roomList);
    let roomNumberList = computed(() => {
        // 根据 roomType 过滤 roomList 
        if (roomList.status != 0) return null;
        let roomType = bookFormData.roomType;
        let roomList = roomList.data;
        let roomNumberList = [];
        for (let i = 0; i < roomList.length; i++) {
          if (roomList[i].rType == roomType) {
            roomNumberList.push(roomList[i]);
          }
        }
        return roomNumberList;
    })

    const order = () => {
      console.log(bookFormData);
    };

    return {
      baseForm,
      bookFormData,
      roomTypeOption,
      formRules,
      totalPrice,
      order,
      roomNumberList,
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
  background: url("~@/assets/images/loginBackground.png");
}

#divider {
  margin: 0 auto;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 3px;
  border-color: #7e8ca7;
  width: 700px;
}

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
    #priceSpan {
      font-size: 27px;
    }
  }
}
</style>
