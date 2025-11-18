import ShortenerForm from "@/components/ShortenerForm";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="max-w-md w-full p-6 bg-zinc-800 rounded-md shadow">
                <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
                <ShortenerForm />
            </div>
        </main>
    );
}
