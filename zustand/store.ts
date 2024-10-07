import { create } from "zustand";

type useLogInModalStoreType = {
  isClickedLogInModalButton: boolean;
  toggleLogInModal: () => void;
};

export const useLogInModalStore = create<useLogInModalStoreType>((set) => ({
  isClickedLogInModalButton: false,
  toggleLogInModal: () =>
    set((state) => ({
      isClickedLogInModalButton: !state.isClickedLogInModalButton,
    })),
}));

type useAuthStoreType = {
  isLoggedIn: boolean;
  currentUserId: string | null;
  setIsLoggedIn: () => void;
  setCurrentUserId: (loggedInUserId: string | null) => void;
};

export const useAuthStore = create<useAuthStoreType>((set) => ({
  isLoggedIn: false,
  currentUserId: null,
  setIsLoggedIn: () =>
    set((state) =>
      state.currentUserId ? { isLoggedIn: true } : { isLoggedIn: false }
    ),
  setCurrentUserId: (loggedInUserId) => set({ currentUserId: loggedInUserId }),
}));
