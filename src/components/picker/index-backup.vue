<template>
  <div>
    <div class="mask" v-show="isOpen"></div>
    <transition name="slide">
      <div class="picker" :class="{open: isOpen}">
        <div class="picker-hd">
          <a class="picker-action" @click="hidePicker()">取消</a>
          <a class="picker-action" @click="positiveClick()">确定</a>
        </div>
        <div class="picker-content">
          <div class="picker-indicator"></div>
          <div class="picker-bd">
            <ul class="picker-group">
              <li @touchstart.prevent>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>22</li>
              <li>111</li>
              <li>111</li>
              <li>22</li>
              <li>22</li>
              <li>22</li>
              <li>111</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        isOpen: false
      }
    },
    mounted: function () {
      window.setTimeout(function () {
        this.isOpen = true
      }.bind(this), 1000)
    },
    methods: {
      hide: function () {
        this.isOpen = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./picker.less";
</style>
