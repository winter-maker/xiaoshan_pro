<template>
  <div ref="aro" style="width: 100%; height: 100%" class="aro">
    <line-gis
      ref="lineGis"
      :from="from"
      :width="width"
      :height="height"
      :hand-type="handType"
      class="model"
      :data="gisdata"
      :translatey="basicGisInfoTranslateY"
      :is-down="isDown"
      @changeHandType="changeHandType"
    />
    <basicGis
      ref="basicGis"
      :from="from"
      :width="width"
      :height="height"
      :hand-type="handType"
      class="Gismodel"
      :data="gisdata"
      :temporary="temporary"
      :translatey="basicGisInfoTranslateY"
      :is-down="isDown"
    />
    <div :id="id" class="mapClass" />
  </div>
</template>
<script>
import basicGis from "@/components/energyBasic/basicGIS";
let marketArr = [];
let me;
let map;
let ply_city_all = [];
const color = [
  "#003aa1",
  "#0f3fa0",
  "#004ab0",
  "#0050b0",
  "#2957ab",
  "#0f6aa1",
  "#0f65a1",
  "#0656a9",
  "#3c7cb3",

  "#ff5353",
  "#ffa853",
  "#e17b04",
  "#ffc000",
  "#d9b72d",
  "#eedc13",
  "#edff00",
  "#b7d92e",
  "#2ed930",

  "#ff5a00",
  "#ff7800",
  "#fa8722",
  "#f7943e",
  "#f9a761",
  "#f8b67e",
  "#fcca9f",
  "#fad4b3",
  "#fbe3cf",

  "#000033",
  "#000066",
  "#000099",
  "#0000cc",
  "#0000ff",
  "#3333ff",
  "#3333cc",
  "#333399",
  "#6666ff",
  "#bb6f5e",
  "#d14792",
  "#be8663",
  "#4fa064",
  "#508340",
  "#6fa9b7",
  "#538dca",
  "#7c44d6",
  "#b37ab6",
  "#ccbb49",
  "#a8bb5e",
  "#47cfd1",
  "#e7c38f",
  "#7a6814",
  "#83a0da",
  "#bb6f5e",
  "#d14792",
  "#be8663",
  "#4fa064",
  "#508340",
  "#6fa9b7",
  "#538dca",
  "#7c44d6",
  "#b37ab6",
  "#ccbb49",
  "#a8bb5e",
  "#47cfd1",
  "#e7c38f",
  "#7a6814",
  "#83a0da",
  "#bb6f5e",
  "#d14792",
  "#be8663",
  "#4fa064",
  "#508340",
  "#6fa9b7",
  "#538dca",
  "#7c44d6",
  "#b37ab6",
  "#ccbb49",
  "#a8bb5e",
  "#47cfd1",
  "#e7c38f",
  "#7a6814",
  "#83a0da",
];
const cityAreaCode = [];
let activePosition = {};
let points = [];
const markerArr = [];
export default {
  components: { basicGis },
  props: {
    showHeatMap: {
      type: Boolean,
      default: true,
    },
    carbonType: {
      type: [String, Number],
      default: "1",
    },
    temporary: {
      type: String,
      default: "",
    },
    coonKey: {
      type: String,
      default: "enteGis",
    },

    id: {
      type: String,
      default: "map",
    },
    from: {
      type: String,
      default: "abnormal",
    },
    height: {
      type: Number,
      default: 40,
    },
    width: {
      type: Number,
      default: 165,
    },
    mapFrom: {
      type: String,
      default: "",
    },
    category: {
      type: String || Number,
      default: "",
    },
    dateType: {
      type: String || Number,
      default: "",
    },
    statisticDate: {
      type: String,
      default: "",
    },
    eneryParams: {
      type: Object,
      default() {
        return {};
      },
    },
    currentClickRegion: {
      type: Object,
      default() {
        return {
          name: "",
          code: "",
        };
      },
    },
  },
  data() {
    return {
      activeId: "",
      handType: "hover",
      gisdata: {},
      popupDOM: "",
      marketArr: [],
      provinceCode: "340000", // 安徽省行政区编码
      areaCode: "340100", // 合肥市行政区编号
      selectId: "",
      lineGisDom: "",
      basicGisDom: "",
      fromFlag: "",
      cityList: [],
      provinceColorDefault: ["#47cfd1", "#6fa9b7"], // 合肥市，其他市
      provinceOpacityDefault: [0.5, 0.2], // 合肥市，其他市
      cityOpacityDefault: [0.5, 1], // 初始，选中
      mapType: "",
      basicGisInfoTranslateY: "40",
      isDown: "no",
      heatmapOverlayForBaidu: null, // 百度地图热力图层，初始化后业务操作仅控制显隐
      markerClustererForBaidu: null, // 百度地图热力图层，初始化后业务操作仅控制显隐
    };
  },
  mounted() {
    // 初始化地图;
    me = this;
    console.log("初始化地图,来源：", me.mapFrom);

    me.fromFlag = me.mapFrom; // 依据来源初始化不同的地图
    console.log("me.fromme.fromme.fromme.fromme.fromme.fromme.from", me.from);
    try {
      if (me.$yk.cross.sgMapConfig.enabled) {
        me.mapType = "sgMap";
        // eslint-disable-next-line no-undef
        epgis.tokenTask
          .login(
            me.$yk.cross.sgMapConfig.appKey,
            me.$yk.cross.sgMapConfig.appSecret
          )
          .then(function () {
            // if (me.fromFlag === 'anhui') {
            // 	me.initProvinceMap();
            // } else {
            me.initCityMap();
            // }
          });
      } else {
        me.mapType = "baiduMap";
        if (me.from == "carbonAssessment") {
          me.baiduMapCarbonAssessmentInit(9);
        } else {
          me.baiduMapInit(9);
        }
      }
    } catch (e) {
      me.mapType = "noMap";
      console.log("地图初始化失败的原因：", e);
    }
  },
  methods: {
    changeHandType(type) {
      this.handType = type;
    },
    bussinessInit() {
      this.lineGisDom = document.querySelector(".model");
      this.basicGisDom = document.querySelector(".Gismodel");
    },
    // 地图是否加载完成，加载成功后再进行地图的相关操作，true是已完成
    isMapLoaded() {
      if (this.mapType === "sgMap") {
        return map.loaded();
      } else if (this.mapType === "baiduMap") {
        return true;
      }
    },
    // 初始化合肥市地图-思极地图
    initCityMap() {
      // this.$store.dispatch('sysHome/systemName', '合肥智慧能源平台');
      // 创建地图，指定底图样式类型
      // eslint-disable-next-line no-unused-vars
      // eslint-disable-next-line no-undef
      try {
        map = new epgis.Map({
          // 地图绑定的DOM元素ID
          container: me.id,
          // 地图样式
          style: "aegis://styles/aegis/StreetsDark", // 夜景深色
          // 默认缩放层级
          zoom: 7.4,
          minZoom: 6,
          maxZoom: 30,
          // 三维视角
          pitch: 0,
          // 地图中心点
          center: [117.17906982851048, 31.753335234195404],
          // 地图默认字体
          localIdeographFontFamily: "Microsoft YoHei",
        });
        me.searchDistrict(me.areaCode, 1);
        me.bussinessInit();

        map.on("click", (result) => {
          console.log("地图click:", result);
        });
      } catch (err) {
        console.log(err);
      }
      // moveend也监听zoomend事件
      // map.on("moveend", me.logMapinfo);
    },
    // 行政区规划查询-思极地图
    searchDistrict(keyword, subdistrict) {
      map &&
        map.on("load", function (e) {
          me.updateSearchDistrict(keyword, subdistrict);
          me.initCreateHeatMap();
        });
    },
    initCreateHeatMap(statisticDate = "2020-08", category = "1") {
      console.log("me.showHeatMap", me.showHeatMap);
      if (
        me.mapType === "baiduMap" &&
        !me.$yk.cross.baiduMapConfig.heatMapShow
      ) {
        return false;
      }
      let type = "3";
      if (me.from === "charge") {
        type = "1";
      } else if (me.from === "distribute") {
        type = "2";
      } else if (me.from === "elec") {
        type = "4";
        statisticDates = "";
      }
      let statisticDates = "";
      let categorys = "";
      if (me.from === "monitor") {
        statisticDates = statisticDate;
        categorys = category || "1";
      } else if (me.from === "elec") {
        categorys = "1";
      } else if (me.from == "doubleCarbon") {
        statisticDates = statisticDate;
        categorys = "1";
      } else if (me.from == "footprint") {
        statisticDates = statisticDate;
        categorys = "1";
      }
      if (
        !(
          me.from === "nyenager" ||
          me.from === "abnormal" ||
          me.from === "distribute" ||
          me.from === "keyDualcontrol" ||
          me.from === "deposit" ||
          me.from === "charge" ||
          me.from === "dualcontrol" ||
          me.from === "cockpit" ||
          me.from === "carbonAssessment" ||
          me.from === "virtualpower"
        )
      ) {
        setTimeout(async function () {
          const res =
            await me.$services.sghfEnergyanalysis.enteEnergyControlBigScreenController.queryElecHeatMap(
              { type, statisticDate: statisticDates, category: categorys }
            );
          if (res?.state) {
            console.log("热力图数据：", res, this);
            points = [];
            res.data.forEach((item, index) => {
              // item.remark
              let num;
              num = item.remark;
              points.push({
                count: Number(num),
                enteId: item.ente_id,
                lng: Number(item.coordinate.split(",")[0]),
                lat: Number(item.coordinate.split(",")[1]),
              });
            });
            if (me.mapType === "sgMap") {
              me.createSgHeatmap(points);
            } else if (me.mapType === "baiduMap") {
              me.createBaiduHeatmap(points);
              // 添加聚合点
              points.forEach((item) => {
                item.value = item.lng + "," + item.lat;
              });
              me.$store.dispatch("sysHome/heatPoints", points);
              // console.log(points)
              // points.forEach((item,index)=>{
              //   let items = {
              //     enteGis: item.lng+','+item.lat,
              //     enteId: index,
              //     name: item.count
              //   };
              //   // console.log(items.enteGis)
              //   // me.addMarket(items)
              // })
            }
          }
        }, 2000);
      } else if (me.from === "cockpit" && me.showHeatMap) {
        setTimeout(async function () {
          const res =
            await me.$services.heFeiEnergyPlatform.smartDouCarbonController.queryCarbonHeatMap(
              { accType: 1, statisticDate: me.statisticDate, regionCode: "" }
            );
          if (res?.state) {
            console.log("热力图数据：", res, this);
            points = [];
            res.data.forEach((item, index) => {
              // item.remark
              let num;
              num = item.value;
              if (item.coordinate) {
                points.push({
                  count: Number(num),
                  lng: Number(item.coordinate.split(",")[0]),
                  lat: Number(item.coordinate.split(",")[1]),
                });
              }
            });
            if (me.mapType === "sgMap") {
              me.createSgHeatmap(points);
            } else if (me.mapType === "baiduMap") {
              me.createBaiduHeatmap(points);
              // console.log(points)
              // points.forEach((item,index)=>{
              //   let items = {
              //     enteGis: item.lng+','+item.lat,
              //     enteId: index,
              //     name: item.count
              //   };
              //   // console.log(items.enteGis)
              //   // me.addMarket(items)
              // })
            }
          }
        }, 2000);
      }
    },
    // 行政区规划查询-思极地图
    updateSearchDistrict(keyword, subdistrict) {
      try {
        const districtTask = new epgis.DistrictTask();
        districtTask
          .searchDistrict({
            keyword, // 必填项，检索关键字，或者是行政区划编码
            subdistrict, // 选填项，设置显示下级行政区级数，0：不返回下级行政区； 1：返回下一级行政区； 2：返回下两级行政区； 3：返回下三级行政区；
            extension: true, // 是否返回行政区边界坐标点
          })
          .then(function (result) {
            console.log(result, "***********");
            let features = [];
            const text = [];
            if (!result.districts[0].sub_districts) {
              // 区县级轮廓
              features = [];
              features.push({
                type: "Feature",
                geometry: result.districts[0].shape,
                properties: {
                  name: result.districts[0].name,
                  code: result.districts[0].adcode,
                },
              });
              text.push({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: result.districts[0].center,
                },
                properties: {
                  name: result.districts[0].name,
                  code: result.districts[0].adcode,
                },
              });
              me.setPolygon(features, result.districts[0].adcode, 0);
              me.setText(text, result.districts[0].adcode, 0);
            } else {
              // 合肥市级轮廓
              for (const o in result.districts[0].sub_districts) {
                features = [];
                features.push({
                  type: "Feature",
                  geometry: result.districts[0].sub_districts[o].shape,
                  properties: {
                    name: result.districts[0].sub_districts[o].name,
                    code: result.districts[0].sub_districts[o].adcode,
                  },
                });
                text.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: result.districts[0].sub_districts[o].center,
                  },
                  properties: {
                    name: result.districts[0].sub_districts[o].name,
                    code: result.districts[0].sub_districts[o].adcode,
                  },
                });
                me.setPolygon(
                  features,
                  result.districts[0].sub_districts[o].adcode,
                  o
                );
                me.setText(
                  text,
                  result.districts[0].sub_districts[o].adcode,
                  o
                );
              }
            }
          });
      } catch (err) {
        console.log(err);
      }
    },
    // 绘制轮廓-思极地图
    setPolygon(features, adcode, num) {
      const _id = `power-polygon_${adcode}`;
      try {
        // 重设面数据
        map.addSource(_id, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features,
          },
        });
        // 画面
        let fillColor = "#6fa9b7"; // 省级地图下，city的显示颜色
        let provinceOpacity = 0.2; // 省级地图下，city的填充透明度
        if (me.fromFlag === "anhui" && adcode === me.areaCode) {
          fillColor = "#47cfd1";
          provinceOpacity = 0.5;
        } else if (me.fromFlag != "anhui") {
          fillColor = color[num];
          provinceOpacity = me.cityOpacityDefault[0];
        }
        if (me.fromFlag === "anhui") {
          cityAreaCode.push(adcode);
        }
        map.addLayer({
          id: _id,
          type: "fill",
          source: `power-polygon_${adcode}`,
          paint: {
            "fill-color": fillColor,
            "fill-opacity": provinceOpacity,
            "fill-outline-color": "#bfe4fe", // 默认行政区分界线颜色
          },
        });
        // console.log(2222)
        map.on("mouseenter", _id, me.mouseenterHandler); // mouseenter
        map.on("mouseout", _id, me.mouseoutHandler);
        map.on("click", _id, me.mouseClick);
      } catch (err) {
        console.log(err);
      }
    },
    // 鼠标点击事件--根据mapType标识来区分地图操作
    mouseClick(e) {
      let regionCode = "";
      let regionName = "";
      if (me.mapType === "sgMap") {
        regionCode = e.features[0].properties.code;
        regionName = e.features[0].properties.name;
      } else if (me.mapType === "baiduMap") {
        regionCode = e.target.id;
        regionName = e.target.name;
      }
      if (me.fromFlag === "anhui") {
        // 省级地图，仅初始化加载，不带任何业务处理
        if (regionCode === me.areaCode) {
          this.$store.dispatch("sysHome/systemName", "合肥智慧能源平台");
          me.fromFlag = "";
          if (me.mapType === "sgMap") {
            me.sgMapChangeToCity();
          } else if (me.mapType === "baiduMap") {
            me.baiduMapChangeToCity();
          }
        }
      } else {
        // console.log(me.mapType,regionCode, regionName)
        this.$emit("targetRegionCode", regionCode, regionName);
        // 以下为业务处理
        if (this.from == "elec" || this.from == "charge") {
          let left = "";
          let top = "";
          if (me.mapType === "sgMap") {
            left = e.originalEvent.layerX;
            top = e.originalEvent.layerY;
          } else if (me.mapType === "baiduMap") {
            left = e.pixel.x;
            top = e.pixel.y;
          }
          this.handType = "click";
          this.lineGisDom.style.display = "block";
          this.lineGisDom.style.left = left + 10 + "px";
          this.lineGisDom.style.top = top + "px";
          if (this.from == "elec") {
            this.lineGisDom.style.width = 310 + "px";
            if (top < 250) {
              this.basicGisInfoTranslateY = "35";
              this.isDown = "yes";
            } else {
              this.basicGisInfoTranslateY = "-260";
              this.isDown = "no";
            }
          }
          if (this.from == "charge") {
            this.lineGisDom.style.width = 240 + "px";
            if (top < 200) {
              this.basicGisInfoTranslateY = "35";
              this.isDown = "yes";
            } else {
              this.basicGisInfoTranslateY = "-240";
              this.isDown = "no";
            }
            this.handType = "click";
            this.$refs.lineGis.showReginInfo(regionCode, regionName);
            return;
          }
          if (this.activeId === regionCode) {
            return;
          }
          this.$refs.lineGis.getchartData(regionCode, regionName);
          this.activeId = regionCode;
        } else if (this.from === "cockpit") {
          console.log("轮廓点击事件", e);
        }
      }
    },
    // 区域移动事件
    mousemoveHandler(e) {
      console.log(e);
    },
    // 地图区域鼠标移入事件
    mouseenterHandler(e, pixel) {
      // console.log('鼠标移入：', e,pixel,3333);
      me.$nextTick(() => {
        let _id = "";
        let left = "";
        let top = "";
        let regionCode = "";
        let regionName = "";
        if (me.mapType === "sgMap") {
          _id = e.features[0].layer.id;
          regionCode = e.features[0].properties.code;
          regionName = e.features[0].properties.name;
          left = e.originalEvent.layerX;
          top = e.originalEvent.layerY;
          if (me.fromFlag === "anhui") {
            map.setPaintProperty(
              _id,
              "fill-opacity",
              _id.indexOf(me.areaCode) > 0 ? 1 : 0.5
            );
          } else {
            map.setPaintProperty(_id, "fill-opacity", me.cityOpacityDefault[1]);
          }
        } else if (me.mapType === "baiduMap") {
          // console.log('id',e.overlay.id)
          // _id = e.target.id;
          if (e.overlay.id) {
            _id = e.overlay.id;
            regionCode = _id;
            // regionName = e.target.name;
            regionName = e.overlay.name;
          }

          // left = e.pixel.x;
          left = pixel.x;
          // top = e.pixel.y;
          top = pixel.y;
          // console.log("百度地图鼠标指针位置：",left,top)
          // 改变透明度
          if (me.fromFlag === "anhui") {
            // e.currentTarget.setFillOpacity(_id.indexOf(me.areaCode) > 0 ? 1 : 0.5);
          } else {
            // e.currentTarget.setFillOpacity(1);//修改移入这个方法缺失需要注释掉
          }
        }
        me.selectId = _id;
        // 以下为业务处理,需要从地图获取参数的在对应分支获取
        if (me.fromFlag != "anhui") {
          if (this.from === "elec") {
            this.handType = "hover";
            this.lineGisDom.style.display = "block";
            this.lineGisDom.style.left = left + 10 + "px";
            this.lineGisDom.style.top = top + "px";
            this.lineGisDom.style.width = "240px";
          } else if (this.from === "monitor") {
            this.handType = "hover";
            this.basicGisDom.style.display = "block";
            this.basicGisDom.style.left = left + 10 + "px";
            this.basicGisDom.style.top = top + "px";
          } else if (this.from === "dualcontrol") {
            // 双控中间区域paddingLeft 20   所以left要减10
            this.handType = "hover";
            this.basicGisDom.style.display = "block";
            this.basicGisDom.style.left = left - 10 + "px";
            this.basicGisDom.style.top = top + "px";
          }

          if (this.from === "elec") {
            if (top < 150) {
              this.basicGisInfoTranslateY = "35";
              this.isDown = "yes";
            } else {
              this.basicGisInfoTranslateY = "-170";
              this.isDown = "no";
            }
            if (this.activeId === regionCode) {
              return;
            }
            this.$refs.lineGis.getchartData(regionCode, regionName);
            this.activeId = regionCode;
          } else if (this.from === "monitor") {
            if (top < 150) {
              this.basicGisInfoTranslateY = "35"; // 连接线高度
              this.isDown = "yes";
            } else {
              this.basicGisInfoTranslateY = "-170"; // 窗体高度+连接线50,监控页面是标题+三行文字
              this.isDown = "no";
            }
            if (this.activeId === regionCode) {
              return;
            }
            this.$refs.basicGis.totalEnergyConsumption(
              this.category,
              this.dateType,
              this.statisticDate,
              regionCode,
              regionName
            );
            this.activeId = regionCode;
          } else if (this.from === "dualcontrol") {
            if (top < 150) {
              this.basicGisInfoTranslateY = "35";
              this.isDown = "yes";
            } else {
              this.basicGisInfoTranslateY = "-170";
              this.isDown = "no";
            }
            if (this.activeId === regionCode) {
              return;
            }
            this.$refs.basicGis.dualControlEnergyConsumption(
              this.eneryParams,
              regionCode,
              regionName
            );
            this.activeId = regionCode;
          } else if (this.from === "cockpit") {
            // console.log('划过事件事件',e)
            if (this.handType == "click") {
              return;
            }
            this.handType = "hover";

            left = left < 0 ? 0 : left > 545 ? 545 : left;
            top = top < 290 ? 290 : top > 500 ? 500 : top;

            this.basicGisDom.style.display = "block";
            this.basicGisDom.style.left = left + 10 + "px";
            this.basicGisDom.style.top = top + "px";
            this.basicGisDom.style.width = 330 + "px";
            // console.log(`top:${top},left:${left}`)
            // me.width = 330;
            if (top < 166) {
              this.basicGisInfoTranslateY = "35";
              this.isDown = "yes";
              // console.log('down')
            } else {
              this.basicGisInfoTranslateY = "-280";
              this.isDown = "no";
              // console.log('up')
            }

            if (this.activeId === regionCode) {
              return;
            }
            if (_id) {
              //区域+园区regionCode===gaoxinqudeid
              this.$refs.basicGis.getRegionDatas({
                id: regionCode,
                statisticDate: this.statisticDate,
                name: regionName,
              });
              this.activeId = regionCode;
            }
            // else {
            // 	// 园区
            // 	this.$refs.basicGis.getYuanquDatas({id:regionCode,statisticDate:this.statisticDate,name:regionName });
            // 	this.activeId = regionCode;
            // }
          }
        }
      });
    },
    removeMouseEnterHandler() {
      console.log(111111);
      map && map.removeEventListener("mousemove", me.mousemovEvent);
    },
    // 鼠标离开事件
    mouseoutHandler(e) {
      me.$nextTick(() => {
        if (me.selectId) {
          if (me.mapType === "sgMap") {
            if (me.fromFlag === "anhui") {
              map.setPaintProperty(
                me.selectId,
                "fill-opacity",
                me.selectId.indexOf(me.areaCode) > 0 ? 0.5 : 0.2
              );
            } else if (!me.selectId.includes(me.areaCode)) {
              map.setPaintProperty(me.selectId, "fill-opacity", 0.5);
            }
          } else if (me.mapType === "baiduMap") {
            // 改变透明度
            if (me.fromFlag === "anhui") {
              // e.currentTarget.setFillOpacity(me.selectId.indexOf(me.areaCode) > 0 ? 0.5 : 0.2);//修改移入这个方法缺失需要注释掉
            } else {
              // e.currentTarget.setFillOpacity(0.5);//修改移入这个方法缺失需要注释掉
            }
          }
          me.selectId = "";
        }
        // 以下为业务处理,和地图无关
        if (me.fromFlag != "anhui") {
          if (this.from == "elec") {
            this.handType = "hover";
            this.lineGisDom.style.display = "none";
          } else if (this.from == "cockpit") {
            // this.handType = 'hover';
            this.basicGisDom.style.display = "none";
            // this.lineGisDom.style.display = 'none';
          } else {
            this.handType = "hover";
            this.basicGisDom.style.display = "none";
            this.lineGisDom.style.display = "none";
          }
        }
      });
    },
    // 按照入参指定颜色改变多个区块颜色 -思极地图
    // 参数格式：const arry = [{adcode:340103,color:'red'},{adcode:340102,color:'blue'},{adcode:340111,color:'black'},{adcode:340121,color:'black'},{adcode:340124,color:'black'},{adcode:340181,color:'black'},{adcode:340123,color:'black'}]
    updateFillColors(val) {
      if (val.length) {
        val.forEach((item) => {
          map &&
            map.setPaintProperty(
              `power-polygon_${item.adcode}`,
              "fill-color",
              item.color
            );
        });
      }
    },
    // 改变单个区块颜色
    /**
     * 思极地图
     * adcode 行政区号
     * color fill颜色
     */
    updateFillColor(adcode, color) {
      map &&
        map.setPaintProperty(`power-polygon_${adcode}`, "fill-color", color);
    },
    // 思极地图-按照默认颜色更新各区热力图，默认颜色是由深到浅，传入数据按照数值由大到小的顺序
    // 入参格式：[340103,340102,340111]
    updateDefaultFillColor(adcodeArry) {
      if (this.mapType === "sgMap") {
        if (adcodeArry.length) {
          adcodeArry.forEach((item, index) => {
            // console.log('item,index:', item, index);
            map.setPaintProperty(
              `power-polygon_${item}`,
              "fill-color",
              color[index]
            );
          });
        }
      } else if (this.mapType === "baiduMap") {
      }
    },
    // 清除所有marker--兼容百度地图和思极地图
    removeMarket() {
      if (me.mapType === "sgMap") {
        marketArr.forEach((item) => {
          item.remove();
        });
        marketArr = [];
      } else if (me.mapType === "baiduMap") {
        const allOverlays = map.getOverlays();
        allOverlays.forEach((overlay, index) => {
          if (overlay instanceof BMap.Marker) {
            map.removeOverlay(overlay);
          }
        });
      }
    },
    /**
     * 地图上增加定位点
     * item：必须包含坐标enteGis，唯一标识enteId
     * icon：可选，图标名称、width、height，图片资源放置在路径common.static\img\heFeiEnergyPlatform\positionIcon下，
     * 默认图标default.png，尺寸15*20
     * */
    addMarket(item, ...icon) {
      try {
        if (!map) {
          return;
        }
        let market;
        const _map = map;
        if (icon) {
          switch (icon.length) {
            case 0:
              icon = ["default.png", 15, 20];
              break;
            case 1:
              icon.push(15);
              icon.push(20);
              break;
            case 2:
              icon.push(20);
              break;
          }
        } else {
          icon = ["default.png", 15, 20];
        }
        if (me.mapType === "sgMap") {
          const el = document.createElement("div");
          el.className = "marker";
          el.id = "entegis_" + item.enteId;
          el.style.backgroundImage =
            "url(" + `/img/heFeiEnergyPlatform/positionIcon/${icon[0]}` + ")";
          el.style.width = icon[1] + "px";
          el.style.height = icon[2] + "px";

          el.addEventListener("click", (e) => {
            this.marketClick(e, item);
          });
          el.addEventListener("mouseout", (e) => {
            this.marketMouseOut(e, item);
          });
          el.addEventListener("mouseenter", (e) => {
            this.marketMouseOver(e, item);
          });
          const arr = item[this.coonKey].split(",");
          market = new epgis.Marker(el).setLngLat(arr).addTo(_map);
          marketArr.push(market);
        } else if (me.mapType === "baiduMap") {
          // 添加定位点，自定义图标，在图标上绑定事件
          me.setMarkerStyleForbaidu(item, icon);
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * 地图上更新指定定位点
     * item：必须包含唯一标识enteId
     * icon：可选，图标名称、width、height，图片资源放置在路径common.static\img\heFeiEnergyPlatform\positionIcon下，
     * 默认图标default.png，尺寸15*20
     * */
    updateMarket(item, ...icon) {
      if (icon) {
        switch (icon.length) {
          case 0:
            icon = ["default.png", 15, 20];
            break;
          case 1:
            icon.push(15);
            icon.push(20);
            break;
          case 2:
            icon.push(20);
            break;
        }
      } else {
        icon = ["default.png", 15, 20];
      }
      if (me.mapType === "sgMap") {
        const markdom = document.querySelector("#entegis_" + item.enteId);

        if (activePosition.enteId) {
          // console.log('页面已存在的选择点：', activePosition.enteId);
          // 恢复历史选中的图标
          const historydom = document.querySelector(
            "#entegis_" + activePosition.enteId
          );
          if (historydom) {
            historydom.style.backgroundImage = activePosition.img;
            historydom.style.width = activePosition.width;
            historydom.style.height = activePosition.height;
          }

          activePosition = {};
        }

        if (markdom === null) {
          console.log("地图上暂无该企业的定位信息");
          me.addMarket(item, icon[0], icon[1], icon[2]);
          // console.log('添加当前选中点：');
          activePosition.enteId = item.enteId;
          activePosition.img =
            "url(" + `/img/heFeiEnergyPlatform/positionIcon/${icon[0]}` + ")";
          activePosition.width = icon[1] + "px";
          activePosition.height = icon[2] + "px";
        } else {
          activePosition.enteId = item.enteId;
          activePosition.img = markdom.style.backgroundImage;
          activePosition.width = markdom.style.width;
          activePosition.height = markdom.style.height;
          markdom.style.backgroundImage =
            "url(" + `/img/heFeiEnergyPlatform/positionIcon/${icon[0]}` + ")";
          markdom.style.width = icon[1] + "px";
          markdom.style.height = icon[2] + "px";
        }
      } else if (me.mapType === "baiduMap") {
        const allOverlays = map.getOverlays();
        for (let i = 0; i < allOverlays.length; i++) {
          if (item.enteId === allOverlays[i].enteId) {
            // 标注已存在
            map.removeOverlay(allOverlays[i]);
            // 添加动画效果，更新成指定标识
            const marker = me.setMarkerStyleForbaidu(item, icon);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
            setTimeout(function () {
              marker.setAnimation(BMAP_ANIMATION_DROP);
            }, 1000);
            break;
          }
        }
      }
    },
    setMarkerStyleForbaidu(item, icon) {
      try {
        const point = item[this.coonKey].split(",");
        const myIcon = new BMap.Icon(
          `/img/heFeiEnergyPlatform/positionIcon/${icon[0]}`,
          new BMap.Size(icon[1], icon[2])
        );
        const market = new BMap.Marker(new BMap.Point(point[0], point[1]), {
          icon: myIcon,
        });
        market.enteId = item.enteId + "";
        market.addEventListener("mouseover", (e) => {
          this.marketMouseOver(e, item);
        });
        market.addEventListener("click", (e) => {
          this.marketClick(e, item);
        });
        market.addEventListener("mouseout", (e) => {
          this.marketMouseOut(e, item);
        });
        map && map.addOverlay(market);
        return market;
      } catch (err) {
        console.log(err);
      }
    },

    marketMouseOut(e, item) {
      this.lineGisDom.style.display = "none";
      this.basicGisDom.style.display = "none";
      this.popupDOM && this.popupDOM.remove();
    },
    // 定位点鼠标移入-业务处理
    marketMouseOver(e, item) {
      let left = "";
      let top = "";
      if (me.mapType === "sgMap") {
        left = e.layerX;
        top = e.layerY;
      } else if (me.mapType === "baiduMap") {
        left = e.pixel.x;
        top = e.pixel.y;
      }
      const tempX = 520;
      const tempY = 330;
      if (
        this.from == "abnormal" ||
        this.from == "deposit" ||
        this.from == "virtualpower"
      ) {
        this.lineGisDom.style.display = "block";
        if (this.from == "deposit") {
          this.lineGisDom.style.left = left + 10 + "px";
          this.lineGisDom.style.top = top + "px";
          if (top <= 300 && top >= 200) {
            this.basicGisInfoTranslateY = "-150";
            this.isDown = "yes";
          } else if (top < 200) {
            this.basicGisInfoTranslateY = "-5";
            this.isDown = "yes";
          } else {
            this.basicGisInfoTranslateY = "-300";
            this.isDown = "no";
          }
        } else if (this.from == "abnormal") {
          this.lineGisDom.style.left = left + 10 + "px";
          this.lineGisDom.style.top = top + "px";
          if (top < 150) {
            this.basicGisInfoTranslateY = "35";
            this.isDown = "yes";
          } else {
            this.basicGisInfoTranslateY = "-170";
            this.isDown = "no";
          }
        } else if (this.from == "virtualpower") {
          this.lineGisDom.style.left = left + 10 + "px";
          this.lineGisDom.style.top = top + 40 + "px";
          if (top < 150) {
            this.basicGisInfoTranslateY = "15";
            this.isDown = "yes";
          } else {
            this.basicGisInfoTranslateY = "-170";
            this.isDown = "no";
          }
          this.gisdata = item;
        }
      }
      // if (this.from === 'charge') {
      // 	// 智能充电模块
      // 	this.lineGisDom.style.display = 'block';
      // 	this.lineGisDom.style.left = left + 10 + 'px';
      // 	this.lineGisDom.style.top = top + 'px';
      // 	this.lineGisDom.style.width = 240 + 'px';
      // 	this.handType = 'marketHover';
      // 	if (top < 150) {
      // 		// console.log('***************************************');
      // 		this.basicGisInfoTranslateY = '35';
      // 		this.isDown = 'yes';
      // 	} else {
      // 		this.basicGisInfoTranslateY = '-170';
      // 		this.isDown = 'no';
      // 	}
      // 	this.$refs.lineGis.stationDetail(item);
      // 	return;
      // }
      if (this.from === "deposit") {
        // 智能运维模块
        this.$refs.lineGis.queryEnteInfo(item);
        return;
      }
      if (this.from === "abnormal") {
        // 异常用能
        this.gisdata = item;
        // this.$refs.lineGis.queryEnteInfo(item);
        return;
      }
      if (this.from === "keyDualcontrol") {
        // 重点双控
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left - 10 + "px";
        this.lineGisDom.style.top = top + "px";
        this.height = 40;
        // this.lineGisDom.style.height = '40px';
        // this.lineGisDom.style.width = '200px';
        // this.lineGisDom.style.width = 280 + 'px';
        // this.height = 50
        // this.lineGisDom.style.height = 50 + 'px';
        if (top < 150) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-100";
          this.isDown = "no";
        }

        this.gisdata = item;
        return;
      }
      // 百度地图e.clientX和e.pixel.x存在差值
      if (this.from === "nyenager") {
        this.handType = "hover";
        this.basicGisDom.style.display = "block";
        this.basicGisDom.style.left = left + 10 + "px";
        this.basicGisDom.style.top = top + "px";

        if (top < 150) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-190"; // 多一行文字增加20px
          this.isDown = "no";
        }
        this.$refs.basicGis.energyManagerHover(item);
      }
      // if (this.from === 'distribute') { // 智慧光伏
      // 	this.$refs.basicGis.clickMark('hover');
      // 	this.basicGisDom.style.display = 'block';
      // 	this.basicGisDom.style.left = e.clientX - tempX + 'px';
      // 	this.basicGisDom.style.top = e.clientY - tempY + 'px';
      // 	// console.log(e, item, e.clientX - tempX, e.clientY - tempY);
      // 	if ((e.clientY - tempY) < -77) {
      // 		// console.log('***************************************');
      // 		this.basicGisInfoTranslateY = '225';
      // 		this.isDown = 'yes';
      // 	} else {
      // 		this.basicGisInfoTranslateY = '40';
      // 		this.isDown = 'no';
      // 	}
      //
      // 	this.$refs.basicGis.stationDetail(item.enteId, item.unit);
      // 	// this.gisdata = item;
      // }
    },
    // 定位点单击事件-业务处理
    marketClick(e, item) {
      let left = "";
      let top = "";
      if (me.mapType === "sgMap") {
        left = e.layerX;
        top = e.layerY;
      } else if (me.mapType === "baiduMap") {
        left = e.pixel.x;
        top = e.pixel.y;
      }
      const tempX = 520;
      const tempY = 330;
      this.$emit("marketClick", item, e);

      if (this.from === "charge") {
        // 充电桩模块
        this.handType = "marketClick";
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left + 10 + "px";
        this.lineGisDom.style.top = top + "px";
        this.lineGisDom.style.width = 380 + "px";
        this.$refs.lineGis.queryPowerStationDayInfo(item);
        if (top < 250) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-310";
          this.isDown = "no";
        }
        e.preventDefault();
        e.stopPropagation();
      } else if (this.from === "distribute") {
        // 智慧光伏模块
        this.$refs.basicGis.clickMark("click");
        this.$refs.basicGis.statStatisticDatas(item.enteId);
        e.preventDefault();
        e.stopPropagation();
      }
    },
    addMarkerCluster(datas, idName, imgs, query, ...iconSize) {
      try {
        if (this.mapType === "sgMap") {
          this.epgisAddMarker(datas, idName, imgs, iconSize);
        } else if (this.mapType === "baiduMap") {
          // console.log('处理前', iconSize);
          if (iconSize && Array.isArray(iconSize) && iconSize.length > 1) {
            iconSize = iconSize;
          } else {
            iconSize = [30, 30];
          }
          // console.log('处理后', iconSize,me.from);
          const myIcon = new BMap.Icon(
            `/img/heFeiEnergyPlatform/positionIcon/${imgs}`,
            new BMap.Size(iconSize[0], iconSize[1])
          );
          const markers = [];
          let pt = null;
          let marker = null;
          for (let i = 0; i < datas.length; i++) {
            pt = new BMap.Point(
              datas[i].value?.split(",")[0],
              datas[i].value?.split(",")[1]
            );
            marker = new BMap.Marker(pt, { icon: myIcon });
            if (me.from === "distribute") {
              marker.enteId = datas[i].typeKeyId + "";
              marker.name = datas[i].name + "";
            } else if (me.from === "charge") {
              marker.statChgId = datas[i].statChgId + "";
            } else if (me.from === "keyDualcontrol") {
              Object.keys(datas[i]).map((key) => {
                marker[key] = datas[i][key] + "";
              });
            } else if (me.from === "nyenager") {
              marker.enteName = datas[i].enteName + "";
              marker.typeKeyId = datas[i].typeKeyId + "";
              marker.coordinate = datas[i].coordinate + "";
              marker.address = datas[i].address + "";
            } else if (me.from === "abnormal") {
              marker.list = datas[i];
            } else if (me.from === "monitor") {
              marker.enteId = datas[i].enteId + "";
              marker.value = datas[i].value + "";
              marker.lng = datas[i].lng;
              marker.lat = datas[i].lat;
              marker.query = query;
            } else if (me.from === "cockpit") {
              marker.enteId = datas[i].enteId + "";
              marker.enteName = datas[i].enteName + "";
            } else if (me.from === "footprint") {
              marker.enteId = datas[i].enteId + "";
              marker.value = datas[i].value + "";
              marker.enteName = datas[i].enteName + "";
            }

            marker.addEventListener("mouseover", (e) => {
              console.log(e, marker, "mouseover");
              // TODO 增加业务处理方法
              me.clustersMarketHover(e, marker);
            });
            marker.addEventListener("click", (e) => {
              me.clustersMarketClick(e, marker);
              // TODO 增加业务处理方法
            });
            marker.addEventListener("mouseout", (e) => {
              console.log(e, "mouseout");
              me.clustersMarketOut(e, marker);
              // TODO 增加业务处理方法
            });
            markers.push(marker);
          }
          if (me.markerClustererForBaidu) {
            // console.log(me.markerClustererForBaidu.setStyles);
            me.removeMarkerClusterArr(); // 清空已有点
            me.markerClustererForBaidu.addMarkers(markers);
          } else {
            me.markerClustererForBaidu = new BMapLib.MarkerClusterer(map, {
              markers,
            });
            // 设置聚合点的样式
            const myStyles = [
              {
                url: "/img/heFeiEnergyPlatform/positionIcon/sgmapdual5.png",
                size: new BMap.Size(40, 40),
                opt_anchor: [16, 0],
                textColor: "#000",
                opt_textSize: 10,
              },
            ];
            me.markerClustererForBaidu.setStyles(myStyles);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    removeMarkerCluster() {
      this.addMarkerCluster([], "poi", "icon4.png");
    },
    // 思极地图 聚合点
    epgisClusters(source) {
      try {
        map.addLayer({
          id: "clusters",
          type: "circle",
          source,
          filter: ["has", "point_count"],
          paint: {
            // 使用step表达式，用于分段匹配圆点的颜色和半径
            // 根据当前"point_count"值匹配对应的内容
            // 默认为"#9faebf"
            // 当大于10小于30时，返回"#3583de"
            // 大于30小于55时，返回"#04b71e"
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#9faebf",
              10,
              "#3583de",
              30,
              "#04b71e",
              55,
              "#ff9800",
              100,
              "#f61402",
              300,
              "#f61402",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              50,
              30,
              100,
              35,
              500,
              35,
              2000,
              40,
              5000,
              40,
            ],
            "circle-opacity": 0.7,
            "circle-stroke-width": 0,
            "circle-stroke-color": "#ffffff",
          },
        });

        map.addLayer({
          id: "clusterCount",
          type: "symbol",
          source,
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["Microsoft YaHei Regular"],
            "text-size": 14,
          },
          paint: {
            "text-color": "#ffffff",
          },
        });

        // 监听聚类图点击，并且根据点击的聚合圆展开
        map.on("click", "clusters", function (e) {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;

          map
            .getSource(source)
            .getClusterExpansionZoom(clusterId, function (err, zoom) {
              if (err) {
                return;
              }
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom,
              });
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
    // 思极 add
    // 定位点数组 定位点图层名称 图片 图片缩放倍数
    epgisAddMarker(datas, idName, imgs, iconSize) {
      me.removeMarkerClusterArr();
      me.coorderList = [];
      if (datas && datas.length) {
        me.coorderList = datas.map((item, index) => {
          return {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: item.value && JSON.parse(`[${item.value}]`),
            },
            properties: item,
          };
        });
      }
      me.json = {
        type: "FeatureCollection",
        features: me.coorderList,
      };
      try {
        map.addSource("themeData", {
          type: "geojson",
          data: me.json,
          cluster: true,
          clusterMaxZoom: 12, // 最大聚类层级
          clusterRadius: 100, // 聚合点半径，默认50
        });
        me.epgisClusters("themeData");
        map.loadImage(
          `/img/heFeiEnergyPlatform/positionIcon/${imgs}`,
          (error, image) => {
            // 添加图片到map，可以设置图片id
            map.addImage("idNames", image);
            map.addLayer({
              id: "idName",
              type: "symbol",
              source: "themeData",
              filter: ["!has", "point_count"],
              layout: {
                "icon-image": "idNames",
                "icon-size": iconSize || 1,
              },
              paint: {
                "text-color": "#555252",
                "text-halo-color": "#FFFFFF",
                "text-halo-width": 1.33333,
              },
            });
          }
        );
        map.on("mouseout", "idName", (e) => {
          me.clustersMarketOut(e);
        });
        map.on("mouseover", "idName", (e) => {
          me.clustersMarketHover(e);
        });
        map.on("click", "idName", (e) => {
          me.clustersMarketClick(e);
        });
      } catch (err) {
        console.log(err);
      }
    },
    // 移除marker
    removeMarkerClusterArr() {
      if (this.mapType === "sgMap") {
        if (map.getLayer("clusters") && map.getSource("themeData")) {
          map.removeLayer("clusters");
          map.removeLayer("clusterCount");
          map.removeLayer("idName");
          map.removeSource("themeData");
          map.removeImage("idNames");
        }
      } else if (this.mapType === "baiduMap") {
        // 清除以前的点
        if (me.markerClustererForBaidu) {
          me.markerClustererForBaidu.clearMarkers();
        }
      }
    },
    // 聚合点点击事件
    clustersMarketClick(e, item) {
      let left = "",
        top = "";
      // pixel: R
      // x: 738
      // y: 424
      // [[Prototype]]: Object
      // point: O
      // lat: 31.112465
      // lng: 118.572665
      left = e.pixel.x;
      top = e.pixel.y;
      if (me.from === "distribute") {
        // me.$refs.basicGis.clickMark('click');
        let enteId;
        if (me.mapType === "sgMap") {
          enteId = e.features[0].properties.cdate;
        } else if (me.mapType === "baiduMap") {
          // enteId = item.enteId;
          enteId = e.target.enteId;
        }
        me.handType = "click";
        this.basicGisDom.style.width = "340px";
        me.$refs.basicGis.statStatisticDatas(enteId);
      } else if (me.from === "keyDualcontrol") {
        this.$emit("marketClick", {
          enteGis: e.target.value,
          enteId: e.target.enteId,
          enteName: e.target.enteName,
        });
        console.log(e.target.value);
      } else if (me.from === "nyenager") {
        // marker.enteName = datas[i].enteName + '';
        // marker.typeKeyId = datas[i].typeKeyId + '';
        // marker.coordinate = datas[i].coordinate + '';
        this.$emit("marketClick", e.target.typeKeyId);
        // {
        // 	enteGis: e.target.value,
        // 	enteId: e.target.enteId,
        // 	enteName: e.target.enteName
        // });
        // value: item.enteName,
        // 	typeKeyId: item.enteId,
        // 	coordinate: item.coordinate
      } else if (me.from === "abnormal") {
        console.log(e.target.list.item);
        this.$emit("marketClick", e.target.list.item);
      } else if (me.from === "monitor") {
        this.handType = "click";
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left + 10 + "px";
        this.lineGisDom.style.top = top + "px";
        this.lineGisDom.style.width = 310 + "px";

        if (top < 250) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-260";
          this.isDown = "no";
        }
        this.gisdata = {
          enteId: e.target.enteId,
          value: e.target.value,
          query: e.target.query,
        };
        this.$refs.lineGis.queryEnteMonthEnergyConsumInfo(this.gisdata);
      } else if (me.from === "footprint") {
        this.handType = "click";
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left + 10 + "px";
        this.lineGisDom.style.top = top + "px";
        this.lineGisDom.style.width = 310 + "px";

        if (top < 200) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-290";
          this.isDown = "no";
        }
        this.$refs.lineGis.getEnterprise({
          enteId: e.target.enteId,
          statisticDate: this.statisticDate,
          type: this.carbonType,
          enteName: e.target.enteName,
        });
      } else if (me.from === "cockpit") {
        me.lineGisDom.style.display = "block";

        left = left < 0 ? 0 : left > 545 ? 545 : left;
        top = top < 310 ? 310 : top > 510 ? 510 : top;
        me.lineGisDom.style.left = left + 10 + "px";
        me.lineGisDom.style.top = top + "px";
        this.lineGisDom.style.width = "310px";
        me.handType = "click";
        if (top < 200) {
          me.basicGisInfoTranslateY = "35";
          me.isDown = "yes";
          console.log("down");
        } else {
          me.basicGisInfoTranslateY = "-290";
          me.isDown = "no";
          console.log("up", me.basicGisInfoTranslateY);
        }
        me.$refs.lineGis.getIndustryDatas({
          enteId: e.target.enteId,
          statisticDate: this.statisticDate,
          type: this.carbonType,
          enteName: e.target.enteName,
        });
      }
    },
    setZoom(num) {
      console.log(num);
      map && map.setZoom(num);
    },
    handleSetCenter(center) {
      try {
        map.enableScrollWheelZoom(true);
        var point = new BMap.Point(center.split(",")[0], center.split(",")[1]);
        map.setZoom(18);
        map.setCenter(point);
      } catch (err) {
        console.log(err);
      }
    },
    // 聚合点划过
    clustersMarketHover(e, item) {
      console.log("聚合点鼠标移入。。。。", e);
      let left = "";
      let top = "";
      let enteId;
      let standName;
      let statChgId;
      if (me.mapType === "sgMap") {
        left = e.point.x;
        top = e.point.y;
        enteId = e.features[0].properties.cdate;
        standName = e.features[0].properties.name;
      } else if (me.mapType === "baiduMap") {
        left = e.pixel.x;
        top = e.pixel.y;
        enteId = e.target.enteId;
        standName = e.target.name;
        statChgId = e.target.statChgId;
      }
      if (me.from === "distribute") {
        me.basicGisDom.style.display = "block";
        me.basicGisDom.style.left = left + 10 + "px";
        me.basicGisDom.style.top = top + "px";
        this.basicGisDom.style.width = "240px";
        me.handType = "hover";
        if (top < 250) {
          me.basicGisInfoTranslateY = "35";
          me.isDown = "yes";
        } else {
          me.basicGisInfoTranslateY = "-260";
          me.isDown = "no";
        }
        me.$refs.basicGis.stationDetail(enteId, standName);
        // me.gisdata = item || e.features[0];
      } else if (me.from === "charge") {
        // 新增充电桩(之前的addmarker修改成了聚合点)
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left + 10 + "px";
        this.lineGisDom.style.top = top + "px";
        this.lineGisDom.style.width = 240 + "px";
        this.handType = "marketHover";
        if (top < 150) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-170";
          this.isDown = "no";
        }
        this.$refs.lineGis.stationDetail({ statChgId });
      } else if (me.from === "keyDualcontrol") {
        // 重点双控
        let left = e.pixel.x;
        let top = e.pixel.y;
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left - 10 + "px";
        this.lineGisDom.style.top = top + "px";
        this.height = 40;
        if (top < 150) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-100";
          this.isDown = "no";
        }

        this.gisdata = {
          value: e.target.value,
          enteId: e.target.enteId,
          enteName: e.target.enteName,
        };
      } else if (me.from === "nyenager") {
        let left = e.pixel.x;
        let top = e.pixel.y;
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left - 10 + "px";
        this.lineGisDom.style.top = top + "px";
        this.height = 40;
        if (top < 150) {
          this.basicGisInfoTranslateY = "30";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-128";
          this.isDown = "no";
        }

        this.gisdata = {
          value: e.target.typeKeyId,
          enteId: e.target.enteId,
          enteName: e.target.enteName,
          address: e.target.address,
        };
      } else if (this.from == "abnormal") {
        let left = e.pixel.x;
        let top = e.pixel.y;
        this.lineGisDom.style.display = "block";
        this.lineGisDom.style.left = left + 10 + "px";
        this.lineGisDom.style.top = top + "px";
        if (top < 150) {
          this.basicGisInfoTranslateY = "35";
          this.isDown = "yes";
        } else {
          this.basicGisInfoTranslateY = "-170";
          this.isDown = "no";
        }
        this.gisdata = {
          enteName: e.target.list.item.enteName,
          industryName: e.target.list.item.industryName,
          regionName: e.target.list.item.regionName,
          area: e.target.list.item.area,
        };
      }
    },
    // 聚合点离开
    clustersMarketOut(e, item) {
      if (me.from === "distribute") {
        me.basicGisDom.style.display = "none";
      } else if (me.from === "charge") {
        me.lineGisDom.style.display = "none";
        me.basicGisDom.style.display = "none";
      } else if (me.from === "keyDualcontrol") {
        me.lineGisDom.style.display = "none";
        me.basicGisDom.style.display = "none";
      } else if (me.from === "nyenager") {
        me.lineGisDom.style.display = "none";
        me.basicGisDom.style.display = "none";
      } else if (me.from === "abnormal") {
        me.lineGisDom.style.display = "none";
        me.basicGisDom.style.display = "none";
      }
      // else if(this.from === 'cockpit'){
      // 	me.basicGisDom.style.display = 'none';
      // }
    },
    // 区域文字-思极地图
    setText(features, adcode, num) {
      const _id = `power-symbol_${adcode}`;
      const marker = {
        id: _id,
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features,
          },
        },
        layout: {
          "text-ignore-placement": false,
          "text-field": "{name}",
          "text-size": 12,
          "text-anchor": "top",
          "text-allow-overlap": false,
          "text-offset": [0, 0],
          "text-max-width": 8,
          "text-font": ["Microsoft YaHei Regular"],
        },
        paint: {
          "text-color": "#334753",
          "text-halo-color": "#FFFFFF",
          "text-halo-width": 1,
        },
      };
      map && map.addLayer(marker);
      map && map.on("click", _id, me.texClick);
    },
    // 文字点击事件-思极地图
    texClick() {
      console.log(this);
    },
    // 初始化安徽省地图-思极地图
    initProvinceMap() {
      this.$store.dispatch("sysHome/systemName", "安徽省能源大数据中心");
      try {
        // 创建地图，指定底图样式类型
        // eslint-disable-next-line no-unused-vars
        // eslint-disable-next-line no-undef
        map = new epgis.Map({
          // 地图绑定的DOM元素ID
          container: me.id,
          // 地图样式
          style: "aegis://styles/aegis/StreetsDark", // 夜景深色
          // 默认缩放层级
          zoom: 5.7,
          minZoom: 5.5,
          maxZoom: 15,
          // 三维视角
          pitch: 0,
          // 地图中心点
          center: [117.12554407202651, 32.074808883718006],
          // 地图默认字体
          localIdeographFontFamily: "Microsoft YoHei",
        });
        me.searchDistrict(me.provinceCode, 1);
        // map.on('click', (result) => {
        //     console.log("省级地图click:",result);
        // });
        // moveend也监听zoomend事件
        // map.on("moveend", me.logMapinfo);
      } catch (err) {
        console.log(err);
      }
    },
    // 迁移进入合肥市-思极地图
    sgMapChangeToCity() {
      try {
        map.flyTo({
          center: [117.17906982851048, 31.753335234195404],
          zoom: 7.5,
          speed: 0.8,
          curve: 1,
        });
        // 清除所有layer
        cityAreaCode.forEach((item) => {
          map.removeLayer(`power-polygon_${item}`);
          map.removeLayer(`power-symbol_${item}`);
        });
      } catch (err) {
        console.log(err);
      }
      me.updateSearchDistrict(me.areaCode, 1);
      me.bussinessInit();
    },
    // 日志信息-思极地图
    logMapinfo() {
      try {
        const zoom = map.getZoom(); // 获取当前地图级别
        const center = map.getCenter(); // 获取当前地图中心位置
        console.log("当前地图级别zoom:", zoom);
        console.log("当前地图中心位置:", center.lng + "," + center.lat);
      } catch (err) {
        console.log(err);
      }
    },
    // 创建热力图
    createHeatmap(points) {
      if (this.mapType === "sgMap") {
        this.createSgHeatmap(points);
      } else if (this.mapType === "baiduMap") {
        this.createBaiduHeatmap(points);
      }
    },
    // 删除热力图
    removeHeatmap() {
      if (this.mapType === "sgMap") {
        this.removeSgHeatmap();
      } else if (this.mapType === "baiduMap") {
        this.removeBaiduHeatmap();
      }
    },
    // 思极地图-热力图绘制
    createSgHeatmap(points) {
      const features = [];
      points.forEach((item, index) => {
        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.lng, item.lat],
          },
          properties: {
            value: item.count,
          },
        });
      });
      try {
        map.addSource("hfthemeData", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features,
          },
        });

        map.addLayer({
          id: "hfthemeData-heat",
          type: "heatmap",
          source: "hfthemeData",
          maxzoom: 16,
          // z-index:999,
          paint: {
            /**
             * 数据点的影响力，weight=10的点相当于十个weight=1的点
             * 下述为插值表达式，输入是点geojson的properties的mag，输出随mag线性增大
             */
            "heatmap-weight": [
              "interpolate",
              ["linear"],
              ["get", "value"],
              0,
              0,
              15,
              1.5,
            ],
            /**
             * 热力图强度，类似heatmap-weight
             * 下述为插值表达式，输出随zoom线性变化，zoom为0时值为1，zoom为12时值为3
             */
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              1,
              17,
              1,
            ],
            /**
             * 像素的颜色，必须以heatmap-density（热力图像素的密度）为输入
             * 下述为插值表达式，输出随heatmap-density变化而变化
             */
            // "heatmap-color": [
            //     "interpolate",
            //     ["linear"],
            //     ["heatmap-density"],
            //     0,
            //     "rgba(255, 0, 0, 0)",
            //     0.1,
            //     "rgba(0, 30, 255, .6)",
            //     0.2,
            //     "rgba(7, 208, 255, .6)",
            //     0.3,
            //     "#2cc946",
            //     0.4,
            //     "#d5fb0c",
            //     0.5,
            //     "#e04e4e",
            //     0.6,
            //     "#f33900",
            //     0.9,
            //     "rgba(243, 57, 0, .6)",
            //     1.5,
            //     "rgba(243, 57, 0, .8)"
            // ],
            /**
             * 该值越大，热力图越平滑，信息越不详细。
             * 下述为插值表达式，输出随zoom线性变化，zoom为0时值为8，zoom为9时值为20
             */
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              5,
              17,
              50,
            ],
            /**
             * 透明度，输出为1则不透明
             * 下述为插值表达式，输出随zoom线性变化，zoom为5时值为0.8，zoom为12时值为0.4
             */
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              5,
              0.8,
              17,
              0.8,
            ],
          },
        });
      } catch (err) {
        console.log(err);
      }
    },
    // 思级地图-移除热力图
    removeSgHeatmap() {
      try {
        if (map.getLayer("hfthemeData-heat") || map.getSource("hfthemeData")) {
          map.removeLayer("hfthemeData-heat");
          map.removeSource("hfthemeData");
        }
      } catch (err) {
        console.log(err);
      }
    },
    setCenterAndZoom(pot) {
      try {
        let point = new BMap.Point(pot[0], pot[1]);
        map.centerAndZoom(point, 13);
      } catch (err) {
        console.log(err);
      }
    },
    centerAndZoom({ point, zoom }) {
      try {
        let pot = new BMap.Point(point[0], point[1]);
        map.centerAndZoom(pot, zoom);
      } catch (err) {
        console.log(err);
      }
    },
    clearOverlays() {
      this.heatmapOverlayForBaidu = null;
      map && map.clearOverlays();
    },
    // 百度地图初始化
    baiduMapInit(zoom) {
      try {
        map = new BMap.Map(me.id, { minZoom: 7, maxZoom: 30 });
        map.centerAndZoom(
          new BMap.Point(117.17906982851048, 31.753335234195404),
          zoom
        );
        map.enableScrollWheelZoom(true);
        map.setMapStyle({ style: "midnight" });
        map.clearOverlays();
        map.addEventListener("zoomend", function () {
          console.log("地图缩放至：" + this.getZoom() + "级");
        });
        map.addEventListener("click", function (e) {
          console.log("地图单击事件：", e);
          me.logMapinfo();
        });
        this.$services.platformAuth.shiroController.getRoles().then((res) => {
          const role = res && res.data && res.data[0] && res.data[0].roleCode;
          if (role === "gxq") {
            map.centerAndZoom(new BMap.Point(117.114104, 31.827242), 12);
            me.createGxqLayer();
          } else {
            me.createProviceLayer();
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    //  碳评估地图初始化
    baiduMapCarbonAssessmentInit(zoom) {
      try {
        map = new BMap.Map(me.id, { minZoom: 7, maxZoom: 30 });
        map.centerAndZoom(
          new BMap.Point(117.17906982851048, 31.753335234195404),
          zoom
        );
        map.setMapStyle({ style: "midnight" });

        map.clearOverlays();
        this.$services.platformAuth.shiroController.getRoles().then((res) => {
          const role = res && res.data && res.data[0] && res.data[0].roleCode;
          if (role === "gxq") {
            map.centerAndZoom(new BMap.Point(117.114104, 31.827242), 12);
            me.createGxqLayer();
          } else {
            me.createProviceLayer();
          }
          map.disableDragging(); //禁止拖拽
          map.disableScrollWheelZoom(); //禁止缩放
          map.disableDoubleClickZoom(); //禁止双击放大
        });
      } catch (err) {
        console.log(err);
      }
    },
    createGxqLayer() {
      var ttt = [
        { lng: 117.066513, lat: 31.89191325 },
        { lng: 117.0835023, lat: 31.88409093 },
        { lng: 117.0917069, lat: 31.87683295 },
        { lng: 117.1286743, lat: 31.87816109 },
        { lng: 117.1381227, lat: 31.85359337 },
        { lng: 117.1742022, lat: 31.85359337 },
        { lng: 117.2030238, lat: 31.85843202 },
        { lng: 117.2081321, lat: 31.85897222 },
        { lng: 117.2080494, lat: 31.85778652 },
        { lng: 117.20918, lat: 31.85775895 },
        { lng: 117.2094006, lat: 31.8589998 },
        { lng: 117.2102554, lat: 31.85891707 },
        { lng: 117.2088491, lat: 31.8518856 },
        { lng: 117.2105035, lat: 31.8518856 },
        { lng: 117.2099796, lat: 31.84507472 },
        { lng: 117.2077185, lat: 31.84507472 },
        { lng: 117.2059538, lat: 31.83558912 },
        { lng: 117.2090421, lat: 31.83558912 },
        { lng: 117.2090421, lat: 31.82990879 },
        { lng: 117.2064225, lat: 31.82990879 },
        { lng: 117.2034169, lat: 31.82136072 },
        { lng: 117.2022864, lat: 31.819982 },
        { lng: 117.1998598, lat: 31.81656277 },
        { lng: 117.1995221, lat: 31.81556414 },
        { lng: 117.1987815, lat: 31.81441969 },
        { lng: 117.1977717, lat: 31.81314061 },
        { lng: 117.1967619, lat: 31.81219812 },
        { lng: 117.1949443, lat: 31.80990923 },
        { lng: 117.1935913, lat: 31.80836474 },
        { lng: 117.1849726, lat: 31.78376614 },
        { lng: 117.1592919, lat: 31.78376614 },
        { lng: 117.1403909, lat: 31.78376614 },
        { lng: 117.1276533, lat: 31.78397159 },
        { lng: 117.1180453, lat: 31.78534959 },
        { lng: 117.1066176, lat: 31.7748916 },
        { lng: 117.1055903, lat: 31.78156857 },
        { lng: 117.0960851, lat: 31.79906107 },
        { lng: 117.0942928, lat: 31.79961256 },
        { lng: 117.0930726, lat: 31.79998943 },
        { lng: 117.089805, lat: 31.79120035 },
        { lng: 117.089805, lat: 31.78666623 },
        { lng: 117.0878249, lat: 31.78325993 },
        { lng: 117.0878249, lat: 31.78257057 },
        { lng: 117.0866392, lat: 31.78279117 },
        { lng: 117.0767469, lat: 31.77893937 },
        { lng: 117.07603, lat: 31.78056626 },
        { lng: 117.0752579, lat: 31.78495059 },
        { lng: 117.0752579, lat: 31.78605357 },
        { lng: 117.074805, lat: 31.78646718 },
        { lng: 117.0682129, lat: 31.78517463 },
        { lng: 117.0590358, lat: 31.78159857 },
        { lng: 117.059085, lat: 31.78191771 },
        { lng: 117.059085, lat: 31.78579536 },
        { lng: 117.059085, lat: 31.78868206 },
        { lng: 117.0652031, lat: 31.7894145 },
        { lng: 117.0644707, lat: 31.79053471 },
        { lng: 117.0623164, lat: 31.79053471 },
        { lng: 117.0615409, lat: 31.79053471 },
        { lng: 117.0599036, lat: 31.79169801 },
        { lng: 117.0571462, lat: 31.79169801 },
        { lng: 117.0561552, lat: 31.79277514 },
        { lng: 117.0445654, lat: 31.79406769 },
        { lng: 117.0419663, lat: 31.79406769 },
        { lng: 117.0374096, lat: 31.78999772 },
        { lng: 117.0332786, lat: 31.79076194 },
        { lng: 117.0351398, lat: 31.79327811 },
        { lng: 117.0351398, lat: 31.79655611 },
        { lng: 117.033914, lat: 31.79611492 },
        { lng: 117.0310738, lat: 31.79418471 },
        { lng: 117.028537, lat: 31.79277842 },
        { lng: 117.0276546, lat: 31.79241995 },
        { lng: 117.0252281, lat: 31.79346778 },
        { lng: 117.0248972, lat: 31.79352292 },
        { lng: 117.0253384, lat: 31.79517739 },
        { lng: 117.0274892, lat: 31.79625279 },
        { lng: 117.0300536, lat: 31.79837602 },
        { lng: 117.0304948, lat: 31.7993687 },
        { lng: 117.0358718, lat: 31.80358759 },
        { lng: 117.039098, lat: 31.80921277 },
        { lng: 117.0387914, lat: 31.81026192 },
        { lng: 117.0374078, lat: 31.81026192 },
        { lng: 117.0360812, lat: 31.81082848 },
        { lng: 117.0346473, lat: 31.81241676 },
        { lng: 117.0332576, lat: 31.81766693 },
        { lng: 117.0332576, lat: 31.81876991 },
        { lng: 117.0332576, lat: 31.819917 },
        { lng: 117.0350885, lat: 31.82413037 },
        { lng: 117.0342359, lat: 31.82817064 },
        { lng: 117.0342359, lat: 31.82999055 },
        { lng: 117.0357525, lat: 31.83076263 },
        { lng: 117.0384712, lat: 31.83224704 },
        { lng: 117.042847, lat: 31.83224704 },
        { lng: 117.042847, lat: 31.83224704 },
        { lng: 117.0442607, lat: 31.83204508 },
        { lng: 117.0455398, lat: 31.8321124 },
        { lng: 117.047896, lat: 31.83217972 },
        { lng: 117.0509254, lat: 31.83191044 },
        { lng: 117.0494107, lat: 31.83204508 },
        { lng: 117.0532143, lat: 31.83191044 },
        { lng: 117.0542241, lat: 31.83191044 },
        { lng: 117.0554252, lat: 31.83217734 },
        { lng: 117.0554252, lat: 31.83217734 },
        { lng: 117.0558607, lat: 31.83373888 },
        { lng: 117.0554252, lat: 31.83217734 },
        { lng: 117.0554252, lat: 31.83217734 },
        { lng: 117.0554252, lat: 31.83217734 },
        { lng: 117.0558607, lat: 31.83373888 },
        { lng: 117.0555376, lat: 31.83621627 },
        { lng: 117.0607616, lat: 31.83772425 },
        { lng: 117.0625389, lat: 31.83810124 },
        { lng: 117.0625389, lat: 31.84230203 },
        { lng: 117.0634544, lat: 31.84477942 },
        { lng: 117.0640468, lat: 31.84510256 },
        { lng: 117.0659318, lat: 31.84305602 },
        { lng: 117.0669551, lat: 31.84289445 },
        { lng: 117.0680861, lat: 31.84407929 },
        { lng: 117.0681399, lat: 31.84617968 },
        { lng: 117.0682476, lat: 31.84693367 },
        { lng: 117.0682476, lat: 31.85221159 },
        { lng: 117.0670628, lat: 31.85226544 },
        { lng: 117.0662011, lat: 31.8552814 },
        { lng: 117.0644777, lat: 31.85818963 },
        { lng: 117.0633467, lat: 31.85942833 },
        { lng: 117.0633467, lat: 31.86195957 },
        { lng: 117.0635788, lat: 31.86288565 },
        { lng: 117.0633203, lat: 31.86374735 },
        { lng: 117.0620069, lat: 31.86470128 },
        { lng: 117.0613606, lat: 31.86530447 },
        { lng: 117.0607143, lat: 31.86625234 },
        { lng: 117.0601542, lat: 31.86689862 },
        { lng: 117.0594649, lat: 31.86750181 },
        { lng: 117.0589048, lat: 31.86827734 },
        { lng: 117.058, lat: 31.86991457 },
        { lng: 117.0561904, lat: 31.87081936 },
        { lng: 117.0562335, lat: 31.87056085 },
        { lng: 117.0559642, lat: 31.87307055 },
        { lng: 117.0559104, lat: 31.87387839 },
        { lng: 117.0575799, lat: 31.87603265 },
        { lng: 117.0577953, lat: 31.87743291 },
        { lng: 117.0577415, lat: 31.87775605 },
        { lng: 117.0598354, lat: 31.87909713 },
        { lng: 117.0615588, lat: 31.88086362 },
        { lng: 117.0594907, lat: 31.88172532 },
        { lng: 117.0584286, lat: 31.88322164 },
        { lng: 117.0595769, lat: 31.884095 },
        { lng: 117.0603093, lat: 31.88534446 },
        { lng: 117.0587022, lat: 31.88696518 },
        { lng: 117.0594907, lat: 31.88780031 },
        { lng: 117.0603955, lat: 31.88913594 },
        { lng: 117.0618173, lat: 31.88960988 },
        { lng: 117.0630733, lat: 31.89073541 },
        { lng: 117.0647967, lat: 31.89202796 },
        { lng: 117.065937, lat: 31.89202796 },
        { lng: 117.0661403, lat: 31.8920262 },
        { lng: 117.066513, lat: 31.89191325 },
      ];
      var ps = [];
      try {
        for (var i in ttt) {
          ps.push(new BMap.Point(ttt[i].lng, ttt[i].lat));
        }
        var ply = new BMap.Polygon(ps, {
          strokeColor: "#bfe4fe",
          fillColor: "#2957ac",
          strokeWeight: 1,
          fillOpacity: 0.5,
          strokeOpacity: 1,
        });
        ply.id = "gaoxinqudeid"; // 高新区没有区域id，我先自己编了一个，后续可以和后端统一
        ply.name = "高新区";
        map && map.addOverlay(ply); //增加多边形
      } catch (err) {
        console.log(err);
      }
    },
    createCityLayer() {
      console.log(me.currentClickRegion);
      // this.$store.dispatch('sysHome/systemName', '合肥智慧能源平台');
      // 先清除图层
      try {
        map.clearOverlays();
        import("~/static/maphfcity/hefei_datav.json").then((hfcityjson) => {
          // 合肥市列表
          hfcityjson.features.forEach((city, index) => {
            let flag = false;
            if (me.currentClickRegion.name == "市区") {
              if (
                ["庐阳区", "蜀山区", "包河区", "瑶海区"].indexOf(
                  city.properties.name
                ) > -1
              ) {
                flag = true;
              }
            }
            console.log(me.currentClickRegion.name, flag);
            const ply_city = new BMap.Polygon(
              city.geometry.coordinates[0][0].join(";"),
              {
                strokeWeight: 1,
                strokeColor:
                  city.properties.name == me.currentClickRegion.name || flag
                    ? "#00ffff"
                    : "#bfe4fe",
                fillColor:
                  city.properties.name == me.currentClickRegion.name || flag
                    ? "#00ffff"
                    : color[index],
                fillOpacity: 0.5,
                strokeOpacity: 1,
              }
            ); // 建立多边形覆盖物

            // ply_city.id = city.properties.id;
            ply_city.id = city.properties.adcode + "";
            ply_city.name = city.properties.name;
            cityAreaCode.push(ply_city.id);
            // console.log(ply_city);
            // ply_city.addEventListener('mousemove', me.mouseenterHandler);//修改鼠标移入需要注释掉
            // ply_city.addEventListener('mouseout', me.mouseoutHandler);//修改鼠标移入需要注释掉
            if (this.from != "monitor") {
              ply_city.addEventListener("click", me.mouseClick);
            }
            map && map.addOverlay(ply_city);
            // const label = new BMap.Label(ply_city.name,
            //     {
            //         offset: new BMap.Size(-10, -10),
            //         position: new BMap.Point(city.properties.center[0], city.properties.center[1])
            //     });
            // // 创建文本标注对象
            // label.setStyle({
            //     color: '#bfe4fe', // 思极文字颜色#5D9BC1，百度文字颜色#444444
            //     border: 'none',
            //     background: 'transparent',
            //     fontSize: '12px',
            //     height: '15px',
            //     lineHeight: '15px',
            //     fontFamily: '微软雅黑'
            // });
            // label.id = 'arealabel_' + ply_city.id;
            // map.addOverlay(label);
            ply_city_all.push(ply_city);
          });
          me.$emit("ply_city", true);
        });
        me.bussinessInit();
      } catch (err) {
        console.log(err);
      }
    },
    baiduCreateAreaLayer() {
      // 先清除图层
      try {
        map.clearOverlays();
        import("~/static/maphfcity/hefei_datav_arcgis.json").then(
          (hfcityjson) => {
            // 合肥市列表
            hfcityjson.geometries.forEach((city, index) => {
              const ply_city = new BMap.Polygon(city.coordinates[0].join(";"), {
                strokeWeight: 1,
                strokeColor: "#bfe4fe",
                fillColor: color[index],
                fillOpacity: 0.5,
                strokeOpacity: 1,
              }); // 建立多边形覆盖物

              ply_city.id = city.properties.adcode + "";
              ply_city.name = city.properties.name;
              cityAreaCode.push(ply_city.id);
              // console.log(ply_city);
              // ply_city.addEventListener('mousemove', me.mouseenterHandler);//修改鼠标移入需要注释掉
              // ply_city.addEventListener('mouseout', me.mouseoutHandler);// 修改鼠标移入需要注释掉
              ply_city.addEventListener("click", me.mouseClick);
              map && map.addOverlay(ply_city);
              // const label = new BMap.Label(ply_city.name,
              //     {
              //         offset: new BMap.Size(-10, -10),
              //         position: new BMap.Point(city.properties.center[0], city.properties.center[1])
              //     });
              // // 创建文本标注对象
              // label.setStyle({
              //     color: '#5D9BC1', // 思极文字颜色#5D9BC1，百度文字颜色#444444
              //     border: 'none',
              //     background: 'transparent',
              //     fontSize: '12px',
              //     height: '15px',
              //     lineHeight: '15px',
              //     fontFamily: '微软雅黑'
              // });
              // label.id = 'arealabel_' + ply_city.id;
              // map.addOverlay(label);
            });
          }
        );
      } catch (err) {
        console.log(err);
      }
      // me.bussinessInit();
    },
    mapRedraw(whether) {
      if (me.mapType === "sgMap") {
        if (whether) {
          // import('~/static/maphfcity/hefei_datav_arcgis_sg.json').then((hfSg)=>{
          //   console.log(hfSg)
          //   const _id = `340100`;
          //   map.addSource(_id, {
          //     type: 'geojson',
          //     data: {
          //       "type": "FeatureCollection",
          //       "features":
          //         [{
          //         "type": "Feature",
          //         "properties": {
          //           name:hfSg.geometries[0].properties.name,
          //           code:hfSg.geometries[0].properties.adcode
          //         },
          //         "geometry": {
          //           "type": "Polygon",//Polygon
          //           "coordinates":[[117.15,31.80],[117.15,31.80],[117.15,31.80]]
          //           // hfSg.geometries[0].coordinates
          //         }
          //       }]
          //     }
          //   });
          //   console.log(map.getSource('340100'),'市区数据源')
          //   // console.log(map.getSource('power-polygon_340101'),'数据源')
          //   map.addLayer({
          //     id: 'power-polygon_340100',
          //     type: 'fill',
          //     source: '340100',
          //     paint: {
          //       'fill-color': 'red',
          //       'fill-opacity': 0.5,
          //       'fill-outline-color': '#bfe4fe' // 默认行政区分界线颜色
          //     }
          //   });
          // })
        } else {
        }
      } else if (me.mapType === "baiduMap") {
        if (whether) {
          this.baiduCreateAreaLayer();
        } else {
          this.createCityLayer();
        }
        this.heatmapOverlayForBaidu = null;
      }
    },
    baiduMapChangeToCity() {
      // 清除地市级图层
      map && map.clearOverlays();
      map && map.setZoom(9);
      // 绘制合肥市行政区轮廓
      me.createCityLayer();
    },
    // 把鼠标移动时间抽离出来
    mousemovEvent(e) {
      if (e.overlay) {
        me.mouseenterHandler(e, e.pixel);
      } else {
        me.mouseoutHandler();
      }
    },
    // 百度地图-添加区域图层
    createProviceLayer() {
      console.debug("-----me.fromFlag-----", me.fromFlag);
      try {
        if (me.fromFlag === "anhui") {
          this.$store.dispatch("sysHome/systemName", "安徽省能源大数据中心");
          import("~/static/maphfcity/anhui.json").then((ahprovincejson) => {
            // 安徽省地市列表
            ahprovincejson.features.forEach((city, index) => {
              // me.cityList.push({
              //     name: city.properties.name,
              //     code: city.id
              // });
              new BMap.Boundary().get(city.properties.name, function (rs) {
                const ply_city = new BMap.Polygon(rs.boundaries[0], {
                  strokeWeight: 1,
                  strokeColor: "#bfe4fe",
                  fillColor:
                    city.id === me.areaCode
                      ? me.provinceColorDefault[0]
                      : me.provinceColorDefault[1],
                  fillOpacity:
                    city.id === me.areaCode
                      ? me.provinceOpacityDefault[0]
                      : me.provinceOpacityDefault[1],
                  strokeOpacity: 1,
                }); // 建立多边形覆盖物

                ply_city.id = city.id;
                cityAreaCode.push(city.id);
                ply_city.addEventListener("mouseover", me.mouseenterHandler);
                ply_city.addEventListener("mouseout", me.mouseoutHandler);
                ply_city.addEventListener("click", me.mouseClick);

                map && map.addOverlay(ply_city);
              });
            });
          });
        } else {
          me.createCityLayer();
          me.initCreateHeatMap(); // 热力图层会覆盖整个地图，让其处于底层
          console.log("来源页面", this.from);
          //if (this.from === 'monitor' || this.from === 'elec' || this.from === 'dualcontrol'||this.from==='cockpit') {
          // map.addEventListener('mousemove', ({ type, target, point, pixel, overlay }) => {
          // map.addEventListener('mousemove', (e) => {
          // 	console.log('e',e);
          // 	if (e.overlay) {
          // 		me.mouseenterHandler(e,e.pixel);
          // 	} else {
          // 		me.mouseoutHandler()
          // 	}
          // });
          if (
            this.from === "elec" ||
            this.from === "dualcontrol" ||
            this.from === "cockpit"
          ) {
            map && map.addEventListener("mousemove", me.mousemovEvent);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * 百度地图-绘制热力图
     * @param points 格式：[{"lng":"114.363979","lat":"36.03773","count":"52"},{},{}]
     */
    createBaiduHeatmap(points) {
      // return false;// 暂时屏蔽热力图
      if (!this.isSupportCanvas()) {
        this.$message.warning(
          "热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~"
        );
        return;
      }
      // 需要添加热力图的组件需要在这里添加条件
      if (!(me.from == "monitor" || me.from == "elec" || "doubleCarbon")) {
        return;
      }
      try {
        if (points) {
          const baidupoints = [];
          let maxValue = "";
          points.forEach((item, index) => {
            // baidupoints.push( {"lng":item.lng,"lat":item.lat,"count":item.count})
            baidupoints.push({
              lng: item.lng,
              lat: item.lat,
              count: item.count,
            });
            if (index === 0) {
              maxValue = Number(item.count);
            } else if (Number(item.count) > maxValue) {
              maxValue = Number(item.count);
            }
          });
          if (this.heatmapOverlayForBaidu === null) {
            this.heatmapOverlayForBaidu = new BMapLib.HeatmapOverlay({
              radius: 20,
              maxOpacity: 0.6,
              visible: true,
            });
            map && map.addOverlay(this.heatmapOverlayForBaidu);
            /* 格式如下所示:
                      {
                          0:'rgb(102, 255, 0)',
                          .5:'rgb(255, 170, 0)',
                          1:'rgb(255, 0, 0)'
                      } */
            // const gradient = {
            // 	0.1: '#2cc946',
            // 	0.3: '#d5fb0c',
            // 	// 0.5:"#e04e4e",
            // 	// 0.6:"#f33900",
            // 	0.5: 'rgba(255, 255, 0,1)',
            // 	1: 'rgba(255, 0, 0,1)'
            // };

            const gradient = {
              0.25: "rgb(0,0,255)",
              0.55: "rgb(0,255,255)",
              0.65: "rgb(0,255,0)",
              0.75: "rgb(255,255,0)",
              1: "rgb(255,96,68)",
            };
            this.heatmapOverlayForBaidu.setOptions({ gradient });
          } else {
            this.heatmapOverlayForBaidu.show();
          }
          this.heatmapOverlayForBaidu.setDataSet({
            data: baidupoints,
            max: maxValue,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    zoneDetail() {
      map && map.addEventListener("mousemove", me.mousemovEvent);
      ply_city_all.forEach((item) => {
        item.addEventListener("click", me.mouseClick);
      });
    },
    unZoneDetail() {
      try {
        map.removeEventListener("mousemove", me.mousemovEvent);
        ply_city_all.forEach((item) => {
          item.removeEventListener("click", me.mouseClick);
        });
      } catch (err) {
        console.log(err);
      }
    },
    removeBaiduHeatmap() {
      if (this.heatmapOverlayForBaidu) {
        this.heatmapOverlayForBaidu.hide();
      }
    },
    showBaiduHeatmap() {
      if (this.heatmapOverlayForBaidu) {
        this.heatmapOverlayForBaidu.show();
      }
    },
    // 判断浏览区是否支持canvas
    isSupportCanvas() {
      const elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    },
  },
};
</script>
<style lang="scss" scoped>
.model {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  z-index: 1000;
}
.Gismodel {
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  z-index: 1000;
}

.mapClass {
  width: 100%;
  height: 100%;
  margin: 0;
}
::v-deep .epgis-popup-content {
  padding: 0;
  background: transparent;
}
/*::v-deep .heatmap-canvas {
        z-index:-1;
    }*/
</style>
