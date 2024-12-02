import { FC } from "react";

const ContactComponent:FC<{
    title: string,
    description: string,
    contactInfo: {
        label: string;
        value: string;
    }[],
    form?: {
        fields: {
            id: string;
            label: string;
            type: string;
            placeholder: string;
        }[];
        buttonText: string;
    },
    mapEmbed?: string,
}> = ({title, description, contactInfo, form, mapEmbed}) => {
    return (
        <section className="py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-48">
                {/* Left Content */}
                <div className="space-y-6">
                    <h2 className="text-5xl font-semibold">{title}</h2>
                    <p className="text-lg text-gray-600">{description}</p>
                    {contactInfo && (
                        <div className="space-y-4">
                        {contactInfo.map((info, idx) => (
                            <div key={idx}>
                            <strong>{info.label}</strong>
                            <p className="text-gray-600">{info.value}</p>
                            </div>
                        ))}
                        </div>
                    )}
                </div>

                {/* Right Content */}
                <div>
                    {form ? (
                        <form className="space-y-6">
                        {form.fields.map((field, idx) => (
                            <div key={idx}>
                            <label
                                htmlFor={field.id}
                                className="block text-sm font-medium text-gray-600"
                            >
                                {field.label}
                            </label>
                            <input
                                type={field.type}
                                id={field.id}
                                placeholder={field.placeholder}
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                            />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-12 py-3 rounded-full hover:bg-blue-700"
                        >
                            {form.buttonText}
                        </button>
                        </form>
                    ) : null}

                    {mapEmbed ? (
                        <div className="mt-6">
                        <iframe
                            src={mapEmbed}
                            width="100%"
                            height="300"
                            allowFullScreen
                            loading="lazy"
                            className="rounded-lg border border-gray-300"
                        ></iframe>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
};

export default ContactComponent;