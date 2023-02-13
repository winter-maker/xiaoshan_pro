<template>
  <div class="enterprise_dis">
    <div class="filter_wrap">
      <span
        v-for="item in list"
        :key="item.id"
        :class="item.id == activeId ? 'active' : ''"
        @click="selectItem(item)"
        >{{ item.name }}</span
      >
    </div>
    <div class="chart_wrap">
      <div id="qy_chart" class="chart" />
      <ul>
        <li v-for="(item, index) in arr" :key="index">
          <span :style="{ background: colors[index] }" />
          <span>{{ item.name }}</span>
          <span>{{ item.value }}</span>
          <span>{{ item.prop }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: "行业", id: 1 },
        { name: "区域", id: 2 },
      ],
      activeId: 1,
      colors: [
        "#73b866",
        "#2978b0",
        "#535abb",
        "#204f9c",
        "#ae9f64",
        "#50bbb0",
        "#5f469e",
        "#50bbb0",
        "#59abf6",
      ],
      arr: [
        { name: "冶金行业", value: 123, prop: "10%" },
        { name: "有色行业", value: 123, prop: "10%" },
        { name: "建材行业", value: 123, prop: "10%" },
        { name: "机械行业", value: 123, prop: "10%" },
        { name: "轻工行业", value: 123, prop: "10%" },
        { name: "纺织行业", value: 123, prop: "10%" },
        { name: "烟草行业", value: 123, prop: "10%" },
        { name: "商贸行业", value: 123, prop: "10%" },
        { name: "化工行业", value: 123, prop: "10%" },
      ],
    };
  },
  mounted() {
    this.getChart();
  },
  methods: {
    selectItem(item) {
      this.activeId = item.id;
    },
    getChart() {
      const qyChart = this.$charts.init(document.getElementById("qy_chart"));
      qyChart.setOption({
        title: {
          top: "center",
          left: "30%",
          text: "  18%\n建材行业",
          textStyle: {
            color: "#fff",
            fontSize: "18px",
            align: "center",
          },
        },
        tooltip: {
          trigger: "item",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "#01b5b2",
          borderColor: "#01b5b2",
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          formatter: "{b} : {c}次 {d}%",
        },
        legend: {
          show: false,
          type: "plain",
          orient: "vertical",
          // align: "left",
          top: 0,
          right: 40,
          width: 70,
          itemGap: 20,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        grid: {
          top: 0,
          left: 20,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["60%", "100%"],
            center: ["50%", "50%"],
            label: {
              show: false,
              position: "center",
            },
            data: this.arr,
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.filter_wrap {
  width: 107px;
  height: 24px;
  background: url("@/assets/images/common/button_bg.png") no-repeat 100% 100%;
  border-radius: 12px;
  color: #fff;
  display: flex;
  font-size: 14px;
  .active {
    width: 54px;
    height: 24px;
    background: url("@/assets/images/common/button_hover.png") no-repeat 100%
      100%;
    border-radius: 12px;
  }
  span {
    flex: 1;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
  }
}
.chart_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.enterprise_dis {
  height: 100%;
  padding-top: 20px;
  .chart {
    width: 180px;
    height: 180px;
  }
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 200px;
      height: 30px;

      border-bottom: 1px solid #003aa5;

      span:nth-child(1) {
        width: 10px;
        height: 10px;
        border-radius: 2px;
      }
    }
  }
}
</style>