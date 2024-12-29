'use client'
import { Session } from 'inspector/promises';
import React, { useState, useEffect } from 'react';
import {   FaSearch, FaPlus } from 'react-icons/fa'; // Example: Importing from react-icons
import { IoIosSettings } from 'react-icons/io';

const AddSchedule = ({close}:{close:any}) => {
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    // const [option3, setOption3] = useState('');
    const [formData, setFormData] = useState({
        type: 'program',
        program: '',
        breakType: '',
        session:'',
        stage: '',
        startTime: '',
        duration: '',
        title: '',
        allStages: false
      });
    const [programSearch, setProgramSearch] = useState('');
    const [showProgramDropdown, setShowProgramDropdown] = useState(false);
    const [localBreakTypes, setLocalBreakTypes] = useState<{ _id: string; name: string; defaultDuration: number }[]>([]);
    const [localSession, setLocalSession] = useState<{ _id: string; name: string; defaultDuration: number }[]>([]);

    const [localStages, setLocalStages] = useState<{ _id: string; name: string }[]>([]);
    const [programs, setPrograms] = useState<{ _id: string; name: string; category?: { name: string } }[]>([]);
    const [initialData, setInitialData] = useState<any>(null);
    // const [isBreakTypeModalOpen, setIsBreakTypeModalOpen] = useState(false);
    // const [isStageModalOpen, setIsStageModalOpen] = useState(false);

    useEffect(() => {
        // Fetch initial data, programs, break types, and stages here
    }, []);

    const handleOption1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption1(e.target.value);
    };

    const handleOption2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOption2(e.target.value);
    };

    // const handleOption3Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setOption3(e.target.value);
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Option 1:', option1);
        console.log('Option 2:', option2);
    };

   
    const handleProgramSelect = (program: { _id: string; name: string; category?: { name: string } }) => {
        // Define your handleProgramSelect function here
    };

    const getFilteredPrograms = () => {
        // Define your getFilteredPrograms function here
        return programs.filter((program: any) => program.name.includes(programSearch));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* <div 
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={close}
            /> */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-700">
            {initialData ? 'Edit Schedule' : 'Add New Schedule'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6 text-zinc-800">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">Type</label>
                        <select
                            value={formData.type}
                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="program">Program</option>
                            <option value="session">Session</option>
                            <option value="break">Break</option>


                        </select>
                    </div>

                    {formData.type === 'program' ? (
                        <div className="space-y-2 program-select-container">
                            <label className="block text-sm font-semibold">Program</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search programs..."
                                    value={programSearch}
                                    onChange={(e) => {
                                        setProgramSearch(e.target.value);
                                        setShowProgramDropdown(true);
                                    }}
                                    onFocus={() => setShowProgramDropdown(true)}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                                />
                                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                {showProgramDropdown && (
                                    <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto">
                                        {getFilteredPrograms().map((program: any) => (
                                            <button
                                                key={program._id}
                                                type="button"
                                                onClick={() => handleProgramSelect(program)}
                                                className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50"
                                            >
                                                {program.name} [{program.category?.name || 'Uncategorized'}]
                                            </button>
                                        ))}
                                        {getFilteredPrograms().length === 0 && (
                                            <div className="px-4 py-2 text-gray-500">
                                                No programs found
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {formData.program && (
                                <div className="mt-2 px-3 py-2 bg-gray-100 rounded-md">
                                    Selected: {programs.find(p => p._id === formData.program)?.name} 
                                    [{programs.find((p: { _id: string }) => p._id === formData.program)?.category?.name || 'Uncategorized'}]
                                </div>
                            )}
                        </div>
                    ):

                formData.type === 'session' ? (
                        <>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-semibold">Session Type</label>
                                    <button
                                        type="button"
                                        // onClick={() => setIsBreakTypeModalOpen(true)}
                                        className="btn btn-ghost btn-sm flex items-center gap-1"
                                    >
                                        <IoIosSettings className="w-4 h-4" />
                                        Manage
                                    </button>
                                </div>
                                <select
                                    value={formData.session}
                                    onChange={e => {
                                        const session = localSession.find((b: { _id: string }) => b._id === e.target.value);
                                        setFormData({
                                            ...formData,
                                            session: e.target.value,
                                            // title: breakType?.name || '',
                                            duration: session?.defaultDuration?.toString() || '',
                                        });
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">Select session type</option>
                                    {localSession.map(session => (
                                        <option key={session._id} value={session._id}>
                                            {session.name} ({session.defaultDuration} mins)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ):


                    formData.type === 'break' && (
                        <>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-semibold">Break Type</label>
                                    <button
                                        type="button"
                                        // onClick={() => setIsBreakTypeModalOpen(true)}
                                        className="btn btn-ghost btn-sm flex items-center gap-1"
                                    >
                                        <IoIosSettings className="w-4 h-4" />
                                        Manage
                                    </button>
                                </div>
                                <select
                                    value={formData.breakType}
                                    onChange={e => {
                                        const breakType = localBreakTypes.find((b: { _id: string }) => b._id === e.target.value);
                                        setFormData({
                                            ...formData,
                                            breakType: e.target.value,
                                            // title: breakType?.name || '',
                                            duration: breakType?.defaultDuration?.toString() || '',
                                        });
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">Select break type</option>
                                    {localBreakTypes.map(breakType => (
                                        <option key={breakType._id} value={breakType._id}>
                                            {breakType.name} ({breakType.defaultDuration} mins)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {formData.type === 'program' && (
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold">Stage</label>
                                <button
                                    type="button"
                                    // onClick={() => setIsStageModalOpen(true)}
                                    className="btn btn-ghost btn-sm flex items-center gap-1"
                                >
                                    <FaPlus className="w-4 h-4" />
                                    Add New
                                </button>
                            </div>
                            <select
                                value={formData.stage}
                                onChange={e => setFormData({ ...formData, stage: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            >
                                <option value="">Select stage</option>
                                {localStages.map(stage => (
                                    <option key={stage._id} value={stage._id}>
                                        {stage.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">Start Time</label>
                        <input
                            type="datetime-local"
                            value={formData.startTime}
                            onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-secondary bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold">Duration (minutes)</label>
                        <input
                            type="number"
                            value={formData.duration}
                            onChange={e => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex justify-between gap-4 pt-4 ">
            <button
              type="button"
              onClick={()=>close(false)}
              className="btn btn-secondary flex-1 bg-red-700 rounded-lg px-2 py-1 font-bold text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 bg-green-700 rounded-lg px-2 py-1 font-bold text-white"
            >
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
                    {/* <button type="submit" className="btn btn-primary text-white px-2 py-1 w-fit bg-red-600 rounded-3xl ">Add</button> */}
                </form>
            </div>
        </div>
    );
};

export default AddSchedule;
