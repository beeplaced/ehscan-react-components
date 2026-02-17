import { ReactNode } from "react";
type Props = {
    index?: string | number;
    text?: string;
    selected?: boolean;
    injectCSS?: string;
    notimeout?: boolean;
    click?: (args?: any) => void;
    type?: "raw" | "pop" | "ripple";
    children?: ReactNode;
};
export declare const Button: React.FC<Props>;
export {};
