<template>
  <div id="app">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
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
body, ul, li, h1, h2, h3, h4, h5, h6, p, form, dl, dt, dd { 
margin: 0px; 
padding: 0px; 
font-size: 12px; 
font-weight: normal; }
img{max-width: 100%;}
ul { list-style: none; }
img { border-style: none; }
</style>