import { Candidate } from "@/components/mainPages/RegisterFlowCandidates/Candidate";
import './page.scss';
import Link from "next/link";

export default function CandidatePage() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          8/9
        </div>

        <div className="flow__main-section">
          <Candidate />
        </div>
      </div>

      <div className="flow__bottom">
        <Link
          href={'/candidates/create-profile/driving'}
          className="flow__button flow__button--back"
        >
          Back
        </Link>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/upload'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/upload'}
            className="flow__button flow__button--add"
          >
            Add video CV
          </Link>
        </div>
      </div>
    </div>
  )
}