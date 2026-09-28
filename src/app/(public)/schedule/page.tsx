import ClassTimetablePreview from '@/components/home/ClassTimetablePreview';

export const metadata = {
  title: 'Class Schedule & Timetable | FORGE ATHLETICS Bengaluru',
  description: 'Weekly timetable for HIIT, CrossFit, Spin, Vinyasa Yoga, Powerlifting, and Aqua workouts across Indiranagar, Koramangala, HSR Layout and Whitefield.',
};

export default function SchedulePage() {
  return (
    <div className="pt-20">
      <ClassTimetablePreview />
    </div>
  );
}
