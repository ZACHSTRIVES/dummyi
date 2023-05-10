import {RouteType} from "@/types/system";

export const navBarRoutes: RouteType[] = [
    {
        id: 'home',
        path: '/',
        localeId: 'nav.item.home',
    },
    {
        id: 'workspace',
        path: '/workspace',
        localeId: 'nav.item.workspace',
    },
    {
        id: 'about',
        path: '/about',
        localeId: 'nav.item.about',
    }
]