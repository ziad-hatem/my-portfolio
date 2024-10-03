"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/utils/db";
import { User } from "@prisma/client";
import axios from "axios";
import UpdateForm from "@/app/_components/updateForm";
import Loader from "@/app/_components/loader";
import HashLoader from "react-spinners/HashLoader";
import { useContextProvider } from "@/app/_components/providers/context-provider";

const page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useContextProvider();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/api/user/getuserdata?email=ziadhatem2022@gmail.com"
        );
        const data = response.data;
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <HashLoader color="#ebe4e4" />
      </div>
    );
  }

  if (!userData) return null;

  return (
    <div className="px-5 py-10">
      <UpdateForm defaultValues={userData} />
    </div>
  );
};

export default page;
