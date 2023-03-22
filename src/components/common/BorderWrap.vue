<template>
  <div class="border-wrap">
    <h4>{{ name }}</h4>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.border-wrap {
  width: 460px;
  //height: 347px;
  //background-color: rgba(0, 80, 157, 0.25);
  background: url("@/assets/images/common/block_bg.png") no-repeat;
  background-size: cover;
  position: relative;
  padding: 20px;
  h4 {
    font-size: 22px;
    // position: absolute;
    // left: 26px;
    // top: -20px;
    padding-left: 26px;
    height: 21px;
    line-height: 0;
    color: #fff;
    background: url("@/assets/images/common/block_title.png");
    background-size: cover;
    font-family: singleFont;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
  }
  h4:before {
    width: 15px;
    height: 9px;
    content: "";
    background: url("@/assets/images/common/arrow_03.png") no-repeat;
    background-size: cover;
    position: absolute;
    left: 0;
    top: -5px;
  }
}
</style>