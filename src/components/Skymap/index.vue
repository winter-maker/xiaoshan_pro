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
          map.addOverLay(polygon);
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
<style scoped>
#mapDiv {
  width: 100%;
  height: 100%;
}
</style>