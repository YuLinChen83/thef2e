import clsx from 'clsx';
import { ReactComponent as DownIcon } from '../../../assets/icons/down.svg';

export type Option<T> = {
  text: string;
  value: T;
};

export type Props<T> = {
  placeholder: string;
  className?: string;
  value: T;
  options: Option<T>[];
  onChange: (value: any) => void;
};

const Select = ({
  placeholder,
  value,
  options,
  className,
  onChange
}: Props<any>) => (
  <div className="relative inline-flex">
    <select
      className={clsx(
        'border border-primary focus:border-primary-light rounded-md h-9 leading-relaxed px-3 pr-8 appearance-none outline-none',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map(({ text, value }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
    <div className="absolute top-0 bottom-0 left-auto right-3 flex items-center pointer-events-none">
      <DownIcon className="w-4" />
    </div>
  </div>
);

export default Select;
