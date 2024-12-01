'use client'
import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useRecoilValue } from "recoil";

const Footer = () => {
    const language = useRecoilValue<string>(languageState);
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: any) => {
        e.preventDefault();
        setEmail("");
      };

    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center mb-4">
                    <img
                        src="https://images.unsplash.com/photo-1621839673705-6617adf9e890"
                        alt="LuxHome Logo"
                        className="h-8 w-8 mr-2 rounded"
                    />
                    <h3 className="text-xl font-bold">LuxHome</h3>
                    </div>
                    <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                        <FiMapPin className="h-5 w-5 mr-2" />
                        <span>{translations[language].footer.address}</span>
                    </div>
                    <div className="flex items-center">
                        <FiPhone className="h-5 w-5 mr-2" />
                        <span>{translations[language].footer.phone}</span>
                    </div>
                    <div className="flex items-center">
                        <FiMail className="h-5 w-5 mr-2" />
                        <span>{translations[language].footer.email}</span>
                    </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">
                        {translations[language].footer.quickLinks}
                    </h3>
                    <ul className="space-y-2">
                    <li>
                        <button className="hover:text-gray-300">
                            {translations[language].navigation.products}
                        </button>
                    </li>
                    <li>
                        <button className="hover:text-gray-300">
                            {translations[language].navigation.news}
                        </button>
                    </li>
                    <li>
                        <button className="hover:text-gray-300">
                            {translations[language].navigation.aboutUs}
                        </button>
                    </li>
                    <li>
                        <button className="hover:text-gray-300">
                            {translations[language].navigation.contact}
                        </button>
                    </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">
                    {translations[language].footer.newsletter}
                    </h3>
                    <form onSubmit={handleSubscribe} className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={
                                translations[language].footer.newsletterPlaceholder
                            }
                            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {translations[language].footer.subscribe}
                        </button>
                    </form>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">
                        {translations[language].footer.followUs}
                    </h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-400 transition-colors">
                            <FaFacebook className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:text-blue-400 transition-colors">
                            <FaTwitter className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:text-pink-400 transition-colors">
                            <FaInstagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="hover:text-blue-400 transition-colors">
                            <FaLinkedin className="h-6 w-6" />
                        </a>
                    </div>
                </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p>{translations[language].footer.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer