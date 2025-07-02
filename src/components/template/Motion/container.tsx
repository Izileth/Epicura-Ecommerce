import { motion } from "framer-motion";
import  type { ComponentProps } from "react";


export function MotionDiv({ children, ...props }: ComponentProps<typeof motion.div>) {
    return <motion.div {...props}>{children}</motion.div>;
}
