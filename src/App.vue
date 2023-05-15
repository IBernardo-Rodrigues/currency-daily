<template>
  <navbar></navbar>
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
}

</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&display=swap');

:root {
  --color-primary: #117A7D; 
  --color-secondary: #1A0D7C; 
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Nunito Sans', sans-serif;
}

</style>