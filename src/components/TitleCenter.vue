<template>
  <div class="title_center_wrap">
    <div v-for="item in list" :key="item.id" class="content_wrap">
      <div class="img_div">
        <img :src="item.img" alt="icon" />
      </div>
      <div class="content_div">
        <h5>{{ item.name }}</h5>
        <span
          ><b>{{ item.value }}</b
          >{{ item.unit }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
};
</script>
<style lang="scss" scoped>
.title_center_wrap {
  width: 598px;
  height: 127px;
  background: url("@/assets/images/center/bg.png") no-repeat 100% 100%;
  display: flex;
  > div:not(:first-child):before {
    content: "";
    width: 1px;
    height: 74px;
    position: absolute;
    left: 0;
    background: url("@/assets/images/center/line.png") no-repeat 100% 100%;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1;
  }
  .img_div {
    width: 72px;
    height: 72px;
    background: url("@/assets/images/center/icon_bg.png") no-repeat 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 26px;
      height: 26px;
    }
  }
  .content_div {
    margin-left: 20px;
    h5 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    b {
      font-size: 36px;
      margin-right: 10px;
      line-height: 31px;
      color: #3effff;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
