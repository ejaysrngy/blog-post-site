export type AuthContextType = {
  currentUser: any;
  logout: () => void;
  login: (
    username: string,
    password: string
  ) => Promise<void | { status: number; code: string; message: string }> | null; // return response object
  isLoading: boolean;
  updateUserInfo: (payload: {
    displayName?: string;
    username?: string;
    photoUrl?: any
  }) => Promise<void | { status: number; code: string; message: string }> | null;
    photoUrl?: string;
  }) => Promise<void | { status: number; message: string }> | null;
};

export type UpdateUserInfoTypes = {
  displayName?: string;
  username?: string;
  photoUrl?: any
};
