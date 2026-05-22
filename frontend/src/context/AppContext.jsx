'use client';
const { useRouter } = require("next/navigation");
const { createContext, useState, useContext, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [authLoading, setAuthLoading] = useState(true); // true until localStorage is read

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
        setAuthLoading(false); // hydration complete
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        setLoggedIn(false);
        router.replace('/login');
    }

    return <AppContext.Provider value={{ loggedIn, setLoggedIn, logout, authLoading }}>
        {children}
    </AppContext.Provider>

}

const UseAppContext = () => useContext(AppContext);

export default UseAppContext;