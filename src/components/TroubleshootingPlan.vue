<template>
  <div class="troubleshoot_wrap">
    <div class="left">
      <div v-for="(item, index) in left_list" :key="index">
        <b :style="{ background: color_list[index] }" />
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="right">
      <div v-for="(item, index) in right_list" :key="index">
        <b>{{ index + 1 }}</b>
        <!-- {{ value }} -->
        <div v-for="(a, b, c) in item" :key="c" class="inter">
          <span>{{ b }}：{{ a }}</span>
        </div>
        <!-- <div>{{ value }}：{{ item[value] }}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      color_list: ["#04ff98", "#c36efe", "#2e88f1", "#ff7e00"],
      left_list: ["已完成整改", "已复查未闭环", "已排查未复查", "待排查"],
      right_list: [
        { 计划日期: "2023年2月5日", 计划区块: "XXXXX区块", 排查人: "李某" },
        { 计划日期: "2023年2月5日", 计划区块: "XXXXX区块", 排查人: "李某" },
        { 计划日期: "2023年2月5日", 计划区块: "XXXXX区块", 排查人: "李某" },
        { 计划日期: "2023年2月5日", 计划区块: "XXXXX区块", 排查人: "李某" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.troubleshoot_wrap {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 0 30px;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    b {
      display: inline-block;
      width: 22px;
      height: 15px;
      border-radius: 2px;
      margin-right: 15px;
    }
    span {
      font-size: 14px;
      color: #fff;
    }
  }
  .right {
    width: 520px;
    background-color: rgba(1, 51, 140, 0.7);
    font-size: 15px;
    padding: 10px 20px;
    color: #eee;

    > div {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }

    b {
      width: 30px;
      height: 20px;
      background: rgba(1, 90, 171, 0.7);
      border-radius: 8px;
      border: solid 1px rgba(1, 90, 171, 0.7);
      text-align: center;
      line-height: 20px;
    }
    .inter {
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
    }
  }
}
</style>