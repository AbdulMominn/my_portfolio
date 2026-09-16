import { useCallback, useEffect, useState } from "react";
import { DEFAULT_PROFILE, isProfileId } from "../data/profiles";
import type { ProfileId } from "../types/portfolio";

function readProfile(): ProfileId {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const value = new URLSearchParams(window.location.search).get("profile");
  return isProfileId(value) ? value : DEFAULT_PROFILE;
}

export function useProfile() {
  const [profileId, setProfileId] = useState<ProfileId>(readProfile);

  useEffect(() => {
    const handlePopState = () => setProfileId(readProfile());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selectProfile = useCallback((nextProfile: ProfileId) => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("profile") === nextProfile) return;

    url.searchParams.set("profile", nextProfile);
    window.history.pushState({ profile: nextProfile }, "", url);
    setProfileId(nextProfile);
  }, []);

  return { profileId, selectProfile };
}
