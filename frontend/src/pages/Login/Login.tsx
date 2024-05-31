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
import {auth} from "@/services/auth.tsx";
import {commonStore} from "@/store/common.ts";

const CLASS = 'login-page'


export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);

    const formSchema = z.object({
        username: z.string(
            {
                invalid_type_error: "Login is required"
            }
        ).min(1, {
            message: "Login is required"
        }).regex(/^[a-zA-Z0-9]*$/, {
            message: "Login can only contain letters and numbers"
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
            username: '',
            password: ''
        },
    })
    const onSubmit = (values: z.infer<typeof formSchema>) => {
        auth.login(values).then((response) => {
            if (!response.error) {
                commonStore.user.set(response.data);
                localStorage.setItem('token', response.data.accessToken);
                localStorage.setItem('tokenExpires', response.data.expiresIn);
                onNavigate(`/${response.data.role.toLowerCase()}/profile/${response.data.id}`)
            } else {
                form.setError('root', {message: "User doesn't exist"})
            }
        }).catch(() => {
            form.setError('root', {message: "User doesn't exist"})
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-7", CLASS)}>
                <img src={Logo} alt={'logo'} className={`${CLASS}__logo`}/>
                <FormField
                    control={form.control}
                    name="username"
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