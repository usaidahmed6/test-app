import React from "react";

function Tabs({ activeTab, setActiveTab, handleOpenModal }: any) {
  const tabs = ["all", "week1", "week2", "week3", "week4"];

  return (
    <div className="px-8 sm:px-16 md:px-32 py-4 flex flex-wrap justify-between w-full bg-white items-center mt-4">
      <div className="flex w-full justify-between items-center flex-wrap">
        {/* Tabs */}
        <ul className="flex flex-wrap justify-start text-sm font-medium text-black sm:w-[70%] mb-4 sm:mb-0">
          {tabs.map((tab: any) => (
            <li
              key={tab}
              className="flex justify-center sm:justify-start w-full sm:w-auto"
            >
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 sm:px-8 sm:py-3 font-semibold ${activeTab === tab
                    ? "border-b-4 border-[#004370] text-[#004370]"
                    : "text-slate-700"
                  }`}
              >
                {tab === "all" ? "All Meals" : `Week ${tab.slice(-1)}`}
              </button>
            </li>
          ))}
        </ul>

        {/* Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-4 sm:mt-0">
          <button
            onClick={handleOpenModal}
            className="bg-[#004370] text-white px-4 py-2 rounded-sm shadow-md hover:bg-gray-700 w-32 sm:w-44 text-[12px] sm:text-[14px] font-semibold"
          >
            Add to Week
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tabs;
