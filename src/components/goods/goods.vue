<template xmlns:v-el="http://www.w3.org/1999/xhtml">
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <!--在使用vue做开发的时候,如果需要和原生的一些js库做交互的时候,
      有以下步骤:
      1.使用v-el接口
      2.用访问原生DOM的方式进行访问.
      3.注意操作DOM的话,在this.$nextTick这个接口的回调中操作
      -->
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}"
            @click="selectMenu($index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  const ERR_OK = 0;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
//            console.log(i);
            return i;
          }
        }
        return 0;
      }
    },
    created () {
      this.$http.get('api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods: {
      selectMenu(index, event) {
//          console.log(event);
        if (!event._constructed) {
          return;
          // BScroll派发的事件会有这个属性.如果是浏览器派发的事件的时候,return
        }
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
//        console.log(index);
      },
      // 使用better-scroll库
      _initScroll() {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          // 实时监听位置
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
//            let scroollY;
//          console.log(pos);
          this.scrollY = Math.abs(Math.round(pos.y));
//            console.log(scrollY);
        });
      },
      _calculateHeight() {
        let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
//        console.dir(foodList);
//        console.log(foodList.length);
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-heightL: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background-color: #ffffff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
          .text
            font-size: 10px
            line-height: 10px
        .text
          display: table-cell
          width: 56px
          border-1px(rgba(7, 17, 27, .1))
          vertical-align: middle
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background-color: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            line-height: 10px
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              color: rgb(147, 153, 159)
</style>
