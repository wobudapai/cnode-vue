<template>
  <div class="item" @click="itemClick()">
    <img :src="author.avatar_url" class="avatar">
    <div class="box-content">
      <div class="title">
        {{title}}
      </div>
      <div class="box-info">
        {{reply_count}}/{{visit_count}}
        <div class="box-time">
          <a class="type">{{tabStr}}</a>{{$util.parseTime(last_reply_at)}}
        </div>
      </div>
    </div>
    <div class="icon-top" v-if="top"></div>
    <div class="icon-essence" v-if="good && !top"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      good: Boolean,
      top: Boolean,
      tab: String,
      visit_count: Number,
      reply_count: Number,
      last_reply_at: String,
      author: Object,
      id: String
    },
    computed: {
      tabStr: function () {
        switch (this.tab) {
          case 'share': return '分享'
          case 'ask': return '问答'
          default: return ''
        }
      }
    },
    methods: {
      itemClick: function () {
        this.$router.push({ path: 'detail', query: { id: this.id }})
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./all.less";
</style>
