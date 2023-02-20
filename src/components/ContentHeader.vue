<template>
  <div class="content-header">
    <div class="left">
      <img src="@/assets/images/title/icon2.png" alt="icon" />
      <span>{{ time }}</span>
    </div>
    <h1>开发区工业企业监管服务数字平台</h1>
    <div class="right">
      <span>这里是通知内容</span>
      <img src="@/assets/images/title/icon.png" alt="icon2" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: "",
    };
  },
  mounted() {
    this.time = this.getNowDate();
  },
  methods: {
    getNowDate() {
      const date = new Date();
      let sign2 = ":";
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (day >= 1 && day <= 9) {
        day = "0" + day;
      }
      if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minutes >= 1 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      if (seconds >= 1 && seconds <= 9) {
        seconds = "0" + seconds;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        sign2 +
        minutes +
        sign2 +
        seconds
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.content-header {
  text-align: center;
  line-height: 75px;
  margin: 0 -32px;
  height: 75px;
  font-size: 32px;
  letter-spacing: 1px;
  //box-shadow: 0px 2px 2px 0px #002e97;
  background: url("@/assets/images/title/title_01.png") no-repeat 100% 100%;
  display: flex;
  justify-content: space-between;
  //align-items: center;
  position: relative;

  h1 {
    font-family: singleFont;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .left,
  .right {
    color: #0080c9;
    font-size: 16px;
    display: flex;
    align-items: center;
    height: 40px;

    img {
      display: inline-block;
      width: 20px;
      height: 16px;
      margin: 0 20px;
    }
  }
  .right {
    font-size: 14px;
  }
}
</style>