import type {IconProps} from "$lib/components/icon-props";

export interface MyButtonProps {
    props?: any,
    icon?: IconProps,
    text?: string;
    click?: (ev: EventTarget) => void;
}