import clsx from 'clsx';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from '../../components/Select';

const Homepage = () => {
  const { invoiceId } = useParams();
  const [filter, setFilter] = useState({ city: 1, region: 2 });
  const count = 60;

  return (
    <div className="w-full">
      <div>
        <span className="text-base">搜尋結果</span>
        <span className="text-black-400 text-xs ml-3">{`共 ${count} 筆`}</span>
      </div>
      <div className="mt-2 mb-4">
        <Select
          value={filter.city}
          onChange={(value) => setFilter({ ...filter, city: value })}
          options={[]}
        />
        <Select
          className="ml-1"
          value={filter.region}
          onChange={(value) => setFilter({ ...filter, region: value })}
          options={[]}
        />
      </div>
      <div className="w-full inline-flex gap-5">
        <div className="w-1/3">Card list</div>
        <div className="w-2/3">Map</div>
      </div>
    </div>
  );
};

export default Homepage;
