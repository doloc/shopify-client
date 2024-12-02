const RelevantProducts = () => {
    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-5xl font-semibold text-center mb-8">Sản phẩm</h1>
            <p className="text-lg text-center mb-12">Cung cấp sản phẩm, thiết kế làm nổi bật căn nhà của bạn.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="relative">
                    <img src="https://plus.unsplash.com/premium_photo-1670360413887-9ebae9ace11c" alt="Image 1" className="w-full h-full object-cover rounded-lg"/>
                </div>

                <div className="relative">
                    <img src="https://plus.unsplash.com/premium_photo-1670360413200-1941655e8d96" alt="Image 2" className="w-full h-full object-cover rounded-lg"/>
                </div>

                <div className="relative">
                    <img src="https://plus.unsplash.com/premium_photo-1670360414899-4faf36e9c6a2" alt="Image 3" className="w-full h-full object-cover rounded-lg"/>
                </div>

                <div className="relative">
                    <img src="https://plus.unsplash.com/premium_photo-1670360413200-1941655e8d96" alt="Image 4" className="w-full h-full object-cover rounded-lg"/>
                </div>
            </div>
        </div>
    )
}

export default RelevantProducts