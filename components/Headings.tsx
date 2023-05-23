type Props = {
  children?: string;
  underline?: boolean;
  className?: string;
};

export const H1 = ({ children, underline, className }: Props) => {
  return (
    <h1
      className={`text-7xl leading-[1.1] font-primary font-bold uppercase text-neutral-900 mb-6 relative ${className} ${
        underline && 'title-underline'
      }`}
    >
      {children}
    </h1>
  );
};

export const H2 = ({ children, className }: Props) => {
  return (
    <h2
      className={`text-3xl whitespace-nowrap font-primary font-bold uppercase text-neutral-900 ${className}`}
    >
      {children}
    </h2>
  );
};
