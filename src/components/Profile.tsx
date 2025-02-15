import { useEffect, useState } from "react";
import { base } from "../utils/firebase";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { FaUserCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { handleSignOut } from "@/utils/firebaseFunctions";
import { LiaSignOutAltSolid } from "react-icons/lia";
import Theme from "./Theme";
import  tasks  from "../MockData";

interface UserData {
  uid: string;
  name?: string;
  email?: string;
  photoUrl: string;
  theme: string;
  [key: string]: any; // Add additional fields as required
}

const Profile = ({
  user,
  openState,
  toggleProfile,
  theme,
  setTheme,
}: {
  user: string;
  openState: boolean;
  toggleProfile: Function;
  theme: string;
    setTheme: (theme: "light" | "dark") => void;
}) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  //function to create tasks from mockTasks 
  const createTasks = async () => {
    const tasksRef = collection(base, "tasks");
    tasks.forEach(async (task) => {
      try {
        await addDoc(tasksRef, task);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    });
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRef = doc(base, "users", user); // Reference to user document
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const { name, email, createdAt, photoUrl, theme } = docSnap.data();
          setUserData({
            uid: user,
            name,
            email,
            createdAt, // Convert to Date if it exists
            photoUrl: photoUrl || "", // Provide default value
            theme: theme,
          });
          console.log(theme);
          
          localStorage.setItem("theme", theme || "light");
        } else {
          console.log("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    // console.log(userData?.photoUrl);
    fetchUser();
  }, [user]); // Add `user` to dependency array

  return (
    <div
      className={`lg:flex flex-col absolute lg:static h-full w-full lg:w-[18%] ${
        openState ? "flex flex-col" : "hidden"
      } z-50 bg-base200 p-4 justify-between pt-12 lg:p-0 `}
    >
      <button className="absolute top-3 left-3 lg:hidden">
        <MdClose
          className="text-text"
          size={30}
          onClick={() => toggleProfile()}
        />
      </button>
      <div className="flex flex-col gap-3 items-center bg-base p-4 rounded-xl" onDoubleClick={createTasks}>
        <FaUserCircle className="bg-primary text-neutral rounded-full w-[50%] h-full " />
        <p className="text-text text-lg font-semibold">{userData?.name}</p>
      </div>
      {/* stats */}
      <div className="flex lg:flex-col gap-3 text-text">
        <div className="text-text bg-base flex flex-col items-center p-4 rounded-xl leading-loose w-full">
          <h4>Tasks created</h4>
          <strong className="text-3xl font-bold">10</strong>
        </div>
        <div className="text-text bg-base flex flex-col items-center p-4 rounded-xl leading-loose w-full">
          <h4>Tasks done</h4>
          <strong className="text-3xl font-bold">10</strong>
        </div>
      </div>
      <Theme theme={theme} toggleTheme={setTheme} />
      <button
        className="w-full backdrop-blur-md rounded-md px-2 py-1 flex items-center gap-2 text-xl bg-white/60 text-secondary"
        onClick={handleSignOut}
      >
        <LiaSignOutAltSolid size={30} />
        <p className="">LogOut</p>
      </button>
    </div>
  );
};

export default Profile;
