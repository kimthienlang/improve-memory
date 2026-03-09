import { toast } from "sonner";
import { getSocialLoginUrl } from "../services";
import { useState } from "react";

export const useSocialLogin = () => {
  const [isSocialLoading, setIsSocialLoading] = useState(false);
  const performSocialLogin = async (provider: "github" | "google") => {
    setIsSocialLoading(true);
    console.log(`🔗 Redirecting to ${provider}...`);
    window.location.href = getSocialLoginUrl(provider);
    toast.success(`Redirecting to ${provider}...`);
    setTimeout(() => {
      setIsSocialLoading(false);
    }, 3000);
  };

  return { performSocialLogin, isSocialLoading };
};
