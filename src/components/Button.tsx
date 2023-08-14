import { ReactNode } from "react";

type Props = {
  children: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
}: Props) => {
  let buttonClassName = "bg-purple-500 hover:bg-purple-700 text-white";
  if (variant === "secondary") {
    buttonClassName = "bg-gray-300 hover:bg-gray-400 text-gray-800 ";
  }

  return (
    <button
      type={type}
      className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${buttonClassName}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function SelectButton({ children }: { children: ReactNode }) {
  return (
    <select className="bg-gray-300 text-gray-800 font-bold py-2 px-2 rounded">
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
