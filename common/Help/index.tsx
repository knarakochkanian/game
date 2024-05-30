import Image from 'next/image';
import { helpIcon } from '../../public/main-screen';

import styles from './Help.module.scss';
import Link from 'next/link';

const Help = () => {
  return (
    <Link href={'/onboarding'} className={styles.helpIcon}>
      <Image alt="helpIcon" src={helpIcon} width={48} height={48} priority />
    </Link>
  );
};

export default Help;
