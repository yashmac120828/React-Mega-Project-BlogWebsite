import React, { useId } from "react"

const Input = React.forwardRef(function Input({
    label, 
    type = "text", 
    className = '', 
    error,
    required = false,
    ...props
}, ref) {
    const id = useId()
    
    return (
        <div className="w-full group">
            {label && (
                <label 
                    className="block text-sm font-semibold text-gray-700 mb-3 group-focus-within:text-blue-600 transition-colors duration-200" 
                    htmlFor={id}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <input 
                    type={type} 
                    className={`
                        w-full px-4 py-3.5 text-gray-900 bg-white border-2 border-gray-200 rounded-xl
                        transition-all duration-300 ease-in-out
                        focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:outline-none
                        hover:border-gray-300 hover:shadow-sm
                        placeholder:text-gray-400
                        ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : ''}
                        ${className}
                    `}
                    ref={ref} 
                    {...props} 
                    id={id}
                />
                {type === 'password' && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                )}
                {type === 'email' && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </p>
            )}
        </div>
    )
})

export default Input