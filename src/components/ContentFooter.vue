<template>
  <div class="content_footer">
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
        :class="item.id === activeId ? 'active' : ''"
        @click="selectItem(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        { name: "总览", id: 1 },
        { name: "红垦区", id: 2 },
        { name: "科技城", id: 3 },
        { name: "钱江单元", id: 4 },
        { name: "桥南", id: 5 },
        { name: "市北单元", id: 6 },
      ],
      activeId: 1,
    };
  },
  methods: {
    selectItem(item) {
      this.activeId = item.id;
    },
  },
};
</script>
<style lang="scss" scoped>
.content_footer {
  width: 1795px;
  height: 51px;
  position: relative;
  top: -48px;
  left: 42px;
  background: url("@/assets/images/center/tab_07.png") no-repeat 100% 100%;
  display: flex;
  ul {
    margin: 0 auto;
    display: flex;
    position: relative;
    left: -15px;
    .active {
      color: #fff;
      background: url("@/assets/images/center/hover.png") no-repeat 100% 100%;
    }
    li {
      font-size: 18px;
      line-height: 51px;
      //margin-left: 25px;
      color: #bdedff;
      //padding: 0 12px;
      width: 85px;
      text-align: center;
      cursor: pointer;
    }
    li:nth-child(1) {
      margin-left: 0;
    }
    li:last-child {
      margin-right: 35px;
    }
  }
}
</style>