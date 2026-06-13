import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CoursesSection from '@/components/sections/CoursesSection';
import EnquiryForm from '@/components/ui/EnquiryForm';

export const metadata = {
  title: 'Training Programs | Zionbridge Technologies',
  description: 'Explore software, networking, HR, banking training programs with placement assistance.',
};

export default function CoursesPage() {
  return (
    <>
      <Navbar />
      <section className="bg-hero-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold font-semibold uppercase tracking-widest text-sm mb-3">Our Courses</div>
          <h1 className="text-4xl font-black text-white mb-4">Training Programs</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Industry-expert training in Software, Networking, HR, Banking & more with real-time experience and 100% placement support.</p>
        </div>
      </section>
      <CoursesSection />
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary">Enroll Now</h2>
            <p className="text-gray-500 mt-2">Get in touch with our counselors for course details and batch timing.</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
