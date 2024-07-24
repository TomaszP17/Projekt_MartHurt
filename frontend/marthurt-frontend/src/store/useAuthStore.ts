import {create} from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  user: any;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  initialize: (userData: any) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (token: string) => {
    set({ token });
    Cookies.set('token', token, { secure: true, sameSite: 'strict' });
  },
  logout: () => {
    set({ user: null, token: null });
    Cookies.remove('token');
  },
  initialize: (userData: any) => {
    set({ user: userData });
  },
}));

export default useAuthStore;
