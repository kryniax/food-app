import React, { ChangeEvent } from 'react'
import { cuisineList } from '../config/restaurant-options-config';
import { Label } from './ui/label';
import { twMerge } from 'tailwind-merge';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';

type CuisineFilterProps = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}

const CuisineFilter = (props: CuisineFilterProps) => {
    const { onChange, selectedCuisines, isExpanded, onExpandedClick } = props;

    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;

        const newCuisinesList = isChecked ? 
        [...selectedCuisines, clickedCuisine] : 
        selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

        onChange(newCuisinesList);
    };
 
    const handleCuisineReset = () => onChange([]);

    return (
    <>
        <div className='flex justify-between items-center px-2'>
            <div className='text-md font-semibold mb-2'>Filter By Cuisine</div>
            <div onClick={handleCuisineReset} className='text-sm font-semibold mb-2 underline cursor-pointer text-blue-500'>
                Reset Filters
            </div>
        </div>
        <div className='space-y-2 flex flex-col'>
            {cuisineList.slice(0, isExpanded ? cuisineList.length: 5).map((cuisine) => {
                const isSelected = selectedCuisines.includes(cuisine);
                return (
                    <div className='flex' key={cuisine}>
                        <input 
                            id={`cuisine_${cuisine}`} 
                            type='checkbox' 
                            className='hidden' 
                            value={cuisine} 
                            checked={isSelected} 
                            onChange={handleCuisinesChange}
                        />
                        <Label 
                            htmlFor={`cuisine_${cuisine}`} 
                            className={
                                twMerge('flex flex-1 items-center justify-between cursor-pointer text-sm rounded-full px-4 py-2 font-semibold border',
                                isSelected ? 'border-green-600 text-green-600' : 'border-slate-300'
                                )}
                        >
                            {cuisine}
                            {isSelected && <Check size={20} strokeWidth={3}/>}

                        </Label>
                    </div>
                )
            })}
            <Button 
                variant="link" 
                className='mt-4 flex-1'
                onClick={onExpandedClick}
            >
                {isExpanded ? (
                    <span className='flex flex-row items-center'>
                        View Less <ChevronUp/>
                    </span>
                ) : (
                    <span className='flex flex-row items-center'>
                        View More <ChevronDown/>
                    </span>
                )}
            </Button>
        </div>
    </>
  )
}

export default CuisineFilter