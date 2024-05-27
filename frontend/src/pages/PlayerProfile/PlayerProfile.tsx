import {FC, useCallback, useEffect, useState} from "react";
import './PlayerProfile.scss';
import {player} from "@/services/player.tsx";
import {useStore} from "@nanostores/react";
import {playerStore} from "@/store/player.ts";
import {jwtDecode} from "jwt-decode";
import {JWT_PAYLOAD} from "@/types/common.ts";
import {cn, isTokenExpired} from "@/lib/utils.ts";
import {useNavigate, useParams} from "react-router-dom";
import {routes} from "@/router/routes.ts";
import {PLAYER_STATISTICS} from "@/types/player.ts";
import {Badge} from "@/components/common/Badge/Badge.tsx";
import {METRICS} from "@/constants/metrics.ts";
import {Table, TableCell, TableRow} from "@/components/ui/table.tsx";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

const CLASS = 'player-profile'

const ITEMS_PER_PAGE = 12;

export const PlayerProfile: FC = () => {
    const params = useParams();
    const profile = useStore(playerStore.profile)
    const navigate = useNavigate();
    const onNavigate = useCallback((url: string) => navigate(`${url}`, {state: true}), [navigate]);
    const [stat, setStat] = useState<PLAYER_STATISTICS | null>(null)

    const [currentPage, setCurrentPage] = useState(1);
    const METRICS_KEYS = Object.keys(METRICS);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentMetricsKeys = METRICS_KEYS.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(METRICS_KEYS.length / ITEMS_PER_PAGE)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && params.playerId) {
            const user = jwtDecode<JWT_PAYLOAD>(token)
            if (isTokenExpired(user.exp)) {
                localStorage.clear();
                onNavigate(routes.auth.login)
            } else {
                player.profile(+params.playerId).then((response) => {
                    console.log(response)
                    if (response.statusText === 'OK') {
                        playerStore.profile.set(response.data)
                    }
                })
                player.statistics(+params.playerId).then((response) => {
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
                            <Avatar className={'w-17 h-17'}>
                                <AvatarImage src={profile.avatar} alt={"avatar"} />
                                <AvatarFallback>{profile.name}</AvatarFallback>
                            </Avatar>
                            <div className={'flex flex-col gap-1'}>
                                <h3>{profile.name}</h3>
                                {profile?.teamName && <span>Team: {profile?.teamName}</span>}
                                <span>Steam ID: {profile?.beatLeaderId}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${CLASS}__card`}>
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
                </div>
            </div>


            <div className={'flex gap-3'}>
                {stat?.scoreSaberStatistics && <div className={cn(`${CLASS}__card`, 'w-1/2')}>
                    <h4 className={'font-bold'}>Score saber Statistics</h4>
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
                <h4 className={'font-bold'}>BeatLeader Statistics</h4>
                <Table>
                    {currentMetricsKeys.map((key) => {
                        const isTimeMetric = METRICS[key].toLowerCase().includes('time');
                        if (key in stat.beatLeaderStatistics && !isTimeMetric) {
                            return (
                                <TableRow key={key}>
                                    <TableCell>{METRICS[key]}</TableCell>
                                    <TableCell>{stat.beatLeaderStatistics[key]}</TableCell>
                                </TableRow>
                            );
                        }
                        return null;
                    })}
                </Table>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={handlePreviousPage} isActive={currentPage !== 1} />
                        </PaginationItem>
                        <PaginationItem>
                            {`Page ${currentPage} of ${Math.ceil(METRICS_KEYS.length / ITEMS_PER_PAGE)}`}
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={handleNextPage} isActive={currentPage !== Math.ceil(METRICS_KEYS.length / ITEMS_PER_PAGE)} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>}
            </div>
</div>
)
}