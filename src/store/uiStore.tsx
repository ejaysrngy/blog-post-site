import { create } from "zustand";

const useUiStore = create((set) => ({
  notification: {
    text: "",
    status: false,
  },

  displayName: "",
  userAvatar: "",
  reauthenticateModalisOpen: false,

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

  openReauthenticateModal: () => set({ reauthenticateModalisOpen: true }),
  closeReauthenticateModal: () => set({ reauthenticateModalisOpen: false }),

  setDisplayName: (name: string) => set({ displayName: name }),

  setUserAvatar: (photoUrl: string) => set({ userAvatar: photoUrl }),
}));

export default useUiStore;
