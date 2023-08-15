import { motion, useMotionValue, useTransform } from "framer-motion";

type Props = {
    checked: boolean;
    handleCheck: () => void;
};

function CheckButton({ checked, handleCheck }: Props) {
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
    return (
        <div>
            <motion.div
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                }}
                animate={{
                    backgroundColor: checked
                        ? "rgba(255, 255, 255, 1)"
                        : "rgba(255, 255, 255, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={handleCheck}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 150 150"
                >
                    <motion.path
                        d="M38 74.707l24.647 24.646L116.5 45.5"
                        fill="transparent"
                        strokeWidth="15"
                        stroke="#a855f7"
                        strokeLinecap="round"
                        // initial={{ pathLength: 0.9, opacity: 1 }}
                        animate={{ pathLength: checked ? 0.9 : 0 }}
                        style={{ pathLength: pathLength, opacity: opacity }}
                    />
                </svg>
            </motion.div>
        </div>
    );
}

export default CheckButton;
