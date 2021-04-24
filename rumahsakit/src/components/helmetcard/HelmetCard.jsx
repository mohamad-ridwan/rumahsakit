import React from 'react'
import { Helmet } from 'react-helmet'

function HelmetCard({ title, content }) {
    return <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
    </Helmet>
}

export default HelmetCard;