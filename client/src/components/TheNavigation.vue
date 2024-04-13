<template>
  <div id="nav">
    <AppLink id="logo" to="/">Logo</AppLink>
    <!-- <AppLink v-for="destination in destinations" :key="destination.id"
      :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }">
      {{ destination.name }}
    </AppLink> -->
    <AppLink :to="{ name: 'protected' }">Dashboard</AppLink>
    <!-- <AppLink to="https://vueschool.io">Vue School</AppLink> -->
  </div>
</template>

<script>
// import sourceData from '@/data.json'
export default {
  data() {
    return {
      // destinations: sourceData.destinations
    }
  }
}
</script>

<style lang="scss" scoped>
#logo {
  background-color: #007acc;
  color: white;
  padding: 20px;
  margin: 5px;
  border-radius: 4px;
  border-color: none;
}
</style>