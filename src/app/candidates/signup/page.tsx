import './page.scss';
import { LoginCandidate } from '@/components/mainPages/Register/LoginCandidate';
import { RegisterCandidate } from '../../../components/mainPages/Register/RegisterCandidate';

export default function SignUpCandidate() {
  return (
    <div className="signupcandidate">
      <RegisterCandidate />
      <div className="signupcandidate__divider"></div>

      <div className="signupcandidate__login">
        <LoginCandidate />
      </div>
    </div>
  )
}