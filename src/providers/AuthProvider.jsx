import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();

  const createUserEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUserEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOutEmail = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("access-token");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfileEmail = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const response = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          if (response.data?.token) {
            localStorage.setItem("access-token", response.data.token);
          }
        } catch (error) {
          console.error("JWT Token Error:", error);
          await logOutEmail();
        }
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unSubscribe();
  }, [axiosPublic, logOutEmail]);

  const authInfo = {
    user,
    loading,
    createUserEmail,
    loginUserEmail,
    logOutEmail,
    updateUserProfileEmail,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
