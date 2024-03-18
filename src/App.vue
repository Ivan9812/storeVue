<template>
  <div id="app">
    <Header :user="user" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      user:{},
    };
  }
};
</script>


