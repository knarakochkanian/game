'use client';
import Image from 'next/image';
import Modal from '../../common/Modals/Modal';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import header from '../Header';

export default function CountOnboarding() {
  const [onboardingPassed, setOnboardingPassed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isOnboardingPassed =
      window.localStorage.getItem('isOnboardingPassed') === 'true';
      setOnboardingPassed(isOnboardingPassed);
    }
  }, []);

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      setOnboardingPassed(true);
      window.localStorage.setItem('isOnboardingPassed', 'true');
    }
  };
  return (
    <div>
      <Image
        src={'/onboarding/count-down-onboarding.png'}
        alt="count-down"
        width={2800}
        height={1700}
      />
      <Modal name="damageInfo" isOpen={true} counter={12}>
        <p>
          {' '}
          В данном окне отображается информация об уроне, который будет нанесен
          выбранным вами регионам, а также о последствиях атаки.
        </p>
        <div className="ModalButtons">
          <Link
            href="/"
            style={{ color: 'white', padding: '20px' }}
            className="ModalButton1"
          >
            далее
          </Link>
          <Link href={'/'} className="SecondarySmall">
            <span className="TypoBodyBigLink">
              <button onClick={completeOnboarding}>пропустить</button>
            </span>
          </Link>
        </div>
      </Modal>
    </div>
  );
}
