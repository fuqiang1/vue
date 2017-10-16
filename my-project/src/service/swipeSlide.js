/**
 * swipeSlide
 * http://ons.me/500.html
 * 西门
 * 3.4.4(160909)
 */
import $ from 'zepto'
var swiper = {
    // 判断IE
    _distance: 50,
    browser: {
      ie10 : window.navigator.msPointerEnabled,
      ie11 : window.navigator.pointerEnabled
    },
    // 触摸事件
    events: ['touchstart','touchmove','touchend'],
    // 检测
    support: {
      // 触摸
      touch: (window.Modernizr && Modernizr.touch === true) || (function () {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
      })()
    },

    // 判断浏览器
    // if (browser.ie10) events = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
    // if (browser.ie11) events = ['pointerdown', 'pointermove', 'pointerup'];

    // 触摸赋值
    touchEvents: {
      touchStart: 'touchstart',
      touchMove: 'touchmove',
      touchEnd: 'touchend'
    },
    // 初始化
    init: function(options){
        var me = this;
        me.$el = $('#slideBanner')
        console.log(me.$el.children('ul'))
        me.opts = $.extend({}, {
            ul : me.$el.children('ul'),             // 父dom
            li : me.$el.children().children('li'),  // 子dom
            index : 0,                              // 轮播初始值
            continuousScroll : false,               // 连续滚动
            autoSwipe : true,                       // 自动切换
            speed : 4000,                           // 切换速度
            axisX : true,                           // X轴
            transitionType : 'ease',                // 过渡类型
            lazyLoad : false,                       // 图片懒加载
            firstCallback : function(){},           // 页面加载回调
            callback : function(){}                 // 每次滚动回调
        }, options);
        me._index = me.opts.index;
        // 轮播数量
        me._liLength = me.opts.li.length;
        me.isScrolling;

        // 回调
        me.opts.firstCallback(me._index,me._liLength,me.$el);

        // 如果轮播小于等于1个，跳出
        if(me._liLength <= 1){
            if(me.opts.lazyLoad) fnLazyLoad(me, 0);
            return false;
        }

        // 连续滚动，复制dom
        if(me.opts.continuousScroll) me.opts.ul.prepend(me.opts.li.last().clone()).append(me.opts.li.first().clone());

        // 懒加载图片
        if(me.opts.lazyLoad){
            fnLazyLoad(me, me._index);
            if(me.opts.continuousScroll){
                fnLazyLoad(me, me._index+1);
                fnLazyLoad(me, me._index+2);
                // 如果是第一屏
                if(me._index == 0){
                    fnLazyLoad(me, me._liLength);
                // 如果是最后一屏
                }else if(me._index+1 == me._liLength){
                    fnLazyLoad(me, 1);
                }
            }else{
                // 如果不连续滚动
                if(me._index == 0){
                    fnLazyLoad(me, me._index+1);
                }else if(me._index+1 == me._liLength){
                    fnLazyLoad(me, me._index-1);
                }else{
                    fnLazyLoad(me, me._index+1);
                    fnLazyLoad(me, me._index-1);
                }
            }
        }
        
        // 获取轮播宽度
        function fnGetSlideDistance(){
          var $li = me.opts.ul.children();
          me._slideDistance = me.opts.axisX ? me.opts.ul.width() : me.opts.ul.height();
          // 定位
          swiper.fnTransition(me, me.opts.ul, 0);
          swiper.fnTranslate(me, me.opts.ul, -me._slideDistance*me._index);
          swiper.fnTransition(me, $li, 0);
          var num = me.opts.continuousScroll ? -1 : 0;
          $li.each(function(i){
              swiper.fnTranslate(me, $(this), me._slideDistance*(i+num));
          });
        }

        // 轮播的宽度
        fnGetSlideDistance();

        if(this.browser.ie10 || this.browser.ie11){
            // IE触控
            var action = '';
            if(me.opts.axisX){
                action = 'pan-y';
            }else{
                action = 'none';
            }
            me.$el.css({'-ms-touch-action':action,'touch-action':action});

            // 解决IE滑动触发click
            me.$el.on('click',function(){
                return me.allowSlideClick;
            });
        }

        // 调用轮播
        swiper.fnAutoSlide(me);

        // 绑定触摸
        me.$el.on(swiper.touchEvents.touchStart,function(e){
            swiper.fnTouches(e);
            swiper.fnTouchstart(e, me);
        });
        me.$el.on(swiper.touchEvents.touchMove,function(e){
            swiper.fnTouches(e);
            swiper.fnTouchmove(e, me);
        });
        me.$el.on(swiper.touchEvents.touchEnd,function(){
            swiper.fnTouchend(me);
        });
        me.opts.ul.on('webkitTransitionEnd MSTransitionEnd transitionend',function(){
            swiper.fnAutoSlide(me);
        });

        // 横竖屏、窗口调整
        $(window).on('onorientationchange' in window ? 'orientationchange' : 'resize',function(){
          clearTimeout(me.timer);
          me.timer = setTimeout(fnGetSlideDistance,150);
        });
    },

    // css过渡
    fnTransition: function(me, dom, num){
      dom.css({
        '-webkit-transition':'all '+num+'s '+me.opts.transitionType,
        'transition':'all '+num+'s '+me.opts.transitionType
      });
    },

    // css位移
    fnTranslate: function(me, dom, distance){
        var result = me.opts.axisX ? distance+'px,0,0' : '0,'+distance+'px,0';
        dom.css({
            '-webkit-transform':'translate3d('+result+')',
            'transform':'translate3d('+result+')'
        });
    },

    // 懒加载图片
    fnLazyLoad: function(me, index){
        var $li = me.opts.ul.children();
        var $thisImg = $li.eq(index).find('[data-src]');
        if($thisImg){
            $thisImg.each(function(i){
                var $this = $(this);
                if($this.is('img')){
                    $this.attr('src',$this.data('src'));
                    $this.removeAttr('data-src');
                }else{
                    $this.css({'background-image':'url('+$this.data('src')+')'});
                    $this.removeAttr('data-src');
                }
            });
        }
    },

    // touches
    fnTouches: function(e){
        if(swiper.support.touch && !e.touches){
            e.touches = e.originalEvent.touches;
        }
    },

    // touchstart
    fnTouchstart: function(e, me){
        me.isScrolling = undefined;
        me._moveDistance = me._moveDistanceIE = 0;
        // 按下时的坐标
        me._startX = swiper.support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
        me._startY = swiper.support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
    },

    // touchmove
    fnTouchmove: function(e, me){
        // 如果自动切换，move的时候清除autoSlide自动轮播方法
        if(me.opts.autoSwipe) this.fnStopSlide(me);
        me.allowSlideClick = false;
        // 触摸时的坐标
        me._curX = swiper.support.touch ? e.touches[0].pageX : (e.pageX || e.clientX);
        me._curY = swiper.support.touch ? e.touches[0].pageY : (e.pageY || e.clientY);
        // 触摸时的距离
        me._moveX = me._curX - me._startX;
        me._moveY = me._curY - me._startY;
        // 优化触摸禁止事件
        if(typeof me.isScrolling == 'undefined'){
            if(me.opts.axisX){
                me.isScrolling = !!(Math.abs(me._moveX) >= Math.abs(me._moveY));
            }else{
                me.isScrolling = !!(Math.abs(me._moveY) >= Math.abs(me._moveX));
            }
        }
        
        // 距离
        if(me.isScrolling){
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            // 触摸时跟手
            swiper.fnTransition(me, me.opts.ul, 0);
            me._moveDistance = me._moveDistanceIE = me.opts.axisX ? me._moveX : me._moveY;
        }
        if(!me.opts.continuousScroll){
            // 如果是第一屏，并且往下滚动，就不让滚动 || 如果是最后一屏，并且往上滚动，就不让滚动
            if(me._index == 0 && me._moveDistance > 0 || (me._index + 1) >= me._liLength && me._moveDistance < 0){
                me._moveDistance = 0;
            }
        }
        // 触摸时跟手滚动
        swiper.fnTranslate(me, me.opts.ul, -(me._slideDistance * me._index - me._moveDistance));
    },

    // touchend
    fnTouchend: function(me){
        if(me.opts.autoSwipe){
          swiper.fnAutoSlide(me);
        }

        // 解决IE滑动触发click
        if(this.browser.ie10 || this.browser.ie11){
          if(Math.abs(me._moveDistanceIE) < 5){
              me.allowSlideClick = true;
          }
          setTimeout(function(){
              me.allowSlideClick = true;
          },100);
        }

        // 距离小
        if(Math.abs(me._moveDistance) <= me._distance){
            swiper.fnSlide(me, '', '.3');
        // 距离大
        }else{
            // 手指触摸上一屏滚动
            if(me._moveDistance > me._distance){
                swiper.fnSlide(me, 'prev', '.3');
            // 手指触摸下一屏滚动
            }else if(Math.abs(me._moveDistance) > me._distance){
                swiper.fnSlide(me, 'next', '.3');
            }
        }
        me._moveDistance = me._moveDistanceIE = 0;
    },

    // 自动轮播
    fnAutoSlide: function(me){
        if(me.opts.autoSwipe){
            this.fnStopSlide(me);
            me.autoSlide = setInterval(function(){
                swiper.fnSlide(me, 'next', '.3');
            },me.opts.speed);
        }
    },

    // 停止轮播
    fnStopSlide: function(me){
        clearInterval(me.autoSlide);
    },

    // 指定轮播
    goTo: function(i){
        var me = this;
        swiper.fnSlide(me, i, '.3');
    },

    // 轮播方法
    fnSlide: function(me, go, num){
        // 判断方向
        if(typeof go === 'number'){
            me._index = go;
            // 加载当前屏、前一屏、后一屏
            if(me.opts.lazyLoad){
                // 因为连续滚动，复制dom，所以要多加1
                if(me.opts.continuousScroll){
                    fnLazyLoad(me, me._index);
                    fnLazyLoad(me, me._index+1);
                    fnLazyLoad(me, me._index+2);
                }else{
                    fnLazyLoad(me, me._index-1);
                    fnLazyLoad(me, me._index);
                    fnLazyLoad(me, me._index+1);
                }
            }
        }else if(go == 'next'){
            me._index++;
            if(me.opts.lazyLoad){
                if(me.opts.continuousScroll){
                    fnLazyLoad(me, me._index+2);
                    // 滑到最后一屏
                    if(me._index+1 == me._liLength){
                        fnLazyLoad(me, 1);
                    // 最后一屏，继续往后滑动
                    }else if(me._index == me._liLength){
                        fnLazyLoad(me, 0);
                        fnLazyLoad(me, 2);
                    }
                }else{
                    fnLazyLoad(me, me._index+1);
                }
            }
        }else if(go == 'prev'){
            me._index--;
            if(me.opts.lazyLoad){
                if(me.opts.continuousScroll){
                    fnLazyLoad(me, me._index);
                    // 滑到第一屏
                    if(me._index == 0){
                        fnLazyLoad(me, me._liLength);
                    
                    // 第一屏，继续往前滑动
                    }else if(me._index < 0){
                        fnLazyLoad(me, me._liLength-1);
                    }
                }else{
                    fnLazyLoad(me, me._index-1);
                }
            }
        }
        // 如果是连续滚动
        if(me.opts.continuousScroll){
            if(me._index >= me._liLength){
                swiper.fnScroll(me, num);
                me._index = 0;
                setTimeout(function(){
                    swiper.fnScroll(me, 0);
                    return;
                },300);
            }else if(me._index < 0){
                swiper.fnScroll(me, num);
                me._index = me._liLength-1;
                setTimeout(function(){
                    swiper.fnScroll(me, 0);
                    return;
                },300);
            }else{
                swiper.fnScroll(me, num);
            }
        }else{
            if(me._index >= me._liLength){
                me._index = 0;
            }else if(me._index < 0){
                me._index = me._liLength-1;
            }
            swiper.fnScroll(me, num);
        }
        // 如果第二个参数为空，就不回调
        if(arguments[1] !== ''){
            me.opts.callback(me._index,me._liLength,me.$el);
        }
    },

    // 轮播动作
    fnScroll: function(me, num){
        swiper.fnTransition(me, me.opts.ul, num);
        swiper.fnTranslate(me, me.opts.ul, -me._index*me._slideDistance);
    }

}
export {swiper}