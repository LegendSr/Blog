<template>
  <div class="page">
    <div class="header">
      <div class="frame">
        <ul>
          <li v-for="item in list" :key="item.title">
            <img v-if="item.imgSrc" :src="item.imgSrc">
            {{item.title}}
            <ul v-if="item.chilren" style="display:none">
                <li v-for="item2 in item.chilren" :key='item2.title'>{{item2.title}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="banner">
        <img src="@/assets/banner.jpg" alt="">
    </div>
    <slot></slot>
    <div class="footer"></div>
    <canvas class="fireworks" ></canvas>
  </div>
</template>
<style lang="scss">
.page {
    width: 100%;
    .banner{
        font-size: 0;
        img{
            margin-top: -40px;
        }
    }
    .header {
        position: relative;
        z-index: 10;
    width: 100%;
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
        }
    }
    .frame {
      max-width: 1200px;
      margin: 0 auto;
    }
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

export default {
  name: "page",
  components: {},
  data() {
    return {
      list: [
        {
          title: "首页",
          url: "home",
          imgSrc: require("@/assets/food-cake.png")
        },
        {
          title: "抓到我",
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
              console.log() 
              $(this).find("ul").stop(true,false).slideDown();
            //   $(this).find("ul").slideDown()
          },function(){
              $(this).find("ul").slideUp()
          })
          this.loadAnm()
      })
  },
  methods:{
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
