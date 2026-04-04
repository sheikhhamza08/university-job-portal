import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// FIX: updated to Ireland-relevant locations and Euro salary bands
const filterData = [
  {
    filterType: "Location",
    array: [
      "Dublin",
      "Cork",
      "Galway",
      "Limerick",
      "Remote",
      "Hybrid – Dublin",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "Machine Learning",
    ],
  },
  {
    filterType: "Salary",
    // FIX: changed from LPA (Indian) to Euro bands for Ireland
    array: ["€30k–€50k", "€50k–€80k", "€80k–€110k", "€110k+"],
  },
];

const FilterCard = () => {
  useGetAllJobs();

  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    // TIP: toggle off if same value clicked again
    setSelectedValue((prev) => (prev === value ? "" : value));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]); // FIX: added dispatch to dependency array

  return (
    <div className="w-full bg-white py-4 px-4 rounded-xl border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-semibold text-base text-gray-900">Filter Jobs</h1>
        {/* TIP: clear button for better UX */}
        {selectedValue && (
          <button
            onClick={() => setSelectedValue("")}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      <hr className="mb-4 border-gray-100" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={data.filterType} className="mb-5">
            {" "}
            {/* FIX: key on filterType string, not index */}
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {data.filterType}
            </h2>
            {data.array.map((item) => {
              // FIX: itemId was `r${index - idx}` — subtraction caused duplicate IDs.
              // Use a stable string instead.
              const itemId = `filter-${data.filterType}-${item}`.replace(
                /\s+/g,
                "-",
              );
              return (
                <div
                  key={item} // FIX: key on item string, not idx
                  className="flex items-center gap-2 my-1.5"
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label
                    htmlFor={itemId}
                    className="text-sm text-gray-700 cursor-pointer leading-none"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
