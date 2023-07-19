import { ProfessionalExperience } from "@/components/mainPages/RegisterFlowCandidates/ProfessionalExperience";
import './page.scss';
import Link from "next/link";

export default function Employment() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          2/9
        </div>

        <div className="flow__main-section">
          <ProfessionalExperience />
        </div>
      </div>

      <div className="flow__bottom">
        <Link
          href={'/candidates/create-profile/profile'}
          className="flow__button flow__button--back"
        >
          Back
        </Link>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/education'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/education'}
            className="flow__button flow__button--add"
          >
            Add Education
          </Link>
        </div>
      </div>
    </div>
  )
}