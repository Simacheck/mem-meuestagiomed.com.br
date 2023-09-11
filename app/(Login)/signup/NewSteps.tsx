"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserTypes } from "./UserType";
import { MedicoSignup } from "@/components/memComponents/Forms/Signup/MedicoSignup";


export default function NewSteps() {
  const [userType, setUserType] = useState<number>(0)

  const handleChangeUserType = (id?: number, stepNumber?: number) => {
    setUserType(id ? id : 0)

    setSelectedTab(allSteps[stepNumber ? stepNumber : 0]);
  }

  let allSteps = [
    {
      icon: "1",
      label: "Selecione seu tipo de Usuário",
      component: <UserTypes handleChangeUserType={handleChangeUserType} />,
      status: 0,
    },
    {
      icon: "2",
      label: "Preencha seus dados",
      component: <MedicoSignup userType={userType} />,
      status: 0,
    },
    {
      icon: "3",
      label: "Confirme seu cadastro",
      component: <>abasdfasdcde</>,
      status: 0,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(allSteps[0]);
 
  return (
    <>
      <>
        <ol className="flex w-full px-3 justify-around items-center font-medium text-center text-gray-500">
          {allSteps.map((item) => (
            <li
              key={item.label}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              <span
                className={`flex items-center justify-center ${
                  selectedTab.icon === item.icon
                    ? "text-primary"
                    : "text-gray-500"
                } `}
              >
                <span
                  className={` m-1 rounded-full ${
                    selectedTab.icon === item.icon
                      ? "text-xs text-white rounded-full bg-primary px-2 py-1"
                      : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>
                <span className={`whitespace-normal max-w-[8rem]`}>
                  {selectedTab.label === item.label && item.label}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </>
      <main>
        <AnimatePresence>
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedTab ? selectedTab.component : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
    </>
  );
}
