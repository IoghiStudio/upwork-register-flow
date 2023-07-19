import { SchoolDiplomas } from "@/components/mainPages/RegisterFlowCandidates/SchoolDiplomas"
import './page.scss';
import Link from "next/link";

export default function Education() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          3/9
        </div>

        <div className="flow__main-section">
          <SchoolDiplomas />
        </div>
      </div>

      <div className="flow__bottom">
      <Link
          href={'/candidates/create-profile/employment'}
          className="flow__button flow__button--back"
        >
          Back
        </Link>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/certifications'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/certifications'}
            className="flow__button flow__button--add"
          >
            Add Certifications
          </Link>
        </div>
      </div>
    </div>
  )
}