import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth, db } from '../Config';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser({ ...currentUser, isAdmin: userData.isAdmin });
                } else {
                    setUser(currentUser);
                }
            } else {
                setUser(null);
            }
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const handleSignInWithEmailLink = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = window.prompt('Por favor, forneça seu email para confirmação');
                }

                try {
                    const result = await signInWithEmailLink(auth, email, window.location.href);
                    const currentUser = result.user;
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUser({ ...currentUser, isAdmin: userData.isAdmin });
                    } else {
                        setUser(currentUser);
                    }
                    window.localStorage.removeItem('emailForSignIn');
                    setSuccessMessage('Login realizado com sucesso!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                } catch (error) {
                    console.error('Erro ao fazer login com o link:', error);
                    setErrorMessage('Erro ao fazer login: ' + error.message);
                    setTimeout(() => setErrorMessage(''), 3000);
                }
            }
        };

        handleSignInWithEmailLink();
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                setSuccessMessage('Logout realizado com sucesso!');
                setTimeout(() => setSuccessMessage(''), 3000);
            })
            .catch((error) => {
                console.error('Erro ao fazer logout:', error);
                setErrorMessage('Erro ao fazer logout: ' + error.message);
                setTimeout(() => setErrorMessage(''), 3000);
            });
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleSignOut, successMessage, errorMessage, setSuccessMessage, setErrorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
