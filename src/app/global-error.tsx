"use client";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="min-h-screen bg-white text-black flex items-center justify-center p-4">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-red-600">
                            Something went wrong!
                        </h1>
                        <p className="text-gray-600">
                            An unexpected error occurred. Please try again.
                        </p>
                    </div>
                    <button
                        onClick={reset}
                        className="px-6 py-3 bg-black text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </body>
        </html>
    );
}
