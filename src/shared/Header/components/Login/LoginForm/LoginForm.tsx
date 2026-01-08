import { useForm, type SubmitHandler } from "react-hook-form";
import { supabase } from "../../../../../app/routes/Supabase/SupabaseClient";

interface LoginFormProps {
    onClose: () => void;
}

interface LoginForm {
    email: string;
    password: string;
}

export const LoginForm = ({ onClose }: LoginFormProps) => {

    const { register, handleSubmit } = useForm<LoginForm>();

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (error) alert(error.message);
        else {
            console.log("Login successful");
            onClose();
        };
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-4 flex flex-col">
                <input placeholder="Email" className="p-2 border border-black rounded-sm" {...register("email", { required: true })} />
            </div>
            <div className="pt-4 flex flex-col">
                <input placeholder="Password" className="p-2 border border-black rounded-sm" {...register("password", { required: true })} />
            </div>

            <input className="pt-6" type="submit" />
        </form>
    )
}
