import clsx from 'clsx';
import { ReactComponent as BicycleIcon } from '../../../assets/icons/bicycle.svg';

export type Props = {
  active?: boolean;
  disabled?: boolean;
};

const StatusIcon = ({ active, disabled }: Props) => (
  <div
    className={clsx(
      'w-11 h-11 flex items-center justify-center rounded-3xl',
      !active && !disabled && 'bg-primary',
      active && 'bg-primary-dark',
      disabled && 'bg-black-300'
    )}
  >
    <BicycleIcon className="text-white w-6 h-6" />
  </div>
);

export default StatusIcon;
