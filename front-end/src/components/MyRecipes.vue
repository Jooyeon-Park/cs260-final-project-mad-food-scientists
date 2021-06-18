<template>
<div class="main">
    <h1>My Page</h1>
      <h3>Logged in as {{user.username}}</h3>
      <!--Greetings-->
      <p>Hi there! Are you thinking of {{user.favorite}} now? Yum.<br>
      We hope you could have it sometime soon!<br></p>

  <div class="menu">
    <p><a @click="toggleUpload"><button class="pure-button pure-button-primary button1" @click.prevent="register">Upload a Recipe</button></a></p>
    <a @click="logout"><button class="pure-button pure-button-primary button2" @click.prevent="register">Log Out</button></a>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <hr>
  <h3>My Requests</h3>
  <photoGrid :recipes="recipes" />
  <p v-if="error">{{error}}</p>
</div>
</template>


<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import PhotoGrid from '@/components/PhotoGrid.vue';

export default {
  name: 'MyRecipes',
    components: {
    Uploader,
    PhotoGrid
  },
  data() {
    return {
      show: false,
      recipes: [],
      error: '',
        
    }
  },  

  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  async created(){
    await this.getRecipes();
  },
  
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getRecipes() {
      try {
        this.response = await axios.get("/api/recipes");
        this.recipes = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
     async uploadFinished() {
      this.show = false;
      this.getRecipes();
    },
  close() {
    this.show = false;
  },
    toggleUpload() {
    this.show = true;
  },
  },

}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.menu h2 {
  font-size: 14px;
}
.button1{
  background-color: #123c69;
}
.button2{
  background-color: #8a8285;
  margin-top: 16px;
}

</style>

