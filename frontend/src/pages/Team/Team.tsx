import {FC, useCallback, useEffect, useState} from "react";
import './Team.scss';
import {useNavigate, useParams} from "react-router-dom";
import {teams} from "@/services/teams.tsx";
import {TEAM} from "@/types/team.ts";
import {player as playerService} from "@/services/player.tsx";
import {PLAYER_PROFILE} from "@/types/player.ts";
import {Badge} from "@/components/common/Badge/Badge.tsx";
import {Table} from "@/components/ui/table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/ui/data-table.tsx";
import {DataTableColumnHeader} from "@/components/ui/data-table-header.tsx";
import {useStore} from "@nanostores/react";
import {Button} from "@/components/common/Button/Button.tsx";
import {playerStore} from "@/store/player.ts";

const CLASS = 'team';


export const Team: FC = () => {
    const match = useParams();
    const player = useStore(playerStore.profile);
    const [team, setTeam] = useState<TEAM>();
    const [members, setMembers] = useState<PLAYER_PROFILE[]>();
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);

    const handleChangePlayerTeam = (teamId?: number | null) => {
        playerService.playerTeam(player.id, {teamId: teamId ?? null}).then((response) => {
            if (response.statusText === 'OK' && match.teamId) {
                playerService.profile(player.userId).then((response) => {
                    if (response.statusText === 'OK') {
                        playerStore.profile.set(response.data)
                    }
                })
                playerService.teamPlayers(match.teamId).then((response) => {
                    if (response.statusText === 'OK') {
                        setMembers(response.data)
                    }
                })
            }
        })
    }

    const handleNavigateToPlayer = (userId: string) => {
        onNavigate(`/player/profile/${userId}`)
    }

    const columns: ColumnDef<PLAYER_PROFILE>[] = [
        {
            accessorKey: "id",
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="ID"/>
            )
        },
        {
            accessorKey: "name",
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Name"/>
            )
        },
        {
            accessorKey: "statistics.beatLeaderStatistics.countryRank",
            cell: ({row}) => row.original.statistics?.beatLeaderStatistics?.countryRank ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Country rank BeatLeader"/>
            )
        },
        {
            accessorKey: "statistics.scoreSaberStatistics.countryRank",
            cell: ({row}) => row.original.statistics?.scoreSaberStatistics?.countryRank ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Country rank ScoreSaber"/>
            )
        },
        {
            accessorKey: "statistics.beatLeaderStatistics.rank",
            cell: ({row}) => row.original.statistics?.beatLeaderStatistics?.rank ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Rank BeatLeader"/>
            )
        },
        {
            accessorKey: "statistics.scoreSaberStatistics.rank",
            cell: ({row}) => row.original.statistics?.scoreSaberStatistics?.rank ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Rank ScoreSaber"/>
            )
        },
        {
            accessorKey: "statistics.beatLeaderStatistics.pp",
            cell: ({row}) => row.original.statistics?.beatLeaderStatistics?.pp ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Total PP BeatLeader"/>
            )
        },
        {
            accessorKey: "statistics.scoreSaberStatistics.pp",
            cell: ({row}) => row.original.statistics?.scoreSaberStatistics?.pp ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Total PP ScoreSaber"/>
            )
        },
        {
            accessorKey: "statistics.beatLeaderStatistics.totalPlayCount",
            cell: ({row}) => row.original.statistics?.beatLeaderStatistics?.totalPlayCount ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Total play count BeatLeader"/>
            )
        },
        {
            accessorKey: "statistics.scoreSaberStatistics.totalPlayCount",
            cell: ({row}) => row.original.statistics?.scoreSaberStatistics?.totalPlayCount ?? 'N/A',
            header: ({column}) => (
                <DataTableColumnHeader column={column} title="Total play count ScoreSaber"/>
            )
        },
    ]

    useEffect(() => {
        if (match.teamId) {
            teams.team(match.teamId).then((response) => {
                if (response.statusText === 'OK') {
                    setTeam(response.data)
                }
            })
            playerService.teamPlayers(match.teamId).then((response) => {
                if (response.statusText === 'OK') {
                    setMembers(response.data)
                }
            })
        }
    }, []);

    return (
        <div className={CLASS}>
            <div className={`${CLASS}__wrapper`}>
                <h1 className={`${CLASS}__title`}>Team {team?.name}</h1>

                <div className={'flex justify-between'}>
                    <div className={'flex gap-4'}>
                        <Badge label={'Total PP BeatLeader'} value={team?.totalPPBeatLeader ? (+team.totalPPBeatLeader).toFixed(2) : 0}/>
                        <Badge label={'Total PP ScoreSaber'} value={team?.totalPPScoreSaber ? (+team?.totalPPScoreSaber).toFixed(2) : 0}/>
                        <Badge label={'Players'} value={members?.length}/>
                    </div>
                    {player && player?.teamId === null ?
                        <Button label={'Join team'} size={'xs'} type={'button'}
                                onClick={() => handleChangePlayerTeam(team?.id)}/> :
                        (team?.id === player.teamId && <Button label={'Leave team'} size={'xs'} type={'button'}
                                                               onClick={() => handleChangePlayerTeam(null)}/>)}

                </div>


                {team?.coachName &&
                    <div>
                        Coach: {team?.coachName}
                    </div>
                }

            </div>

            {members &&
                <div className={`${CLASS}__wrapper`}>
                    <h2 className={`${CLASS}__title`}>Players</h2>
                    <Table className={'overflow-x-scroll'}>
                        <DataTable columns={columns} data={members} onRowClick={(userId: string) => handleNavigateToPlayer(userId)}/>
                    </Table>
                </div>
            }
        </div>
    )
}