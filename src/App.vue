<template>
  <div id="app" class="top_floor_wrap">
    <div class="center_wrap">
      <TMap :list="mapData" />
    </div>

    <ContentHeader />

    <div class="left_wrap">
      <div class="left_top_nav">
        <Item1 v-for="(item, index) in left_top" :list="item" :key="index" />
      </div>

      <BorderWrap name="企业分布情况">
        <EnterpriseDistribution />
      </BorderWrap>

      <BorderWrap name="属地街道分布">
        <StreetDistribution />
      </BorderWrap>
    </div>

    <TitleCenter :list="title_center_list" class="title_center" />

    <div class="work_plan">工作计划</div>

    <div class="content_center_warp">
      <div class="content_center_trigger" @click="count++">
        <span>排查计划</span>
        <b />
      </div>
      <TroubleshootingPlan v-show="count % 2 === 0" />
    </div>

    <div class="right_wrap">
      <div class="right_top_nav">
        <Item2 v-for="(item, index) in right_top" :list="item" :key="index" />
      </div>

      <BorderWrap name="排查动态">
        <TroubleshootingTrends />
      </BorderWrap>

      <BorderWrap name="风险分类">
        <RiskClassification />
      </BorderWrap>
    </div>

    <ContentFooter @foot-child="footEvent" />
  </div>
</template>

