import React, { useId } from "react";

type Props = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  titleClass?: string;
  containerStyle?: React.CSSProperties;
  onClick?: () => void;
};

const Title: React.FC<Props> = ({
  title,
  titleClass = "",
  containerStyle = {},
  onClick,
  children,
}) => {
  const tooltipId = useId();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center justify-center group">
      {/* Tooltip Content */}
      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute z-50 bottom-full mb-3 px-3 py-1.5 rounded-lg w-max max-w-[250px] text-center text-xs font-medium bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-xl invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 transition-all duration-200 pointer-events-none ${titleClass}`.trim()}
      >
        {title}
        {/* Tooltip Arrow */}
        <div
          className="absolute left-1/2 -bottom-1 w-2.5 h-2.5 -translate-x-1/2 rotate-45 bg-gray-900 dark:bg-gray-100 -z-10 rounded-br-[2px]"
          aria-hidden="true"
        />
      </div>

      {/* Trigger Element */}
      <div
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-describedby={tooltipId}
        role={onClick ? "button" : "group"}
        tabIndex={onClick ? 0 : -1}
        className={`cursor-pointer rounded-inherit focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${onClick ? "cursor-pointer" : ""}`}
        style={containerStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default Title;
