import Footer from '@/app/components/Footer';
import MainHeader from './components/mainHeader/MainHeader';

import './globals.css';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
