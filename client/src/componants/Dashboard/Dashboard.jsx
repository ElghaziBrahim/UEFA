import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { FaChartBar, FaGlobeEurope, FaUsers } from 'react-icons/fa';
import Main from "../Home/Main";
import CountryStats from "./CountryStats";
import { ImProfile } from "react-icons/im";
import UserProfile from "./UserProfile";
const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState('groupStage');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100">
      <div className="sticky top-0 lg:w-60 bg-white border-r border-gray-200 ">
        <div className="sticky top-0  lg:hidden">
          <h3 className="block text-gray-500 focus:outline-none p-4">Dashboard</h3>
          <div className="p-4">
            <SidebarItem
              icon={<FaChartBar className="text-gray-500" />}
              label="Group Stage"
              onClick={() => handleSelectOption('groupStage')}
            />
            <SidebarItem
              icon={<FaGlobeEurope className="text-gray-500" />}
              label="Country Statistics"
              onClick={() => handleSelectOption('countryStatistics')}
            />
            <SidebarItem
              icon={<ImProfile className="text-gray-500" />}
              label="Profile"
              onClick={() => handleSelectOption('profile')}
            />
          </div>
        </div>
        <div className="sticky top-0  hidden lg:block p-4">
          <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
          <SidebarItem
            icon={<FaChartBar className="text-gray-500" />}
            label="Group Stage"
            onClick={() => handleSelectOption('groupStage')}
            active={selectedOption === 'groupStage'}
          />
          <SidebarItem
            icon={<FaGlobeEurope className="text-gray-500" />}
            label="Country Statistics"
            onClick={() => handleSelectOption('countryStatistics')}
            active={selectedOption === 'countryStatistics'}
          />
          <SidebarItem
            icon={<ImProfile className="text-gray-500" />}
            label="Profile"
            onClick={() => handleSelectOption('profile')}
          />
        </div>
      </div>
      <div className="flex-1 min-h-screen">
        {selectedOption === 'groupStage' && <Main />}
        {selectedOption === 'countryStatistics' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CountryStats />
          </div>
        )}
        {selectedOption === 'profile' && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Dashboard;
