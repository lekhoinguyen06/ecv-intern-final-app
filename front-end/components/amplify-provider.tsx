"use client"

import { useEffect, ReactNode } from "react"
import { configureAmplify } from "@/lib/amplify"
configureAmplify()
export default function AmplifyProvider({ children }: { children: ReactNode }) {

  return <>{children}</>
}
