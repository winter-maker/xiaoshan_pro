<template>
  <div id="app" class="top_floor_wrap">
    <ContentHeader />
    <main>
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
      <div class="center_wrap">
        <TitleCenter :list="title_center_list" class="title_center" />
        <TMap />
        <div class="content_center_warp">
          <div class="content_center_trigger" @click="count++">
            <span>排查计划</span>
            <b />
          </div>
          <TroubleshootingPlan v-show="count % 2 === 0" />
        </div>
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
    </main>
    <ContentFooter />
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
    };
  },
};
</script>

<style lang="scss" scoped>
.top_floor_wrap {
  width: 1920px;
  height: 1080px;
  padding: 0 32px 32px 32px;
  main {
    display: flex;
    justify-content: space-between;
    padding: 17px 0;
    height: 973px;
    position: relative;

    .left_wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .left_top_nav {
        width: 460px;
        display: flex;
        justify-content: space-between;
      }
    }
    .right_wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .right_top_nav {
        width: 460px;
        display: flex;
        justify-content: space-between;
      }
    }
    .center_wrap {
      position: relative;
      box-shadow: 0px 0px 50px rgb(2 35 80 / 60%);
      .content_center_warp {
        position: absolute;
        min-height: 138px;
        bottom: 40px;
        left: 0;
        right: 0;
        z-index: 9;
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
        top: 0px;
        transform: translateX(-50%);
        z-index: 1111;
      }
      flex: 1;
    }
  }
}
</style>
