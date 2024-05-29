import {FC, useCallback, useEffect, useState} from "react";
import './Teams.scss';
import {teams as teamsService} from "@/services/teams.tsx";
import {TEAM} from "@/types/team.ts";
import {Table, TableCell, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useNavigate} from "react-router-dom";

const CLASS = 'teams';

export const Teams:FC = () => {
    const [teams, setTeams] = useState<TEAM[]>();
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);


    useEffect(() => {
        teamsService.getAllTeams().then((response) => {
            if (response.statusText === 'OK') {
                setTeams(response.data)
            }
        })
    }, []);

    return(
        <div className={CLASS}>
            <h1 className={`${CLASS}__title`}>Teams</h1>
            <div className={`${CLASS}__table`}>
                <Table>
                    <TableHeader className={'font-bold'}>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Coach</TableCell>
                        <TableCell>Total PP BeatLeader</TableCell>
                        <TableCell>Total PP Score Saber</TableCell>
                    </TableHeader>
                    {teams?.map((team) =>
                        <TableRow className={'h-9 hover:cursor-pointer'} onClick={() => onNavigate(`${team.id}`)}>
                            <TableCell>{team.id}</TableCell>
                            <TableCell>{team.name}</TableCell>
                            <TableCell>{team.coachName}</TableCell>
                            <TableCell>{team.totalPPBeatLeader ? (+team.totalPPBeatLeader).toFixed(2) : 0}</TableCell>
                            <TableCell>{team.totalPPScoreSaber ? (+team.totalPPScoreSaber).toFixed(2) : 0}</TableCell>
                        </TableRow>
                    )}
                </Table>
            </div>

        </div>
    )
}