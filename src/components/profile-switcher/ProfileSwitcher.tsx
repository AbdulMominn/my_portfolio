import { PROFILE_IDS, PROFILES } from "../../data/profiles";
import type { ProfileId } from "../../types/portfolio";

interface ProfileSwitcherProps {
  activeProfile: ProfileId;
  onChange: (profile: ProfileId) => void;
}

export function ProfileSwitcher({ activeProfile, onChange }: ProfileSwitcherProps) {
  return (
    <div className="profile-switcher" aria-label="Portfolio emphasis">
      <span className="profile-switcher__label">View for</span>
      <div className="profile-switcher__options" role="group" aria-label="Select a role profile">
        {PROFILE_IDS.map((profileId) => (
          <button
            key={profileId}
            type="button"
            className={`profile-switcher__option ${activeProfile === profileId ? "is-active" : ""}`}
            aria-pressed={activeProfile === profileId}
            onClick={() => onChange(profileId)}
          >
            {PROFILES[profileId].label}
          </button>
        ))}
      </div>
    </div>
  );
}
