import { Languages } from "@/components/mainPages/RegisterFlowCandidates/Languages"
import './page.scss';
import Link from "next/link";

export default function LanguagesRoute() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          6/9
        </div>

        <div className="flow__main-section">
          <Languages />
        </div>
      </div>

      <div className="flow__bottom">
        <Link
          href={'/candidates/create-profile/courses'}
          className="flow__button flow__button--back"
        >
          Back
        </Link>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/driving'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/driving'}
            className="flow__button flow__button--add"
          >
            Add Drive Permit
          </Link>
        </div>
      </div>
    </div>
  )
}