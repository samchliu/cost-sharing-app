'use client'

import { useEffect } from "react"
import { useLiff } from "./_components/liff-provider"

export default function HomePage() {
  const { liffObject, liffError } = useLiff();
  return <div>Home Page</div>
}