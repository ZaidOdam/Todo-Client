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
            className={`focus:shadow-outline rounded px-4 py-2 font-bold focus:outline-none ${buttonClassName}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

function SelectButton({
    children,
    value,
    onChange,
}: {
    children: ReactNode;
    value: "all" | "complete" | "incomplete";
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
    return (
        <select
            className="rounded bg-gray-300 px-2 py-2 font-bold text-gray-800"
            value={value}
            onChange={onChange}
        >
            {children}
        </select>
    );
}

export { SelectButton };
export default Button;
