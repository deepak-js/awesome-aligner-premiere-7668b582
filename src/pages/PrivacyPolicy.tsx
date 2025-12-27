import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2024</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-slate dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Awesome Aligners ("we," "our," or "us"). We are committed to protecting your personal information 
            and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you visit our website or use our services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Register for an account</li>
            <li>Complete our smile assessment quiz</li>
            <li>Request a consultation</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us with inquiries</li>
          </ul>
          <p>This information may include:</p>
          <ul>
            <li>Name, email address, phone number</li>
            <li>Dental and health information related to your treatment</li>
            <li>Photos and scans of your teeth</li>
            <li>Payment information</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we automatically collect certain information about your device, including 
            your IP address, browser type, operating system, and browsing behavior. We may also collect information 
            through cookies and similar technologies.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your treatment and payments</li>
            <li>Communicate with you about your treatment</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Analyze and improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li><strong>Healthcare Providers:</strong> Your treating dentist or orthodontist</li>
            <li><strong>Service Providers:</strong> Third parties that help us operate our business</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
            over the Internet is 100% secure.
          </p>

          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Data portability</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and track information and to improve our 
            website. For more information, please see our Cookie Policy.
          </p>

          <h2>8. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal information 
            from children under 13. If you believe we have collected information from a child, please contact us.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
            new Privacy Policy on this page and updating the "Last updated" date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@awesomealigners.com</li>
            <li>Phone: 1-800-ALIGNERS</li>
            <li>Address: 123 Manhattan Ave, New York, NY 10001</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
