<template>
<div>
  <section class="photoGrid">
    <div class="image" v-for="recipe in recipes" v-bind:key="recipe._id">
      <router-link :to="{ name: 'recipe', params: { id: recipe._id }}"><img :src="recipe.path" />
          </router-link>
    <div class="thumbnailBox">
      <div class="recipeInfo">
        <p class="recipeTitle"><b>{{recipe.title}}</b></p>
        <p class="recipeName">Uploader:{{recipe.user.username}}</p>
      </div>
      <p class="recipeDate">{{formatDate(recipe.created)}}</p>
    </div>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PhotoGrid',
  props: {
    recipes: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.recipeInfo {
  padding: 0% 8%;
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.recipeInfo p {
  margin: 0px;
}

.recipeDate {
  font-size: 0.7em;
  font-weight: normal;
  padding: 0% 8%;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.photoGrid {
  column-gap: 1em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

.thumbnailBox{
  background-color: #B2BaB5;
  padding: 2%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .photoGrid {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .photoGrid {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .photoGrid {
    column-count: 2;
  }
}
</style>

