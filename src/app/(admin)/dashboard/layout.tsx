import Header from "@/components/admin/layout/header";
import Panel from "@/components/admin/layout/panel";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-gray-100 flex">
                    <Panel />
                    <div className="flex-1 p-8">
                        <Header />
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
  