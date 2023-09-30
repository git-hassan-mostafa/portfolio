'use client'
import React from 'react'
import SideBar from '../SideBar/SideBar'
import Header from '../Header/Header'
import Hamburger from '../SVG/Hamburger'
import colors from '@/utils/colors'
import NavBar from '../NavBar/NavBar'
import Options from '../SVG/Options'
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client'
import { client } from '@/utils/ApploClient'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const handleSideBarOpen = () => {
        document.querySelector('.sidebar')?.classList.toggle('open')
        document.querySelector('.main.main > .black-bar-close')?.classList.toggle('open')
        document.querySelector('.nav-bar')?.classList.toggle('nav-bar-hidden')
    }
    const handleNavBarOpen = ()=>{
        document.querySelector('.nav-bar')?.classList.toggle('open')
        
    }
    return (
        <ApolloProvider client={client}>
            <main className="main">
            <div className="black-bar-close" onClick={handleSideBarOpen} />
            <SideBar className='sidebar' />
            <div className="content" >
                <Header
                className='header mb-2'
                iconBar={{
                    gap: undefined,
                    elements: <Hamburger onclick={handleSideBarOpen} className='cursor-pointer hamburger-icon' size={'30'} color={colors.mainTextColor} />
                }} navigationBar={{
                    gap: undefined,
                    elements: undefined
                }} featuresBar={{
                    gap: undefined,
                    elements: <Options onclick={handleNavBarOpen} className='hidden options-icon cursor-pointer' size={'30'} color={colors.mainTextColor} />
                }} />
                {children}
            </div>
            <NavBar />
        </main>
        </ApolloProvider>
    )
}
