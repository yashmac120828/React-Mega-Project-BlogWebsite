import React from 'react'

function Button({ 
    children,
    type = 'button',
    bgColor = 'bg-gradient-to-r from-blue-500 to-purple-500',
    textColor = 'text-white',
    className = '',
    variant = 'primary',
    size = 'md',
    ...props
}) {
    const baseClasses = 'relative overflow-hidden font-medium rounded-xl transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
        primary: `${bgColor} ${textColor} shadow-lg hover:shadow-xl hover:scale-105`,
        secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md',
        outline: 'bg-transparent text-blue-600 border-2 border-blue-500 hover:bg-blue-500 hover:text-white',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }
    
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl'
    }
    
    const variantClass = variants[variant] || variants.primary
    const sizeClass = sizes[size] || sizes.md
    
    return (
        <button 
            type={type}
            className={`${baseClasses} ${variantClass} ${sizeClass} ${className} group`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center space-x-2">
                {children}
            </span>
            {variant === 'primary' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
        </button>
    )
}

export default Button