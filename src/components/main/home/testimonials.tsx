import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import { useRecoilValue } from "recoil";

const Testimonials = () => {
    const language = useRecoilValue<string>(languageState);

    return (
        <section
            className="relative bg-cover bg-center h-[500px] text-white"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1638972691611-69633a3d3127')`,
                backgroundAttachment: "fixed", // Enables parallax effect
            }}
            >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 space-y-12 text-center">
                <h2 className="text-4xl font-bold">{translations[language].testimonials}</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    <div className="p-6 bg-white/80 text-black rounded-lg shadow-md max-w-xs">
                        <p className="text-lg font-medium">
                        &quot;Sản phẩm rất đẹp và chất lượng, tôi luôn nhận được nhiều lời khen
                        từ bạn bè.&quot;
                        </p>
                        <div className="mt-4 text-sm font-bold">- Ngọc Anh</div>
                    </div>
                    <div className="p-6 bg-white/80 text-black rounded-lg shadow-md max-w-xs">
                        <p className="text-lg font-medium">
                        &quot;Nội thất ở đây rất đẹp và hiện đại, tôi cảm thấy tự tin hơn khi nói về chúng.&quot;
                        </p>
                        <div className="mt-4 text-sm font-bold">- Minh Tuấn</div>
                    </div>
                    <div className="p-6 bg-white/80 text-black rounded-lg shadow-md max-w-xs">
                        <p className="text-lg font-medium">
                        &quot;Tôi rất thích các sản phẩm ở cửa hàng. Nó khiến ngôi nhà của tôi trở nên sang trọng.&quot;
                        </p>
                        <div className="mt-4 text-sm font-bold">- Thu Hiền</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials