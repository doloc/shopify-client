import { comment } from "postcss";
import { title } from "process";

type Language = "en" | "vi";
type Translations = {
    [key: string]: {
        categories: string[];
        searchPlaceholder: string;
        testimonials: string;
        navigation: {
            products: string;
            news: string;
            aboutUs: string;
            contact: string;
        };
        loginTranslations: {
            title: string;
            email: string;
            password: string;
            rememberMe: string;
            forgotPassword: string;
            loginButton: string;
            orContinueWith: string;
            dontHaveAccount: string;
            signUp: string;
        };
        footer: {
            quickLinks: string;
            contact: string;
            address: string;
            phone: string;
            email: string;
            newsletter: string;
            newsletterPlaceholder: string;
            subscribe: string;
            copyright: string;
            followUs: string;
        };
        hero: {
            title: string;
            subtitle: string;
            cta: string;
        }[];
        container: {
            filters: string;
            featuredProducts: string;
            addToCart: string;
            compare: string;
            specifications: string;
            relatedProducts: string;
            description: string;
            sorting: {
                popularity: string;
                priceLow: string;
                priceHigh: string;
                newest: string;
            };
        };
        news: {
            title: string;
            readMore: string;
            sorting: {
                [key: string]: string;
            }
        };
        checkout: {
            cart: string;
            checkout: string;
            empty: string;
            total: string;
            quantity: string;
            remove: string;
            shipping: string;
            payment: string;
            placeOrder: string;
            credit: string;
            paypal: string;
            orderSummary: string;
            subtotal: string;
            shippingCost: string;
            tax: string;
            grandTotal: string;

        };
        reviews: {
            title: string;
            review: string;
            rating: string;
            comment: string;
            submit: string;
        };
        contacts: {
            title: string;
            title2: string;
            support: string;
            feedback: string;
            address: string;
            time: string;
        };
    };
};

const footer = {
    en: {
        footer: { 
            quickLinks: "Quick Links",
            contact: "Contact Us",
            address: "123 Luxury Street, City, Country",
            phone: "+1 234 567 890",
            email: "info@luxhome.com",
            newsletter: "Subscribe to Newsletter",
            newsletterPlaceholder: "Enter your email",
            subscribe: "Subscribe",
            copyright: "© 2024 LuxHome. All rights reserved.",
            followUs: "Follow Us"
        }
    },
    vi: {
        footer: {
            quickLinks: "Liên Kết Nhanh",
            contact: "Liên Hệ",
            address: "123 Đường Cao Cấp, Thành Phố, Quốc Gia",
            phone: "+1 234 567 890",
            email: "info@luxhome.com",
            newsletter: "Đăng Ký Nhận Tin",
            newsletterPlaceholder: "Nhập email của bạn",
            subscribe: "Đăng Ký",
            copyright: "© 2024 LuxHome. Đã đăng ký bản quyền.",
            followUs: "Theo Dõi Chúng Tôi"
        }
    }
}

const hero = {
    en: {
        hero: [
            {
                title: "Luxury Home Furnishings",
                subtitle: "Transform your space with premium quality products",
                cta: "Shop Now"
            },
            {
                title: "Modern Kitchen Solutions",
                subtitle: "Discover our latest kitchen collection",
                cta: "Shop Now"
            }
        ],
    },
    vi: {
        hero: [
            {
                title: "Nội Thất Cao Cấp",
                subtitle: "Thay đổi không gian của bạn với sản phẩm chất lượng cao",
                cta: "Mua Ngay"
            },
            {
                title: "Giải Pháp Nhà Bếp Hiện Đại",
                subtitle: "Khám phá bộ sưu tập nhà bếp mới nhất",
                cta: "Mua Ngay"
            }
        ],
    }
}

const container = {
    en: {
        container : {
            filters: "Filters",
            featuredProducts: "Featured Products",
            addToCart: "Add to Cart",
            compare: "Compare",
            specifications: "Specifications",
            relatedProducts: "Related Products",
            description: "Product Description",
            sorting: {
                popularity: "Sort by Popularity",
                priceLow: "Price: Low to High",
                priceHigh: "Price: High to Low",
                newest: "Newest First"
            },
        }
    },
    vi: {
        container : {
            filters: "Lọc",
            featuredProducts: "Sản Phẩm Nổi Bật",
            addToCart: "Thêm vào giỏ",
            compare: "So sánh",
            specifications: "Thông số kỹ thuật",
            relatedProducts: "Sản phẩm liên quan",
            description: "Mô tả sản phẩm",
            sorting: {
                popularity: "Sắp xếp theo Độ phổ biến",
                priceLow: "Giá: Thấp đến Cao",
                priceHigh: "Giá: Cao đến Thấp",
                newest: "Mới nhất"
            },
        }
    }
};

