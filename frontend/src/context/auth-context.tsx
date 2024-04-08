import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../@types/user';

interface AuthContextInterface {
    isAuthenticated: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (last_name: string, first_name: string, email: string, password: string) => Promise<boolean>;
    user: User | null;
}

export const AuthContext = createContext<AuthContextInterface>({
    isAuthenticated: false,
    token: null,
    login: async () => false,
    logout: () => {},
    register: async () => false,
    user: null,
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const refreshToken = localStorage.getItem('refreshToken');

        const refresh = async (): Promise<boolean> => {
            try {
                const response = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refresh_token: refreshToken,
                        mode: 'json'
                    })
                });
            
                const json = await response.json();
            
                if (response.ok) {
                    localStorage.setItem('refreshToken', json.data.refresh_token);
                    setToken(json.data.access_token);
                    setIsAuthenticated(true);
                    return true;
                } else {
                    throw new Error('Erreur lors du rafraîchissement du token.');
                }
            } catch (err) {
                console.error(err);
                return false;
            }
        };
        
        if (token) {
            fetchUserDetails(token);
        }
        else if (refreshToken) {
            refresh();
        }
    }, [token]);

    const login = async (email:string, password:string): Promise<boolean> => {
        try {
            const response = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
      
            const json = await response.json();
      
            if (json && json.data.access_token) {
                localStorage.setItem('refreshToken', json.data.refresh_token);
                setToken(json.data.access_token);
                setIsAuthenticated(true);
                return true;
            }
        } 
        catch (err) {
            console.error(err);
        }

        return false;
    };

    const logout = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        try {
          const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });
    
          if (response.ok) {
            localStorage.removeItem('refreshToken');
            setToken(null);
            setIsAuthenticated(false);
            setUser(null);
            return true;
          } 
        } 
        catch (error) {
          console.error('Erreur lors de la déconnexion:', error);
        }

        return false;
    };

    const register = async (last_name: string, first_name: string, email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    last_name,
                    first_name,
                    email,
                    password
                })
            });

            if (response.status === 204) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const fetchUserDetails = async (accessToken: string) => {
        try {
          const response = await fetch('/api/users/me', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
    
          const json = await response.json();
    
          if (response.ok && json) {
            setUser(json.data);
          } else {
            throw new Error('Erreur lors de la récupération des détails de l\'utilisateur.');
          }
        } catch (err) {
          console.error(err);
        }
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, user, login, logout, register }}>
          {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;