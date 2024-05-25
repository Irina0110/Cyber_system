import {FC, useCallback, useEffect, useState} from "react";
import './PlayerProfile.scss';
import {player} from "@/services/player.tsx";
import {useStore} from "@nanostores/react";
import {playerStore} from "@/store/player.ts";
import {jwtDecode} from "jwt-decode";
import {JWT_PAYLOAD} from "@/types/common.ts";
import {cn, isTokenExpired} from "@/lib/utils.ts";
import {useNavigate} from "react-router-dom";
import {routes} from "@/router/routes.ts";
import {PLAYER_STATISTICS} from "@/types/player.ts";
import {Badge} from "@/components/common/Badge/Badge.tsx";
import {METRICS} from "@/constants/metrics.ts";
import {Table, TableCell, TableRow} from "@/components/ui/table.tsx";

const CLASS = 'player-profile'

export const PlayerProfile: FC = () => {
    const profile = useStore(playerStore.profile)
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);
    const [stat, setStat] = useState<PLAYER_STATISTICS | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode<JWT_PAYLOAD>(token)
            if (isTokenExpired(user.exp)) {
                localStorage.clear();
                onNavigate(routes.auth.login)
            } else {
                player.profile(user.id).then((response) => {
                    console.log(response)
                    if (response.statusText === 'OK') {
                        playerStore.profile.set(response.data)
                    }
                })
                player.statistics(user.id).then((response) => {
                    if (response.statusText === 'OK') {
                        console.log(response)
                        setStat(response.data)
                    }
                })
            }

        }

    }, []);

    return (
        <div className={CLASS}>
            <div className={`${CLASS}__row`}>
                <div className={'flex flex-col gap-4'}>
                    <h1 className={`${CLASS}__title`}>Player profile</h1>
                    <div className={cn(`${CLASS}__card`, 'h-full')}>
                        <div className={`${CLASS}__info`}>
                            <img src={profile.avatar}/>
                            <div className={'flex flex-col gap-1'}>
                                <h3>{profile.name}</h3>
                                {profile?.teamName && <span>Team: {profile?.teamName}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${CLASS}__card`}>
                    <div className={`${CLASS}__stat`}>
                        <h4>BeatLeader Statistics</h4>
                        {stat?.beatLeaderStatistics && <div className={`${CLASS}__stat__badges`}>
                            <Badge label={'World'} value={stat?.beatLeaderStatistics.rank}/>
                            <Badge label={'Country'} value={stat?.beatLeaderStatistics.countryRank}/>
                            <Badge label={'Top PP'} value={stat?.beatLeaderStatistics.topPp.toFixed(2)}/>
                            <Badge label={'Average ranked acc'}
                                   value={`${(stat?.beatLeaderStatistics?.averageRankedAccuracy * 100).toFixed(2)} %`}/>
                            <Badge label={'Total ranked score'}
                                   value={stat?.beatLeaderStatistics.totalRankedScore}/>
                        </div>}
                    </div>
                    <div className={`${CLASS}__stat`}>
                        <h4>Score saber Statistics</h4>
                        {stat?.scoreSaberStatistics && <div className={`${CLASS}__stat__badges`}>
                            <Badge label={'World'} value={stat?.scoreSaberStatistics.rank}/>
                            <Badge label={'Country'} value={stat?.scoreSaberStatistics.countryRank}/>
                            <Badge label={'pp'} value={stat?.scoreSaberStatistics.pp.toFixed(2)}/>
                            <Badge label={'Average ranked acc'}
                                   value={`${stat?.scoreSaberStatistics?.averageRankedAccuracy.toFixed(2)} %`}/>
                            <Badge label={'Total Play Count'} value={stat?.scoreSaberStatistics.totalPlayCount}/>
                            <Badge label={'Total Score'} value={stat?.scoreSaberStatistics.totalScore}/>
                        </div>}
                    </div>
                </div>
            </div>


            <div className={'flex gap-3'}>
                {stat?.scoreSaberStatistics && <div className={cn(`${CLASS}__card`, 'w-1/2')}>
                    <h4>Score saber Statistics</h4>
                    <Table>
                        {
                            Object.keys(METRICS).map((key) => {
                                if (key in (stat.scoreSaberStatistics)) {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                {METRICS[key]}
                                            </TableCell>
                                            <TableCell>
                                                {stat?.scoreSaberStatistics[key]}
                                            </TableCell>
                                        </TableRow>
                                    );
                                }
                                return null;
                            })
                        }
                    </Table>
                </div>}
            {stat?.beatLeaderStatistics && <div className={cn(`${CLASS}__card`, 'w-1/2')}>
                <h4>BeatLeader Statistics</h4>
                <Table>
                    {
                        Object.keys(METRICS).map((key) => {
                            const isTimeMetric = METRICS[key].toLowerCase().includes('time');
                            if (key in (stat.beatLeaderStatistics) && !isTimeMetric) {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            {METRICS[key]}
                                        </TableCell>
                                        <TableCell>
                                            {stat?.beatLeaderStatistics[key]}
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                            return null;
                        })
                    }
                </Table>
            </div>}
            </div>
</div>
)
}