import './page.scss';
import { LoginCandidate } from '@/components/mainPages/Register/LoginCandidate';
import { RegisterCandidate } from '@/components/mainPages/Register/RegisterCandidate';

export default function SigninCandidate() {
  return (
    <div className="logincandidate">
      <div className="logincandidate__register">
        <RegisterCandidate />
      </div>

      <div className="logincandidate__divider"></div>
      <LoginCandidate />
    </div>
  )
}
