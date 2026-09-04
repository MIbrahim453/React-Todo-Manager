import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, fireStore } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readProfile = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const user = await getDoc(doc(fireStore, "user", firebaseUser.uid));
      const profile = user.exists() ? user.data() : {};

      setUser({ ...firebaseUser, ...profile });
      setLoading(false);
    });
    return readProfile;
  }, []);
  const createProfile = async (name, email, uid) => {
    try {
      const profile = { uid, name: name.trim(), email: email.trim() };
      await setDoc(doc(fireStore, "user", uid), profile);
      return {
        success: true,
        message: "Profile created successfully",
        profile,
      };
    } catch (error) {
      console.error("Error creating profile:", error);
      return {
        success: false,
        message: "Could not create your profile. Please try again.",
      };
    }
  };
  const signUp = async (name, email, password) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      const profileResult = await createProfile(
        name,
        firebaseUser.email,
        firebaseUser.uid,
      );
      if (!profileResult.success) return profileResult;
      console.log(firebaseUser);
      return {
        success: true,
        message: "Account created successfully",
        user: firebaseUser,
      };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      return {
        success: false,
        message: "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;
      const user = await getDoc(doc, (fireStore, "user", firebaseUser.uid));

      const profile = user.exists() ? user.data() : {};
      setUser(profile);
      return {
        success: true,
        message: "Logged In Successfully",
        user: firebaseUser,
      };
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      return {
        success: false,
        message: "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const updateProfile = async (updatedData) => {
    if (!user?.uid) {
      return {
        success: false,
        message: "You must be logged in to update your profile.",
      };
    }

    const profile = {
      uid: user.uid,
      name: updatedData.name.trim(),
      email: updatedData.email.trim(),
    };

    if (!profile.name || !profile.email) {
      return {
        success: false,
        message: "Name and email are required.",
      };
    }

    try {
      await setDoc(doc(fireStore, "user", user.uid), profile, { merge: true });
      setUser((currentUser) => ({ ...currentUser, ...profile }));
      return {
        success: true,
        message: "Profile updated successfully",
      };
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        success: false,
        message: "Could not update your profile Please try again",
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signUp,
        login,
        loading,
        logout,
        createProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
