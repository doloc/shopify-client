import RelevantProducts from "@/components/main/about-us/relevant-products"
import StoreIntro from "@/components/main/about-us/store-intro"

const AboutUs = () => {
    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <StoreIntro />

            <RelevantProducts />
        </div>
    )
}

export default AboutUs