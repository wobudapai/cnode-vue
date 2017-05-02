<template>
  <div>
    <div class="mask" v-show="open" @click.stop="maskClick()"></div>
    <transition name="slide">
      <div class="picker" v-show="open">
        <div class="picker-hd">
          <a class="picker-action" @click="cancel()">取消</a>
          <a class="picker-action" @click="ok()">确定</a>
        </div>
        <div class="picker-content">
          <div class="picker-bd">
            <div class="picker-group" ref="scrollData"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Scroller from './js/scroller'
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: []
      }
    },
    mounted: function () {
      var self = this
      new Scroller(self.$refs.scrollData, {
        data: self.items,
        onSelect: function (value) {
        }
      })
    },
    methods: {
      maskClick: function () {
        this.$emit('maskClick')
      },
      ok: function () {
        this.$emit('ok')
      },
      cancel: function () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./picker.less";
  @import './style/scroller.css';
</style>
