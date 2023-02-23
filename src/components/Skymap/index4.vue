<template>
  <div id="mapDiv"></div>
</template>
<script>
let map = null;
export default {
  mounted() {
    map = new BMapGL.Map("mapDiv"); // 创建地图实例
    this.createMap();
    this.testProxy();
  },
  methods: {
    createMap() {
      let point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
      map.centerAndZoom("萧山区", 18);
      map.enableScrollWheelZoom(true);
      let res = require("@/assets/json/deep_color2.json");
      console.log(res);
      map.setMapStyleV2({ styleJson: res });
      // map.setHeading(64.5);
      // map.setTilt(73);

      this.createPolygon();
    },
    createPolygon() {
      let bd = new BMapGL.Boundary();
      let enters = require("@/assets/json/level_18.json");
      // let colors = ["#04ff98", "#c36efe", "#2e88f1", "#ff7e00"];
      let colors = ["#23d5fc", "#33daa8", "#b48f61", "#9582ee"];
      for (let key in enters) {
        let str = "";
        enters[key].forEach((item) => {
          str += item + ";";
        });
        str = str.substring(0, str.length - 1);
        let ply = new BMapGL.Polygon([str], {
          strokeWeight: 2,
          strokeColor: colors[key % 4],
          fillColor: colors[key % 4],
          fillOpacity: 0.7,
        }); //建立多边形覆盖物
        map.addOverlay(ply); //添加覆盖物
      }
      bd.get("萧山区", function (rs) {
        let count = rs.boundaries.length;
        // for (let i = 0; i < count; i++) {
        //   let ply = new BMapGL.Polygon(rs.boundaries[i], {
        //     strokeWeight: 2,
        //     strokeColor: "#F5533D",
        //     fillColor: "#F5533D",
        //     fillOpacity: 0.3,
        //   }); //建立多边形覆盖物
        //   map.addOverlay(ply); //添加覆盖物
        // }

        console.log("---杭州萧山金逸包装有限公司rs---", rs, count);
        // let hole = new BMapGL.Polygon(rs.boundaries, {
        //   strokeWeight: 2,
        //   strokeColor: "#00e4ff",
        //   fillColor: "#00e4ff",
        //   fillOpacity: 0.4,
        // });
        // map.addOverlay(hole);
      });
    },
    testProxy() {
      this.getRequest("/list").then((res) => {
        //console.log(res);
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
  background: linear-gradient(
    90deg,
    rgba(0, 13, 42, 1) 0%,
    rgba(0, 14, 43, 1) 5%,
    rgba(0, 15, 46, 1) 10%,
    rgba(0, 16, 50, 1) 15%,
    rgba(0, 18, 54, 1) 20%,
    rgba(1, 23, 67, 1) 25%,
    rgba(2, 24, 74, 0.8) 30%,
    rgba(3, 29, 87, 0.8) 35%,
    rgba(4, 34, 97, 0.8) 40%,
    rgba(4, 44, 104, 0.8) 45%,
    rgba(4, 44, 104, 0.6) 50%,
    rgba(4, 44, 104, 0.8) 55%,
    rgba(4, 34, 97, 0.8) 60%,
    rgba(3, 29, 87, 0.8) 65%,
    rgba(2, 24, 74, 0.8) 70%,
    rgba(1, 23, 67, 1) 75%,
    rgba(0, 18, 54, 1) 80%,
    rgba(0, 16, 50, 1) 85%,
    rgba(0, 15, 46, 1) 90%,
    rgba(0, 14, 43, 1) 95%,
    rgba(0, 13, 42, 1) 100%
  );

  ::v-deep .anchorBL {
    display: none;
  }
}
</style>