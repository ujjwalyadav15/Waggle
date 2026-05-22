'use client';
const { useRouter } = require("next/navigation");
const { createContext, useState, useContext, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        router.replace('/login');
    }

    return <AppContext.Provider value={{ loggedIn, setLoggedIn, logout }} >
        {children}
    </AppContext.Provider>

}

const UseAppContext = () => useContext(AppContext);

export default UseAppContext;