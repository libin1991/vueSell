<template>
  <div class="mask">
    <div class="mask-title">
      <div class="mask-line"></div>
      <div class="mask-text">优惠信息</div>
      <div class="mask-line"></div>
    </div>
    <ul v-if="supports" :class="supports" class="mask-supports">
      <li class="mask-support-item" v-for="item in supports">
        <span class="mask-icon" :class="classMap[item.type]">{{supports[0].type}}</span>
        <span class="mask-text">{{item.description}}</span>
      </li>
    </ul>
    <div class="mask-title">
      <div class="mask-line"></div>
      <div class="mask-text">商家公告</div>
      <div class="mask-line"></div>
    </div>
    <div class="mask-bulletin">
      <p class="mask-content">{{bulletin}}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        supports: {
            type: Array
        },
        bulletin: {
            type: String
        }
      },
      created () {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .mask
    .mask-title
      display: flex
      /*width: 80%*/
      margin: 28px auto 24px auto
      .mask-line
        flex: 1
        position: relative
        top: -6px
        border-bottom: 1px solid rgba(255, 255, 255, .2)
      .mask-text
        padding: 0 12px
        font-size: 14px
        font-weight: 700
    .mask-supports
      /*width: 80%*/
      margin: 0 auto
      .mask-support-item
        padding: 0 12px
        margin-bottom: 12px
        font-size: 0
        &:last-child
          margin-bottom: 0
        .mask-icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          margin-right: 6px
          background-size 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_2')
          &.discount
            bg-image('discount_2')
          &.guarantee
            bg-image('guarantee_2')
          &.invoice
            bg-image('invoice_2')
          &.special
            bg-image('special_2')
        .mask-text
          line-height: 16px
          font-size: 12px
    .mask-bulletin
      /*width: 80%*/
      margin: 0 auto
      .mask-content
        padding: 0 12px
        line-height: 24px
        font-size: 12px
</style>
