import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const inputVariants = cva(
    "flex w-full rounded-md border-1 border-highlight bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent placeholder:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground shadow-inset disabled:opacity-50"
);

export const Input = ({ className, ...props }) => {
    return (
        <input
            className={twMerge(inputVariants(), className)}
            {...props}
        />
    );
};

Input.displayName = "Input";

export default Input;
