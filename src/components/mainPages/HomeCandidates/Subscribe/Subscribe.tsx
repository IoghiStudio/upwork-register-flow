'use client';
import { useCallback, useEffect, useState } from 'react';
import { subscribe } from '@/services/api/subscribe.service';
import './Subscribe.scss';
import cn from 'classnames';

enum SubscribeMessage {
  Success = 'Email submited',
  Used = 'Email already used',
  Invalid = 'Invalid email adress'
};

export const Subscribe = () => {
  const [email, setEmail] = useState<string>('');
  const [subscribeMessage, setSubscribeMessage] = useState<SubscribeMessage>(SubscribeMessage.Success);
  const [isMessageActive, setIsMessageActive] = useState<boolean>(false);
  
  useEffect(() => {
    if (isMessageActive) {
      setTimeout(() => {
        setIsMessageActive(false);
        if (subscribeMessage === SubscribeMessage.Success) {
          setEmail('');
        }
      }, 1500);
    }
  }, [isMessageActive]);

  const handleSubscribeMessage = useCallback((errorCode: number) => {
    switch(errorCode) {
      case 400:
        setSubscribeMessage(SubscribeMessage.Used);
        break;
      case 422:
        setSubscribeMessage(SubscribeMessage.Invalid);
        break;
      default:
        setSubscribeMessage(SubscribeMessage.Success);
    }

    setIsMessageActive(true);
  }, []);

  const handleEmail = () => {
    subscribe({
      "email": email
    })
      .then((resp)=> {
        handleSubscribeMessage(0);
      })
      .catch(error => {
        const errorCode = error.response.status;
        handleSubscribeMessage(errorCode);
      })
  }

  return (
    <div className="sub">
      <h1 className="sub__title">
        <div className='sub__title-part'>
          Subscribe To
        </div>

        <div className='sub__title-part'>
          {' Our Newsletters'}
        </div>
      </h1>

      <p className="sub__text">
        Subscribe to our newsletters to read about trends and updates
      </p>

      <div className="sub__form">
        <div className={cn(
          "sub__input",
          {
            "sub__input--submited": isMessageActive,
          }
        )}>
          <div className={cn(
            "sub__message",
            {
              "sub__message--active": isMessageActive,
              "sub__message--error": isMessageActive && subscribeMessage !== SubscribeMessage.Success,
            }
          )}>
            {subscribeMessage}
          </div>

          <div className="sub__input-icon"></div>

          <input
            type="text"
            className={cn(
              "sub__input-field",
              {
                "sub__input-field--submited": isMessageActive
              }
            )}
            placeholder='name@email.com'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        
        <div
          className="sub__button"
          onClick={() => {
            handleEmail();
          }}
        >
          <div className="sub__button-text-1">
            Subscribe me now
          </div>

          <div className="sub__button-text-2">
            Subscribe
          </div>
        </div>
      </div>
    </div>
  )
}