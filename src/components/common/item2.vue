<template>
  <div class="item2">
    <span>{{ list.name }}</span>
    <img :src="list.icon" alt="icon" />
    <b>{{ list.value }}</b>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      default: {
        icon: "",
        name: "",
        value: "",
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.item2 {
  width: 143px;
  height: 149px;
  //background-color: rgba(0, 94, 154, 0.16);
  background: url("@/assets/images/rightTop/icon_bg.png") no-repeat;
  background-size: cover;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  //padding: 20px 0;
  align-items: center;

  img {
    display: block;
    width: 30px;
    height: 30px;
    margin: 8px 0;
  }
  //pad端
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    span {
      transform: scale(0.8);
    }
  }
  span {
    font-size: 14px;
    line-height: 26px;
  }
  b {
    font-size: 26px;
    line-height: 34px;
    color: #3effff;
  }
}
</style>