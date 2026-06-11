import Header from '@/components/layout/Header';
import GoalList from '@/components/goals/GoalList';

export default function GoalsPage() {
  return (
    <div>
      <Header
        title="목표 관리"
        subtitle="목표를 설정하고 달성해 나가세요"
      />
      <GoalList />
    </div>
  );
}
