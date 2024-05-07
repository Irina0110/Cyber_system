import {FC, useCallback} from "react";
import './Login.scss';
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
import {useNavigate} from "react-router-dom";
import {routes} from "@/router/routes.ts";

const CLASS = 'login-page'


export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);

    const formSchema = z.object({
        login: z.string(
            {
                invalid_type_error: "Login is required"
            }
        ).min(1, {
            message: "Login is required"
        }),
        password: z.string({
            invalid_type_error: "Password is required"
        }).min(1, {
            message: "Password is required"
        })
    }).required()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: '',
            password: ''
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-7", CLASS)}>
                <img src={Logo} alt={'logo'} className={`${CLASS}__logo`}/>
                <FormField
                    control={form.control}
                    name="login"
                    render={({field}) => (
                        <FormItem className={'w-2/3'}>
                            <FormLabel>Login / Email</FormLabel>
                            <FormControl>
                                <Input placeholder="login / email" {...field}/>
                            </FormControl>
                            <FormMessage color={'#fff'}/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className={'w-2/3'}>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={`${CLASS}__buttons`}>
                    <Button type={'submit'} size={'s'} label={'Sign in'}/>
                    <Button type={'button'} size={'s'} label={'Sign up'} view={'ghost'}
                            onClick={() => onNavigate(routes.auth.signup)}/>
                </div>
            </form>
        </Form>

    )
}