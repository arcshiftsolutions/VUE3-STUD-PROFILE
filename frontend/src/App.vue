<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
.q-layout {
  font-family: 'BCSans', Verdana, Arial, sans-serif !important;
}

.top-banner{
  background-size: cover;
  align-items: center;
  display: flex;
}
.full-height{
  height: 100%;
}
</style>
