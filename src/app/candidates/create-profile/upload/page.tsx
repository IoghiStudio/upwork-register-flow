import { Upload } from "@/components/mainPages/RegisterFlowCandidates/Upload";
import './page.scss';
import Link from "next/link";

export default function UploadPage() {
  return (
    <div className="flow">
      <div className="flow__top">
        <div className="flow__page-counter">
          9/9
        </div>

        <div className="flow__main-section">
          <Upload />
        </div>
      </div>

      <div className="flow__bottom">
        <Link
          href={'/candidates/create-profile/candidate'}
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
            Finish creating profile
          </Link>
        </div>
      </div>
    </div>
  )
}