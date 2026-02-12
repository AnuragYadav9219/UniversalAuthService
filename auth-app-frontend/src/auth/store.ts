import type LoginData from "@/models/LoginData";
import type User from "@/models/User";
import { loginUser, logoutUser } from "@/services/AuthService";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";

type AuthState = {
    accessToken: string | null;
    user: User | null;
    authStatus: boolean;
    authLoading: boolean;

    login: (data: LoginData) => Promise<void>;
    logout: (silent?: boolean) => Promise<void>;
    checkLogin: () => boolean;

    changeLocalLoginData: (
        accessToken: string,
        user: User,
        authStatus: boolean,
        authLoading: boolean
    ) => void;

    updateUser: (user: User) => void;
};

const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            user: null,
            authStatus: false,
            authLoading: false,

            login: async (loginData) => {
                set({ authLoading: true });

                try {
                    const res = await loginUser(loginData);

                    set({
                        accessToken: res.accessToken,
                        user: res.user,
                        authStatus: true,
                        authLoading: false,
                    });
                } catch (error) {
                    set({ authLoading: false });
                    throw error;
                }
            },

            logout: async (silent = false) => {
                set({ authLoading: true });

                try {
                    if (!silent) {
                        await logoutUser();
                    }
                } catch (error) {
                    console.error("Logout error:", error);
                } finally {
                    set({
                        accessToken: null,
                        user: null,
                        authStatus: false,
                        authLoading: false,
                    });
                }
            },

            checkLogin: () =>
                Boolean(get().accessToken && get().authStatus),

            changeLocalLoginData: (accessToken, user, authStatus, authLoading) => {
                set({
                    accessToken,
                    user,
                    authStatus,
                    authLoading
                })
            },

            updateUser: (updatedUser) =>
                set(() => ({
                    user: updatedUser,
                })),
        }),
        {
            name: LOCAL_KEY,
            partialize: (state) => ({
                accessToken: state.accessToken,
                user: state.user,
                authStatus: state.authStatus,
            }),
        }
    )
);


export default useAuth;
