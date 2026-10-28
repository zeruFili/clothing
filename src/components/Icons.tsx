import React from "react";

export type IconName =
  | "cart"
  | "bag"
  | "heart"
  | "search"
  | "eye"
  | "calendar"
  | "check"
  | "star"
  | "close"
  | "chevron"
  | "chevronDown"
  | "arrow"
  | "arrowRight"
  | "filter"
  | "tag"
  | "spark"
  | "ruler"
  | "hanger"
  | "truck"
  | "shield"
  | "user"
  | "userCheck"
  | "mapPin"
  | "minus"
  | "plus"
  | "grid"
  | "list"
  | "alert"
  | "clock"
  | "refresh";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  fill?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  className = "",
  fill = "none",
}) => {
  const renderPath = () => {
    switch (name) {
      case "cart":
      case "bag":
        return (
          <>
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </>
        );
      case "heart":
        return (
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        );
      case "search":
        return (
          <>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </>
        );
      case "eye":
        return (
          <>
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </>
        );
      case "calendar":
        return (
          <>
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </>
        );
      case "check":
        return <path d="m4 12 5 5L20 6" />;
      case "star":
        return (
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        );
      case "close":
        return <path d="M18 6 6 18M6 6l12 12" />;
      case "chevron":
      case "chevronDown":
        return <path d="m6 9 6 6 6-6" />;
      case "arrow":
      case "arrowRight":
        return (
          <>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </>
        );
      case "filter":
        return <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />;
      case "tag":
        return (
          <>
            <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
            <circle cx="7" cy="7" r="1.5" fill="currentColor" />
          </>
        );
      case "spark":
        return (
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
        );
      case "ruler":
        return (
          <>
            <path d="M21.3 8.7 8.7 21.3c-.8.8-2 .8-2.8 0l-3.2-3.2c-.8-.8-.8-2 0-2.8L15.3 2.7c.8-.8 2-.8 2.8 0l3.2 3.2c.8.8.8 2 0 2.8Z" />
            <path d="m14.5 3.5 2 2M11.5 6.5l3 3M8.5 9.5l2 2M5.5 12.5l3 3" />
          </>
        );
      case "hanger":
        return (
          <>
            <path d="M12 3a2.5 2.5 0 0 1 2.5 2.5c0 1.2-.8 2-2 2.5L2 14v2h20v-2l-10-6" />
          </>
        );
      case "truck":
        return (
          <>
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </>
        );
      case "shield":
        return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />;
      case "user":
      case "userCheck":
        return (
          <>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </>
        );
      case "mapPin":
        return (
          <>
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </>
        );
      case "minus":
        return <path d="M5 12h14" />;
      case "plus":
        return <path d="M12 5v14M5 12h14" />;
      case "grid":
        return (
          <>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </>
        );
      case "list":
        return (
          <>
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </>
        );
      case "alert":
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </>
        );
      case "clock":
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </>
        );
      case "refresh":
        return (
          <>
            <path d="M21.5 2v6h-6M2.5 22v-6h6" />
            <path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.3" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {renderPath()}
    </svg>
  );
};

export default Icon;
