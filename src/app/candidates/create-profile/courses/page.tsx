import { Courses } from "@/components/mainPages/RegisterFlowCandidates/Courses";
import './page.scss';
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          5/9
        </div>

        <div className="flow__main-section">
          <Courses />
        </div>
      </div>

      <div className="flow__bottom">
        <Link
          href={'/candidates/create-profile/certifications'}
          className="flow__button flow__button--back"
        >
          Back
        </Link>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/languages'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/languages'}
            className="flow__button flow__button--add"
          >
            Add Languages
          </Link>
        </div>
      </div>
    </div>
  )
}