'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Grid from '../../common/Grid';
import PasswordError from '../../common/PasswordError';
import MainScreen from '../MainScreen';

import styles from './Password.module.scss';

export default function Password() {
  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState(false);
  const [valid, setValid] = useState(false);

  const handleNumberClick = (number: string) => {
    setPassword((prevPassword) =>
      prevPassword.length < 6 ? prevPassword + number : prevPassword
    );
  };

  const handleClear = () => {
    setPassword('');
  };

  useEffect(() => {
    if (password === '111285') {
      setValid(true);
    } else if (password.length === 6) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        handleClear();
      }, 8000);
    }
  }, [password]);

  return (
    <>
      {valid ? (
        <MainScreen />
      ) : (
        <section
          className={`${styles.passwordWrraper} ${
            showError ? styles.withError : ''
          }`}
        >
          <div>
            <h1>Введите пароль</h1>
            <div>
              <div className={styles.passwordDisplay}>
                {password.split('').map((char, index) => (
                  <svg
                    key={index}
                    width="40"
                    height="24"
                    viewBox="0 0 40 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.8802 4.01463L28.1097 5.24414L21.3343 12.0196L28.1099 18.7953L26.8803 20.0249L20.1047 13.2492L13.3291 20.0249L12.0996 18.7954L18.8752 12.0197L12.0998 5.24424L13.3294 4.01463L20.1048 10.7901L26.8802 4.01463Z"
                      fill="#5ED1C5"
                    />
                    <path
                      d="M30.5549 11.1501L30.5549 12.8888L20.973 12.8889L20.973 22.4711L19.2341 22.4711L19.2341 12.8889L9.65193 12.889L9.65194 11.1502L19.2341 11.1501L19.2342 1.56824L20.9731 1.56823L20.9731 11.1501L30.5549 11.1501Z"
                      fill="#5ED1C5"
                    />
                  </svg>
                ))}
                {Array.from({ length: 6 - password.length }).map((_, index) => (
                  <span key={index}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="28"
                      viewBox="0 0 44 28"
                      fill="none"
                    >
                      <path
                        d="M0 23.8333V28.6775L84 29V23.8333V19H0V23.8333Z"
                        fill="#5ED1C5"
                      />
                    </svg>
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.keypad}>
              {Array.from({ length: 9 }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleNumberClick((i + 1).toString())}
                >
                  {i + 1}
                </button>
              ))}
              <div></div>
              <button onClick={() => handleNumberClick('0')}>0</button>
              <button onClick={handleClear}>
                <Image
                  src={'/home/Delete.svg'}
                  alt={'delete'}
                  width={46}
                  height={46}
                  className={styles.passwordDelete}
                />
              </button>
            </div>
          </div>
        </section>
      )}
      {!valid && !showError && <Grid />}
      {!valid && showError && <PasswordError />}
    </>
  );
}
