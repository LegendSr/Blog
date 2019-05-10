<template>
  <div class="page">
    <div class="header">
      <div class="frame">
        <ul>
          <li v-for="item in list" @click='tourl(item)' :key="item.title">
            <img v-if="item.imgSrc" :src="item.imgSrc">
            {{item.title}}
            <ul v-if="item.chilren" style="display:none">
                <li v-for="item2 in item.chilren" @click='tourl(item2)' :key='item2.title'>
                  <a v-if="item2.url.indexOf('http')>=0" :href="item2.url" target="_blank">
                  {{item2.title}}
                  </a>
                  <span v-else>{{item2.title}}</span>
                </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="banner">
        <img src="@/assets/banner.jpg" alt="">
        <div>Hi,Welcome to My Blog</div>
    </div>
    <div style="margin-bottom: 100px">
      <slot>
      </slot>
    </div>
    <div class="footer">
        <p>博客已萌萌哒运行<span id="since">{{dateTime}}</span><span class="my-face">(●'◡'●)ﾉ♥</span></p>
        <p>© <span itemprop="copyrightYear">2019</span> 鲁ICP备16000184号.</p>
        <p>Made with <i class="fa fa-heart throb" style="color:#d43f57"></i> by <span class="author" itemprop="copyrightHolder">Sr</span>. </p>
    </div>
    <canvas class="fireworks" ></canvas>
  </div>
