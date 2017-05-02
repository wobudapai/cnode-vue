<template>
    <div id="viewMap" :style="mapStyle">
    </div>
</template>
<script>
  import BMap from 'BMap'
  export default {
    props: {
      mapHeight: {
        type: String,
        default: '100%'
      },
      mapWidth: {
        type: String,
        default: '100%'
      },
      parks: {
        type: Array,
        default: []
      },
      longitude: { // 经度
        type: Number,
        default: 104.072438
      },
      latitude: {  // 纬度
        type: Number,
        default: 30.645369
      },
      description: {
        type: String,
        default: '华西二院'
      }
    },
    computed: {
      mapStyle: function () {
        var html = document.documentElement
        return {
          width: html.clientWidth + 'px',
          height: html.clientHeight + 'px'
        }
      }
    },
    mounted: function () {
      var map = new BMap.Map('viewMap')
      var centerPoint = new BMap.Point(104.072438, 30.645369)
      map.centerAndZoom(centerPoint, 18)
      map.enableScrollWheelZoom(true)
    }
  }
</script>
