import { useEffect, useState } from "react";
import { getAlldataByCountry } from "@/apiFunctions/functions";
import { calculateAverageWinPercentage, getFlagImageUrl } from "@/apiFunctions/functions";

const CountryStats = () => {
    const [dataByCountries, setDataByCountries] = useState([]);

    useEffect(() => {
        getAlldataByCountry(setDataByCountries);
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Country Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(dataByCountries).map(([country, teams]) => (
                    <div key={country} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-4 flex items-center">
                            <div className="mr-4">
                                <img
                                    src={getFlagImageUrl(country)}
                                    alt={`${country} flag`}
                                    className="w-8 h-auto"
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold mb-2">{country}</h2>
                                <p className="text-gray-600 mb-2">Teams Count: {teams.length}</p>
                                <p className="text-gray-600">Average Win Percentage: {calculateAverageWinPercentage(teams)}%</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryStats;
