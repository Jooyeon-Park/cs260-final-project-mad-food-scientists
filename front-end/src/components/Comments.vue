<template>
<!--Comments for Recipe Page.vue-->
  <div class="Comments">
    <h3>Comments</h3>
      <form class="pure-form" v-if="user" @submit.prevent="addComments">
        <fieldset>
          <textarea v-model="comment" placeholder="comment here"></textarea>
          <button class="pure-button pure-button-primary submit" type="submit">Submit</button>
        </fieldset>
      </form>  

    <div class="comments" v-for="comment in comments" v-bind:key="comment._id">
       <hr><p><b>*Username: {{comment.user.username}}</b> ---- {{formatDate(comment.created)}}
        <br>{{comment.comment}}<br></p>
    </div>    
        
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'Comments',
  data(){
    return{
      comment: '',
      comments: []
    }
  },
  async created() {
    await this.getComments();  
  },

  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    //Add Comments
      async addComments() {
      try {
        await axios.post("/api/comments/" + this.$route.params.id, {
          comment: this.comment
        });
        this.comment = "";
        await this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },  
    //Load Comments
      async getComments() {
      try {
        let response = await axios.get("/api/comments/" + this.$route.params.id);
        this.comments = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },      
  },

  // to check if user is logged in
  computed: {
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
.submit{
  margin-left: 10px;
}
</style>