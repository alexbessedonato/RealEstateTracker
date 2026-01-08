import { useGetDate } from "../../../../shared/hooks/useGetDate/useGetDate"
import { PropertyInfoList } from "../PropertyInfoList/PropertyInfoList"
import { $auth } from "../../../../store/AuthContext";
import { useStore } from "@nanostores/react";
import { AddPropertyButton } from "../../../../shared/Header/components/AddPropertyButton/AddPropertyButton";

export const PropertiesCard = () => {
    const { user } = useStore($auth);
    const date = useGetDate();

    return (
        <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-7xl ring-1 ring-black/10 bg-white/10 shadow-lg rounded-3xl p-8">
                {user ? (
                    <>
                        {/* Contenedor Flex para alinear Título/Fecha y Botón */}
                        <div className="flex items-center justify-between border-b border-gray-400 pb-4">
                            <div>
                                <p className="text-lg text-gray-800 font-bold">Properties Summary</p>
                                <p className="text-gray-500">updated {date}</p>
                            </div>

                            {/* El Botón alineado a la derecha */}
                            <AddPropertyButton />

                        </div>

                        <PropertyInfoList />
                    </>
                ) : (
                    <div className="flex justify-center items-center py-10 text-gray-500">
                        Log in to see Data
                    </div>
                )}
            </div>
        </div>
    );
};