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
      let point = new BMapGL.Point(120.372904, 30.231047); // 创建点坐标
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
      // bd.get("萧山区", function (rs) {
      //   console.log('红肯去-----', rs);
      //   let count = rs.boundaries.length;
      //   for (let i = 0; i < count; i++) {
      //     let ply = new BMapGL.Polygon(rs.boundaries[i], {
      //       strokeWeight: 2,
      //       strokeColor: "#54eaff",
      //       fillColor: "rgba(82, 132, 251, 0.95)",
      //       fillOpacity: 0.3,
      //     }); //建立多边形覆盖物
      //     map.addOverlay(ply); //添加覆盖物
      //     map.setViewport(ply.getPath()); //调整视野
      //   }

      // });
      let colors = ["#23d5fc", "#33daa8", "#b48f61", "#9582ee"];
      for (let key in this.list) {
        let ev = this.list[key].formData.textField_ldqgcidd;
        let list = ev && JSON.parse(ev);
        if (!list) {
          continue;
        }
        const points = list.map((item) => new BMapGL.Point(item.lng, item.lat));
        console.log('----', points);
        const ply = new BMapGL.Polygon(points, {
          strokeWeight: 2,
          strokeColor: colors[key % 4],
          fillColor: colors[key % 4],
          fillOpacity: 0.7,
        });
        function getCenter(pointArray) {
          const sortedLongitudeArray = pointArray.map(item => item.lng).sort();//首先对经度进行排序，红色部分是array中经度的名称
          const sortedLatitudeArray = pointArray.map(item => item.lat).sort();//对纬度进行排序，红色部分是array中纬度的名称
          const centerLongitude = ((parseFloat(sortedLongitudeArray[0]) + parseFloat(sortedLongitudeArray[sortedLongitudeArray.length - 1])) / 2).toFixed(4);
          const centerLatitude = ((parseFloat(sortedLatitudeArray[0]) + parseFloat(sortedLatitudeArray[sortedLatitudeArray.length - 1])) / 2).toFixed(4);

          //如果经纬度在array中不是数字类型，需要转化为数字类型进行计算，如果是可以去掉parseFloat处理
          //console.log(centerLongitude+"kkk"+centerLatitude);
          return [centerLongitude, centerLatitude];
        }
        console.log('--getCenter(points)---', getCenter(points));
        const label = new BMapGL.Label(this.list[key].formData.textField_ldq8t7w5, {
          offset: new BMapGL.Size(0, 0),
          position: new BMapGL.Point(getCenter(points)[0], getCenter(points)[1])
        });
        label.setStyle({
          color : "#000",
          fontSize : "10px",
          borderRadius: '5px',
          borderColor: '#ccc',
          padding: '2px',
          //background: 'url("@/assets/images/common/button_bg.png") noRepeat cover'
          backgroundColor: 'yellow'
        })
        map.addOverlay(label);

        map.addOverlay(ply);
        //map.setViewport(ply.getPath()); //调整视野

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