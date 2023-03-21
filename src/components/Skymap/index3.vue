<template>
  <div id="mapDiv"></div>
</template>
<script>
let map = null;
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  watch: {
    list: {
      handler(val) {
        if(val) {
          console.log('---watch------', val)
          this.createPolygon();
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    map = new BMapGL.Map("mapDiv"); // 创建地图实例
    this.createMap();
  },
  methods: {
    createMap() {
      let point = new BMapGL.Point(120.342904, 30.231047); // 创建点坐标
      map.centerAndZoom(point, 18);
      map.enableScrollWheelZoom(true);
      let res = require("@/assets/json/deep_color2.json");
      //console.log(res);
      map.setMapStyleV2({ styleJson: res });
      //map.setHeading(64.5);
      //map.setTilt(73);

      //this.createPolygon();
    },
    createPolygon() {
      let bd = new BMapGL.Boundary();
      //let enters = require("@/assets/json/tech_city.json");
      let enters = [];
      for(let key of this.list) {
        
      }
      console.log(enters, this.list)

      let colors = ["#23d5fc", "#33daa8", "#b48f61", "#9582ee"];
      for (let key in enters) {
        let str = "";
        //console.log(key, enters);
        enters[key].forEach((item) => {
          str += item + ";";
        });
        let slice_length = Math.floor(Object.values(enters).length / 4);
        let color = "";
        let index = (key - 0 + 1) / slice_length;
        if (index <= 1) {
          color = colors[0];
        } else if (index <= 2) {
          color = colors[1];
        } else if (index <= 3) {
          color = colors[2];
        } else {
          color = colors[3];
        }
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

        //console.log("---杭州萧山金逸包装有限公司rs---", rs, count);
        // let hole = new BMapGL.Polygon(rs.boundaries, {
        //   strokeWeight: 2,
        //   strokeColor: "#00e4ff",
        //   fillColor: "#00e4ff",
        //   fillOpacity: 0.4,
        // });
        // map.addOverlay(hole);
      });
    }
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