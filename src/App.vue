<template>
  <div id="app" class="top_floor_wrap">
    <ContentHeader />
    <main>
      <TMap />
    </main>
    <ContentFooter />
  </div>
</template>

<script>
import TMap from "@/components/Skymap/index";
import ContentHeader from "@/components/ContentHeader";
import ContentFooter from "@/components/ContentFooter";
export default {
  name: "App",
  components: {
    TMap,
    ContentHeader,
    ContentFooter,
  },
};
</script>

<style scoped>
.top_floor_wrap {
  padding: 0 32px 32px 32px;
  background-color: rgba(0, 65, 128, 0.2);
}
#app {
  width: 100%;
  height: 100%;
}
</style>
