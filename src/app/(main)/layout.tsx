import Checkout from "@/components/main/checkout/checkout";
import Footer from "@/components/main/layout/footer";
import Header from "@/components/main/layout/header";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <Checkout />
            <Footer />
        </>
    );
}
  