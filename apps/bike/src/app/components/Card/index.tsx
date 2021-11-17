import clsx from 'clsx';

export type Prop = {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
};

const Card = ({ children, active = false, className }: Prop) => (
  <div
    className={clsx(
      'rounded-md md:rounded-lg shadow-card p-4 flex flex-col',
      'bg-white text-black text-xs whitespace-nowrap border hover:border-primary-light',
      active && 'border-primary-dark',
      className
    )}
  >
    {children}
  </div>
);

export default Card;
