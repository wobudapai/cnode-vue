<template>
  <div class="wraper-indicator">
    <ul class="list-indicator" ref="list">
      <li class="item-indicator"
          v-for="(item,index) in items"
          :class="{current: currentIndex === index}"
          @click.stop.self="itemClick(index,$event)">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        default: function () {
          return []
        }
      },
      defaultIndex: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        currentIndex: this.defaultIndex,
        screenWidth: 0,
        scrollSpeed: 10
      }
    },
    watch: {
      defaultIndex: function (val) {
        this.currentIndex = val
      },
      currentIndex: function (val, oldVal) {
        const items = document.querySelectorAll('.item-indicator')
        // 当前选择元素居中后相对于屏幕左端的距离
        const screenLeft = (this.screenWidth - items[val].clientWidth) / 2
        // 父元素滚动方向 -1 向左滚动，1 向右滚动
        const tag = val < oldVal ? -1 : 1
        // 最终滚动到的位置
        let willToLeft = items[val].offsetLeft - screenLeft
        if (willToLeft < 0) {
          willToLeft = 0
        } else if (willToLeft > this.$refs.list.scrollWidth - this.screenWidth) {
          willToLeft = this.$refs.list.scrollWidth - this.screenWidth
        }

        var scrollAnim = function () {
          if ((tag > 0 && this.$refs.list.scrollLeft + this.scrollSpeed * tag > willToLeft) ||
            (tag < 0 && this.$refs.list.scrollLeft + this.scrollSpeed * tag < willToLeft)) {
            this.$refs.list.scrollLeft = willToLeft
          } else {
            this.$refs.list.scrollLeft += this.scrollSpeed * tag
            setTimeout(function () {
              scrollAnim()
            }, 16)
          }
        }.bind(this)
        scrollAnim()

        // 父元素滚动到当前元素居中
//        this.$refs.list.scrollLeft = items[val].offsetLeft - screenLeft
      }
    },
    mounted: function () {
      this.screenWidth = document.documentElement.clientWidth
    },
    methods: {
      itemClick: function (index, e) {
        this.currentIndex = index
//        const el = e.target || e.srcElement
//        window.alert(el.offsetLeft)
//        this.$refs.list.scrollLeft = 200
        this.$emit('indicatorChange', index)
      }
    }
  }
</script>

<style>
  .wraper-indicator {
    position: relative;
    width: 6.4rem;
    background-color: white;
  }
  .wraper-indicator:after {
    content:"";
    position: absolute;
    bottom:0;
    left:0;
    right:0;
    border-bottom:1px solid #c8c7cc;
    -webkit-transform:scaleY(.5);
    -webkit-transform-origin:0 0;
    z-index: 1;
  }

  .list-indicator, .item-indicator {
    position: absolute;
    top: 0;
    left: 0;
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 100%;
    overflow-x: auto;
    white-space:nowrap;
    background-color: white;
  }
  .list-indicator {
    position: relative;
  }

  .item-indicator {
    /*min-width: 100px;*/
    display:inline-block;
    box-sizing: border-box;
    text-align: center;
    padding: 12px 10px 0 10px;
    margin: 0 10px;
    position: relative;
  }
  .item-indicator.current {
    border-bottom: 3px solid #00CC66;
    z-index: 2;
  }
</style>