</template>
<style lang="scss">
.page {
  width: 100%;
  .banner{
      position: relative;
      font-size: 0;
      img{
          margin-top: -40px;
      }
      div{
        font-size:96px;
        font-family:'blog';
        text-align: center;
        position: absolute;
        width: 100%;
        top:50%;
        background: url('../assets/colorbg.png') no-repeat 0 0 / 100%;
        color: transparent;
        -webkit-background-clip: text;
      }
  }
  .header {
    position: fixed;
    z-index: 10;
    width: 100%;
    top: 0;
    height: 40px;
    line-height: 40px;
    background: rgba(0, 0, 0, 0.5);
    div>ul {
      &>li {
        float: left;
        // margin-right: 50px;
        padding: 0 25px;
        color: #fff;
        font-size: 16px;
        position: relative;
        img {
          max-width: 25px;
          max-height: 25px;
          vertical-align: middle;
        }
      }
      
    }
    
    ul ul{
        background: rgba(0,0,0,.4);
        position: absolute;
        width: 150px;
        left: 0;
        li{
            font-size: 16px;
            text-align: center;
            a{
              color: #fff
            }
        }
    }
    .frame {
      max-width: 1200px;
      margin: 0 auto;
      ul{
        cursor: pointer;
      }
    }
  }
  .footer{
    text-align: center;
    background: #232323;
    color:#888;
    line-height: 1.5;
    padding: 30px 0;
  }
}
.fireworks{
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 99999999;
    pointer-events: none;
}
</style>
<script>
import { request } from "http";
import $ from "jquery";
import anime from 'animejs';
import { constants } from 'crypto';
function setDateTime(){
  var d1 = new Date("2019/05/07");
  var d2 = new Date()
  var date = (parseInt(d2 - d1) / 1000)>>0
  var day = date/60/60/24>>0
  var hour = (date/60/60>>0)%24
  var minute = (date/60>>0)%60
  var seconds = (date)%60
  if(day<10) day="0"+day
  if(hour<10) hour="0"+hour
  if(minute<10) minute="0"+minute
  if(seconds<10) seconds="0"+seconds
  return day+"天"+hour+"时"+minute+"分"+seconds+"秒"
}
export default {
  name: "page",
  components: {},
  data() {
    // var d1 = new Date("1557304090725");
    setInterval(() => {
      this.dateTime=setDateTime()
    }, 1000);
    var t1 = 0;
    var t2 = 0;
    var timer = null;
    return {
      dateTime:setDateTime(),
      list: [
        {
          title: "首页",
          url: "/",
          imgSrc: require("@/assets/food-cake.png")
        },
        {
          title: "抓到我",
          url: "",
          imgSrc: require("@/assets/food-pistachio.png"),
          chilren: [
            {
              title: "GitHub",
              url: "https://github.com/LegendSr"
            }
          ]
        },
        {
          title: "投食",
          imgSrc: require("@/assets/food-pizza.png"),
          url: ""
        },
        {
          title: "留言板",
          imgSrc: require("@/assets/food-popsicle.png"),
          url: ""
        }
      ]
    };
  },
  created(){
      $(()=>{
          $(".header div>ul li").hover(function(){
              $(this).find("ul").stop(true,false).slideDown();
            //   $(this).find("ul").slideDown()
          },function(){
              $(this).find("ul").slideUp()
          })
          this.loadAnm()
      })
  },
  methods:{
      tourl(item){
        console.log(item)
        if(item.chilren) return
        if(item.url && item.url.indexOf("http")<0)
        this.$router.push(item.url)
      },
      loadAnm(){
        function updateCoords(e) {
            pointerX = (e.clientX || e.touches[0].clientX) - canvasEl.getBoundingClientRect().left,
            pointerY = e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top
        }
        function setParticuleDirection(e) {
            var t = anime.random(0, 360) * Math.PI / 180
            , a = anime.random(50, 180)
            , n = [-1, 1][anime.random(0, 1)] * a;
            return {
                x: e.x + n * Math.cos(t),
                y: e.y + n * Math.sin(t)
            }
        }
        function createParticule(e, t) {
            var a = {};
            return a.x = e,
            a.y = t,
            a.color = colors[anime.random(0, colors.length - 1)],
            a.radius = anime.random(6, 20),
            a.endPos = setParticuleDirection(a),
            a.draw = function() {
                ctx.beginPath(),
                ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
                ctx.fillStyle = a.color,
                ctx.fill()
            }
            ,
            a
        }
        function createCircle(e, t) {
            var a = {};
            return a.x = e,
            a.y = t,
            a.color = "#F00",
            a.radius = .1,
            a.alpha = .5,
            a.lineWidth = 6,
            a.draw = function() {
                ctx.globalAlpha = a.alpha,
                ctx.beginPath(),
                ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
                ctx.lineWidth = a.lineWidth,
                ctx.strokeStyle = a.color,
                ctx.stroke(),
                ctx.globalAlpha = 1
            }
            ,
            a
        }
        function renderParticule(e) {
            for (var t = 0; t < e.animatables.length; t++)
                e.animatables[t].target.draw()
        }
        function animateParticules(e, t) {
            for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++)
                n.push(createParticule(e, t));
            anime.timeline().add({
                targets: n,
                x: function(e) {
                    return e.endPos.x
                },
                y: function(e) {
                    return e.endPos.y
                },
                radius: .1,
                duration: anime.random(1200, 1800),
                easing: "easeOutExpo",
                update: renderParticule
            })
            anime.timeline().add({
                targets: a,
                radius: anime.random(80, 160),
                lineWidth: 0,
                alpha: {
                    value: 0,
                    easing: "linear",
                    duration: anime.random(600, 800)
                },
                duration: anime.random(1200, 1800),
                easing: "easeOutExpo",
                update: renderParticule,
                offset: 0
            })
        }
        function debounce(fn, delay) {
            var timer
            return function () {
                var context = this
                var args = arguments
                clearTimeout(timer)
                timer = setTimeout(function () {
                fn.apply(context, args)
                }, delay)
            }
        }

        var canvasEl = document.querySelector(".fireworks");
        if (canvasEl) {
            var ctx = canvasEl.getContext("2d")
            , numberOfParticules = 30
            , pointerX = 0
            , pointerY = 0
            , tap = "mousedown"
            , colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"]
            , setCanvasSize = debounce(function() {
                canvasEl.width = 2 * window.innerWidth,
                canvasEl.height = 2 * window.innerHeight,
                canvasEl.style.width = window.innerWidth + "px",
                canvasEl.style.height = window.innerHeight + "px",
                canvasEl.getContext("2d").scale(2, 2)
            },500)
            , render = anime({
                duration: 1 / 0,
                update: function() {
                    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
                }
            });
            document.addEventListener(tap, function(e) {
                "sidebar" !== e.target.id && "toggle-sidebar" !== e.target.id && "A" !== e.target.nodeName && "IMG" !== e.target.nodeName && (render.play(),
                updateCoords(e),
                animateParticules(pointerX, pointerY))
            }, !1),
            setCanvasSize(),
            window.addEventListener("resize", setCanvasSize, !1)
        }
      }
  }
};

</script>
