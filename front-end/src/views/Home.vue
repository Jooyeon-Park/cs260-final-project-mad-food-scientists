<template>
<div class="recipesView">
  <div class="welcome">
 <img src="/images/1.jpg" width="100%">

       <img src="/images/2.jpg" width="100%">
    <p>- Recipes are opened to the members only -</p>
  </div>

  <p v-if="error">{{error}}</p>
</div>
</template>


<script>
import axios from 'axios';
//import PhotoGrid from '@/components/PhotoGrid.vue';

export default {
  name: 'Home',
  components: {
  //  PhotoGrid
  },
    data() {
    return {
      recipes: [],
      error: '',
    }
  },
    async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
}
</script>

<style>
.home{
  padding-top: 10px;
}
.welcome{
  width: 100%;
  text-align: center;
}
</style>