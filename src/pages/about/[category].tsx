import { AboutLayout } from '@/components/Layout/about'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import DatePage from './date'
import NumberPage from './number'
import StringPage from './string'
import About from '.'

const CategoryPage: NextPageWithLayout = () => {
    const router = useRouter()
    const { category } = router.query

    switch (category) {
        case 'number':
            return <NumberPage />
        case 'string':
            return <StringPage />
        case 'date':
            return <DatePage />
        default:
            return <About />
    }
}

CategoryPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <AboutLayout>
            <div>
                <p>hello world</p>
                {page}
            </div>
            {/* {page}  */}
        </AboutLayout>
    )
}

export default CategoryPage
