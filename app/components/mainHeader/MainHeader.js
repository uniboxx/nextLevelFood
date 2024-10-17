import Link from 'next/link';

import classes from './MainHeader.module.css';
import Image from 'next/image';
import MainHeaderBackground from './MainHeaderBackground';

import NavLink from './NavLink';
import { storage } from '@/lib/appwrite';

const logoUrl = storage.getFileDownload(
  process.env.APPWRITE_BUCKET_ID,
  '6710b0730025237e213f'
);

function MainHeader() {
  return (
    <>
      <MainHeaderBackground />

      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <div aria-hidden="true" className={classes.image}>
            <Image src={logoUrl} alt="A plate with food on it" priority fill />
          </div>
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
