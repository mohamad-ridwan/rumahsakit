import React from 'react'
import { Helmet } from 'react-helmet'

function HelmetCard({ title, content, linkCanonical }) {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={content} />
                <link rel="canonical" href={linkCanonical} />
            </Helmet>
        </>
    )
}

export default HelmetCard;