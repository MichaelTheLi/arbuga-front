// @ts-ignore
import { defineStore } from "pinia";
import type { Ref, UnwrapRef } from "vue";
import { ref, unref } from "vue";

export interface User {
  id: string;
  name: string;
  login: string | null | undefined;
}

export interface UserState {
  user: Ref<UnwrapRef<User> | null | undefined>;
  changeUser: (newUser: UnwrapRef<User> | Ref<UnwrapRef<User>>) => void;
}

export const useUserStore = defineStore("user", (): UserState => {
  const user = ref(null as User | null);

  const changeUser = (
    newUser: User | Ref<User> | Ref<UnwrapRef<User>> | UnwrapRef<User>
  ) => {
    user.value = unref(newUser as Ref<UnwrapRef<User>>);
  };

  return {
    user,
    changeUser,
  };
});
