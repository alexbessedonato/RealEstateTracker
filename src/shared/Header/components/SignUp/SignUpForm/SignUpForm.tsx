import { useForm, type SubmitHandler } from "react-hook-form";
import { supabase } from "../../../../../app/routes/Supabase/SupabaseClient";

interface SignUpFormProps {
    onClose: () => void;
}

interface SignUpForm {
    email: string;
    password: string;
    username: string;
}

export const SignUpForm = ({ onClose }: SignUpFormProps) => {

    const { register, handleSubmit } = useForm<SignUpForm>();

    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
            options: {
                data: {
                    display_name: data.username,
                }
            }
        });

        if (error) alert(error.message);
        else {
            console.log("Sign Up successful");
            onClose();
        };
    };

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-4 flex flex-col">
                <input placeholder="Username" className="p-2 border border-black rounded-sm" {...register("username", { required: true })} />
            </div>
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
