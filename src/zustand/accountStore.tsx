import { create } from "zustand";

const useAccountStore = create((set) => ({
  user: {
    accountToken: "",
    username: "",
  }
}));

export default useAccountStore  ;
