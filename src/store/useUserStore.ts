import axios from "axios";
import { create } from "zustand";

interface User {
  name: string;
  email: string;
  avatar: string;
  id: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/user`,
        {
          withCredentials: true,
        }
      );
      set({ user: response.data.user });
    } catch {
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/logout`,
        {
          withCredentials: true,
        }
      );
      set({ user: null });
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      set({ loading: false });
    }
  },

  setUser: (user) => set({ user }),
}));