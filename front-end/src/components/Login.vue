<template>
<div class="hero">
  <div class="heroBox">
    <form class="pure-form">

    <form class="pure-form space-above">
      <fieldset>
        <h2>Login</h2>
        <input placeholder="username" v-model="usernameLogin"><br><br>
        <input type="password" placeholder="password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p><br>
    
        <h2>Register for an account</h2><br>
        <router-link to="/">Click here to read about this website</router-link><br><br>
        <div class="register1">
        <fieldset>
          Email Adress: <input placeholder="Email address" v-model="email">
        </fieldset>
      <fieldset>
        Username: <input placeholder="username" v-model="username"><br>
      </fieldset>
      <fieldset>
        Password: <input type="password" placeholder="password" v-model="password">
      </fieldset>
      <fieldset>
        Favorite food: <input placeholder="*What is your favorite food?" v-model="favorite"><br>
      </fieldset></div>
              *Your favorite food will be displayed at your profile section in your post.<br><br>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      email: '',
      favorite: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.email || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          email: this.email,
          favorite: this.favorite,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },

    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.usernameLogin || !this.passwordLogin)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.usernameLogin,
          password: this.passwordLogin,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
        this.$root.$data.user = null;
      }
    },

  }

}
</script>


<style scoped>
.space-above {
  margin-bottom: 50px;
}

h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 50px;
  display: flex;
  justify-content: center;
}

.heroBox {
  text-align: center;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 10px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
.pure-button{
  background-color: #123c69;
}
.register1{
  text-align: right;
  width:70%;
  margin-left: 15%;
}
</style>
