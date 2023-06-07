import {DataField, DataFieldList} from "@/types/generator";
import {DataType} from "@/constants/enums";
import {NumberGeneratorDefaultOptions} from "@/core/generators/Number/Number";
import {BooleanGeneratorDefaultOptions} from "@/core/generators/Boolean/Boolean";

export const mockFields: DataFieldList =
    {
        "1": {
            fieldName: 'number',
            isDraft: false,
            dataType: DataType.NUMBER,
            dataTypeOptions: NumberGeneratorDefaultOptions,
            emptyRate: 0,
        },
        "2": {
            fieldName: 'boolean',
            isDraft: false,
            dataType: DataType.BOOLEAN,
            dataTypeOptions: BooleanGeneratorDefaultOptions,
            emptyRate: 0,
        }
    }

