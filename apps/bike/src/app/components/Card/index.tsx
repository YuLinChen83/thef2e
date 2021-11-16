import clsx from 'clsx';

export type Prop = {
  title: string;
  children: React.ReactNode;
  active: boolean;
};

const Card = ({ title, children, active }: Prop) => (
  <div
    className={clsx(
      'rounded-md lg:rounded-lg shadow-card px-4 pt-0 pb-4 flex flex-col',
      'bg-white text-xs border hover:border-primary-light',
      active && 'border-primary-dark'
    )}
  >
    <h3 className="text-base font-bold border-b border-black-100 min-h-title flex items-center mb-3">
      {title}
    </h3>
    {children}
  </div>
);

export default Card;
