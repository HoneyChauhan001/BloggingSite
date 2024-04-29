import React from 'react'
import { PageNotFound, Container } from '../components/index'


function NotFoundPage() {
    return (
        <div className='py-8'>
            <Container>
                <PageNotFound />
            </Container>
        </div>
    )
}

export default NotFoundPage