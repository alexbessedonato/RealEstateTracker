import { useGetDate } from "../../../../shared/hooks/useGetDate/useGetDate"
import { PropertyInfoList } from "../PropertyInfoList/PropertyInfoList"
import { $auth } from "../../../../store/AuthContext";
import { useStore } from "@nanostores/react";

export const PropertiesCard = () => {

    const { user } = useStore($auth);

    const date = useGetDate();
    return (
        <>
            < div className="flex items-center justify-center p-6" >
                <div className="w-full max-w-7xl ring-1 ring-black/10 bg-white/10 shadow-lg rounded-3xl p-8">

                    {user ? (
                        <div className="border-b border-gray-400 pb-4">
                            <p className="text-lg text-gray-800 font-bold">Properties Summary</p>
                            <p className="text-gray-500">updated {date}</p>
                            <PropertyInfoList />
                        </div >) : (<div className="flex justify-center items-center">Log in to see Data</div>)}
                </div>

            </div>

        </>
    )
}