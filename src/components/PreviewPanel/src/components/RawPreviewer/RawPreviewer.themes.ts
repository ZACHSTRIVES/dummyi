import {createTheme} from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

export const lightTheme = createTheme({
    theme: 'light',
    settings: {
        background: '#ffffff',
        foreground: '#4D4D4C',
        caret: '#AEAFAD',
        selection: '#D6D6D6',
        selectionMatch: '#D6D6D6',
        gutterBackground: '#FFFFFF',
        gutterForeground: '#4D4D4C',
        gutterBorder: '#ddd',
        gutterActiveForeground: '',
        lineHighlight: '#EFEFEF',
    },
    styles: [
        { tag: t.comment, color: '#787b80' },
        { tag: t.definition(t.typeName), color: '#194a7b' },
        { tag: t.typeName, color: '#194a7b' },
        { tag: t.tagName, color: '#008a02' },
        { tag: t.variableName, color: '#1a00db' },
        { tag: t.name, color: '#000000', fontWeight: 'bold' },
    ],
});