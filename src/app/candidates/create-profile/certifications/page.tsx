import { Certifications } from "@/components/mainPages/RegisterFlowCandidates/Certifications";
import './page.scss';
import Link from "next/link";

export default function CertificationsPage() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          4/9
        </div>

        <div className="flow__main-section">
          <Certifications />
        </div>
      </div>

      <div className="flow__bottom">
        <Link
          href={'/candidates/create-profile/education'}
          className="flow__button flow__button--back"
        >
          Back
        </Link>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/courses'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/courses'}
            className="flow__button flow__button--add"
          >
            Add Courses
          </Link>
        </div>
      </div>
    </div>
  )
}