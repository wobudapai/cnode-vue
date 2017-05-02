<script>
  export default {
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
          return null
        }
      },
      footer: {
        type: Object,
        default: function () {
          return null
        }
      },
      showHeader: {
        type: Boolean,
        default: true
      },
      showFooter: {
        type: Boolean,
        default: true
      }
    },
    render: function (createElement) {
      const vm = this
      if (vm.adapter === null) {
        return createElement('div', {
          class: 'hint'
        }, ['参数有误'])
      }
      if (vm.items.length === 0) {
//        return createElement('div', {
//          class: 'hint'
//        }, ['没有数据呦'])
        return createElement('div')
      }
      return createElement('div', [
        (function () {
          if (vm.header != null && vm.showHeader) {
            return createElement(vm.header, {
              show: vm.showHeader
            })
          }
        })(),
        createElement('div', [
          vm.items.map(function (item) {
            return createElement(vm.adapter, {
              props: item
            })
          })
        ]),
        (function () {
          if (vm.footer && vm.showFooter) {
            return createElement(vm.footer)
          }
        })()
      ])
    }
  }
</script>

<style scoped>
  .hint {
    text-align: center;
    color: #aaa;
  }
</style>
