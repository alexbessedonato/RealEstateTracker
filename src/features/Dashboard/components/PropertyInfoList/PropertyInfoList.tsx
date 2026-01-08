export const PropertyInfoList = () => {
    // We use a custom grid template: 3 parts for Name, 1 part for each data column
    const rowStyle = "grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-2 pt-4 items-center";

    return (
        <>
            {/* Header Row */}
            <div className={`${rowStyle} font-bold text-gray-800 uppercase tracking-wider`}>
                <p>Name</p>
                <p className="text-center">Rent</p>
                <p className="text-center">Mortgage</p>
                <p className="text-center">Insurance</p>
                <p className="text-right">Contract</p>
            </div>

            {/* Data Row */}
            <div className={`${rowStyle} font-medium text-gray-600`}>
                <div className="flex flex-col min-w-0">
                    <p className="truncate">El Prat de Llobregat</p>
                    <p className="truncate text-blue-500 leading-tight">
                        Passatge Rector Martí i Piñol, 3, 08820 El Prat de Llobregat, Barcelona, Spain
                    </p>
                </div>

                <p className="text-center text-green-800">950$</p>
                <p className="text-center text-red-600">750$</p>
                <p className="text-center">Axa - contrato</p>
                <p className="text-right">Contrato</p>
            </div>
        </>
    )
}