import React from 'react';

interface GenderCheckboxProps {
 onCheckboxChange: (gender: string) => void;
 selectedGender: string;
}

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className={`flex items-center cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
          <input
            type="checkbox"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
          <span className="label-text ml-2 dark:text-white">Male</span>
        </label>
      </div>
      <div className='w-[20px]'></div>
      <div className="form-control">
        <label className={`flex items-center cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
          <input
            type="checkbox"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
          <span className="label-text ml-2 dark:text-white">Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;