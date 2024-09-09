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
import Add from "../../../public/smalladd.png";
import leetstats from "../../../public/stats.svg";
import skillicon from "../../../public/skills.svg";

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
    <div className="h-full w-full lg:w-[75%] lg:mx-auto">
      <div className="flex flex-col mb-2 rounded-lg lg:flex-row items-center justify-center lg:justify-between lg:space-x-10 shadow-xl p-8  dark:bg-[#1b1f23] bg-[#ffffff]">
        <div className="">
          <div className="flex gap-2">
            <Image src={leetstats} width={30} height={20} alt="stats" />
            
            <h4 className="lg:text-xl sm:text-lg text-base text-center lg:text-start dark:text-white text-gray-900 font-bold">
              LeetCode Statistics
            </h4>
          </div>

          <Card className="mt-4 p-4 mb-2 space-y-3 bg-[#0C0C0C] lg:max-w-[28rem]">
            <CardHeader className="flex lg:gap-3 gap-4  items-center">
              <Image src={Leetcode} alt="Leetcode" width={30} height={30} />
              <div className="w-full flex justify-between gap-4">
                <div className="flex justify-start items-center lg:w-40  flex-wrap md:flex-nowrap gap-4">
                  <Input
                    type="text"
                    isClearable={true}
                    variant="faded"
                    size="sm"
                    placeholder="Enter username"
                    radius="lg"
                    classNames={{
                      input:
                        " p-2 dark:text-white  outline-none rounded-lg",
                      label: "text-white",
                    }}
                    value={leetname}
                    onChange={(e) => setLeetname(e.target.value)}
                  />
                </div>
                <div className="flex flex-col text-center">
                  <p className="text-base text-white">Ranking</p>
                  <p className="text-small text-default-500">
                    {stats?.ranking || 0}
                  </p>
                </div>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-row justify-between gap-4">
              <div className="flex flex-col lg:space-y-5 space-y-2">
                <span>
                  <Chip
                    variant="dot"
                    classNames={{
                      dot: "w-2 h-2 pl-2 bg-[#20b9b8]",
                      content:
                        "lg:w-[15rem] w-[10rem] font-medium text-default-600",
                      base: "bg-[#20b9b8]/20 border-none",
                    }}
                  >
                    <div className="flex justify-around text-white">
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
                      content:
                        "lg:w-[15rem] w-[11rem] font-medium text-default-600",
                      base: "bg-[#feb200]/20 border-none",
                    }}
                  >
                    <div className="flex justify-around text-white">
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
                      content:
                        "lg:w-[15rem] w-[10rem] font-medium text-default-600",
                      base: "bg-[#f43632]/20 border-none",
                    }}
                  >
                    <div className="flex justify-around text-white">
                      <span>Hard Solved :</span>
                      <span>
                        {stats?.hardSolved || 0} / {stats?.totalHard || 0}
                      </span>
                    </div>
                  </Chip>
                </span>
              </div>
              <div className=" text-white flex flex-col items-center">
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
                    svg: "lg:w-36 w-25 lg:h-24 h-16 drop-shadow-md",
                    track: "stroke-white/20 ",
                    value: "text-xs lg:text-lg text-white font-medium",
                  }}
                />

                <Chip
                  startContent={<CheckIcon size={14} />}
                  variant="faded"
                  color="success"
                  className="mt-2"
                  classNames={{
                    base: "bg-success/10 border-none",
                    content: "text-white text-xs ",
                  }}
                >
                  Acceptance Rate
                </Chip>
              </div>
            </CardBody>
            <Divider />
            <CardFooter>
              <span className="w-full ">
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
                    track: "drop-shadow-md bg-white/20 ",
                    label:
                      "tracking-wider font-medium text-default-600 text-white",
                    value: "text-foreground/60 text-white",
                  }}
                />
              </span>
            </CardFooter>
          </Card>
          <div>
            <div className="flex gap-2">
              <Image src={skillicon} width={30} height={20} alt="skills" />
              <h4 className="lg:text-xl sm:text-lg text-base text-center lg:text-start mt-2 dark:text-white text-gray-900 font-bold">
                Top Skills
              </h4>
            </div>

            <div className="flex flex-wrap lg:gap-2 mt-2">
              {skills.map((skill) => (
                <Chip
                  variant="dot"
                  classNames={{
                    dot: "w-2 h-2 ml-2 bg-success",
                    content: "font-medium dark:text-default-600 text-slate-200",
                    base: "bg-[#0C0C0C]",
                  }}
                  key={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  className="mr-2 mb-2 w-full"
                >
                  {skill}
                </Chip>
              ))}

              {showInput && (
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    variant="faded"
                    value={newSkill}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    size="sm"
                    radius="lg"
                    placeholder="Enter your skills"
                    classNames={{
                      input:
                        " p-2 text-white outline-none rounded-lg",
                      label: "text-white",
                      
                      inputWrapper:"bg-[#0C0C0C]"
                    }}
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
                  classNames={{ base: "dark:bg-primary/10 bg-black/70", content: "text-white" }}
                >
                  Add Skills
                </Chip>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 flex items-center lg:items-start lg:w-[40%] ">
       
          <RadarChartComponent />
        </div>
      </div>
    </div>
  );
}
