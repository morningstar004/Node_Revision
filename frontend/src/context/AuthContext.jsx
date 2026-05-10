import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user ,setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    return (
        <AuthContext.Provider value = {{ user, login, logout}}>
            {childern}
        </AuthContext.Provider>
    )
}


export const userAuth = () => useContext(AuthContext);