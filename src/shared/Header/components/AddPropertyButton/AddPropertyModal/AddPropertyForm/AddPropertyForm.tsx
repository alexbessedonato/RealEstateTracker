import { useForm, type SubmitHandler } from "react-hook-form";
import { supabase } from "../../../../../../app/routes/Supabase/SupabaseClient";
import { $auth } from "../../../../../../store/AuthContext"; // Importa tu store

interface AddPropertyFormProps {
    onClose: () => void;
}

interface AddPropertyForm {
    name: string;
    address: string;
    rent: number;
    mortgage: number;
    insurance_url: string;
    contract_url: string;
}

export const AddPropertyForm = ({ onClose }: AddPropertyFormProps) => {
    const { register, handleSubmit, reset } = useForm<AddPropertyForm>();

    const onSubmit: SubmitHandler<AddPropertyForm> = async (data) => {
        // Obtenemos el ID del usuario logueado desde el store
        const { user } = $auth.get();

        if (!user) {
            alert("You must be logged in to add a property");
            return;
        }

        const { error } = await supabase
            .from('Property')
            .insert([
                {
                    name: data.name,
                    address: data.address,
                    rent: Number(data.rent), // Convertimos a número por seguridad
                    mortgage: Number(data.mortgage),
                    insurance_url: data.insurance_url,
                    contract_url: data.contract_url,
                    user_id: user.id // ¡Vital para que RLS te deje guardarlo!
                }
            ]);

        if (error) {
            alert(error.message);
        } else {
            console.log("Property added successfully");
            reset(); // Limpia el formulario
            onClose();
        }
    };

    return (
        <form className="flex flex-col gap-4 p-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-600 mb-1 uppercase">Property Name</label>
                <input placeholder="Example: Downtown Apartment" className="p-2 border border-gray-300 rounded-md" {...register("name", { required: true })} />
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-600 mb-1 uppercase">Address</label>
                <input placeholder="123 Real St." className="p-2 border border-gray-300 rounded-md" {...register("address")} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-600 mb-1 uppercase">Monthly Rent ($)</label>
                    <input type="number" placeholder="0" className="p-2 border border-gray-300 rounded-md" {...register("rent", { required: true })} />
                </div>
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-gray-600 mb-1 uppercase">Mortgage ($)</label>
                    <input type="number" placeholder="0" className="p-2 border border-gray-300 rounded-md" {...register("mortgage", { required: true })} />
                </div>
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-600 mb-1 uppercase">Insurance URL (Optional)</label>
                <input placeholder="https://..." className="p-2 border border-gray-300 rounded-md" {...register("insurance_url")} />
            </div>

            <div className="flex flex-col">
                <label className="text-xs font-bold text-gray-600 mb-1 uppercase">Contract URL (Optional)</label>
                <input placeholder="https://..." className="p-2 border border-gray-300 rounded-md" {...register("contract_url")} />
            </div>

            <button
                type="submit"
                className="mt-4 bg-blue-600 text-white py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
                Save Property
            </button>
        </form>
    );
};