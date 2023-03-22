<template>
  <div id="risk_main"></div>
</template>
<script>
export default {
  mounted() {
    this.getChart();
  },
  methods: {
    getChart() {
      const dom = this.$charts.init(document.getElementById("risk_main"));
      const option = {
        xAxis: {
          type: "category",
          data: [
            "喷涂",
            "受限空间",
            "可燃爆粉尘",
            "液氨制冷",
            "金属冶炼",
            "危化品生产",
            "危化品经营",
          ],
          axisLine: {
            lineStyle: {
              color: "rgba(0, 58, 165, 0.7)",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
            fontSize: 12,
          },
        },
        grid: {
          top: "10%",
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "rgba(0, 58, 165, 0.7)",
            },
            show: true,
          },
          axisLabel: {
            color: "#fff",
          },
          splitLine: {
            lineStyle: {
              color: "rgba(0, 58, 165, 0.7)",
              type: "dashed",
            },
          },
          boundaryGap: [0, 0.01],
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            barWidth: "20%",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(238, 238, 238, 0.1)",
              borderColor: "rgba(238, 238, 238, 0.1)",
              borderType: "solid",
              shadowColor: "rgba(238, 238, 238, 0.1)",
              opacity: 0.8,
            },
            itemStyle: {
              color: new this.$charts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#54eaff" },
                { offset: 1, color: "rgba(82, 132, 251, 0.95)" },
              ]),
            },
          },
        ],
      };
      dom.setOption(option);
      window.addEventListener("resize", () => {
        console.log(window, "riskclass---");
        dom.resize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#risk_main {
  width: 100%;
  height: 261px;
}
</style>