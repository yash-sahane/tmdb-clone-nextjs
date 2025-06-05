"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Modal from "./Modal";

const Navbar = () => {
  const { data } = useSession();
  const user = data?.user;

  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <main className="flex items-center justify-end py-4">
      {data ? (
        <>
          <p className="mr-2">{user?.name}</p>
          <button
            className="p-1 px-2 bg-zinc-800 rounded-md cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      ) : (
        <button
          className="p-1 px-2 bg-zinc-800 rounded-md cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          SignIn
        </button>
      )}
      {showPopup && <Modal setShowPopup={setShowPopup} />}
    </main>
  );
};

export default Navbar;
