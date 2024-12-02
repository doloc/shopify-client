const StoreIntro = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between bg-white p-6 md:p-12 gap-8">
            {/* Left Content */}
            <div className="md:w-1/2 space-y-4">
                <h2 className="text-5xl font-semibold">Giới thiệu về cửa hàng chúng tôi</h2>
                <p className="text-gray-600">
                Chúng tôi chuyên cung cấp các sản phẩm nội thất thịnh hành, phong cách
                trẻ trung hiện đại, mang đến sự lựa chọn đa dạng và chất lượng tốt nhất.
                </p>
                <button className="px-12 py-2 bg-transparent border border-black rounded-full font-medium hover:bg-black hover:text-white transition">
                Mua
                </button>
            </div>

            {/* Right Content */}
            <div className="md:w-1/2 mt-6 md:mt-0 relative">
                <img
                src="https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038" // Replace with your image URL
                alt="Store Display"
                className="rounded-lg w-full object-cover"
                />
                {/* Testimonial Overlay */}
                <div className="absolute bottom-4 left-4 bg-yellow-300 p-4 rounded-lg shadow-lg">
                <p className="text-lg font-medium">
                    <span className="font-bold text-2xl">“</span> Sản phẩm đẹp, chất lượng tuyệt vời!
                </p>
                <p className="text-gray-700 mt-2">Nguyễn An</p>
                </div>
            </div>
        </section>
    )
}

export default StoreIntro