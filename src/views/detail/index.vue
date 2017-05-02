<template>
  <div>
    <header class="header-detail" :style="{backgroundColor:currentColor}">
      <div class="box-info">
        <img :src="detail.author ? detail.author.avatar_url : ''" class="avatar">
        <p class="title">{{detail.title}}</p>
        <p class="time">
          <a class="box-clock"><img src="./image/clock.png"></a>
          <a class="box-time">&nbsp;{{$util.parseTime(detail.last_reply_at)}}</a></p>
      </div>
    </header>
    <div v-html="detail.content" class="content"></div>
    <div class="title-reply">
      评论({{detail.reply_count}})
    </div>
    <list :items="detail.replies" :adapter="itemReply"></list>
  </div>
</template>

<script>
  import list from '../../components/list/'
  import itemReply from './item-reply.vue'
  export default {
    components: {
      list
    },
    data: function () {
      return {
        detail: {},
        itemReply: itemReply,
        headerColors: ['#666699', '#FF9900', '#0099CC', '#CC3399', '#FF6666', '#3399CC',
        '#FF9933', '#009933', '#FF6600', '#009999'],
        currentColor: ''
      }
    },
    activated: function () {
      const vm = this
      this.$store.dispatch('detail', this.$route.query.id).then(function (data) {
        vm.detail = data.data
        window.setDocumentTitle(vm.detail.title)
        vm.$store.commit('UPDATE_LOADING', false)
      })
      this.currentColor = this.headerColors[parseInt(Math.random() * this.headerColors.length)]
      window.onscroll = this.contentScroll
    }
  }
</script>

<style lang="less">
  @import "./detail.less";
</style>


<!--<img src="./image/clock.png">-->
