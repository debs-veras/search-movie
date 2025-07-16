import { ButtonHTMLAttributes } from "react";
import classNames from "../../utils/classNames";

type Props = {
  text: string;
  color?: "red" | "blue" | "green" | "amber" | "purple";
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CardActionButton({
  text,
  color = "red",
  onClick,
  className,
  ...rest
}: Props) {
  const colorClasses = {
    red: "bg-red-600 hover:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700",
    amber: "bg-amber-600 hover:bg-amber-700",
    purple: "bg-purple-600 hover:bg-purple-700",
  };

  return (
    <button
      onClick={onClick}
      className={classNames(
        `flex items-center justify-center gap-2 px-4 py-2 rounded-full text-white font-medium shadow-md cursor-pointer active:scale-95 transition-all ${colorClasses[color]}`,
        className
      )}
      {...rest}
    >
      {text}
    </button>
  );
}
