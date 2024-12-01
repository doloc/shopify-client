'use client';
import Navigator from "@/components/main/home/navigator";
import Container from "@/components/main/home/container";
import News from "@/components/main/news/news";

const EcommerceHomepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* navigator */}
      <Navigator />

      {/* Container */}
      <Container />

      {/* News */}
      <News />
    </div>
  );
};

export default EcommerceHomepage;