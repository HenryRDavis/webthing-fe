import React from 'react'
import styled from 'styled-components'

const BodyContainer = styled.div`
    height:90vh;
    display:flex;
    .text-containter {
        width:40%;
        background:black;
        color:white;
        div {
            height:100%;
            display:flex;
            padding:0 6rem;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            h1 {
                font-size: 7rem;
                margin-bottom:5%;
            }
        }
    }
`

export default function LandingPage() {
    return (
        <BodyContainer>
            <div className="text-containter">
                <div>
                <h1>Welcome!</h1>
                <p>Good to see you back.</p>
                </div>
            </div>
        </BodyContainer>
    )
}