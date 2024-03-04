import {DataField, DataFieldList} from "@/types/generator";
import {CollectionNodeType, DataType} from "@/constants/enums";
import {NumberGeneratorDefaultOptions} from "@/core/generators/Number/Number";
import {BooleanGeneratorDefaultOptions} from "@/core/generators/Boolean/Boolean";
import {SchemasCollection} from "@/types/system";

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
    };

export const mockCollections: SchemasCollection[] =
    [
        {
            id: '213123132123',
            key:'0',
            label: 'Asia',
            type: CollectionNodeType.COLLECTION,
            emoji: {
                background: "#000000",
                code: "U+1F600"
            },
            children: [
                {
                    id: '213123132124',
                    key:'0-0',
                    label: 'Japan',
                    type: CollectionNodeType.COLLECTION,
                    emoji: {
                        background: "#123456",
                        code: "U+1F1EF U+1F1F5",
                    },
                },
                {
                    id: '213123132125',
                    key:'0-1',
                    label: 'China',
                    type: CollectionNodeType.COLLECTION,
                    emoji: {
                        background: "#123456",
                        code: "U+1F1E8 U+1F1F3",
                    },
                    children: [
                        {
                            id: '213123132126',
                            key:'0-1-0',
                            label: 'Beijing',
                            type: CollectionNodeType.SCHEMA
                        },
                        {
                            id: '213123132127',
                            key:'0-1-1',
                            label: 'Guangzhou',
                            type: CollectionNodeType.SCHEMA,
                        },
                    ],
                },
            ]
        }
    ]
