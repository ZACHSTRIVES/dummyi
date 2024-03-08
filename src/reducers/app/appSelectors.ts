import {RootState} from "@/types/system";

export const selectColorMode = (state: RootState) => state.app.colorMode;