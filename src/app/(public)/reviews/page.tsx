import ReviewsSection from '@/components/home/ReviewsSection';

export const metadata = {
  title: 'Member Reviews & Testimonials | FORGE ATHLETICS',
  description: 'Read 1,740+ verified Google & member reviews of Forge Athletics Bengaluru branches.',
};

export default function ReviewsPage() {
  return (
    <div className="pt-20">
      <ReviewsSection />
    </div>
  );
}
