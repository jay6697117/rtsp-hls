<template>
  <div class="wrap1">
    <div class="item" v-for="(item, index) in items" :key="index">
      <Video />
    </div>
  </div>
</template>

<script>
import Video from '../components/Video';
export default {
  components: { Video },
  name: 'Home',
  data() {
    return {
      items: new Array(4)
    };
  },
  methods: {
    initPlayer() {}
  },
  mounted() {},
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.wrap1 {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .item {
    background-color: red;
    width: 18%;
    min-height: 20%;
    margin-right: 1px;
    margin-bottom: 10px;
  }
}
</style>
