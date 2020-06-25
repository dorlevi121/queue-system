import { AuthDomainState } from "./auth-domain.types";

export const initialAuthDomainState: AuthDomainState = {
    error: "",
    loading: false,
    isSignIn: false,
}