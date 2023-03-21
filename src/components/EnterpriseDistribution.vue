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
      <div class="qy_warp">
        <div id="qy_chart" class="chart" />
        <div class="tip_div">
          <span>18%</span>
          <span>建材行业</span>
        </div>
      </div>
      <ul>
        <li
          v-for="(item, index) in arr"
          :key="index"
          :class="index === activeIndex ? 'active2' : ''"
        >
          <span :style="{ background: colors[index % 9] }" />
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
        "rgb(132,194,244)",
        "rgb(39,188,191)",
        "rgb(17,94,170)",
        "rgb(12,133,253)",
        "rgb(83,171,246)",
        "rgb(88,80,167)",
        "rgb(24,78,150)",
        "rgb(39,125,183)",
        "rgb(17,94,170)",
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
      activeIndex: 2,
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
        color: this.colors,
        title: {
          show: false,
          top: "center",
          left: "center",
          text: "18%",
          subtext: "建材行业",
          subtextStyle: {
            color: "#fff",
            fontSize: 12,
            align: "center",
          },
          textStyle: {
            color: "#fff",
            fontSize: 14,
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
      window.addEventListener('resize', () => {
        console.log(window, '企业分布情况---')
        qyChart.resize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.filter_wrap {
  width: 134px;
  height: 30px;
  background: url("@/assets/images/common/button_bg.png") no-repeat;
  background-size: cover;
  border-radius: 12px;
  color: #fff;
  display: flex;
  font-size: 14px;
  .active {
    width: 70px;
    height: 30px;
    background: url("@/assets/images/common/button_hover.png") no-repeat;
    background-size: cover;
    border-radius: 12px;
  }
  span {
    flex: 1;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    min-width: 70px;
  }
}
.chart_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100% - 30px);
  .qy_warp {
    position: relative;
  }
  .tip_div {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      text-align: center;
    }
    span:nth-child(1) {
      font-size: 18px;
    }
    span:nth-child(2) {
      font-size: 14px;
    }
  }
}
.enterprise_dis {
  height: 100%;
  padding-top: 20px;
  .chart {
    width: 142px;
    height: 142px;
  }
  //pad端
  @media only screen and (min-width: 768px) and (max-width: 1199px) {
    span {
      transform: scale(0.8);
      transform-origin: 0 0;
    }
  }
  @media only screen and (min-width: 1199px) {
    span {
      transform: scale(1);
      transform-origin: 0 0;
    }
  }
  ul {
    .active2 {
      background-color: rgba(77, 136, 245, 0.7);
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 200px;
      height: 30px;
      font-size: 14px;
      border-bottom: 1px solid rgba(0, 58, 165, 0.7);
      padding: 0 5px;

      span:nth-child(1) {
        width: 10px;
        height: 10px;
        border-radius: 2px;
      }
    }
  }
}
</style>