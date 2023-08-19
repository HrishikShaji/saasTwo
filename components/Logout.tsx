"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogOut = () => {
  return (
    <>
      <button
        className="px-3 py-2 rounded-md bg-white "
        onClick={() => signOut()}>
        Log Out
      </button>
    </>
  );
};

export default LogOut;
