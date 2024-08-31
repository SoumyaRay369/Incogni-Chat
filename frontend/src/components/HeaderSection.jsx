export const HeaderSection = () => {
    return (
        <>
            <div className="bg-black py-4 flex items-center justify-between relative">
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="font-serif text-xl text-neutral-200">Group Name</h1>
                </div>
                <button className="ml-auto mr-4 rounded-md text-white font-mono p-2 bg-slate-400">Video Chat</button>
            </div>
        </>
    )
}
