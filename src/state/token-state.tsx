"use client";

import { createContext, useContext, useReducer } from "react";

type Action =
    { type: "setToken"; payload: string }
    | { type: "clearToken" };
type Dispatch = (action: Action) => void;
export type State = { token: string | null };
type AuthProviderProps = { children: React.ReactNode; initialToken?: string | null };

const AuthStateContext = createContext<
    { state: State; dispatch: Dispatch } | undefined
>(undefined);

function authReducer(state: State, action: Action) {
    switch (action.type) {
        case "setToken": {
            return { token: action.payload };
        }
        case "clearToken": {
            return { token: null };
        }
        default: {
            throw new Error(`Unhandled action type: `);
        }
    }
}

function AuthProvider({ children, initialToken= null }: AuthProviderProps) {
    const [state, dispatch] = useReducer(authReducer, { token: initialToken });

    const value = { state, dispatch };
    return (
        <AuthStateContext.Provider value={value}>
            {children}
        </AuthStateContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthProvider, useAuth };
