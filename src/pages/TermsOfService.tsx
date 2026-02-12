import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsOfService = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the Awesome Aligners website and services, you agree to be bound by these Terms 
            of Service. If you disagree with any part of these terms, you may not access our services.
          </p>

          <h2>2. Description of Services</h2>
          <p>
            Awesome Aligners provides clear aligner orthodontic treatment through a network of licensed dental 
            professionals. Our services include:
          </p>
          <ul>
            <li>Online smile assessment and consultation scheduling</li>
            <li>Connection with licensed dental professionals</li>
            <li>Custom clear aligner manufacturing and delivery</li>
            <li>Treatment monitoring and support</li>
          </ul>

          <h2>3. Medical Disclaimer</h2>
          <p>
            <strong>Important:</strong> Clear aligner treatment is a medical procedure that must be performed under 
            the supervision of a licensed dental professional. The information on our website is for educational 
            purposes only and does not constitute medical advice.
          </p>
          <p>
            Treatment outcomes vary by individual and depend on factors including the complexity of your case, 
            compliance with wearing instructions, and proper dental care.
          </p>

          <h2>4. User Accounts</h2>
          <p>When you create an account with us, you must:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update any changes to your information</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>

          <h2>5. Treatment Terms</h2>
          <h3>Eligibility</h3>
           <p>
             Not everyone is a candidate for clear aligner treatment. Eligibility is determined by your treating 
             orthodontist during your consultation.
           </p>

          <h3>Compliance</h3>
          <p>
            Successful treatment requires wearing your aligners for 20-22 hours per day as prescribed. Failure 
            to comply may affect treatment outcomes.
          </p>

          <h3>Follow-up Care</h3>
          <p>
            You are required to attend scheduled check-ups with your treating provider and follow all post-treatment 
            retainer instructions.
          </p>

          <h2>6. Payments and Refunds</h2>
          <h3>Payment</h3>
          <p>
            Payment terms are established at the time of your treatment agreement. We offer various payment plans 
            to make treatment accessible.
          </p>

          <h3>Satisfaction Guarantee</h3>
          <p>
            We offer a satisfaction guarantee for eligible cases. Details and conditions are provided in your 
            treatment agreement.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property 
            of Awesome Aligners and is protected by intellectual property laws.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Awesome Aligners shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages arising from your use of our services.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Awesome Aligners and its officers, directors, employees, 
            and agents from any claims, damages, or expenses arising from your violation of these terms or your 
            use of our services.
          </p>

          <h2>10. Modifications</h2>
          <p>
            We reserve the right to modify these Terms of Service at any time. We will notify you of any changes 
            by posting the new terms on this page. Your continued use of our services after such changes 
            constitutes acceptance of the new terms.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the State 
            of New York, without regard to its conflict of law provisions.
          </p>

          <h2>12. Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us at:</p>
          <ul>
            <li>Email: legal@awesomealigners.com</li>
            <li>Phone: 1-800-ALIGNERS</li>
            <li>Address: 123 Manhattan Ave, New York, NY 10001</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfService;
