export type Props = {
  type?: 'normal' | 'success' | 'danger' | 'warning';
  children: string;
};

const specialColorMap = {
  normal: ['black-100'],
  success: ['black-100', 'primary'],
  danger: ['danger-light', 'danger'],
  warning: ['warning-light', 'warning']
};

const Badge = ({ type = 'normal', children }: Props) => (
  <div
    className={`inline-flex items-center justify-center py-1 px-2 rounded-full text-xs bg-${specialColorMap[type][0]}`}
  >
    {type !== 'normal' && (
      <div
        className={`w-1 h-1 mr-1 rounded-sm bg-${specialColorMap[type][1]}`}
      />
    )}
    {children}
  </div>
);

export default Badge;
