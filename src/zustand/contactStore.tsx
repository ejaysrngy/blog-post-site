import { create } from "zustand";

const useContactStore = create((set) => ({
  notification: {
    text: "",
    status: false,
  },
  loading: false,
  sendFeedback: async (payload: any) => {
    const { email, name, message } = payload;
    const response = await fetch("/api/contact/send-message", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        name: name,
        message: message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      set({
        notification: {
          text: "Failed to send. Please try again",
          status: true,
        },
      });
    } else {
      set({
        notification: {
          text: "Thank you for your feedback!",
          status: true,
        },
      });
    }
  },
  closeNotif: () => set({ notification: { text: "", status: false } }),
}));

export default useContactStore;
