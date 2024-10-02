import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../dialog";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { auth, provider, signInWithPopup,db} from  "../../../firebase/firebse";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function SignIn() {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
  
    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const loggedInUser = result.user; // Get the logged-in user


        await setDoc(doc(db, "users", loggedInUser.uid), {
            uid: loggedInUser.uid,
            name: loggedInUser.displayName,
            email: loggedInUser.email,
            createdAt: new Date(), // Store the timestamp when the user was created
          });

        setUser(loggedInUser);
        const user = result.user;
        
        console.log('User: ', user);
      } catch (error) {
        setError(error.message);
        console.error("Error during Google Sign-In: ", error);
      }
    };

    const handleLogout = async () => {
        try {
          await signOut(auth); // Use signOut to log the user out
          setUser(null); // Reset user state on logout
          console.log("User logged out successfully");
        } catch (error) {
          setError(error.message);
          console.error("Error during logout: ", error);
        }
      };
  
      return (
        <div>
          {/* Other UI components like inputs */}
    
          <div className="flex items-center justify-center mt-2">
            {/* Conditionally render either the Sign-In or Logout button */}
            {user ? (
              <Button variant="outline" className="w-full" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                Sign In with Google
              </Button>
            )}
          </div>
    
          {/* Display any error */}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      );
    }