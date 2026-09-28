import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesGrid from '@/components/home/ServicesGrid';
import InteractiveMuscleMap from '@/components/home/InteractiveMuscleMap';
import ClassTimetablePreview from '@/components/home/ClassTimetablePreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TrainersSection from '@/components/home/TrainersSection';
import TransformationsSection from '@/components/home/TransformationsSection';
import PlansSection from '@/components/home/PlansSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import FAQSection from '@/components/home/FAQSection';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <InteractiveMuscleMap />
      <ClassTimetablePreview />
      <WhyChooseUs />
      <TrainersSection />
      <TransformationsSection />
      <PlansSection />
      <ReviewsSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
