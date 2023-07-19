import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePostStore = create(
  persist(
    (set) => ({
      posts: [],
      clearUser: () =>
        set({ user: { } }),
    }),
    {
      name: "post-storage", // name of the item in the storage (must be unique)
      partialize: ({ actions, ...rest }: any) => rest,
    }
  )
);

export default usePostStore;
