import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

const Navigator = () => {
    const language = useRecoilValue<string>(languageState);
    const [currentSlide, setCurrentSlide] = useState(0);

    const heroSlides = [
        {
          image: "images.unsplash.com/photo-1618221195710-dd6b41faaea6",
          title: translations[language].hero[0].title,
          subtitle: translations[language].hero[0].subtitle
        },
        {
          image: "images.unsplash.com/photo-1616486338812-3dadae4b4ace",
          title: translations[language].hero[1].title,
          subtitle: translations[language].hero[1].subtitle
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
          setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
         <div className="relative h-[60vh] overflow-hidden">
            {heroSlides.map((slide, index) => (
            <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
                <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(https://${slide.image})` }}
                >
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                </div>
                <div className="relative h-full flex items-center justify-center text-center text-white">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                    {translations[language].hero[0].cta}
                    </button>
                </div>
                </div>
            </div>
            ))}
        </div>
    )
}

export default Navigator