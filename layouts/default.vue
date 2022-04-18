<template>
  <a-layout>
    <a-layout-content>
      <div class="container">
        <Nuxt />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>

<style>
.container {
  display: block;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  padding: 30px;
}
</style>
