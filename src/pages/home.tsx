import Header from '@/components/ui/header';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Header />
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}

export default Home;
