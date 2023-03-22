<template>
  <div class="street_dis">
    <div class="top">
      <div v-for="item in list" :key="item.name">
        <div>{{ item.value }}</div>
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="bottom">
      <div v-for="item in list2" :key="item.name">
        <span class="border_span">{{ item.value3 }}</span>
        <div>
          <span :style="{ width: item.value + '%' }"></span>
        </div>
        <span class="center_span">{{ item.name }}</span>
        <div>
          <span :style="{ width: item.value2 + '%' }"></span>
        </div>
        <span class="border_span">{{ item.value3 }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: "出动人次", value: "166" },
        { name: "发现隐患数量", value: "288" },
      ],
      list2: [
        { name: "红垦区", value: "66", value2: "40", value3: 40 },
        { name: "科技城", value: "88", value2: "35", value3: 40 },
        { name: "钱江单元", value: "66", value2: "90", value3: 40 },
        { name: "桥南", value: "88", value2: "80", value3: 40 },
        { name: "市北单元", value: "88", value2: "70", value3: 40 },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.street_dis {
  height: 319px;
  font-size: 15px;
  .top {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        font-size: 26px;
        line-height: 82px;
        color: #3effff;
        width: 82px;
        height: 74px;
        text-align: center;
        background: url("@/assets/images/leftBottom/font_bg1.png") no-repeat;
        background-size: cover;
      }
      span {
        display: block;
        //width: 160px;
        height: 26px;
        padding: 0 20px;
        text-align: center;
        line-height: 26px;
        margin-top: 10px;
        white-space: nowrap;
        background: url("@/assets/images/leftBottom/font_bg2.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 170px;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        width: 110px;
        height: 9px;
        border-radius: 4px;
        background-color: #003aa5;

        span {
          display: block;
          height: 9px;
          border-radius: 4px;
        }
      }
      div:nth-child(2) {
        span {
          background: linear-gradient(
            to right,
            rgba(82, 132, 251, 0.95) 0%,
            #54eaff 100%
          );
        }
      }
      div:nth-child(4) {
        span {
          background: linear-gradient(
            to right,
            rgba(226, 85, 194, 0.95) 0%,
            #5460ff 100%
          );
        }
      }

      .border_span {
        width: 32px;
        height: 17px;
        background-color: #395e8d;
        border-radius: 9px;
        text-align: center;
        line-height: 17px;
        font-size: 14px;
        color: #051835;
      }
      .center_span {
        white-space: nowrap;
      }
    }
  }
}
</style>