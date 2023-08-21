import {Generator} from "@/types/generator";
import {DataType, DataTypeCategory} from "@/constants/enums";
import {EmojiGeneratorDefaultOptions, EmojiGeneratorOptionsComponent, generate} from "./Emoji";

export const EmojiGenerator: Generator = {
    type: DataType.EMOJI,
    category: DataTypeCategory.NETWORK,
    generate: generate,
    optionsComponent: EmojiGeneratorOptionsComponent,
    defaultOptions: EmojiGeneratorDefaultOptions,
    exampleLines: ["🤜", "📖", "👰"]
}
    