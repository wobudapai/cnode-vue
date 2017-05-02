<template>
  <div class="toggle-btn" :class="{checked: checked}" @click="toggle()">
    <div class="toggle-diot"></div>
  </div>
</template>

<script>
  export default {
    props: {
      checked: {
        type: Boolean,
        default: false
      }
    },
    mounted: function () {
    },
    methods: {
      toggle: function () {
        this.checked = !this.checked
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./toggle-button.less";
</style>
