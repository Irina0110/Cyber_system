import {FC, useCallback} from "react";
import './SignUp.scss';
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
import Logo from '../../../public/Logo.svg?url'
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {auth} from "@/services/auth.tsx";
import {routes} from "@/router/routes.ts";
import {useNavigate} from "react-router-dom";

const CLASS = 'sign-up-page'

export const SignUpPage: FC = () => {
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);

    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const passwordValidation = new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
    const formSchema = z.object({
        login: z.string(
            {
                invalid_type_error: "Login is required"
            }
        ).min(5, {
            message: "Login must be more than 5 symbols"
        }).regex(/^[a-zA-Z0-9]*$/, {
            message: "Login can only contain letters and numbers"
        }),
        password: z.string({
            invalid_type_error: "Password is required"
        }).min(8, {
            message: "Min length is 8 symbols"
        }).regex(passwordValidation, {
            message: 'Password must contained minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
        }),
        email: z.string().email({
            message: "Incorrect email"
        }),
        confirmPassword: z.string().min(8, {
            message: "Min length is 8 symbols"
        }),
        role: z.string().min(1,
            {
                message: "Role is required"
            }
        ),
        beatLeaderId: z.string().optional(),
        scoreSaberId: z.string().optional(),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"]
    }).superRefine((data, ctx) => {
        if (data.role === 'PLAYER') {
            if (!data.beatLeaderId) {
                ctx.addIssue({
                    code: 'custom', // specify the issue code
                    path: ['beatLeaderId'],
                    message: "BeatLeader ID is required for role PLAYER"
                });
            }
            if (!data.scoreSaberId) {
                ctx.addIssue({
                    code: 'custom', // specify the issue code
                    path: ['scoreSaberId'],
                    message: "ScoreSaber ID is required for role PLAYER"
                });
            }
        }
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            login: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: 'PLAYER',
            beatLeaderId: '',
            scoreSaberId: ''
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        auth.signup({
            email: values.email,
            password: values.password,
            role: values.role,
            username: values.login,
            ...(values.role === 'PLAYER' && {beatLeaderId: values.beatLeaderId, scoreSaberId: values.scoreSaberId}),
        }).then((response) => {
            if (response.data.success) {
                onNavigate(routes.auth.login)
            } else {
                form.setError('root', {message: response.data.message})
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-7", CLASS)}>
                <div className={`${CLASS}__heading`}>
                    <img src={Logo} alt={'logo'} className={`${CLASS}__heading__logo`}/>
                    <h1>Sign up</h1>
                </div>

                <FormField
                    control={form.control}
                    name="login"
                    render={({field}) => (
                        <FormItem className={'w-2/3'}>
                            <FormLabel>Login</FormLabel>
                            <FormControl>
                                <Input placeholder="login" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem className={'w-2/3'}>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage/>
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem className={'w-2/3'}>
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirm password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({field}) => (
                        <FormItem className={'w-2/3'}>
                            <FormLabel>Select your role</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="PLAYER"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Player
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="COACH"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Coach
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {form.getValues().role === 'PLAYER' &&
                    <>
                        <FormField
                            control={form.control}
                            name="beatLeaderId"
                            render={({field}) => (
                                <FormItem className={'w-2/3'}>
                                    <FormLabel>BeatLeader ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="BeatLeader ID" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="scoreSaberId"
                            render={({field}) => (
                                <FormItem className={'w-2/3'}>
                                    <FormLabel>ScoreSaber ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ScoreSaber ID" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </>

                }
                {form.formState.errors.root && <FormMessage>{form.formState.errors.root.message}</FormMessage>}
                <div className={`${CLASS}__buttons`}>
                    <Button type={'submit'} size={'s'} label={'Sign up'}/>
                </div>
            </form>
        </Form>

    )
}