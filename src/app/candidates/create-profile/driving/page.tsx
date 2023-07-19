import { Driving } from "@/components/mainPages/RegisterFlowCandidates/Driving";
import './page.scss';
import Link from "next/link";

export default function DrivingPage() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          7/9
        </div>

        <div className="flow__main-section">
          <Driving />
        </div>
      </div>

      <div className="flow__bottom">
        <Link
          href={'/candidates/create-profile/languages'}
          className="flow__button flow__button--back"
        >
          Back
        </Link>

        <div className="flow__bottom-right">
          <Link
            href={'/candidates/create-profile/candidate'}
            className="flow__button flow__button--skip"
          >
            Skip
          </Link>

          <Link
            href={'/candidates/create-profile/candidate'}
            className="flow__button flow__button--add"
          >
            Add few more details
          </Link>
        </div>
      </div>
    </div>
  )
}