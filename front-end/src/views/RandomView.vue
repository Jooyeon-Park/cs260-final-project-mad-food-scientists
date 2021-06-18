<template>
<div class="recipesView">
  <div>
    <h1>Random Recipe Generator</h1>
    <div class = "text1">
    <p><br>You don't know what to try today?
      Don't worry! This generator will help you.<br>
      <b>Click Three buttons below.</b><br></p></div>
      <p>*If you have an allergy to a picked ingredient, just presh the button one more time.</p>
    <div class = "random">
      <p><b>(result)<br><br>{{chosenIng}} {{chosenIng2}} {{chosenMethod}}</b><br></p>
      <button class="pure-button pure-button-primary buttons" @click="picker">Ingredient1</button>
      <button class="pure-button pure-button-primary buttons" @click="picker2">Ingredient2</button>
      <button class="pure-button pure-button-primary buttons" @click="picker3">Method</button>
    </div>

    <br><br><h1>Too scared to try?</h1>
    <p><br>Are you interested in trying your random recipe but sacred of being the 1st one to try?<br>
    Other Mad Food Scientists might be willing to try! Share the recipe you've got so that others can try it and let you know how it was.</p>
    <Helps />

  </div>

</div>
</template>


<script>
import axios from 'axios';
import Helps from '@/components/Helps.vue';
export default {
 name: 'random',
  data() {
    return{
    list: ['salmon','kiwi','peach','orange','lettuce','pineapple'],
    list2: ['burger','cake','sandwich','rice','ramen noodle','cookie dough'],
    list3: ['bake','fry','steam','boil','stir-fry','just eat'],
    chosenIng: '',
    chosenIng2: '',
    chosenMethod: '',
    comments: []
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
  components:{
  //  Comments,
    Helps
  },
  methods: {
    picker(){
      var chosenNumber = Math.floor(Math.random() * this.list.length);
      this.chosenIng = 'Mix ' + this.list[chosenNumber];
    },
    picker2(){
      var chosenNumber2 = Math.floor(Math.random() * this.list2.length);
      this.chosenIng2 = 'and ' + this.list2[chosenNumber2];
    },
    picker3(){
      var chosenNumber3 = Math.floor(Math.random() * this.list3.length);
      this.chosenMethod = 'then ' + this.list3[chosenNumber3];
    },
  },
}

</script>

<style scooped>
.buttons{
  margin: 5px 5px;
}
.random{
  padding: 3% 0%;
  text-align: center;
  background-color: #bab2b5;
}
.recipesView{
  padding: 0% 3%;
}

@media only screen and (min-width: 768px) {
  .recipesView{
    padding: 3% 5%;
  }

  .random{
    width: 45%;
    text-align: left;
    padding: 3% 5%;
  }
}
</style>