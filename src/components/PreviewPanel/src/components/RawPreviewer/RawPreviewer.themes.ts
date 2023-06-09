import {createTheme} from '@uiw/codemirror-themes';
import {tags as t} from '@lezer/highlight';

export const lightTheme = createTheme({
    theme: 'light',
    settings: {
        background: 'transparent',
        foreground: '#2d2525',
        gutterBackground: 'transparent',
        gutterBorder: 'transparent',
        gutterForeground: '#969393',

    },
    styles: [{tag: t.comment, color: '#dedede'},
        {tag: t.definition(t.typeName), color: '#482f4f'},
        {tag: t.keyword, color: 'hsl(185, 90%, 30%)', fontWeight: 'bold'},
        {tag: t.string, color: 'hsl(120,24%,26%)'},
        {tag: t.typeName, color: 'hsl(185, 90%, 40%)'},
        {tag: t.tagName, color: '#008a02'},
        {tag: t.variableName, color: '#5b529b'},

        // for json
        {tag: t.propertyName, color: '#218c10'},
        {tag: t.null, color: '#c9495a'},
        {tag: t.bool, color: '#264aad'},
        {tag: t.number, color: '#88b7f3'},
    ]
});

export const darkTheme = createTheme({
    theme: 'dark',
    settings: {
        background: 'transparent',
        foreground: '#d3d3d1',
        caret: '#AEAFAD',
        selection: '#383535',
        selectionMatch: '#383535',
        gutterBackground: 'transparent',
        gutterForeground: '#4D4D4C',
        gutterBorder: 'transparent',
        gutterActiveForeground: '',
        lineHighlight: '#EFEFEF',
    },
    styles: [{tag: t.comment, color: '#dedede'},
        {tag: t.definition(t.typeName), color: '#2eabe1'},
        {tag: t.keyword, color: 'rgb(128,211,218)', fontWeight: 'strong'},
        {tag: t.string, color: 'rgb(211,211,209)'},
        {tag: t.typeName, color: '#86b5ea'},
        {tag: t.tagName, color: '#0fa2a2'},

        // for json
        {tag: t.propertyName, color: '#0fa2a2'},
        {tag: t.null, color: '#c9495a'},
        {tag: t.bool, color: '#62986c'},
        {tag: t.number, color: '#88b7f3'},
    ]
});