import React, { MouseEvent } from "react";
interface Props {
    children: React.ReactNode;
    selected?: boolean;
    disabled?: boolean;
    baseColor: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
export declare const CheckListButton: React.FC<Props>;
export {};
