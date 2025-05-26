export default function TestTailwindPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">
                    Tailwind CSS Test Page
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Colors & Typography</h2>
                        <p className="text-gray-600 mb-4">This card tests basic colors and typography.</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                            Click me
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Flexbox & Spacing</h2>
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Success</span>
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Error</span>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded"></div>
                            <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Responsive Design</h2>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="bg-purple-100 h-16 rounded flex items-center justify-center">
                                <span className="text-purple-800 text-sm">Box 1</span>
                            </div>
                            <div className="bg-yellow-100 h-16 rounded flex items-center justify-center">
                                <span className="text-yellow-800 text-sm">Box 2</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Resize window to test responsiveness</p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white font-medium">Tailwind CSS is working!</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 