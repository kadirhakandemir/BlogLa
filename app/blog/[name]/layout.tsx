export default function BlogLayout({ children }: { children: React.ReactNode; }) {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-7 mb-24">
            {children}
        </main>
    );
}