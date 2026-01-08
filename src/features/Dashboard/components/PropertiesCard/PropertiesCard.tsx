import { useGetDate } from "../../../../shared/hooks/useGetDate/useGetDate"
import { PropertyInfoList } from "../PropertyInfoList/PropertyInfoList"

export const PropertiesCard = () => {
    const date = useGetDate();
    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-7xl ring-1 ring-black/10 bg-white/10 shadow-lg rounded-3xl p-8">
                <div className="border-b border-gray-400 pb-4">
                    <p className="text-lg text-gray-800 font-bold">Properties Summary</p>
                    <p className="text-gray-500">updated {date}</p>
                </div>
                <PropertyInfoList />
            </div>
        </div>
    )
}