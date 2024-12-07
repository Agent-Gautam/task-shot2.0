import { auth, base } from "@/utils/firebase";
import {
  signInWithPopup,
  User,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "motion/react";
import { FaGoogle } from "../utils/reactIcons";

const Login = ({
  setUserId,
}: {
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}) => {

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        setUserId(user.uid);
        createUserInFirestore(user);
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const createUserInFirestore = async (user: User) => {
    const userRef = doc(base, "Users", user.uid);
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
      <div className="w-[320px] md:w-[400px] text-text border-2 shadow-md flex flex-col gap-5 p-5 rounded-xl bg-base">
        <h1 className="text-center text-secondary font-semibold text-xl lg:text-4xl">
          Task Scheduler
        </h1>
        <section className="flex flex-col gap-5 pt-16">
          <h3 className="text-black/60 text-xl pl-3">Login / Signup</h3>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-secondary text-base rounded-full p-3 flex items-center gap-3 shadow-lg"
            onClick={signInWithGoogle}
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </motion.button>
        </section>
      </div>
    </motion.div>
  );
};

export default Login;
