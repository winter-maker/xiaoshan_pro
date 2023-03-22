<template>
  <div id="mapDiv"></div>
</template>
<script>
let map = null;
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  watch: {
    list: {
      handler(val) {
        if (val) {
          this.createPolygon();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    map = new BMapGL.Map("mapDiv"); // 创建地图实例
    this.createMap();
  },
  methods: {
    createMap() {
      let point = new BMapGL.Point(120.342904, 30.231047); // 创建点坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);
      let res = require("@/assets/json/deep_color2.json");
      //console.log(res);
      map.setMapStyleV2({ styleJson: res });
      //map.setHeading(64.5);
      //map.setTilt(73);
    },
    createPolygon() {
      let bd = new BMapGL.Boundary();
      bd.get("红垦区", function (rs) {
        let count = rs.boundaries.length;
        for (let i = 0; i < count; i++) {
          let ply = new BMapGL.Polygon(rs.boundaries[i], {
            strokeWeight: 2,
            strokeColor: "#F5533D",
            fillColor: "#F5533D",
            fillOpacity: 0.3,
          }); //建立多边形覆盖物
          map.addOverlay(ply); //添加覆盖物
          map.setViewport(ply.getPath()); //调整视野
        }

        // var map = new BMap.Map("container");
        // map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 5);
        // map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_SMALL}));
        //         map.enableScrollWheelZoom();
        //         function getBoundary() {
        //           var bdary = new BMap.Boundary();
        //           var name = document.getElementById("districtName").value;
        //           bdary.get(name, function (rs) {       //获取行政区域
        //             map.clearOverlays();        //清除地图覆盖物       var count = rs.boundaries.length; //行政区域的点有多少个for(var i = 0; i < count; i++){var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000"}); //建立多边形覆盖物
        //             map.addOverlay(ply);  //添加覆盖物
        //             map.setViewport(ply.getPath());    //调整视野
        //           }
        //         });
        //}

        //console.log("---杭州萧山金逸包装有限公司rs---", rs, count);
        // let hole = new BMapGL.Polygon(rs.boundaries, {
        //   strokeWeight: 2,
        //   strokeColor: "#00e4ff",
        //   fillColor: "#00e4ff",
        //   fillOpacity: 0.4,
        // });
        // map.addOverlay(hole);
      });
      let colors = ["#23d5fc", "#33daa8", "#b48f61", "#9582ee"];
      for (let key in this.list) {
        let ev = this.list[key].formData.textField_ldqgcidd;
        let list = ev && JSON.parse(ev);
        if (!list) {
          continue;
        }
        const points = list.map((item) => new BMapGL.Point(item.lng, item.lat));
        const ply = new BMapGL.Polygon(points, {
          strokeWeight: 2,
          strokeColor: colors[key % 4],
          fillColor: colors[key % 4],
          fillOpacity: 0.7,
        });

        map.addOverlay(ply);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#mapDiv {
  width: 100%;
  height: 100%;
  //filter: brightness(1.5) saturate(1.5);
  ::v-deep .anchorBL {
    display: none;
  }
}
</style>