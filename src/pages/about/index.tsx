import { useRouter } from 'next/router';
import { AboutLayout } from '@/components/Layout/about';
import NumberPage from './number';
import DatePage from './date';
import StringPage from './string';

const AboutPage: React.FC = () => {
  const router = useRouter();

  return (
    <AboutLayout>
      <div>
        {router.query.category === 'number' && <NumberPage />}
        {router.query.category === 'string' && <StringPage />}
        {router.query.category === 'date' && <DatePage />}
      </div>
    </AboutLayout>
  );
};

export default AboutPage;
