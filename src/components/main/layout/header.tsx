'use client'
import { translations } from "@/app/configuration/language";
import { cartState, languageState } from "@/components/atom/atom";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { FiHeart, FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from "react-icons/fi"
import { useRecoilState, useSetRecoilState } from "recoil";

const Header = () => {
    const setCartState = useSetRecoilState(cartState)
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [language, setLanguage] = useRecoilState<string>(languageState);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const handleLoginSubmit = (e: any) => {
        e.preventDefault();
        console.log("Login form submitted:", loginForm);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                    >
                        <FiMenu className="h-6 w-6" />
                    </button>
                    <Link href="/"><h1 className="text-2xl font-bold">LuxHome</h1></Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8">
                    <div className="relative group">
                        <button className="text-gray-600 hover:text-gray-900 font-medium py-2" onClick={() => router.push('/products')}>
                            {translations[language].navigation.products}
                        </button>
                        <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 hidden group-hover:block">
                        {translations[language].categories.map((category) => (
                            <button
                                key={category}
                                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                                onClick={() => router.push(`/products?category=${category}`)}
                            >
                                {category}
                            </button>
                        ))}
                        </div>
                    </div>
                    <button className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => router.push('/news')}>
                        {translations[language].navigation.news}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => router.push('/about-us')}>
                        {translations[language].navigation.aboutUs}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => router.push('/contact')}>
                        {translations[language].navigation.contact}
                    </button>
                    </div>

                    <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <input
                        type="text"
                        placeholder={translations[language].searchPlaceholder}
                        className="w-64 pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-md">
                        <FiHeart className="h-6 w-6" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setCartState((prev) => !prev)}>
                        <FiShoppingCart className="h-6 w-6" />
                    </button>
                    <button 
                        onClick={() => setIsLoginModalOpen(true)} 
                        className="p-2 hover:bg-gray-100 rounded-md"
                    >
                        <FiUser className="h-6 w-6" />
                    </button>
                    <button
                        onClick={() => setLanguage(language === "en" ? "vi" : "en")}
                        className="px-3 py-1 bg-gray-200 rounded-md font-medium hover:bg-gray-300"
                    >
                        {language.toUpperCase()}
                    </button>
                    </div>
                </div>
                </div>
            </nav>

            {isLoginModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
                    <button
                    onClick={() => setIsLoginModalOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                    <FiX className="h-6 w-6" />
                    </button>
                    
                    <h2 className="text-2xl font-bold mb-6 text-center">
                    {translations[language].loginTranslations.title}
                    </h2>
                    
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">
                        {translations[language].loginTranslations.email}
                        </label>
                        <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 mb-2">
                        {translations[language].loginTranslations.password}
                        </label>
                        <input
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={loginForm.rememberMe}
                            onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-600">
                            {translations[language].loginTranslations.rememberMe}
                        </span>
                        </label>
                        
                        <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                        {translations[language].loginTranslations.forgotPassword}
                        </button>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {translations[language].loginTranslations.loginButton}
                    </button>
                    </form>
                    
                    <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            {translations[language].loginTranslations.orContinueWith}
                        </span>
                        </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-3 gap-3">
                        <button className="flex justify-center items-center py-2 px-4 border rounded-md hover:bg-gray-50">
                        <FaGoogle className="h-5 w-5 text-red-600" />
                        </button>
                        <button className="flex justify-center items-center py-2 px-4 border rounded-md hover:bg-gray-50">
                        <FaFacebook className="h-5 w-5 text-blue-600" />
                        </button>
                        <button className="flex justify-center items-center py-2 px-4 border rounded-md hover:bg-gray-50">
                        <FaTwitter className="h-5 w-5 text-blue-400" />
                        </button>
                    </div>
                    </div>
                    
                    <p className="mt-6 text-center text-sm text-gray-500">
                    {translations[language].loginTranslations.dontHaveAccount}{" "}
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                        {translations[language].loginTranslations.signUp}
                    </button>
                    </p>
                </div>
                </div>
            )}

            {isMenuOpen && (
                <div className="lg:hidden bg-white border-b">
                <div className="container mx-auto px-4 py-2">
                    <div className="mb-2">
                    <button className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 font-medium">
                        {translations[language].navigation.products}
                    </button>
                    <div className="pl-4">
                        {translations[language].categories.map((category) => (
                        <button
                            key={category}
                            className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                        >
                            {category}
                        </button>
                        ))}
                    </div>
                    </div>
                    <button className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                    {translations[language].navigation.news}
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                    {translations[language].navigation.aboutUs}
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100">
                    {translations[language].navigation.contact}
                    </button>
                </div>
                </div>
            )}
        </>
    )
}

export default Header