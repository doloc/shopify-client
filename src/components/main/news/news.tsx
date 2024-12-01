import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import { useRecoilValue } from "recoil";

const News = () => {
    const language = useRecoilValue<string>(languageState);

    const articles = [
        {
            title: "Modern Interior Design Trends 2024",
            description: "Discover the latest trends in interior design and home decoration for the upcoming year.",
            date: "January 15, 2024",
            image: "images.unsplash.com/photo-1616486338812-3dadae4b4ace"
        },
        {
            title: "Sustainable Furniture Solutions",
            description: "Learn about eco-friendly furniture options and how to make sustainable choices for your home.",
            date: "January 12, 2024",
            image: "images.unsplash.com/photo-1618221195710-dd6b41faaea6"
        },
        {
            title: "Smart Home Integration Guide",
            description: "Everything you need to know about integrating smart technology into your home furniture.",
            date: "January 10, 2024",
            image: "images.unsplash.com/photo-1584622650111-993a426fbf0a"
        }
    ]

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">{translations[language].news.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative pb-[60%] overflow-hidden">
                    <img
                    src={`https://${article.image}`}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.description}</p>
                    <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    {translations[language].news.readMore} →
                    </button>
                </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default News