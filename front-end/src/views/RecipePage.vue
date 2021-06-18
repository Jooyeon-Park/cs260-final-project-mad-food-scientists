<template>
<div class="recipes">

    <div class = "postBar">
      <ul><b>
      <li>{{this.recipe.title}}</li>
      <div class="right">
        <li>{{this.recipe.user.username}} -- {{formatDate(this.recipe.created)}}</li></div>
    </b></ul>
    </div>
    <img :src="recipe.path" />
            <p><b>Ingredients:</b><br>{{this.recipe.ingredients}}<br><br>
            <b>Description:</b><br>{{this.recipe.description}}<br>
            <br>
          <b>This Recipe is provided by {{this.recipe.user.username}}</b><br>
          This mad scientist's favorite food is '{{this.recipe.user.favorite}}' so please let them know if you ever create a recipe of it.

        </p>
    <div v-if="validUser">    
        <span id="dots"></span><span id="more">
      <!--Editing here-->
      <div class="edit">
         Recipe name:<br><textarea class="inputTitle" v-model ="title"></textarea><br><br>
        Ingredients:<br><textarea v-model ="ingredients"></textarea><br><br>
        Descriptions:<br><textarea v-model ="description"></textarea>
        <router-link to="/mypage"><button class="pure-button pure-button-primary editButton" @click="editItem(recipe)">Edit</button></router-link>
      <br><br><br>
    </div>
    </span>

    <button class ="pure-button pure-button-primary" @click="myFunction()" id="myBtn">Edit</button>
    
    <router-link to="/mypage"><button class="pure-button pure-button-primary buttonDelete" @click="delPost">Delete this post</button></router-link> 
  <br><br>
  </div><br><br>
  <Comments />

</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Comments from '@/components/Comments.vue';
export default {
  name: 'Recipes',
  components: {
    Comments,
  },
    data() {
    return {
      title: "",
      recipe: {},
      description: "",
      ingredients: "",
      comments:[],   
    }
  },
    /*Cookie*/
    async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
      this.getRecipe();
    } catch (error) {
      this.$root.$data.user = null;
    }
  },

  methods: {
    async getRecipe() {
      try {
        let response = await axios.get("/api/recipes/"+ this.$route.params.id);       
        this.recipe = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async delPost(){
      try{
        await axios.delete("/api/recipes/" + this.$route.params.id);
      } catch(error) {
        console.log(error);
      }  
    },
    async editItem() {
      try {
        await axios.put("/api/recipes/" + this.$route.params.id, {
          title: this.title,
          ingredients: this.ingredients,
          description: this.description
        });
        return true;
      } catch (error) {
        console.log(error);
      }
    },
     myFunction() {
      var dots = document.getElementById("dots");
      var moreText = document.getElementById("more");
      var btnText = document.getElementById("myBtn");

      if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Edit";
      moreText.style.display = "none";
      } else {
      dots.style.display = "none";
      btnText.innerHTML = "Cancel";
       moreText.style.display = "inline";
    }
    this.title=this.recipe.title;
    this.ingredients=this.recipe.ingredients;
    this.description=this.recipe.description;
  }    
  },
  
  computed: {  
    validUser(){
      if(this.$root.$data.user == undefined)
        return false;

      if (this.$root.$data.user.username == this.recipe.user.username)
        return true;
      return false;
    }

  },

}
</script>

<style scoped>
img{
  width: 100%;
  padding: 0% 0%;
  padding-bottom: 5%;
}
.recipes{
  padding: 5% 4%;
}

.buttonDelete{
  background-color: #ac3b61;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color:  #123c69;
  /*position: fixed; #ac3b61 red   #123c69 blue*/
  top: 0;
  width: 100%;
}

.postBar{
  width: 100%;
  padding-left: 0%;
  color: #eee2dc;
}

li {
  float: left;
  padding-left: 6%;
  width: 40%;
  padding-top: 2%;
  padding-bottom: 2%;

}

.right{
  text-align: right;
  padding: 0% 0%;
}

@media only screen and (min-width: 768px) {
img{
  width: 90%;
  padding: 0% 5%;
  padding-bottom: 5%;
}
.recipes{
  padding: 5% 8%;
}

.postBar{
  width: 90%;
  padding-left: 5%;
}

}
button{
  margin-right: 3%;
}
#more {display: none;}
textarea{
  height: 100px;
  width: 70%;
}
.inputTitle {
  height: 20px;
}
.editButton{
  margin-left: 15px;
  margin-top: -25px;
}
</style>