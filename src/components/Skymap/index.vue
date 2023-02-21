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
      const map = new T.Map("mapDiv");
      const lnglat = new T.LngLat(116.40969, 39.89945);
      map.centerAndZoom(lnglat, 12);
      map.setStyle("indigo");
      //map.setStyle("@/assets/json/custom_map_config.json");
      // 创建多边形
      let polygon = null,
        polygonList = [];
      import("@/data.json")
        .then((res) => {
          res.Tanmen.features[0].geometry.coordinates[0].forEach((item) => {
            polygonList.push(new T.LngLat(...item));
          });
          //console.log(res);
        })
        .then(() => {
          polygon = new T.Polygon(polygonList, {
            color: "blue",
            weight: 3,
            opacity: 0.5,
            fillColor: "#000",
            fillOpacity: 0.5,
          });
          //向地图上添加面
          //map.addOverLay(polygon);
        });

      import("@/assets/maphfcity/anhui.json").then((ahprovincejson) => {
        // 安徽省地市列表
        ahprovincejson.features.forEach((city, index) => {
          //console.log(city);
          // new BMap.Boundary().get(city.properties.name, function (rs) {
          //   const ply_city = new T.Polygon(rs.boundaries[0], {
          //     strokeWeight: 1,
          //     strokeColor: "#bfe4fe",
          //     fillColor:
          //       city.id === me.areaCode
          //         ? me.provinceColorDefault[0]
          //         : me.provinceColorDefault[1],
          //     fillOpacity:
          //       city.id === me.areaCode
          //         ? me.provinceOpacityDefault[0]
          //         : me.provinceOpacityDefault[1],
          //     strokeOpacity: 1,
          //   }); // 建立多边形覆盖物
          //   ply_city.id = city.id;
          //   cityAreaCode.push(city.id);
          //   ply_city.addEventListener("mouseover", me.mouseenterHandler);
          //   ply_city.addEventListener("mouseout", me.mouseoutHandler);
          //   ply_city.addEventListener("click", me.mouseClick);
          //   map && map.addOverlay(ply_city);
          // });
        });
      });
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
  background: url("@/assets/images/center/bg.png") no-repeat;
  background-size: cover;
  ::v-deep .tdt-bottom.tdt-left {
    display: none;
  }
}
</style>