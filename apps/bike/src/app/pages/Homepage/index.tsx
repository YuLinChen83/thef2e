import clsx from 'clsx';
import { useParams } from 'react-router-dom';

const Homepage = () => {
  const { invoiceId } = useParams();

  return (
    <div className="">
      <h2>最新消息</h2>
    </div>
  );
};

export default Homepage;
