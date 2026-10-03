import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import GoalCard from '../components/GoalCard';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { initialGoals } from '../data/goals';
import {
  subscribeToGoals,
  saveGoalToFirestore,
  updateGoalInFirestore,
  deleteGoalFromFirestore,
  subscribeToWorkoutHistory,
  subscribeToMealHistory,
  subscribeToWaterHistory,
  subscribeToWeightHistory,
  subscribeToUserProfile
} from '../services/firebaseAuth';
import { auth } from '../services/firebase';

export default function Goals() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [customGoals, setCustomGoals] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [mealHistory, setMealHistory] = useState([]);
  const [waterHistory, setWaterHistory] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [newGoal, setNewGoal] = useState({
    name: '',
    category: 'Workout',
    current: '',
    target: '',
    unit: '',
    deadline: '',
    description: ''
  });

  // Subscribe to real Firestore collections for the authenticated user
  useEffect(() => {
    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) return;

    const unsubGoals = subscribeToGoals(uid, (gList) => setCustomGoals(gList));
    const unsubWorkouts = subscribeToWorkoutHistory(uid, (wList) => setWorkoutHistory(wList));
    const unsubMeals = subscribeToMealHistory(uid, (mList) => setMealHistory(mList));
    const unsubWater = subscribeToWaterHistory(uid, (wtrList) => setWaterHistory(wtrList));
    const unsubWeight = subscribeToWeightHistory(uid, (wghtList) => setWeightHistory(wghtList));
    const unsubProfile = subscribeToUserProfile(uid, (pData) => setUserProfile(pData));

    return () => {
      if (typeof unsubGoals === 'function') unsubGoals();
      if (typeof unsubWorkouts === 'function') unsubWorkouts();
      if (typeof unsubMeals === 'function') unsubMeals();
      if (typeof unsubWater === 'function') unsubWater();
      if (typeof unsubWeight === 'function') unsubWeight();
      if (typeof unsubProfile === 'function') unsubProfile();
    };
  }, [user?.uid]);

  // Compute real current stats
  // 1. Current Weight
  const currentWeight = weightHistory.length > 0
    ? Number(weightHistory[0].weight) || 0
    : Number(userProfile?.weight ?? user?.weight ?? 0);

  // 2. Weekly Workouts Completed (Mon-Sun)
  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const daysSinceMonday = currentDay === 0 ? 6 : currentDay - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysSinceMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const weeklyWorkoutsCount = workoutHistory.filter((item) => {
    if (!item || !item.completedAt) return false;
    const itemTime = new Date(item.completedAt).getTime();
    return !isNaN(itemTime) && itemTime >= monday.getTime() && itemTime <= sunday.getTime();
  }).length;

  // 3. Water Intake Today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todayWaterLiters = waterHistory
    .filter((item) => {
      if (!item || !item.createdAt) return false;
      const itemTime = new Date(item.createdAt).getTime();
      return !isNaN(itemTime) && itemTime >= startOfDay.getTime() && itemTime <= endOfDay.getTime();
    })
    .reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  // 4. Protein Intake Today
  const todayProteinGrams = mealHistory
    .filter((item) => {
      const dateStr = item.completedAt || item.createdAt;
      if (!dateStr) return false;
      const itemTime = new Date(dateStr).getTime();
      return !isNaN(itemTime) && itemTime >= startOfDay.getTime() && itemTime <= endOfDay.getTime();
    })
    .reduce((sum, item) => sum + (Number(item.protein) || 0), 0);

  // Map real values into default initial goals template
  const defaultGoalsWithRealData = initialGoals.map((g) => {
    // Check if custom override exists in customGoals
    const customOverride = customGoals.find((cg) => cg.id === g.id || cg.name === g.name);

    let currentVal = g.current;
    let targetVal = customOverride?.target ?? g.target;
    let deadlineVal = customOverride?.deadline ?? g.deadline;

    if (g.id === 'g1' || g.name === 'Weight Goal') {
      currentVal = currentWeight > 0 ? currentWeight : 0;
    } else if (g.id === 'g2' || g.name === 'Weekly Workout Goal') {
      currentVal = weeklyWorkoutsCount;
    } else if (g.id === 'g3' || g.name === 'Daily Steps Goal') {
      currentVal = 0; // Steps untracked
    } else if (g.id === 'g4' || g.name === 'Water Intake Goal') {
      currentVal = Math.round(todayWaterLiters * 10) / 10;
    } else if (g.id === 'g5' || g.name === 'Protein Goal') {
      currentVal = todayProteinGrams;
    } else if (g.id === 'g6' || g.name === 'Sleep Quality') {
      currentVal = 0; // Sleep untracked
    }

    const progressPct = targetVal > 0 ? Math.min(100, Math.round((currentVal / targetVal) * 100)) : 0;

    return {
      ...g,
      current: currentVal,
      target: targetVal,
      progress: progressPct,
      deadline: deadlineVal,
      status: progressPct >= 100 ? 'Completed' : 'In Progress'
    };
  });

  // Filter custom user goals created via Add New Goal that are not standard overrides
  const extraCustomGoals = customGoals
    .filter((cg) => !initialGoals.some((g) => g.id === cg.id || g.name === cg.name))
    .map((cg) => {
      const cur = Number(cg.current) || 0;
      const tgt = Number(cg.target) || 1;
      const pct = Math.min(100, Math.round((cur / tgt) * 100));
      return {
        ...cg,
        current: cur,
        target: tgt,
        progress: pct,
        status: pct >= 100 ? 'Completed' : 'In Progress'
      };
    });

  const displayGoals = [...defaultGoalsWithRealData, ...extraCustomGoals];

  const handleSaveGoal = async (e) => {
    e.preventDefault();
    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) {
      showToast('error', 'You must be logged in to save goals.');
      return;
    }

    if (!newGoal.name || !newGoal.target) return;

    const currentVal = parseFloat(newGoal.current) || 0;
    const targetVal = parseFloat(newGoal.target) || 1;

    const goalPayload = {
      id: editingGoal ? editingGoal.id : 'g_' + Date.now(),
      name: newGoal.name,
      category: newGoal.category,
      current: currentVal,
      target: targetVal,
      unit: newGoal.unit || 'units',
      deadline: newGoal.deadline || 'Daily',
      description: newGoal.description || 'Custom fitness objective.',
      color: '#3B82F6'
    };

    const res = await saveGoalToFirestore(uid, goalPayload);
    if (res.success) {
      showToast('success', editingGoal ? 'Goal updated successfully.' : 'New goal created successfully.');
      setIsAddModalOpen(false);
      setEditingGoal(null);
      setNewGoal({ name: '', category: 'Workout', current: '', target: '', unit: '', deadline: '', description: '' });
    } else {
      showToast('error', res.message || 'Failed to save goal.');
    }
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setNewGoal({
      name: goal.name,
      category: goal.category,
      current: goal.current,
      target: goal.target,
      unit: goal.unit,
      deadline: goal.deadline === 'Daily' ? '' : goal.deadline,
      description: goal.description
    });
    setIsAddModalOpen(true);
  };

  const handleDeleteGoal = async (goal) => {
    const uid = user?.uid || auth.currentUser?.uid;
    if (!uid) return;
    if (window.confirm(`Are you sure you want to delete the goal "${goal.name}"?`)) {
      const res = await deleteGoalFromFirestore(uid, goal.id);
      if (res.success) {
        showToast('success', 'Goal deleted.');
      } else {
        showToast('error', res.message || 'Failed to delete goal.');
      }
    }
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
          onClick={() => {
            setEditingGoal(null);
            setNewGoal({ name: '', category: 'Workout', current: '', target: '', unit: '', deadline: '', description: '' });
            setIsAddModalOpen(true);
          }}
          className="btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add New Goal
        </button>
      </div>

      {/* Active Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayGoals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onEdit={() => handleEditGoal(goal)}
            onDelete={customGoals.some((cg) => cg.id === goal.id) ? () => handleDeleteGoal(goal) : undefined}
          />
        ))}
      </div>

      {/* Add / Edit Goal Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingGoal(null);
        }}
        title={editingGoal ? 'Edit Fitness Goal' : 'Create New Fitness Goal'}
      >
        <form onSubmit={handleSaveGoal} className="space-y-4">
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
            {editingGoal ? 'Save Changes' : 'Save Goal'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
