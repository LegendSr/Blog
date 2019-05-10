<template>
  <div id="app">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <transition name="bounce" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.4s;
}
.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
body{
  width: 100%;
}
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body, ul, li, p, form, dl, dt, dd { 
margin: 0px; 
padding: 0px; 
font-size: 12px; 
font-weight: normal; }
img{max-width: 100%;}
ul { list-style: none; }
img { border-style: none; }
@font-face{
    font-family: 'blog';
    src : url('./assets/Intruding-Cat-2.otf');
}
</style>