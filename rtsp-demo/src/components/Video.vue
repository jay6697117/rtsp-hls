<template>
  <div class="wrap"><div ref="videoContainer" class="xgplayer"></div></div>
</template>

<script>
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';
import HlsPlayer from 'xgplayer-hls';

export default {
  name: 'Home',
  data() {
    return {
      player: new Player({
        el: this.$refs.videoContainer
      })
    };
  },
  methods: {
    initPlayer() {
      this.player = new Player({
        el: this.$refs.videoContainer,
        lang: 'zh',
        // 默认静音
        volume: 0.3,
        autoplay: true,
        screenShot: true,
        videoAttributes: {
          crossOrigin: 'anonymous'
        },
        url: 'http://127.0.0.1:5500/output.m3u8',
        // poster: devBuildingImg,
        videoFillMode: 'fill',
        //传入倍速可选数组
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        isLive: true,
        controls: true,
        ignores: ['cssfullscreen'],
        plugins: [HlsPlayer],
        hls: {
          retryCount: 3, // 重试 3 次，默认值
          retryDelay: 1000, // 每次重试间隔 1 秒，默认值
          loadTimeout: 15000 // 请求超时时间为 10 秒，默认值
        }
      });
    }
  },
  mounted() {
    this.initPlayer();
    setTimeout(() => {
      this.player.play();
    }, 300)
  },
  beforeDestroy() {
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  // height: calc(100vh - 82px);
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;

  .xgplayer {
    width: 80% !important;
    height: 80% !important;
  }
}
</style>
