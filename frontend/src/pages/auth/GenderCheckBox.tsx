import React from 'react';

interface GenderCheckboxProps {
 onCheckboxChange: (gender: string) => void;
 selectedGender: string;
}

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control mr-4">
        <label className={`flex items-center cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
          <input
            type="checkbox"
            className="checkbox border-slate-900 mr-2"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
          <span className="label-text dark:text-white">Male</span>
        </label>
      </div>
      <div className="form-control">
        <label className={`flex items-center cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
          <input
            type="checkbox"
            className="checkbox border-slate-900 mr-2"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
          <span className="label-text dark:text-white">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;