export type AuthContextType = {
  currentUser: any;
  logout: () => void;
  login: (
    username: string,
    password: string
  ) => Promise<void | { status: number; message: string }> | null; // return response object
  isLoading: boolean;
  updateUserInfo: (payload: {
    displayName?: string;
    username?: string;
    photoUrl?: string;
  }) => Promise<void | { status: number; message: string }> | null;
};

export type UpdateUserInfoTypes = {
  displayName?: string;
  username?: string;
  photoUrl?: string;
};
