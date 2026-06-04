import React, { useId } from "react";
import "@/app/styles/title.css";

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
  // Generate a unique ID to link the tooltip with its trigger for screen readers
  const tooltipId = useId();

  // If onClick is provided, make the wrapper keyboard accessible
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="title-container">
      {/* Tooltip Content */}
      <div
        id={tooltipId}
        role="tooltip"
        className={`main-title-node-container ${titleClass}`.trim()}
      >
        {title}
        <div className="title-arrow" aria-hidden="true"></div>
      </div>

      {/* Trigger Element */}
      <div
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-describedby={tooltipId}
        role={onClick ? "button" : "group"}
        tabIndex={onClick ? 0 : -1} // Only focusable if it acts as a button
        className="title-trigger"
        style={containerStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default Title;
