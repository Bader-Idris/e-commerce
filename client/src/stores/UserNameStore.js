import { defineStore } from "pinia";

export const useUserStore = defineStore(
  {
    id: "user",
    state: () => ({
      name:
        localStorage.getItem(
          "userName"
        ) || "",
    }),
    actions: {
      setName(name) {
        this.name = name;
        localStorage.setItem('userName', name);
      },
      clearName() {
        this.name = '';
        localStorage.removeItem('userName');
      }
    }
  }
);