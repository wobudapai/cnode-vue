<template>
  <div>
    <pull-refresh-list
      :adapter="item"
      :items="items"
      :refresh="refresh"
      :loadMore="loadMore">
    </pull-refresh-list>
  </div>
</template>

<script>
  import pullRefreshList from '../../components/pullRefreshList/'
  import item from './item.vue'
  export default {
    components: {
      'pull-refresh-list': pullRefreshList
    },
    props: {
      type: String
    },
    data: function () {
      return {
        item: item,
        items: [],
        page: 1,
        limit: 10
      }
    },
    beforeMount: function () {
      this.$emit('beforeLoad')
    },
    mounted: function () {
      const vm = this
      vm.$store.dispatch('topics', {
        page: this.page,
        limit: this.limit,
        tab: this.type
      }).then(function (data) {
        if (data.success) {
          vm.$emit('loadEnd')
          vm.items = data.data
        }
      })
    },
    methods: {
      refresh: function (callback) {
        this.page = 1
        this.$store.dispatch('topics', {
          page: this.page,
          limit: this.limit,
          tab: this.type
        }).then(function (data) {
          if (data.success) {
            callback(data.data)
          }
        })
      },
      loadMore: function (callback) {
        this.page++
        this.$store.dispatch('topics', {
          page: this.page,
          limit: this.limit,
          tab: this.type
        }).then(function (data) {
          if (data.success) {
            callback(data.data)
          }
        })
      }
    }
  }
</script>
