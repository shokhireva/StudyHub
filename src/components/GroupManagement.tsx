import React, { useState, useEffect } from 'react';
import { GroupList } from './GroupList';
import { AddGroupModal } from './AddGroupModal';
import { EditGroupModal } from './EditGroupModal';
import { groupApi } from '../api/groupApi';
import type { Group } from '../models/Group';
import { MESSAGES } from '../constants/messages';

export const GroupManagement: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<Group | null>(null);

    const fetchGroups = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await groupApi.getAll();
            setGroups(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, [refreshTrigger]);

    const handleEdit = (group: Group) => {
        setEditingGroup(group);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(MESSAGES.confirm.deleteGroup)) return;
        try {
            await groupApi.delete(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <>
            <div className="toolbar">
                <button className="btn-success" onClick={() => setIsAddModalOpen(true)}>
                    {MESSAGES.labels.addGroup}
                </button>
            </div>
            <GroupList
                groups={groups}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AddGroupModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onGroupAdded={() => setRefreshTrigger(prev => prev + 1)}
            />
            <EditGroupModal
                isOpen={isEditModalOpen}
                group={editingGroup}
                onClose={() => setIsEditModalOpen(false)}
                onGroupUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />
        </>
    );
};