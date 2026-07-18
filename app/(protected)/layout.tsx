"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMe } from "@/hooks/useAuth";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, isLoading } = useGetMe();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/login");
    }
  }, [mounted, isLoading, user, router]);

  if (!mounted || isLoading) {
    return null;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
