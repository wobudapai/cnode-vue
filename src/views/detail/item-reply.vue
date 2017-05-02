<template>
  <div class="reply">
    <div class="box-info">
      <img :src="author.avatar_url" class="avatar">
      <a class="name">{{author.loginname}}</a>
      <a class="time">{{$util.parseTime(create_at)}}</a>
    </div>
    <div class="box-content" v-html="content">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      author: Object,
      content: String,
      create_at: String
    },
    computed: {
      timeStr: function () {
        const createTime = new Date(this.create_at)
        const offsetTime = parseInt((Date.now() - createTime) / 1000)
        if (offsetTime <= 0) {
          return ''
        }
        if (offsetTime > 24 * 60 * 60) {
          return createTime.getFullYear() + '年' + createTime.getMonth() + '月' + createTime.getDate()
        } else if (offsetTime > 60 * 60) {
          return parseInt(offsetTime / (60 * 60)) + '小时前'
        } else {
          return parseInt(offsetTime / 60) + '分钟前'
        }
      }
    }
  }
</script>

<style lang="less">
  @import "./item-reply.less";
</style>
