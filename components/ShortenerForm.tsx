"use client";
import { useState } from "react";

export default function ShortenerForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setShortUrl("");

        const res = await fetch("/api/shorten", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url, alias }),
        });

        const data = await res.json();
        if (!res.ok) {
            setError(data.error || "Unknown error");
        } else {
            setShortUrl(`${window.location.origin}/api/redirect/${alias}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={e => setUrl(e.target.value)}
                required
                className="border border-zinc-700 bg-zinc-900 text-zinc-100 p-2 w-full rounded"
            />
            <input
                type="text"
                placeholder="Enter alias"
                value={alias}
                onChange={e => setAlias(e.target.value)}
                required
                className="border border-zinc-700 bg-zinc-900 text-zinc-100 p-2 w-full rounded"
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded font-semibold">
                Shorten
            </button>
            {error && <div className="text-red-500 font-medium">{error}</div>}
            {shortUrl && (
                <div className="mt-2 text-zinc-100">
                    Shortened URL:{" "}
                    <a
                        href={shortUrl}
                        className="text-blue-400 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {shortUrl}
                    </a>
                </div>
            )}
        </form>
    );
}