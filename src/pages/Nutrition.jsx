import React, { useState } from 'react';
import { Flame, CheckCircle2, RotateCw, Sparkles, Trophy, FlameKindling, Dumbbell } from 'lucide-react';
import ProgressBar from '../components/ProgressBar';
import MealCard from '../components/MealCard';
import MacroDonutChart from '../components/charts/MacroDonutChart';
import { useToast } from '../context/ToastContext';
import { fatLossPlans, muscleBuildingPlans } from '../data/meals';

export default function Nutrition() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('fatloss'); // 'fatloss' or 'muscle'
  const [fatLossIndex, setFatLossIndex] = useState(0);
  const [muscleIndex, setMuscleIndex] = useState(0);
  const [completedPlansCount, setCompletedPlansCount] = useState(0);

  const isFatLoss = selectedCategory === 'fatloss';
  const currentPlansList = isFatLoss ? fatLossPlans : muscleBuildingPlans;
  const currentIndex = isFatLoss ? fatLossIndex : muscleIndex;

  const activePlan = currentPlansList[currentIndex] || currentPlansList[0];

  const handleFinishPlan = () => {
    const nextIndex = (currentIndex + 1) % currentPlansList.length;

    if (isFatLoss) {
      setFatLossIndex(nextIndex);
    } else {
      setMuscleIndex(nextIndex);
    }

    setCompletedPlansCount((prev) => prev + 1);

    const nextPlan = currentPlansList[nextIndex];
    showToast(
      'success',
      `Meal Plan Finished! Loaded ${nextPlan.name} (${nextPlan.type}).`
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="font-extrabold text-2xl lg:text-3xl text-slate-900">
              {isFatLoss ? 'Fat Loss Calorie Deficit Plan' : 'Muscle Building Nutrition'}
            </h1>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${isFatLoss ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
              {activePlan.type}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            {activePlan.name} — Precise caloric deficit & high-protein nutrient structure.
          </p>
        </div>

        {/* Mode Selector Tabs (Fat Loss vs Muscle Building) */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setSelectedCategory('fatloss')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${isFatLoss ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <FlameKindling className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Fat Loss Deficit</span>
          </button>
          <button
            onClick={() => setSelectedCategory('muscle')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${!isFatLoss ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            <Dumbbell className="w-4 h-4 text-blue-600" />
            <span>Muscle Building</span>
          </button>
        </div>
      </div>

      {/* Plan Completion Progress Banner */}
      {completedPlansCount > 0 && (
        <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl shadow-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">
                {completedPlansCount} Meal Plan Rotation{completedPlansCount > 1 ? 's' : ''} Completed!
              </h4>
              <p className="text-xs text-emerald-100">
                Active Plan: <strong className="text-white">{activePlan.name}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={handleFinishPlan}
            className="text-xs font-black uppercase tracking-wider bg-white/20 hover:bg-white/30 text-white px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5"
          >
            <span>Finish & Rotate</span>
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Cards: Daily Calorie & Macro Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie Card */}
        <div className="card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">
                {isFatLoss ? 'Fat Loss Deficit Target' : 'Daily Caloric Target'}
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-black text-slate-900">{activePlan.dailyCaloriesConsumed}</span>
              <span className="text-sm font-semibold text-slate-500">/ {activePlan.dailyCaloriesTarget} kcal</span>
            </div>
          </div>
          <ProgressBar
            current={activePlan.dailyCaloriesConsumed}
            max={activePlan.dailyCaloriesTarget}
            unit="kcal"
            color="amber"
          />
        </div>

        {/* Macros Bars Card */}
        <div className="card space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base mb-1">
              {isFatLoss ? 'Fat Loss Protein Preservation Breakdown' : 'Anabolic Macro Breakdown'}
            </h3>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${isFatLoss ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
              {isFatLoss ? 'Lean Deficit' : 'High Protein'}
            </span>
          </div>
          <ProgressBar
            label="Protein (Lean Mass Maintenance)"
            current={activePlan.macros.protein.current}
            max={activePlan.macros.protein.target}
            unit="g"
            color="blue"
          />
          <ProgressBar
            label="Carbohydrates (Energy Fuel)"
            current={activePlan.macros.carbs.current}
            max={activePlan.macros.carbs.target}
            unit="g"
            color="green"
          />
          <ProgressBar
            label="Essential Fats"
            current={activePlan.macros.fat.current}
            max={activePlan.macros.fat.target}
            unit="g"
            color="amber"
          />
        </div>
      </div>

      {/* Donut Chart & Prescribed Meals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart */}
        <div className="card">
          <h3 className="font-bold text-slate-900 text-lg mb-2">Macro Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">
            {isFatLoss ? 'Caloric deficit distribution for fat oxidation' : 'Optimal ratio for muscle protein synthesis'}
          </p>
          <MacroDonutChart data={activePlan.macroRatio} />
        </div>

        {/* Prescribed Meals List */}
        <div className="card lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-lg">
                  {isFatLoss ? 'Prescribed Fat Loss Meal Quantities' : 'Prescribed Muscle Building Plan'}
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">{activePlan.meals.length} meals prescribed</span>
            </div>

            <div className="space-y-3">
              {activePlan.meals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-500 font-medium text-center sm:text-left">
              Finished all prescribed meals in this plan? Click to complete and load the next rotation!
            </span>
            <button
              onClick={handleFinishPlan}
              className="btn-primary w-full sm:w-auto py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-2 shrink-0 shadow-md shadow-blue-600/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish Plan & Load Next Structure</span>
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