const news = {
    en: {
        news: {
            title: "Latest News",
            readMore: "Read More",
            sorting: {
                popularity: "Sort by Popularity",
                newest: "Newest First",
                oldest: "Oldest First",
            },
        },
    },
    vi: {
        news: {
            title: "Tin Tức Mới Nhất",
            readMore: "Xem Thêm",
            sorting: {
                popularity: "Sắp xếp theo Độ phổ biến",
                newest: "Mới nhất",
                oldest: "Cuối nhất",
            },
        },
    }
};

const checkout = {
    en: {
        checkout: {
            cart: "Shopping Cart",
            checkout: "Checkout",
            empty: "Your cart is empty",
            total: "Total",
            quantity: "Quantity",
            remove: "Remove",
            shipping: "Shipping Address",
            payment: "Payment Method",
            placeOrder: "Place Order",
            credit: "Credit Card",
            paypal: "PayPal",
            orderSummary: "Order Summary",
            subtotal: "Subtotal",
            shippingCost: "Shipping Cost",
            tax: "Tax",
            grandTotal: "Grand Total"
        }
    },
    vi: {
        checkout: {
            cart: "Giỏ Hàng",
            checkout: "Thanh Toán",
            empty: "Giỏ hàng trống",
            total: "Tổng cộng",
            quantity: "Số lượng",
            remove: "Xóa",
            shipping: "Địa Chỉ Giao Hàng",
            payment: "Phương Thức Thanh Toán",
            placeOrder: "Đặt Hàng",
            credit: "Thẻ Tín Dụng",
            paypal: "PayPal",
            orderSummary: "Tóm Tắt Đơn Hàng",
            subtotal: "Tạm tính",
            shippingCost: "Phí vận chuyển",
            tax: "Thuế",
            grandTotal: "Tổng cộng"
        }
    }
};

const contacts = {
    en: {
        contacts: {
            title: "Contact Us",
            title2: "Contact",
            support: "Support",
            feedback: "Feedback",
            address: "Adress",
            time: "Working Time"
        }
    },
    vi: {
        contacts: {
            title: "Liên Hệ Chúng Tôi",
            title2: "Liên Hệ",
            support: "Hỗ trợ",
            feedback: "Góp ý",
            address: "Địa chỉ",
            time: "Giờ làm việc"
        }
    }
}

const reviews = {
    en: {
        reviews: {
            title: "Customer Reviews",
            review: "Write a Review",
            rating: "Rating",
            comment: "Comment",
            submit: "Submit Review"
        }
    },
    vi: {
        reviews: {
            title: "Đánh giá của khách hàng",
            review: "Nhận xét",
            rating: "Đánh giá",
            comment: "Bình luận",
            submit: "Đăng nhận xét"
        }
    }
}

export const translations: Translations = {
    en: {
        categories: [
            "Kitchen",
            "Bathroom",
            "Living Room",
            "Bedroom",
            "Office",
            "Outdoor"
        ],
        searchPlaceholder: "Search ...",
        testimonials: "What our customers say about us?",
        navigation: {
            products: "Products",
            news: "News",
            aboutUs: "About Us",
            contact: "Contact"
        },
        loginTranslations: {
            title: "Login to Your Account",
            email: "Email Address",
            password: "Password",
            rememberMe: "Remember me",
            forgotPassword: "Forgot Password?",
            loginButton: "Login",
            orContinueWith: "Or continue with",
            dontHaveAccount: "Don't have an account?",
            signUp: "Sign up"
        },
        ...footer.en,
        ...hero.en,
        ...container.en,
        ...news.en,
        ...checkout.en,
        ...reviews.en,
        ...contacts.en
    },
    vi: {
        categories: [
            "Nhà Bếp",
            "Phòng Tắm",
            "Phòng Khách",
            "Phòng Ngủ",
            "Văn Phòng",
            "Ngoài Trời"
        ],
        searchPlaceholder: "Tìm kiếm ...",
        testimonials: "Khách hàng nói gì về chúng tôi?",
        navigation: {
            products: "Sản phẩm",
            news: "Tin tức",
            aboutUs: "Về chúng tôi",
            contact: "Liên hệ"
        },
        loginTranslations: {
            title: "Đăng Nhập Tài Khoản",
            email: "Địa Chỉ Email",
            password: "Mật Khẩu",
            rememberMe: "Ghi nhớ đăng nhập",
            forgotPassword: "Quên Mật Khẩu?",
            loginButton: "Đăng Nhập",
            orContinueWith: "Hoặc tiếp tục với",
            dontHaveAccount: "Chưa có tài khoản?",
            signUp: "Đăng ký"
        },
        ...footer.vi,
        ...hero.vi,
        ...container.vi,
        ...news.vi,
        ...checkout.vi,
        ...reviews.vi,
        ...contacts.vi
    }
}