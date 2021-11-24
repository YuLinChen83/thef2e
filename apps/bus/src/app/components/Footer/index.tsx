import clsx from 'clsx';

export default function Footer() {
  return (
    <div
      className={clsx(
        'w-full h-16 flex justify-center items-center bg-main-bg text-white crimson',
        'sticky bottom-0'
      )}
    >
      HelloBus © 2021 Designer Vum. Engineer Tiffany. All rights reserved.
    </div>
  );
}
