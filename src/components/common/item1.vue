<template>
  <div class="item1">
    <div>
      <img :src="list.icon" alt="icon" />
    </div>

    <span>{{ list.name }}</span>
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
.item1 {
  width: 142px;
  height: 174px;
  //background-color: rgba(0, 94, 154, 0.16);
  background: url("@/assets/images/leftTop/bg1.png") no-repeat 100% 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  div {
    width: 82px;
    height: 82px;
    background: url("@/assets/images/leftTop/bg_icon.png") no-repeat 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    display: block;
    width: 45px;
    height: 48px;
  }
  span {
    font-size: 14px;
    line-height: 34px;
  }
  b {
    font-size: 26px;
    color: #3effff;
  }
}
</style>