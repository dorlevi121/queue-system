import { AuthState } from "./auth.types";

export const initialAuthState: AuthState = {
    error: "",
    loading: false,
    isSignIn: false,
    isAdmin: false
}