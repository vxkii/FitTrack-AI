import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import GoalCard from '../components/GoalCard';
import Modal from '../components/Modal';
import { initialGoals } from '../data/goals';

export default function Goals() {
  const [goals, setGoals] = useState(initialGoals);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    category: 'Workout',
    current: '',
    target: '',
    unit: '',
    deadline: '',
    description: ''
  });

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;

    const currentVal = parseFloat(newGoal.current) || 0;
    const targetVal = parseFloat(newGoal.target) || 1;
    const progressPct = Math.min(100, Math.round((currentVal / targetVal) * 100));

    const created = {
      id: 'g_' + Date.now(),
      name: newGoal.name,
      category: newGoal.category,
      current: currentVal,
      target: targetVal,
      unit: newGoal.unit || 'units',
      progress: progressPct,
      deadline: newGoal.deadline || '2026-12-31',
      description: newGoal.description || 'Custom fitness objective.',
      color: '#3B82F6',
      status: 'In Progress'
    };

    setGoals([created, ...goals]);
    setNewGoal({ name: '', category: 'Workout', current: '', target: '', unit: '', deadline: '', description: '' });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl lg:text-3xl text-slate-900">Goals & Targets</h1>
          <p className="text-xs sm:text-sm text-slate-500">Manage your active fitness targets and deadlines.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Goal
        </button>
      </div>

      {/* Active Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      {/* Add New Goal Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Fitness Goal"
      >
        <form onSubmit={handleAddGoal} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Goal Name</label>
            <input
              type="text"
              required
              placeholder="e.g., Run 50 km this month"
              value={newGoal.name}
              onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                className="input-field"
              >
                <option value="Body Weight">Body Weight</option>
                <option value="Workout">Workout</option>
                <option value="Activity">Activity</option>
                <option value="Hydration">Hydration</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Recovery">Recovery</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Unit</label>
              <input
                type="text"
                placeholder="e.g., kg, km, steps"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Current Value</label>
              <input
                type="number"
                step="any"
                placeholder="0"
                value={newGoal.current}
                onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Target Value</label>
              <input
                type="number"
                step="any"
                required
                placeholder="100"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Target Deadline</label>
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="Brief note or motivation for this goal..."
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-primary w-full py-2.5 text-sm font-bold mt-2">
            Save Goal
          </button>
        </form>
      </Modal>
    </div>
  );
}
