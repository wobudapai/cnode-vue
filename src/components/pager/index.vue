<script>
  import pagerIndicator from './pager-indicator.vue'
  export default {
    props: {
      adapter: {
        type: Array,
        default: function () {
          return []
        }
      },
      headerHeight: {
        type: Number,
        default: 45
      },
      trigger: {
        type: Number,
        default: 60
      },
      autoSpeed: {
        type: Number,
        default: 20
      },
      defaultIndex: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        touchStartX: 0,
        screenWidth: 0,
        currentIndex: this.defaultIndex,
        indicatorIndex: this.defaultIndex
      }
    },
    render: function (createElement) {
      let pageIndex = 0
      const vm = this
      const titles = []
      this.adapter.forEach(function (item) {
        titles.push(item.title)
      })
      return createElement(
        'div', {
          class: 'container'
        }, [
          createElement(pagerIndicator, {
            style: {
              height: vm.headerHeight + 'px'
            },
            props: {
              items: titles,
              defaultIndex: vm.indicatorIndex
            },
            on: {
              indicatorChange: vm.indicatorChange
            }
          }),
          createElement('div', {
            class: 'page-wrapper',
            on: {
              touchstart: vm.pageTouchStart,
              touchend: vm.pageTouchEnd
            },
            ref: 'pageWrapper'
          }, this.adapter.map(function (item) {
            return createElement('div', {
              class: 'page-content',
              style: {
                left: (100 * pageIndex++) + '%'
              }
            }, [
              createElement(item.page, {
                props: item.props
              })
            ])
          }))
        ]
      )
    },
    mounted: function () {
      this.screenWidth = document.documentElement.clientWidth
    },
    methods: {
      pageTouchStart: function (e) {
        this.touchStartX = e.changedTouches[0].clientX
      },
      pageTouchEnd: function (e) {
        const endX = e.changedTouches[0].clientX
        const vm = this

        let nextIndex = vm.currentIndex

        if (Math.abs(endX - this.touchStartX) > this.trigger) {
          if (endX > vm.touchStartX && vm.currentIndex > 0) {
            nextIndex -= 1
          } else if (endX < vm.touchStartX && vm.currentIndex < vm.adapter.length - 1) {
            nextIndex += 1
          }
        }
        vm.changePage(nextIndex)
      },
      changePage: function (index) {
        const vm = this

        vm.currentIndex = index
        vm.indicatorIndex = index

        const willToLet = this.currentIndex * this.screenWidth
        const tag = this.$refs.pageWrapper.scrollLeft > willToLet ? -1 : 1

        var scrollAnim = function () {
          if ((tag > 0 && vm.$refs.pageWrapper.scrollLeft + vm.autoSpeed * tag > willToLet) ||
            (tag < 0 && vm.$refs.pageWrapper.scrollLeft + vm.autoSpeed * tag < willToLet)) {
            vm.$refs.pageWrapper.scrollLeft = willToLet
          } else {
            vm.$refs.pageWrapper.scrollLeft += vm.autoSpeed * tag
            setTimeout(function () {
              scrollAnim()
            }, 16)
          }
        }
        scrollAnim()
      },
      indicatorChange: function (index) {
        this.changePage(index)
      }
    }
  }
</script>

<style scoped>
  .container {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .page-wrapper {
    left: 0;
    top: 45px;
    bottom: 0;
    width: 100%;
    position: absolute;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .page-content {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    overflow-y: scroll;
  }
</style>
