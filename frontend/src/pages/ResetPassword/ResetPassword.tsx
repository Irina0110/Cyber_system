import {FC, useCallback, useEffect, useState} from "react";
import './ResetPassword.scss';
import {useForm} from "react-hook-form";
import {z} from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {zodResolver} from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/common/Button/Button.tsx";
import Logo from '../../../public/Logo-full.svg?url'
import {useNavigate, useSearchParams} from "react-router-dom";
import {routes} from "@/router/routes.ts";
import {auth} from "@/services/auth.tsx";

const CLASS = 'login-page'


export const ResetPasswordPage: FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);

    const [isValidToken, setIsValidToken] = useState(false);

    useEffect(() => {
        if (token) {
            auth.checkToken({token}).then((response) => {
                if (!response.data.tokenValid) {
                    //onNavigate(routes.error)
                } else {
                    setIsValidToken(response.data.tokenValid)
                }
            })
        } else {
            onNavigate(routes.error)
        }
    }, []);

    const formSchema = z.object({
        password: z.string({
            invalid_type_error: "Password is required"
        }).min(1, {
            message: "Password is required"
        })
    }).required()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: ''
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {

    }

    return (
        !isValidToken && <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-7", CLASS)}>
                <img src={Logo} alt={'logo'} className={`${CLASS}__logo`}/>
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className={'w-2/3'}>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} type={'password'}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                <div className={`${CLASS}__buttons`}>
                    <Button type={'submit'} size={'s'} label={'Sign in'}/>
                    <Button type={'button'} size={'s'} label={'Sign up'} view={'ghost'}
                            onClick={() => onNavigate(routes.auth.signup)}/>
                </div>
            </form>
        </Form>
    )
}