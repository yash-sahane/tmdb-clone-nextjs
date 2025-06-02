import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import React from "react";

const Modal = ({
  setShowPopup,
}: {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed flex items-center justify-center w-full h-full top-0 left-0 backdrop-blur-md z-50">
      <span className="fixed top-4 right-4 cursor-pointer">
        <X onClick={() => setShowPopup(false)} />
      </span>
      <div className="bg-zinc-900 rounded-lg h-fit p-4 flex flex-col gap-4 items-center">
        <button
          onClick={() => signIn("github")}
          className="flexgap-4 bg-zinc-800 rounded-md p-1 px-2"
        >
          Login with Github
        </button>
        <button
          onClick={() => signIn("google")}
          className="flex gap-4 bg-zinc-800 rounded-md p-1 px-2"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Modal;
