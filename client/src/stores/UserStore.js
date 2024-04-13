import { defineStore } from "pinia";

// defineStore('userStore', {})// "" id store, {state etc}
const useUserSTore =  defineStore('userStore', {
  //useBlabBlab is a naming convention
  state: () => ({
    //! learning 
    tasks: [
      {id: 1, title: "buy some milk", isFav: false},
      {id: 2, title: "play GloomHaven", isFav: true}
    ],
    name: "bader"
    //? when having different type of data, we'd rather create a module for each

  })
})
//! to use these stores in our app, we put them in the setup() of our tended comp

/* 
<script>
import { useUserSTore } from "@/stores/UserStore"
export default {
  setup () {
    const userStore = useUserSTore()
    return { userStore }//to get tended store inside it, we invoke it as normal objs:
  }
}
</script>
*/
//! in template invoke it as: 

/*
<h1>{{ userStore.name }}</h1>
*/

//! check the project folder:
// https://github.com/iamshaunjp/Pinia-with-Vue-3/tree/lesson-10/src

// focus on using props within the comp of TaskDetails