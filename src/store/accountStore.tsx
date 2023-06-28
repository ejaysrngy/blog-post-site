import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAccountStore = create(
  persist(
    (set) => ({
      user: {
        email: "",
        username: "",
        accountToken: "",
      },
      setUser: (payload: {
        email: string;
        username: string;
        accessToken: string;
      }) =>
        set({
          user: {
            email: payload.email,
            username: payload.username,
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
