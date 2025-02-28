"use client";

import { Home, Menu, Send, UserAvatar } from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const TopMenu = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      setActiveLink("home");
    } else if (pathname === "/about") {
      setActiveLink("about");
    } else if (pathname === "/contact") {
      setActiveLink("contact");
    }
  }, [pathname]);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return isMobile ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="m-5 size-fit">
        <Menu width={25} height={25} color={"#fff"} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-white bg-white/10 ml-5">
        <DropdownMenuItem
          onClick={() => router.push("/")}
          className="border-b rounded-none border-white/25 hover:cursor-pointer hover:font-bold"
        >
          <div>Início</div>
          <Home color={"#fff"} width={25} height={25} />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/contact")}
          className="border-b rounded-none border-white/25 hover:cursor-pointer hover:font-bold"
        >
          <div>Contato</div>
          <Send fill={"#ffffff33"} width={25} height={25} stroke={"#fff"} />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/about")}
          className="hover:cursor-pointer hover:font-bold"
        >
          <div>Sobre</div>
          <UserAvatar
            fill={"#ffffff"}
            width={20}
            height={20}
            className={"-mt-0.5 "}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex gap-6 justify-center items-center h-fit w-96 mx-auto border border-white bg-gray-700/10 rounded-3xl py-1 text-white select-none font-light tracking-tighter">
      <div
        className={`hover:border-white/25 hover:bg-white/5 border-transparent py-1 px-3 hover:border  hover:cursor-pointer tracking-tighter border rounded-2xl ${
          activeLink === "home" ? "bg-white/10 border-white/25" : ""
        }`}
        onClick={() => router.push("/")}
      >
        <Home color={"#fff"} width={25} height={25} />
      </div>
      <div className="font-thin text-white/75">|</div>
      <div
        className={` py-1 pr-3 pl-2 border border-transparent hover:border hover:border-white/25 hover:bg-white/5 hover:cursor-pointer rounded-2xl flex gap-x-1 items-center ${
          activeLink === "contact" ? "bg-white/10 border-white/25" : ""
        }`}
        onClick={() => router.push("/contact")}
      >
        <Send fill={"#ffffff33"} width={25} height={25} stroke={"#fff"} />
        <div>Contato</div>
      </div>
      <div
        className={` border border-transparent py-1 px-3 hover:border hover:border-white/25 hover:bg-white/5 hover:cursor-pointer rounded-2xl flex gap-x-1 items-center ${
          activeLink === "about" ? "bg-white/10 border-white/25" : ""
        }`}
        onClick={() => router.push("/about")}
      >
        <UserAvatar
          fill={"#ffffff"}
          width={20}
          height={20}
          className={"-mt-0.5 "}
        />

        <div>Sobre</div>
      </div>
    </div>
  );
};
