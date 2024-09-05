"use client";
import React, { useState, useEffect } from "react";
import { RadarChartComponent } from "../Radarchart/Radar.jsx";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  CircularProgress,
  Chip,
  Progress,
  Input,
} from "@nextui-org/react";
import { CheckIcon } from "./checkicon/CheckIcon.jsx";
import Image from "next/image";
import Leetcode from "../../../public/leetcode.svg";
import Add from "../../../public/add.svg";

export default function Bio({ username }) {
  const [leetname, setLeetname] = useState("");
  const [stats, setStats] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  // Fetch LeetCode stats
  useEffect(() => {
    async function fetchLeetCodeStats() {
      if (leetname) {
        try {
          const leetcodeResponse = await fetch(
            `https://leetcode-stats-api.herokuapp.com/${leetname}`
          );
          if (leetcodeResponse.ok) {
            const data = await leetcodeResponse.json();
            setStats(data);
          } else {
            console.error(
              `Failed to fetch LeetCode data: ${leetcodeResponse.status} ${leetcodeResponse.statusText}`
            );
          }
        } catch (error) {
          console.error(`Error fetching LeetCode data: ${error}`);
        }
      }
    }

    fetchLeetCodeStats();
  }, [leetname]);

  // Fetch user skills
  useEffect(() => {
    async function fetchUserSkills() {
      try {
        const userResponse = await fetch(`/api/GetSkills`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("Fetched user skills:", userData.data); // Debug statement
          setSkills(userData.data || []);
        } else {
          console.error(
            `Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}`
          );
        }
      } catch (error) {
        console.error(`Error fetching user skills: ${error}`);
      }
    }

    fetchUserSkills();
  }, []);

  const updateSkills = async (updatedSkills) => {
    try {
      const response = await fetch("/api/UpdateSkills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, skills: updatedSkills }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to update skills: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      console.log("Update response:", result);
    } catch (error) {
      console.error(`Error updating skills: ${error}`);
    }
  };

  const handleAddSkillsClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && newSkill.trim() !== "" && skills.length < 8) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      updateSkills(updatedSkills);
      setNewSkill("");
      setShowInput(false);
    }
  };

  const handleRemoveSkill = (skill) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };

  return (
    <div className="h-full border-b-2 w-3/4 mx-auto flex flex-col items-center">
      <div className="flex flex-1 w-full space-x-10 shadow-xl p-8 dark:bg-[#021526]">
        <div className="w-[50%]">
          <h4 className="text-xl dark:text-white text-gray-900 font-bold">
            LeetCode Statistics
          </h4>
          <Card className="mt-4 p-4 h-auto space-y-3 dark:bg-[#000]">
            <CardHeader className="flex gap-3 justify-center items-center">
              <Image src={Leetcode} alt="Leetcode" width={40} height={40} />
              <div className="w-full flex justify-between pr-4">
                <div className="flex justify-start items-center w-40 flex-wrap md:flex-nowrap gap-4">
                  <Input
                    type="text"
                    isClearable={true}
                    variant="faded"
                    size="sm"
                    placeholder="user name"
                    radius="lg"
                    classNames={{
                      input: "w-full p-2 text-white outline-none rounded-lg",
                      label: "text-white",
                    }}
                    value={leetname}
                    onChange={(e) => setLeetname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-md">Ranking</p>
                  <p className="text-small text-default-500">
                    {stats?.ranking || 0}
                  </p>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-row w-full justify-between">
              <div className="flex flex-col w-[50%] space-y-5">
                <span>
                  <Chip
                    variant="dot"
                    classNames={{
                      dot: "w-2 h-2 pl-2 bg-[#20b9b8]",
                      content: "w-[15rem] font-medium text-default-600",
                      base: "bg-[#20b9b8]/20",
                    }}
                  >
                    <div className="flex justify-around">
                      <span>Easy Solved :</span>
                      <span>
                        {stats?.easySolved || 0} / {stats?.totalEasy || 0}
                      </span>
                    </div>
                  </Chip>
                </span>
                <span>
                  <Chip
                    variant="dot"
                    classNames={{
                      dot: "w-2 h-2 pl-2 bg-[#feb200]",
                      content: "w-[15rem] font-medium text-default-600",
                      base: "bg-[#feb200]/20",
                    }}
                  >
                    <div className="flex justify-around">
                      <span>Medium Solved :</span>
                      <span>
                        {stats?.mediumSolved || 0} / {stats?.totalMedium || 0}
                      </span>
                    </div>
                  </Chip>
                </span>
                <span>
                  <Chip
                    variant="dot"
                    classNames={{
                      dot: "w-2 h-2 pl-2 bg-[#f43632]",
                      content: "w-[15rem] font-medium text-default-600",
                      base: "bg-[#f43632]/20",
                    }}
                  >
                    <div className="flex justify-around">
                      <span>Hard Solved :</span>
                      <span>
                        {stats?.hardSolved || 0} / {stats?.totalHard || 0}
                      </span>
                    </div>
                  </Chip>
                </span>
              </div>
              <div className="mr-4">
                <CircularProgress
                  value={stats?.acceptanceRate || 100}
                  color="warning"
                  showValueLabel={true}
                  strokeWidth={2}
                  formatOptions={{
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }}
                  classNames={{
                    svg: "w-36 h-24 drop-shadow-md",
                    track: "dark:stroke-white/20 stroke-black/20",
                  }}
                />

                <Chip
                  startContent={<CheckIcon size={18} />}
                  variant="faded"
                  color="success"
                  className="mt-2"
                  classNames={{ base: "bg-success/10", content: "text-white" }}
                >
                  Acceptance Rate
                </Chip>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <span className="w-full">
                <Progress
                  label={`Total Solved : ${stats?.totalSolved || 0} / ${
                    stats?.totalQuestions || 0
                  }`}
                  size="sm"
                  value={stats?.totalSolved || 0}
                  maxValue={stats?.totalQuestions || 0}
                  color="warning"
                  formatOptions={{ style: "percent" }}
                  showValueLabel={true}
                  classNames={{
                    indicator: "bg-success h-[0.3rem]",
                    base: "max-w-md h-[2.5rem]",
                    track: "drop-shadow-md dark:bg-white/20 bg-black/50",
                    label: "tracking-wider font-medium text-default-600",
                    value: "text-foreground/60",
                  }}
                />
              </span>
            </CardFooter>
          </Card>
          <div>
            <h4 className="text-xl pt-2 mt-2 dark:text-white text-gray-900 font-bold">
              Top 8 Skills
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Chip
                  variant="dot"
                  classNames={{
                    dot: "w-2 h-2 ml-2 bg-success",
                    content: "font-medium text-default-600",
                    base: "bg-primary/10",
                  }}
                  key={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  className="mr-2 mb-2 w-full"
                >
                  {skill}
                </Chip>
              ))}

              {showInput && (
                <div className="flex items-center">
                  <Input
                    type="text"
                    variant="bordered"
                    value={newSkill}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    size="sm"
                    radius="lg"
                    placeholder="Enter your skills"
                    className="border rounded p-2 mr-2 text-white bg-gray-800"
                  />
                  <button
                    onClick={() => {
                      if (newSkill.trim() !== "" && skills.length < 8) {
                        const updatedSkills = [...skills, newSkill.trim()];
                        setSkills(updatedSkills);
                        updateSkills(updatedSkills);
                        setNewSkill("");
                        setShowInput(false);
                      }
                    }}
                    className="bg-blue-800 text-white p-2 rounded"
                  >
                    Add
                  </button>
                </div>
              )}

              {!showInput && skills.length < 8 && (
                <Chip
                  onClick={handleAddSkillsClick}
                  endContent={
                    <Image
                      size="sm"
                      width={20}
                      height={20}
                      src={Add}
                      alt="Add"
                    />
                  }
                  variant="faded"
                  color="success"
                  className="mt-2 cursor-pointer"
                  classNames={{ base: "bg-primary/10", content: "text-white" }}
                >
                  Add Skills
                </Chip>
              )}
            </div>
          </div>
        </div>

        <div className="w-[50%] flex justify-end">
          <RadarChartComponent />
        </div>
      </div>
    </div>
  );
}
