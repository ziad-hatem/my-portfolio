"use client";
import * as React from "react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContextProvider } from "@/app/_components/providers/context-provider";
import { MySkills } from "@prisma/client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface AddedTech {
  id: string;
  icon: string;
  name: string;
}

const TechnologyForProject = ({
  addedTechs,
  setAddedTechs,
  setSelectedTech,
  selectedTech,
}: any) => {
  const { userData } = useContextProvider();

  const handleAdd = () => {
    if (selectedTech) {
      const tech = userData.mySkills.find(
        (e: MySkills) => e.name === selectedTech
      );

      // Check if the technology is already in the addedTechs list
      if (tech && !addedTechs.some((t: AddedTech) => t.name === tech.name)) {
        setAddedTechs([
          ...addedTechs,
          { id: tech.id, icon: tech.icon, name: tech.name },
        ]);
        setSelectedTech(null);
      } else {
        toast.success("Technology already added");
        setSelectedTech(null);
      }
    }
  };

  const handleRemove = (techToRemoveId: string) => {
    setAddedTechs(
      addedTechs.filter((tech: AddedTech) => tech.id !== techToRemoveId)
    );
  };

  return (
    <div>
      <h1 className="text-lg text-muted-foreground my-4">
        Add Technologies you're used in your Project
      </h1>
      <div className="flex gap-2">
        <Select onValueChange={(value) => setSelectedTech(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Technologies</SelectLabel>
              {userData.mySkills.map((e: MySkills) => (
                <SelectItem key={e.id} value={e.name}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={handleAdd}
          className=" bg-blue-500 text-white rounded"
          disabled={!selectedTech}
        >
          Add
        </Button>
      </div>

      {addedTechs.length > 0 && (
        <div className="mt-4 w-fit">
          <h3 className="text-lg font-semibold">Selected Technologies:</h3>
          <ul className="list-disc list-inside">
            {addedTechs.map((tech: AddedTech) => (
              <li
                key={tech.id}
                className="flex items-center justify-between mt-2"
              >
                <span className="flex gap-2 items-center">
                  <img
                    src={tech.icon}
                    alt={`${tech.name} icon`}
                    className="w-5 h-5 mr-2"
                  />
                  {tech.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(tech.id);
                  }}
                  className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                  aria-label={`Remove ${tech.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TechnologyForProject;
