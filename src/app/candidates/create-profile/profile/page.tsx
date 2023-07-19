import { UserProfile } from "@/components/mainPages/RegisterFlowCandidates/UserProfile";
import './page.scss';
import Link from "next/link";

export default function CandidateProfile() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          1/9
        </div>

        <div className="flow__main-section">
          <UserProfile />
        </div>
      </div>

      <div className="flow__bottom">
        <div
          className="flow__button flow__button--back"
        >
          Back
        </div>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/employment'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/employment'}
            className="flow__button flow__button--add"
          >
            Add Work Experience
          </Link>
        </div>
      </div>
    </div>
  )
}