import { auth, base, provider } from "@/utils/firebase";
import {
  User,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "motion/react";
import { FaGoogle } from "../utils/reactIcons";
import LoadingAnimation from "./Loading";

const Login = ({isLoading}: {isLoading: boolean}) => {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        createUserInFirestore(user);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const createUserInFirestore = async (user: User) => {
    const userRef = doc(base, "users", user.uid);
    try {
      await setDoc(
        userRef,
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: user.metadata.creationTime,
        },
        { merge: true }
      );
      console.log("User created/updated successfully!");
    } catch (error) {
      console.error("Error creating/updating user:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-base200"
    >
      <div className="w-[320px] md:w-[400px] h-[300px] text-text flex flex-col gap-5 p-5 rounded-xl bg-base shadow-xl">
        <h1 className="text-center text-secondary font-semibold text-xl lg:text-4xl">
          Task Scheduler
        </h1>
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <section className="flex flex-col gap-5 h-52 justify-between items-center text-center">
            <h3 className="text-black/60 text-2xl pl-3">Login / Signup</h3>
            <motion.button
              id="desktop-login"
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              className="flex bg-secondary text-base rounded-full p-3 items-center gap-3 shadow-lg divide-x-2"
              onClick={signInWithGoogle}
            >
              <FaGoogle />
              <span className="pl-3">Continue with Google</span>
            </motion.button>
          </section>
        )}
      </div>
    </motion.div>
  );
};

export default Login;
