"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import HashLoader from "react-spinners/HashLoader";
import { navData } from "../info-navigation";

interface MyContextType {
  showContacts: boolean;
  setShowContacts: (showContacts: boolean) => void;
  active: string;
  setActive: (active: string) => void;
  animateExitDirection: "left" | "right" | null;
  animateEnterDirection: "left" | "right" | null;
  userData: any | null;
  setUserData: (userData: any | null) => void;
  refreshData: () => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [showContacts, setShowContacts] = useState(false);
  const [active, setActiveState] = useState("contact");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [animateExitDirection, setAnimateExitDirection] = useState<
    "left" | "right" | null
  >(null);
  const [animateEnterDirection, setAnimateEnterDirection] = useState<
    "left" | "right" | null
  >(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "/api/user/getuserdata?email=ziadhatem2022@gmail.com"
      );
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  const handleSetActiveAndAnimate = (newActive: string) => {
    const newActiveItem = navData.find((item) => item.data === newActive);
    const oldActiveItem = navData.find((item) => item.data === active);

    if (newActiveItem && oldActiveItem) {
      if (newActiveItem.id < oldActiveItem.id) {
        setAnimateExitDirection("right");
        setAnimateEnterDirection("left");
      } else {
        setAnimateExitDirection("left");
        setAnimateEnterDirection("right");
      }
    } else {
      setAnimateExitDirection("left");
      setAnimateEnterDirection("right");
    }

    setActiveState(newActive);
  };

  return (
    <MyContext.Provider
      value={{
        showContacts,
        setShowContacts,
        active,
        setActive: handleSetActiveAndAnimate,
        animateExitDirection,
        animateEnterDirection,
        userData,
        setUserData,
        refreshData,
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="bg-black"
        >
          <HashLoader color="#ebe4e4" />
        </div>
      ) : (
        children
      )}
    </MyContext.Provider>
  );
};

export const useContextProvider = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useContextProvider must be used within a ContextProvider");
  }
  return context;
};
