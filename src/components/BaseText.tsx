import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const BaseText: FC<Props> = ({ children, style, className }) => {
  return (
    <p
      className={`text-2xl ${className}`}
      style={{ fontFamily: "Abhaya Libre", ...style }}
    >
      {children}
    </p>
  );
};

export default BaseText;
