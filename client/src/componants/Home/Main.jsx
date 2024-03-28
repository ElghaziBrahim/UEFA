import React, { useEffect, useState } from 'react';
import { getAlldataByGroupe } from '../../apiFunctions/functions';



const Main = () => {
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        getAlldataByGroupe(setAllData);
    }, []);

    return (
        <div className="container mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Champions League Statistics</h2>
            {Object.entries(allData).map(([groupName, teams]) => (
                <div key={groupName} className="mb-8">
                    <h3 className="text-2xl font-semibold mb-4 text-start">Group {groupName}</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="bg-gray-300 p">
                                    <th className="w-1/6 p-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Team</th>
                                    <th className="w-1/6 p-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Points</th>
                                    <th className="w-1/6 p-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Wins</th>
                                    <th className="w-1/6 p-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Draws</th>
                                    <th className="w-1/6 p-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Losses</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map(team => (
                                    <tr key={team.name} className={`border-b ${team.rank <= 2 ? 'bg-green-200' : 'bg-red-200'}`}>
                                        <td className="w-1/6 p-3 text-left text-sm">{team.name}</td>
                                        <td className="w-1/6 p-3 text-left text-sm">{team.points}</td>
                                        <td className="w-1/6 p-3 text-left text-sm">{team.won}</td>
                                        <td className="w-1/6 p-3 text-left text-sm">{team.drawn}</td>
                                        <td className="w-1/6 p-3 text-left text-sm">{team.lost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(Main);
