"use client";
import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Navbar() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const onInputChange = (e: any) => {
    setSearch(e.target.value);
  };
  const handleSearchClick = () => {
    router.push("/movie?search=" + search + "&page=1");
  };
  const onKeyDown = (event: any) => {
    if (event.key === "Enter" && event.target.value !== "") {
      router.push("/movie?search=" + event.target.value + "&page=1");
    }
  };
  return (
    <div
      style={{ zIndex: 1000 }}
      className="fixed top-0 left-0 z-100 w-screen bg-lightBlack  px-2 h-[7vh] shadow-3xl"
    >
      <div className="max-w-screen-2xl flex mx-auto items-center justify-between h-full">
        <Link href="/">Nxt Movie</Link>
        <div className="relative  flex w-full mr-3 max-w-[14rem]">
          <Input
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            label="Search"
            error
            size="md"
            className="text-white"
          />
          <Button
            onClick={handleSearchClick}
            size="sm"
            color={"red"}
            className="!absolute right-1 top-1 mt-[2px] rounded"
          >
            <AiOutlineSearch />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
