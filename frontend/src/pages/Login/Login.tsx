import {FC} from "react";
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

const CLASS = 'login-page'


export const LoginPage: FC = () => {
    const formSchema = z.object({
        login: z.string().min(2, {
            message: "Login must be at least 2 characters.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        })
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            password: ""

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
                                <Input placeholder="login / email" {...field} />
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
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className={`${CLASS}__buttons`}>
                    <Button type={'submit'} size={'s'} label={'Sign in'}/>
                    <Button type={'button'} size={'s'} label={'Sign up'} view={'ghost'}/>
                </div>
            </form>
        </Form>

    )
}