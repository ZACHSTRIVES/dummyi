// determines if a string is null, empty, or whitespace
import {Toast} from "@douyinfe/semi-ui";

export const isNullOrWhiteSpace = (str: string): boolean => {
    return !str || str.length === 0 || /^\s*$/.test(str);
}
