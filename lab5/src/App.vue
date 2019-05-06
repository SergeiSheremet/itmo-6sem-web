<template>
  <div id="app">
    <DocumentComponent/>
  </div>
</template>

<script>
import DocumentComponent from './components/DocumentComponent.vue'
export default {
  name: 'app',
  components: {
    DocumentComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>