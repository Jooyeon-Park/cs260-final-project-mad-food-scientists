<template>
<div class="recipesView">
  <div><h1>Recipes</h1>
  <photoGrid :recipes="recipes" />
  </div>

  <p v-if="error">{{error}}</p>
</div>
</template>


<script>
import axios from 'axios';
import PhotoGrid from '@/components/PhotoGrid.vue';

export default {
  name: 'RecipesView',
  components: {
    PhotoGrid
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
      this.getRecipes();
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes/all");
        this.recipes = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  }

}
</script>

<style>

</style>