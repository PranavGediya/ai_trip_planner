import React, { useEffect } from "react";
import { Button } from "../button";
import SignInPopup from "./SignInPopup";
import SignIn from "./SignInPopup";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {googleLogout} from '@react-oauth/google';
import { useNavigation } from "react-router-dom";


function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-3">
      <img src="/logo.png" alt="Logo" className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />


      <div>
        {user ? (
          <div className="flex items-center gap-3">
          <a href="/my-trips">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button></a>

            <Popover>
              <PopoverTrigger>
                <img
                  src="{user?.picture}"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="curser-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                > Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>          
        ) : (
          <SignIn />
          
        )}
        {/*    <Button>Sign in</Button> */}
      </div>
    </div>
  );
}

export default Header;
