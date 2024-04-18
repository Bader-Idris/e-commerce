<template>
  <div class="nav">
    <div class="container">
      <AppLink id="logo" to="/">Logo</AppLink>
      <ul>
        <AppLink v-for="destination in destinations" :key="destination.id"
          :to="{ name: 'destination.show', params: { id: destination.id, slug: destination.slug } }">
          {{ destination.name }}
        </AppLink>
      </ul>
      <!-- <AppLink :to="{ name: 'protected' }">Dashboard</AppLink> -->
      <div class="cart">
        <i class="far fa-shopping-cart"></i>
      </div>
      <!-- <AppLink to="https://vueschool.io">Vue School</AppLink> -->
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
export default {
  data() {
    return {
      destinations: sourceData.destinations
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  .container {
    @media (min-width: 787px) {//! do more media
      width: 70%;
    }
    position: relative;

    display: flex;
    justify-content: space-evenly;
    align-content: center;
    flex-wrap: wrap;
    align-items: center;
    ul > a {
      margin: 10px;
      color: #333;
    }
    .cart {
      margin: 10px;
      padding: 20px;
      i.purple {
        color: #9c27b0;
      }
    }
  }
  width: 100%;
  height: 70px;
  background: #f0f6ff;
  
}
#logo {
  background-color: #007acc;
  color: white;
  padding: 20px;
  margin: 5px;
  border-radius: 4px;
  border-color: none;
}
</style>