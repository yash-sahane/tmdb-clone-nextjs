"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ToastWrapper = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const router = useRouter();

  useEffect(() => {
    if (error === "unauthorized") {
      toast.error("Route is protected. Kindly login first.");

      const params = new URLSearchParams(searchParams.toString());
      params.delete("error");

      const newPath =
        window.location.pathname +
        (params.toString() ? `?${params.toString}` : "");

      router.replace(newPath);
    }
  }, [error, router, searchParams]);

  return null;
};

export default ToastWrapper;
