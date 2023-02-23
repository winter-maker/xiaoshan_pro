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
  height: 51px;
  position: absolute;
  width: 100%;
  bottom: 20px;
  background: url("@/assets/images/center/tab_07.png") no-repeat;
  padding-right: 35px;
  background-size: cover;
  display: flex;
  ul {
    margin: 0 auto;
    display: flex;
    .active {
      color: #fff;
      background: url("@/assets/images/center/hover.png") no-repeat;
      background-size: cover;
    }
    li {
      font-size: 18px;
      line-height: 51px;
      //margin-left: 25px;
      color: #bdedff;
      //padding: 0 12px;
      width: 90px;
      text-align: center;
      cursor: pointer;
      white-space: nowrap;
    }
  }
}
</style>