<template>
  <div class="Helps">
            <h3>Share here</h3>
        <form class="pure-form" v-if="user" @submit.prevent="addHelps">
        <fieldset>
            <textarea v-model="help" placeholder="What random recipe did you get / try?"></textarea>
            <button class="pure-button pure-button-primary submit" type="submit">Submit</button>
         </fieldset>
        </form>
        <p v-else>You are not logged in. Please log in to share the recipe you've got.</p>    

    <div class="helps" v-for="help in helps" v-bind:key="help._id">
       <hr><p><b>*Username: {{help.user.username}}</b> ---- {{formatDate(help.created)}}<br>
        {{help.help}}<br></p>
    </div>    
        
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'Helps',
  data(){
    return{
      help: '',
      helps: []
    }
  },
  async created() {
    await this.getHelps();  
  },

  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    //Create
      async addHelps() {
      try {
        await axios.post("/api/helps/" + this.$route.params.id, {
          help: this.help
        });
        this.help = "";
        await this.getHelps();
        return true;
      } catch (error) {
        console.log(error);
      }
    },  
    //Load
      async getHelps() {
      try {
        let response = await axios.get("/api/helps/" + this.$route.params.id);
        this.helps = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },      
  },

  computed: {
    // to check if user is logged in
    user() {
      return this.$root.$data.user;
    }
  }  
}
</script>

<style scooped>
.pure-button{
  background-color: #123c69;
}
</style>