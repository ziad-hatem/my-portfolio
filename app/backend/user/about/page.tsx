"use client";
import { AboutBackend } from "@/app/_components/about-backend";
import { useContextProvider } from "@/app/_components/providers/context-provider";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const page = () => {
  const [projectsCount, setProjectsCount] = useState(0);
  const { userData, setUserData } = useContextProvider();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "/api/user/getuserdata?email=ziadhatem2022@gmail.com"
        );
        const data = response.data;
        setUserData(data.user);
        const projectCount = data.user.projects.length;
        setProjectsCount(projectCount);
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
      <AboutBackend defaultData={userData} />
    </div>
  );
};

export default page;
