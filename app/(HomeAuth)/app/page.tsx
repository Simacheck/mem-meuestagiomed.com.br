'use client'

import { CentralizerContainer } from "@/components/memComponents/CentralizerContainer";
import { SelectFilter } from "@/components/memComponents/SelectFilter";
import { RangeDatePicker } from "@/components/memComponents/RangeDatePicker";
import { EstagioCard } from "@/components/memComponents/EstagioCard";
import { InfoTextHover } from "@/components/memComponents/InfoText";
import { SingleDate } from "@/components/memComponents/InputSingleDate";
import { useEffect, useState } from "react";
import { api } from "@/utils/services";
import axios from "axios";
import { useSignin } from "@/hook/useSignin";
import { HomeMedico } from "@/components/pages/HomeMedico";
import { HomeEstudante } from "@/components/pages/HomeEstudante";

export default function Signin(params:any) {
  const { user } = useSignin()

  console.log(user)
  return (
    <>
    {
      user?.userType == 'medico' ?
      (<HomeMedico />) : (<HomeEstudante />)
    }
    </>
  );
}
