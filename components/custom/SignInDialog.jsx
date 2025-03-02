import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function SignInDialog({ openDialog, closeDialog }) {
  const { setUserDetail } = useContext(UserDetailContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const createUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        await createUser({
          name: userInfo.data.name,
          email: userInfo.data.email,
          picture: userInfo.data.picture,
          uid: uuidv4(),
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userInfo.data));
          setUserDetail?.(userInfo.data);
        }
        closeDialog();
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.log("Google Login Error:", errorResponse);
      setIsLoading(false);
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-white">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <div className="flex flex-col items-center gap-3 pt-4">
            <p className="text-center text-muted-foreground">
              {Lookup.SIGNIN_SUBHEADING}
            </p>
            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 w-full py-2 rounded-md transition-all"
              onClick={googleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In With Google"}
            </button>
            <p className="text-center text-sm text-muted-foreground px-4">
              {Lookup.SIGNIN_AGREEMENT_TEXT}
            </p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
