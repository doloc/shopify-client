'use client'
import { translations } from "@/app/configuration/language";
import { languageState } from "@/components/atom/atom";
import ContactComponent from "@/components/main/contact/contact-component"
import { useRecoilValue } from "recoil";

const Contact = () => {
    const language = useRecoilValue<string>(languageState);
    
    return (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <ContactComponent
                title={translations[language].contacts.title}
                description="Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi để biết thêm thông tin về sản phẩm nội thất thịnh hành."
                contactInfo={[
                    { label: `${translations[language].contacts.support}`, value: "1234567890" },
                    { label: `${translations[language].contacts.feedback}`, value: "support@shopify.vn" },
                ]}
                form={{
                    fields: [
                    { id: "name", label: "Tên của bạn", type: "text", placeholder: "Nhập tên của bạn" },
                    { id: "email", label: "Địa chỉ email*", type: "email", placeholder: "Nhập địa chỉ email" },
                    {
                        id: "message",
                        label: "Tin nhắn của bạn*",
                        type: "textarea",
                        placeholder: "Nhập tin nhắn của bạn",
                    },
                    ],
                    buttonText: "Gửi thông tin",
                }}
            />

            <ContactComponent
                title={translations[language].contacts.title2}
                description="Chúng tôi cung cấp các sản phẩm nội thất thịnh hành, trẻ trung và hiện đại. Hãy đến với chúng tôi để trải nghiệm."
                contactInfo={[
                { label: `${translations[language].contacts.address}`, value: "123 Đường Thời Trang, TP.HCM" },
                { label: `${translations[language].contacts.time}`, value: "9 AM - 9 PM" },
                ]}
                mapEmbed="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.196370042364!2d-122.41941608468134!3d37.77492977975915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064ff69e775%3A0x5b85304d11fa82ad!2sHilltop%20St%2C%20San%20Francisco%2C%20CA%2094134%2C%20USA!5e0!3m2!1sen!2s!4v1630600888955!5m2!1sen!2s"
            />
        </div>
    )
}

export default Contact