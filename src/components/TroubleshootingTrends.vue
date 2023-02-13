<template>
  <div class="trouble_trend">
    <div class="one_wrap">
      <div class="img_wrap">
        <img src="@/assets/images/rightMiddle/icon1.png" alt="icon" />
      </div>
      <div>
        <h4>重大隐患情况</h4>
        <div class="content">
          <div v-for="item in list.slice(0, 2)" :key="item.id">
            <span>{{ item.name }}</span>
            <b>{{ item.value }}</b>
            <span>{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="two_wrap">
      <div class="img_wrap">
        <img src="@/assets/images/rightMiddle/icon2.png" alt="icon" />
      </div>
      <div>
        <h4>隐患治理情况</h4>
        <div class="content">
          <div v-for="item in list.slice(2)" :key="item.id">
            <span>{{ item.name }}</span>
            <b>{{ item.value }}</b>
            <span>{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div id="trend_main" class="chart" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: "重大隐患数量", value: "22", unit: "个" },
        { name: "一般隐患数量", value: "22", unit: "个" },
        { name: "排查隐患", value: "22", unit: "个" },
        { name: "待整改隐患", value: "22", unit: "个" },
        { name: "整改率", value: "22", unit: "%" },
      ],
    };
  },
  mounted() {
    this.getChart();
  },
  methods: {
    getChart() {
      const dom = this.$charts.init(document.getElementById("trend_main"));
      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          textStyle: {
            color: "#fff",
          },
          top: 0,
          itemWidth: 12,
          itemHeight: 12,
        },
        grid: {
          top: 30,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        yAxis: [
          {
            type: "value",
            name: "企业数量",
            nameStyle: {
              color: "#ccc",
            },
            axisLine: {
              lineStyle: {
                color: "#395e8d",
              },
              show: true,
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              show: false,
            },
            boundaryGap: [0, 0.01],
          },
          {
            type: "value",
            name: "隐患数量",
            nameStyle: {
              color: "#ccc",
            },
            axisLine: {
              lineStyle: {
                color: "#395e8d",
              },
              show: true,
            },
            axisLabel: {
              color: "#fff",
            },
            splitLine: {
              lineStyle: {
                color: "#395e8d",
                type: "dashed",
              },
            },
            boundaryGap: [0, 0.01],
          },
        ],
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#395e8d",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
          },
          data: ["红垦区", "科技城", "钱江单元", "桥南", "市北单元"],
        },
        series: [
          {
            name: "排查企业数",
            type: "bar",
            barWidth: 21,
            borderRadius: [5, 5, 0, 0],
            itemStyle: {
              color: new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(77, 200, 236, 0.95)" },
                { offset: 1, color: "#20d0ca" },
              ]),
            },
            data: [3, 9, 4, 10, 14],
          },
          {
            name: "排查隐患数",
            type: "bar",
            barWidth: 21,
            borderRadius: [5, 5, 0, 0],
            yAxisIndex: 1,
            itemStyle: {
              color: new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(226, 85, 194, 0.95)" },
                { offset: 1, color: "#5460ff" },
              ]),
            },
            data: [9, 2, 3, 4, 13],
          },
        ],
      };
      dom.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.trouble_trend {
  font-size: 14px;
  .two_wrap,
  .one_wrap {
    display: flex;
    .img_wrap {
      width: 46px;
      height: 74px;
      background: url("@/assets/images/rightMiddle/icon_bg.png") no-repeat 100%
        100%;
      display: flex;
      justify-content: center;
      margin-right: 10px;

      img {
        display: block;
        width: 25px;
        height: 24px;
        margin-top: 12px;
      }
    }
  }
  h4 {
    width: 253px;
    height: 18px;
    background: url("@/assets/images/rightMiddle/font_bg.png") no-repeat 100%
      100%;
    line-height: 18px;
    padding-left: 20px;
    margin: 10px 0;
  }
  .content {
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      justify-content: space-between;
    }
    b {
      color: #3effff;
      margin: 0 10px;
    }
  }
  .chart {
    width: 100%;
    height: 155px;
  }
}
</style>