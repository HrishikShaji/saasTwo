import React from "react";
import Logo from "./Logo";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { authenticatedUser } from "@/lib/actions/actions.user";
import signOut from "next-auth";
import LogOut from "@/components/Logout";
import { redirect } from "next/navigation";

const Header = async () => {
  const session = await authenticatedUser();
  console.log(session);

  return (
    <div className="sticky top-0 bg-neutral-800 z-10 shadow ">
      <div className="container mx-auto p-6 flex justify-between">
        <Logo />
        <div className="flex gap-2 items-center">
          <div className="flex gap-4">
            <Link href="/cart">
              <FiShoppingCart size={25} color="white" />
            </Link>
            <p className="text-lg text-white">
              $0.00 <span className="text-sm text-gray-500 ">(0)</span>
            </p>
          </div>
          <h1 className="font-semibold text-white">{session?.user?.name}</h1>
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Header;
