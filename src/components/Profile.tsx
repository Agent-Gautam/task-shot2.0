import { useEffect, useState } from "react";
import { auth, base, usersCol } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface UserData {
  uid: string;
  name?: string;
  email?: string;
  [key: string]: any; // Add additional fields as required
}

const Profile = ({ user }: { user: string }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(base, "users", user);
        
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = { uid: user, ...docSnap.data()};
          setUserData(data); // Update state with fetched user data
        } else {
          console.log("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user]); // Add `user` to dependency array

  // Sign-out function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="absolute lg:static h-full w-full lg:w-[20%] bg-base p-4">
      {user ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {userData?.name || "User"}
          </h2>
          <p>Email: {userData?.email}</p>
          <button
            onClick={handleSignOut}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p className="text-center">No user is logged in.</p>
      )}
    </div>
  );
};

export default Profile;
