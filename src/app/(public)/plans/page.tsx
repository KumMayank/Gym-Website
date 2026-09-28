import PlansSection from '@/components/home/PlansSection';

export const metadata = {
  title: 'Membership Plans & Pricing | FORGE ATHLETICS Bengaluru',
  description: 'Transparent pricing for Monthly, Quarterly, Annual Titan and Couple memberships. Includes 18% GST invoice PDF, steam & sauna access, personal training consultations.',
};

export default function PlansPage() {
  return (
    <div className="pt-20">
      <PlansSection />
    </div>
  );
}
