import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, 
        onAuthStateChanged,
        GoogleAuthProvider,
        signInWithRedirect, sendPasswordResetEmail } from "firebase/auth";
import { query, getDocs, collection, where, addDoc } from "firebase/firestore";     

import {auth, db} from '../firebase'


const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = async() => {
    const provider = new GoogleAuthProvider();
     //signInWithPopup(auth, provider);
     try {
      const res = await signInWithRedirect(auth, provider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    
  };

const createUser =async (name,email, address, password)=>{
    
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password, name, address);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      address,
    });

    
  } catch (err) {
    console.error(err);
    alert(err.message);
  }

}
const signIn = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

  const logOut = () => {
      signOut(auth)
  }
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, createUser, signIn, auth, db, sendPasswordReset,user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};


