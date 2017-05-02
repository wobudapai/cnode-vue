<template>
  <div class="home">
    <pager-indicator
      class="indicator"
      :items="titles"
      @indicatorChange="tabChange">
    </pager-indicator>
    <keep-alive>
      <list-cnode
        :type="page.type"
        v-if="currentTabIndex === index"
        v-for="(page,index) in pagerAdapter"
        class="list"
        :key="page.type"
        @beforeLoad="beforeListLoad"
        @loadEnd="listLoadEnd">
      </list-cnode>
    </keep-alive>
    <div class="loading" v-show="isLoadingShow">
      <img src="./images/loading.png" class="loading-img">
    </div>
  </div>
</template>
<script>
  import listCnode from '../list-cnode/'
  import pagerIndicator from '../../components/pager/pager-indicator.vue'
  export default {
    components: {
      'pager-indicator': pagerIndicator,
      'list-cnode': listCnode
    },
    data: function () {
      return {
        currentTabIndex: 0,
        isNext: true,
        isLoadingShow: false,
        pagerAdapter: [{ title: '全部', type: 'all'
        }, { title: '精华', type: 'good'
        }, { title: '分享', type: 'share'
        }, { title: '问答', type: 'ask'
        }, { title: '招聘', type: 'job'
        }]
      }
    },
    computed: {
      titles: function () {
        const titles = []
        this.pagerAdapter.forEach(function (item) {
          titles.push(item.title)
        })
        return titles
      }
    },
    methods: {
      tabChange: function (index) {
        this.isNext = this.currentTabIndex < index
        this.currentTabIndex = index
      },
      beforeListLoad: function () {
        this.isLoadingShow = true
      },
      listLoadEnd: function () {
        this.isLoadingShow = false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/style/common.less";
  .indicator {
    position: fixed;
    top: 0;
    left: 0;
    height: .9rem;
    z-index: 1000;
    -webkit-transform: translateZ(0);
  }
  .list {
    padding-top: .9rem;
  }

  .loading {
    position: fixed;
    top: 1rem;
    right: .1rem;
    color: #00CC66;
  }
  .loading-img {
    display: block;
    width: .5rem;
    height: .5rem;
    .rotate-loading;
  }
</style>
