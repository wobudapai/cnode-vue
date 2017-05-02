<template>
  <div class="box-app">
    <transition :name="'vux-pop-' + ($store.state.page.direction === 'forward' ? 'in' : 'out')">
      <keep-alive>
        <router-view class="router-view">
        </router-view>
      </keep-alive>
    </transition>
    <div class="loading-detail" v-show="isLoading">
      <img class="loading-img" src="./assets/image/loading.png">
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      isLoading: function () {
        return this.$store.state.page.isLoading
      },
      transName: function () {
        return 'trans-' + (this.$store.state.page.direction === 'forward' ? 'in' : 'out')
      }
    }
  }
</script>

<style lang="less">
  @import './assets/style/common.less';
  .box-app {
    height: 100%;
    position: relative;
  }
  .router-view {
    width: 100%;
    backface-visibility: hidden;
    perspective: 1000;
  }

  .vux-pop-out-enter-active,
  .vux-pop-out-leave-active,
  .vux-pop-in-enter-active,
  .vux-pop-in-leave-active {
    will-change: transform;
    backface-visibility: hidden;
    transition: all 500ms;
    height: 100%;
    position: absolute;
  }
  .vux-pop-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    -webkit-transform: translate3d(-100%, 0, 0);
  }
  .vux-pop-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }
  .vux-pop-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
    -webkit-transform: translate3d(-100%, 0, 0);;
  }

  .loading-detail {
    position: absolute;
    color: #00CC66;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
  }
  .loading-detail .loading-img {
    display: block;
    width: 1rem;
    height: 1rem;
    .rotate-loading;
  }
</style>
