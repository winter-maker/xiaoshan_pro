<template>
  <div id="mapDiv"></div>
</template>
<script>
export default {
  mounted() {
    this.createMap();
    this.testProxy();
  },
  methods: {
    createMap() {
      var map = new BMapGL.Map("mapDiv"); // 创建地图实例
      var point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      let res = require("@/assets/json/deep_color.json");
      console.log(res);
      map.setMapStyleV2({ styleJson: res });
    },
    testProxy() {
      this.getRequest("/list").then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#mapDiv {
  width: 100%;
  height: 100%;
  // background: linear-gradient(
  //   to right,
  //   #00244b 0%,
  //   rgba(5, 90, 165, 0.73) 24%,
  //   #066ec6 33%,
  //   #0989f3 45%,
  //   #098ffe 47%,
  //   #087cdf 57%,
  //   rgba(4, 82, 152, 0.5) 77%,
  //   #00244b 100%
  // );
  // background: linear-gradient(
  //   90deg,
  //   rgba(0, 13, 42, 1) 0%,
  //   rgba(0, 14, 43, 1) 5%,
  //   rgba(0, 15, 46, 1) 10%,
  //   rgba(0, 16, 50, 1) 15%,
  //   rgba(0, 18, 54, 1) 20%,
  //   rgba(1, 23, 67, 1) 25%,
  //   rgba(2, 24, 74, 0.8) 30%,
  //   rgba(3, 29, 87, 0.8) 35%,
  //   rgba(4, 34, 97, 0.8) 40%,
  //   rgba(4, 44, 104, 0.8) 45%,
  //   rgba(4, 44, 104, 0.6) 50%,
  //   rgba(4, 44, 104, 0.8) 55%,
  //   rgba(4, 34, 97, 0.8) 60%,
  //   rgba(3, 29, 87, 0.8) 65%,
  //   rgba(2, 24, 74, 0.8) 70%,
  //   rgba(1, 23, 67, 1) 75%,
  //   rgba(0, 18, 54, 1) 80%,
  //   rgba(0, 16, 50, 1) 85%,
  //   rgba(0, 15, 46, 1) 90%,
  //   rgba(0, 14, 43, 1) 95%,
  //   rgba(0, 13, 42, 1) 100%
  // );

  ::v-deep .tdt-bottom.tdt-left {
    display: none;
  }
}
</style>