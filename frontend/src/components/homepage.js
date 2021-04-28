import React from 'react'
import styled from 'styled-components'

// styling
const HomeDiv = styled.div`
display: flex;
`
export default function HomePage() {
    return (
        <HomeDiv>
            <div className="text-container">
                <h1>Welcome!</h1>
            </div>

        </HomeDiv>
    )
}