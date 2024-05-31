import {FC, useCallback, useEffect, useState} from "react";
import './CoachProfile.scss';
import {jwtDecode} from "jwt-decode";
import {JWT_PAYLOAD} from "@/types/common.ts";
import {isTokenExpired} from "@/lib/utils.ts";
import {routes} from "@/router/routes.ts";
import {useNavigate, useParams} from "react-router-dom";
import {coachServices} from "@/services/coach.ts";
import {coachStore} from "@/store/coach.ts";
import {useStore} from "@nanostores/react";
import {TEAM} from "@/types/team.ts";
import {Badge} from "@/components/common/Badge/Badge.tsx";
import {Button} from "@/components/common/Button/Button.tsx";
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {teams as teamService} from '@/services/teams.tsx';
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";

const CLASS = 'coach-profile';

export const CoachProfile: FC = () => {
    const profile = useStore(coachStore.profile);
    const [teams, setTeams] = useState<TEAM[]>([])
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const params = useParams();
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);


    const formSchema = z.object({
        name: z.string(
            {
                invalid_type_error: "Team name is required"
            }
        ).min(1, {
            message: "Team name is required"
        })
    }).required()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    })

    const handleCreateTeam = (values: z.infer<typeof formSchema>) => {
        teamService.createTeam({name: values.name, coachId: profile.id}).then((response) => {
            if (!response.error) {
                coachServices.teams(profile.id).then((response) => {
                    if (response.statusText === 'OK') {
                        setTeams(response.data)
                    }
                })
                setIsOpenModal(false)
                form.reset();
            }
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && params.coachId) {
            const user = jwtDecode<JWT_PAYLOAD>(token)
            if (isTokenExpired(user.exp)) {
                localStorage.clear();
                onNavigate(routes.auth.login)
            } else {
                coachServices.profile(+params.coachId).then((response) => {
                    if (response.statusText === 'OK') {
                        coachStore.profile.set(response.data)
                        coachServices.teams(response.data.id).then((response) => {
                            if (response.statusText === 'OK') {
                                setTeams(response.data)
                            }
                        })
                    }
                })
            }
        }
    }, [params.coachId]);
    return (
        <div className={CLASS}>
            <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
                <div className={'flex justify-between items-center'}>
                    <h1 className={`${CLASS}__title`}>Coach profile: <strong>{profile.username}</strong></h1>
                    <DialogTrigger asChild>
                        <Button label={'Create team'} size={'s'} type={'button'} classname={'w-[230px]'}/>
                    </DialogTrigger>
                </div>

                <div className={'flex flex-col gap-4'}>
                    <h1 className={`${CLASS}__title`}>Teams</h1>
                    <div className={'flex flex-wrap  justify-between gap-4'}>
                        {teams.map((team) =>
                            <div key={team.id} className={`${CLASS}__card`}
                                 onClick={() => onNavigate(`/teams/${team.id}`)}>
                                <div className={'text-xl'}>Team: <strong>{team.name}</strong></div>
                                <div>Players: {team.playersCount}</div>
                                <div className={'flex flex-wrap gap-4'}>
                                    <Badge label={'Total PP BeatLeader'}
                                           value={team?.totalPPBeatLeader ? (+team.totalPPBeatLeader).toFixed(2) : 0}/>
                                    <Badge label={'Total PP ScoreSaber'}
                                           value={team?.totalPPScoreSaber ? (+team?.totalPPScoreSaber).toFixed(2) : 0}/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <DialogContent className="sm:max-w-[425px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateTeam)}>
                            <DialogHeader>
                                <DialogTitle>Create team</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4 mt-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem className={"grid items-center gap-1"}>
                                            <FormLabel htmlFor="name">Team name</FormLabel>
                                            <FormControl>
                                                <Input className="col-span-3" placeholder="Team name" {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter>
                                <Button size={'s'} label={'Create team'} type={"submit"} classname={'mt-3'}/>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}