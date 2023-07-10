import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAccountStore = create(
  persist(
    (set) => ({
      user: {
        uid: "",
        email: "",
        username: "",
        userAvatar: "",
        accountToken: "",
      },
      setUser: (payload: {
        uid: string;
        email: string;
        username: string;
        userAvatar: string;
        accessToken: string;
      }) =>
        set({
          user: {
            uid: payload.uid,
            email: payload.email,
            username: payload.username,
            userAvatar: payload.userAvatar,
            accessToken: payload.accessToken,
          },
        }),
      clearUser: () =>
        set({ user: { } }),
    }),
    {
      name: "account-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: ({ actions, ...rest }: any) => rest,
    }
  )
);

export default useAccountStore;
