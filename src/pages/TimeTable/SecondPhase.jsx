import React from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, BookOpen, X, Users, ArrowLeft } from "lucide-react";
import { toast } from 'sonner';





const SecondPhase = ({
    newSubject,
    setNewSubject,
    selectedTeacher,
    setSelectedTeacher,
    subjects,
    setSubjects,
    setIsTeacherPanelOpen,
    organizationTeachers,
    handleSubmit,
    setStep
}) => {
    const getSelectedTeacherName = () => {
        if (!selectedTeacher) return "Select Teacher*";
        const teacher = organizationTeachers.find(t => t.userId === selectedTeacher);
        return teacher ? teacher.name : "Select Teacher*";
    };

    const addSubject = (e) => {
        e.preventDefault();
        if (!newSubject.trim()) {
            toast.error('Please enter a subject name', {
                position: 'bottom-right',
                className: 'bg-red-500'
            });
            return;
        }
        if (!selectedTeacher) {
            toast.error('Teacher is required', {
                position: 'bottom-right',
                className: 'bg-red-500'
            });
            return;
        }

        const teacherName = organizationTeachers.find(t => t.userId === selectedTeacher)?.name || '';

        setSubjects([...subjects, { name: newSubject, teacher: teacherName }]);
        setNewSubject("");
        setSelectedTeacher("");
    };

    const handleRemoveSubject = (index) => {
        setSubjects(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <motion.div
            className="w-full absolute top-0 left-0"
            initial={{ x: 800, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 800, opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-semibold">Add Subjects</h2>
                <button
                    onClick={() => setStep(1)}
                    className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="h-5 w-5" />
                    Previous Step
                </button>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="w-full bg-zinc-800 text-white rounded-lg border border-white/10 px-4 py-2.5 focus:outline-none focus:border-white/30"
                        placeholder="Enter subject name"
                    />
                </div>
                <button
                    onClick={() => setIsTeacherPanelOpen(true)}
                    className="bg-zinc-800 text-white px-4 py-2.5 rounded-lg border border-white/10 hover:bg-zinc-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                    <Users className="h-5 w-5" />
                    {getSelectedTeacherName()}
                </button>
                <button
                    onClick={addSubject}
                    className="bg-white text-black px-4 py-2.5 rounded-lg hover:bg-zinc-100 transition-colors flex items-center gap-2"
                >
                    <PlusCircle className="h-5 w-5" />
                    Add
                </button>
            </div>

            {subjects.length > 0 && (
                <div className="bg-zinc-800 rounded-lg border border-white/10 overflow-hidden mt-6">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-white/70 text-sm font-medium text-left py-3 px-4">Subject</th>
                                <th className="text-white/70 text-sm font-medium text-left py-3 px-4">Teacher*</th>
                                <th className="text-white/70 text-sm font-medium text-right py-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject, index) => (
                                <tr key={index} className="border-b border-white/10 last:border-none">
                                    <td className="text-white py-3 px-4">{subject.name}</td>
                                    <td className="text-white py-3 px-4">{subject.teacher}</td>
                                    <td className="text-white py-3 px-4 text-right">
                                        <button
                                            onClick={() => handleRemoveSubject(index)}
                                            className="text-red-500 hover:text-red-400 transition-colors"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-zinc-100 active:bg-zinc-200 hover:scale-[1.02] flex items-center justify-center gap-3 mt-6"
                onClick={handleSubmit}
            >
                <BookOpen className="h-5 w-5" />
                Submit
            </button>
        </motion.div>
    );
};

export default SecondPhase;