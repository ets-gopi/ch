import React from "react";
import Image from "next/image";
import { ButtonAsChild } from "../buttons/buttonAsChild";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center">
        <div
          id="logo"
          className="w-14 h-14 rounded-full relative overflow-hidden"
        >
          <Image
            src={"/logo.jpg"}
            alt="logo"
            fill
            className="object-cover"
            sizes="56px"
            priority
          />
        </div>
        <nav>
          <ul>
            <li className="inline m-2">
              <ButtonAsChild href="/register">Register</ButtonAsChild>
            </li>
            <li className="inline m-2">
              <ButtonAsChild href="/login">Login</ButtonAsChild>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
