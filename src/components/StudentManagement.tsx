import React, { useState, useEffect } from 'react';
import { StudentList } from './StudentList';
import { AddStudentModal } from './AddStudentModal';
import { EditStudentModal } from './EditStudentModal';
import { useStudents } from '../hooks/useStudents';
import { groupApi } from '../api/groupApi';
import { studentApi } from '../api/studentApi';
import type { Student } from '../models/Student';
import type { Group } from '../models/Group';
import { MESSAGES } from '../constants/messages';

export const StudentManagement: React.FC = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | ''>('');
    const { students, loading, error } = useStudents(refreshTrigger, selectedGroupId || undefined);

    useEffect(() => {
        groupApi.getAll().then(setGroups).catch(console.error);
    }, []);

    const handleStudentAdded = () => {
        setRefreshTrigger(prev => prev + 1);
        setIsAddModalOpen(false);
    };

    const handleStudentUpdated = () => {
        setRefreshTrigger(prev => prev + 1);
        setIsEditModalOpen(false);
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(MESSAGES.confirm.deleteStudent)) return;
        try {
            await studentApi.delete(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <>
            <div className="toolbar">
                <button className="btn-success" onClick={() => setIsAddModalOpen(true)}>{MESSAGES.labels.addStudent}</button>
            </div>
            <StudentList
                students={students}
                groups={groups}
                selectedGroupId={selectedGroupId}
                onGroupChange={setSelectedGroupId}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AddStudentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onStudentAdded={handleStudentAdded}
            />
            <EditStudentModal
                isOpen={isEditModalOpen}
                student={editingStudent}
                onClose={() => setIsEditModalOpen(false)}
                onStudentUpdated={handleStudentUpdated}
            />
        </>
    );
};