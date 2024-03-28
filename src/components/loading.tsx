export default function LoadingSeletoken() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="inline-block w-80 h-80 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="border-white border-solid border-32 border-t-transparent border-b-transparent animate-hourglass"></div>
                </div>
            </div>
        </div>
    )
}
