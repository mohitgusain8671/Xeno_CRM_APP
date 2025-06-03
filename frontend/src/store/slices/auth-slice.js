
import { LOGOUT, USER_ROUTES } from '../../utils/constants';
import { apiClient } from '../../lib/api-client';

export const createAuthSlice = (set, get) => ({
    userInfo: null,
    isAuthenticated: false,
    authLoading: true,
    setUserInfo: (userInfo) => set({ userInfo, isAuthenticated: !!userInfo, authLoading: false }),
    fetchUserInfo: async () => {
        try {
            const res = await apiClient.get(USER_ROUTES, {
                withCredentials: true,
            })
            if(res.status === 200) {
                set({ userInfo: res.data.user, isAuthenticated: true, authLoading: false });
            } else {
                set({ userInfo: null, isAuthenticated: false, authLoading: false });
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            set({ userInfo: null, isAuthenticated: false, authLoading: false });
        }
    },
    logout: async () =>{
        try {
            const res = await apiClient.get(LOGOUT, {
                withCredentials: true,
            });
            if (res.status === 200) {
                set({ userInfo: null, isAuthenticated: false });
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
});