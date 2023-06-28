import { create } from "zustand";

const useUiStore = create((set) => ({
  notification: {
    text: "",
    status: false,
  },
  loading: false,
  openNotif: async (payload: { text: string; status: Boolean }) => {
    set({
      notification: {
        text: payload.text,
        status: payload.status,
      },
    });
  },
  closeNotif: () => set({ notification: { text: "", status: false } }),
}));

export default useUiStore;
