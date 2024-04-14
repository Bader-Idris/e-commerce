import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user",
  {
    state: () => ({
      user: JSON.parse(localStorage.getItem("user")) || {}
    }),
    actions: {
      // setName(name) {
      //   this.name = name;
      //   localStorage.setItem("userName",name);
      // },
      // clearName() {
      //   this.name = "";
      //   localStorage.removeItem("userName");
      // },
      setUser(user) {
        localStorage.setItem( "user", JSON.stringify(user)
        );
      },
      clearUser() {
        localStorage.removeItem("user");
      },
    },
  }
);