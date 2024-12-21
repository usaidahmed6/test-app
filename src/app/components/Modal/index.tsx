"use client"
import React, { useState } from "react";

// WeekSelectionModal Component
function WeekSelectionModal({ isOpen, onClose, onSubmit }: any) {
  const [selectedWeek, setSelectedWeek] = useState("week1");

  const handleWeekSelection = (week: string) => {
    setSelectedWeek(week);
  };

  const handleSubmit = () => {
    if (!selectedWeek) {
      alert("Please select a week!");
      return;
    }
    onSubmit(selectedWeek);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white px-6 py-12 rounded-lg w-1/3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Select Week</h2>
        <div className="flex justify-center space-x-4 mb-6">
          {["week1", "week2", "week3", "week4"].map((week, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md font-medium ${
                selectedWeek === week
                  ? "bg-blue-500 text-white"
                  : "bg-[#f2f2f2] text-gray-700"
              } hover:bg-[#cfecff]`}
              onClick={() => handleWeekSelection(week)}
            >
              {`Week ${index + 1}`}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-[#004370] text-white font-semibold px-8 py-2 rounded-sm w-40"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default WeekSelectionModal;
