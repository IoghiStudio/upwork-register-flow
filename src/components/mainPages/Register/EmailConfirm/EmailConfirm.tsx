'use client';
import './EmailConfirm.scss';

export const EmailConfirm = () => {
  return (
    <div className="email">
      <div className="email__headline">
          Thank you for registering!
      </div>

      <h1 className="email__title">
        <div className='email__title-part'>
          Please verify
        </div>

        <div className='email__title-part'>
          {' your email'}
        </div>
      </h1>

      <p className="email__text">
        A confirmation email has been sent to your inbox. Please open the email and follow the instructions to confirm your email address.
      </p>

      <div
        className="email__button"
        onClick={() => {
          //handle resend
          console.log('resend')
        }}
      >
        Resend confirmation email
      </div>
    </div>
  )
}
