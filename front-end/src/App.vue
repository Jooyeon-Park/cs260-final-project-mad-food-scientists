<template>
  <div id="app">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <header id="header">
      <div class = "title">
      <router-link to="/"><div class ="logo"><img src="/images/logo.png" width="30%"></div></router-link>
      <div class = "name"><p>Mad Food Scientists</p></div>
      </div>
    <nav>    
      <div class = navBar>
        <ul><b>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/random">Random</router-link></li>

          <div v-if="user"><!--Exclusive Hidden Menu-->
            <li><router-link to="/recipes">Recipes</router-link></li>
            <li style="float:right"><router-link to="/mypage">My Page</router-link></li>
          </div>
          <div v-else>
            <li style="float:right"><router-link to="/mypage">Log in / Register</router-link></li></div>
        </b></ul>
      </div>
    </nav>
    </header>

    <router-view />
    <br><br><hr>

    <footer>
      <p class="copyright">
      <a href = "https://github.com/Jooyeon-Park/cs260-mad-food-scientists"> https://github.com/Jooyeon-Park/cs260-creative-project</a>
      <br>Time Spent: 30hrs<br>Jooyeon Park © 2021<br></p>
    </footer>  
  </div>
</template>

<script>
export default {
    computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
<style scoped>

footer{
  padding: 5%;
}
#app{
  background-color:#eee2dc;
  padding: 0% 3%;
}
.logo{
 text-align: center;
}
.name{
color: #ac3b61;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #edc7b7;
  /*position: fixed; #ac3b61 red   #123c69 blue*/
  top: 0;
  width: 100%;
}

li {
  float: left;
}

li a {
  display: block;
  color: #ac3b61;
  text-align: center;
  padding: 14px 8px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #bab2b5;
  color: #123c69;
}

.active {
  background-color: #04AA6D;
}
.title{
  padding: 1%;
  text-align: center;
}
.right{
  text-align: right;
}
.now{
  text-align: center;
  color: #123c69;
}

@media only screen and (min-width: 768px) {
  /* For desktop: */
  #app{
    padding: 0% 8%;
  }
 .logo{
   width: 50%;
   padding-left: 25%;
   text-align: center;
 }
 .name{
   font-size: 1.7em;
 }
}

hr{
  width: 50%;
  text-align: center;
}
.copyright{
  padding: 3% 0%;
  text-align: center;
}

</style>