<script>
import TMap from "@/components/Skymap/index3";
import Item1 from "@/components/common/item1";
import Item2 from "@/components/common/item2";
import TitleCenter from "@/components/TitleCenter";
import ContentHeader from "@/components/ContentHeader";
import ContentFooter from "@/components/ContentFooter";
import BorderWrap from "@/components/common/BorderWrap";
import RiskClassification from "@/components/RiskClassification";
import StreetDistribution from "@/components/StreetDistribution";
import TroubleshootingPlan from "@/components/TroubleshootingPlan";
import TroubleshootingTrends from "@/components/TroubleshootingTrends";
import EnterpriseDistribution from "@/components/EnterpriseDistribution";
export default {
  name: "App",
  components: {
    TMap,
    Item1,
    Item2,
    BorderWrap,
    TitleCenter,
    ContentHeader,
    ContentFooter,
    RiskClassification,
    StreetDistribution,
    TroubleshootingPlan,
    TroubleshootingTrends,
    EnterpriseDistribution,
  },
  data() {
    return {
      left_top: [
        {
          name: "现存企业总数",
          value: "156",
          icon: require("@/assets/images/leftTop/icon_total.png"),
        },
        {
          name: "本周新增企业数",
          value: "12",
          icon: require("@/assets/images/leftTop/icon_add.png"),
        },
        {
          name: "本周减少企业数",
          value: "16",
          icon: require("@/assets/images/leftTop/icon_cut.png"),
        },
      ],
      right_top: [
        {
          name: "待执行任务",
          value: "156",
          icon: require("@/assets/images/rightTop/icon1.png"),
        },
        {
          name: "完成任务",
          value: "12",
          icon: require("@/assets/images/rightTop/icon2.png"),
        },
        {
          name: "滞后任务",
          value: "16",
          icon: require("@/assets/images/rightTop/icon3.png"),
        },
      ],
      title_center_list: [
        {
          name: "总区块数量",
          value: "28",
          unit: "个",
          img: require("@/assets/images/center/icon1.png"),
        },
        {
          name: "已排查区块数量",
          value: "18",
          unit: "个",
          img: require("@/assets/images/center/icon2.png"),
        },
      ],
      count: 0,
      mapData: [],
      totalCount: 0,
      currentPage: 1,
      enterInfoList: [],
      textField_ldqeyle9: "",
    };
  },
  mounted() {
    this.getToken();
    this.getEnterInfo();
  },
  methods: {
    footEvent(e) {
      console.log("---footEvent---", e);
      if (e == "总览") {
        this.textField_ldqeyle9 = "红垦区";
      } else {
        this.textField_ldqeyle9 = e;
      }
      this.mapData = [];
      this.currentPage = 1;
      this.getMapData();
    },
    getToken() {
      let options = {
        body: {
          appKey: "dingel2ycr40ued04qgf",
          appSecret:
            "AJgz3PWzn8s-O6d6zM3gko6rgUmoN6VMszHshBOHPJwU8mNkTqDqFLgNjtlVCibh",
        },
      };
      this.postRequest("/oauth2/accessToken", options).then((res) => {
        if (res.status === 200) {
          const { accessToken } = res.data;
          sessionStorage.setItem("token", accessToken);
        }
      });
    },
    getEnterInfo() {
      let currentPage = 1;
      let options = {
        body: {
          userId: "150708356321546148",
          appType: "APP_J3324MXEQQQZ8PBARVVT",
          systemToken: "BB866481CMF79RF5AIAT5BNN075N2W5IJGLDLJO",
          formUuid: "FORM-JH9660C1OCC7YKH69X85Y59G19LU217IJGLDLU5",
          // searchFieldJson: JSON.stringify({
          //   selectField_ldlgorhx: "红垦区",
          // }),
          currentPage,
          pageSize: 100,
        },
      };
      this.postRequest("/yida/forms/instances/search", options).then((res) => {
        console.log("---企业信息表---", res);
        if (res.status === 200) {
          this.enterInfoList = [...this.enterInfoList, ...res.data.data];
          if (res.data.totalCount > this.enterInfoList.length) {
            currentPage += 1;
            this.getEnterInfo();
          }
        }
      });
    },
    getMapData() {
      let options = {
        body: {
          userId: "150708356321546148",
          appType: "APP_J3324MXEQQQZ8PBARVVT",
          systemToken: "BB866481CMF79RF5AIAT5BNN075N2W5IJGLDLJO",
          formUuid: "FORM-DX966R61PHC7RXFBC58X3CNUZKA62SWQBGQDL51",
          searchFieldJson: JSON.stringify({
            textField_ldqeyle9: this.textField_ldqeyle9,
          }),
          currentPage: this.currentPage,
          pageSize: 100,
        },
      };
      this.postRequest("/yida/forms/instances/search", options).then((res) => {
        if (res.status === 200) {
          this.mapData = [...this.mapData, ...res.data.data];
          // console.log(this.mapData);
          this.totalCount = res.data.totalCount;
          if (this.totalCount > this.mapData.length) {
            this.currentPage += 1;
            this.getMapData();
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top_floor_wrap {
  width: 1920px;
  height: 1080px;
  position: relative;
  .center_wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .left_wrap {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 490px;
    height: 100%;
    padding: 95px 0 30px 30px;
    background: linear-gradient(
      90deg,
      rgba(0, 13, 42, 1) 0%,
      rgba(0, 13, 42, 1) 10%,
      rgba(0, 13, 42, 1) 20%,
      rgba(0, 13, 42, 1) 30%,
      rgba(0, 13, 42, 0.95) 40%,
      rgba(0, 13, 42, 0.85) 50%,
      rgba(0, 13, 42, 0.75) 60%,
      rgba(0, 13, 42, 0.65) 70%,
      rgba(0, 13, 42, 0.45) 80%,
      rgba(0, 13, 42, 0.25) 90%,
      rgba(0, 13, 42, 0) 100%
    );

    .left_top_nav {
      width: 460px;
      display: flex;
      justify-content: space-between;
    }
  }
  .right_wrap {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 490px;
    height: 100%;
    padding: 95px 30px 30px 0;
    background: linear-gradient(
      270deg,
      rgba(0, 13, 42, 1) 0%,
      rgba(0, 13, 42, 1) 10%,
      rgba(0, 13, 42, 1) 20%,
      rgba(0, 13, 42, 1) 30%,
      rgba(0, 13, 42, 0.95) 40%,
      rgba(0, 13, 42, 0.85) 50%,
      rgba(0, 13, 42, 0.75) 60%,
      rgba(0, 13, 42, 0.65) 70%,
      rgba(0, 13, 42, 0.45) 80%,
      rgba(0, 13, 42, 0.25) 90%,
      rgba(0, 13, 42, 0) 100%
    );
    .right_top_nav {
      width: 460px;
      display: flex;
      justify-content: space-between;
    }
  }

  .content_center_warp {
    position: absolute;
    width: 940px;
    min-height: 138px;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    .content_center_trigger {
      position: absolute;
      right: 30px;
      top: -25px;
      width: 90px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-family: singleFont;
        font-size: 16px;
      }
      b {
        width: 0px;
        height: 0px;
        cursor: pointer;
        border-top: 9px solid #ffd200;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
      }
    }
  }
  .title_center {
    position: absolute;
    left: 50%;
    top: 95px;
    transform: translateX(-50%);
  }
  .work_plan {
    width: 77px;
    height: 24px;
    position: absolute;
    top: 95px;
    right: 520px;
    text-align: center;
    line-height: 24px;
    background-image: linear-gradient(
      90deg,
      #0085ff 0%,
      rgba(0, 73, 139, 0.5) 90%,
      rgba(0, 73, 139, 0.1) 100%
    );
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    cursor: pointer;
    // border: solid 1px #4ab6ec;
    // border-right-color: transparent;
  }
}
</style>
