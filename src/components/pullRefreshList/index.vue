<template>
  <list :adapter="adapter"
    :items="items"
    :header="header"
    :footer="footer"
    :showHeader="isRefresh"
    :showFooter="isLoadMore"
    @touchstart.native="onListTouchStart($event)"
    @touchmove.native="onListTouchMove($event)"
    @touchend.native="onListTouchEnd($event)"
    @scroll.native="onListScroll($event)">
  </list>
</template>

<script>
  import list from '../list/'
  import header from './header.vue'
  import footer from './footer.vue'
  export default {
    components: {
      'list': list
    },
    props: {
      adapter: {
        type: Object,
        default: function () {
          return null
        }
      },
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
      header: {
        type: Object,
        default: function () {
          return header
        }
      },
      footer: {
        type: Object,
        default: function () {
          return footer
        }
      },
      refresh: {
        type: Function,
        default: function (callback) {
          setTimeout(function () {
            callback([])
          }, 2000)
        }
      },
      loadMore: {
        type: Function,
        default: function (callback) {
          setTimeout(function () {
            callback([])
          }, 2000)
        }
      }
    },
    data: function () {
      return {
        needRefresh: false,
        isRefresh: false,
        isLoadMore: false,
        showFooter: false,
        touchStartY: -1,
        ctrlIsRefresh: false,
        offsetLoadMore: 100,
        offsetRefresh: 80
      }
    },
    methods: {
      onListTouchStart: function (e) {
        this.touchStartY = e.changedTouches[0].clientY
        this.ctrlIsRefresh = e.target.parentNode.getBoundingClientRect().top >= 45
      },
      onListTouchMove: function (e) {
        const vm = this
        if (vm.needRefresh && !vm.isRefresh && !vm.isLoadMore &&
          e.changedTouches[0].clientY - vm.touchStartY > vm.offsetRefresh &&
          vm.ctrlIsRefresh) {
          vm.isRefresh = true
        }
        if (!vm.isRefresh && !vm.isLoadMore &&
          e.target.parentNode.getBoundingClientRect().bottom - vm.offsetLoadMore <
          document.documentElement.clientHeight) {
          vm.isLoadMore = true
          vm.loadMore(function (data) {
            vm.items = vm.items.concat(data)
            vm.isLoadMore = false
          })
        }
      },
      onListTouchEnd: function (e) {
        const vm = this
        if (vm.isRefresh) {
          vm.refresh(function (data) {
            vm.items = data.concat()
            vm.isRefresh = false
          })
        }
      }
    }
  }
</script>
