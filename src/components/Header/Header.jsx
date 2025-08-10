import React from 'react';
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
    const authStatus = useSelector((state) => state.auth?.status)
    const navigate = useNavigate()
    
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (
        <header className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm'>
            <Container>
                <nav className='flex items-center justify-between py-4'>
                    <div className='flex items-center space-x-8'>
                        <Link to='/' className='group'>
                            <div className='transform transition-transform duration-200 group-hover:scale-105 '>
                                <Logo width='80px' />
                            </div>
                        </Link>
                    </div>
                    
                    <div className='hidden md:flex items-center space-x-1'>
                        {navItems.map((item) => (
                            item.active ? (
                                <button
                                    key={item.name}
                                    className='relative px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-200 hover:bg-gray-100/80 group'
                                    onClick={() => navigate(item.slug)}
                                >
                                    <span className='relative z-10'>{item.name}</span>
                                    <div className='absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                                </button>
                            ) : null
                        ))}
                        {authStatus && <LogoutBtn />}
                    </div>

                    <div className='md:hidden'>
                        <button className='p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'>
                            <svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                            </svg>
                        </button>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header