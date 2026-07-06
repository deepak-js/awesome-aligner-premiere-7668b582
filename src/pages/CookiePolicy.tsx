import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/SEOHead';

const CookiePolicy = () => {
  return (
    <main className="min-h-screen">
      <SEOHead
        title="Cookie Policy | Awesome Aligners"
        description="Understand how Awesome Aligners uses cookies and similar technologies on our website."
        canonical="https://awesomealigners.in/cookie-policy"
        ogImage="https://awesomealigners.in/og-image.jpg"
      />
      <Header />
      
      <section className="pt-32 pb-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 md:px-8 prose prose-slate dark:prose-invert max-w-none">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
            They are widely used to make websites work more efficiently and provide information to website owners.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>Awesome Aligners uses cookies for the following purposes:</p>

          <h3>Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core functionality such 
            as security, network management, and account access. You cannot opt out of these cookies.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>session_id</td>
                <td>Maintains your session state</td>
                <td>Session</td>
              </tr>
              <tr>
                <td>auth_token</td>
                <td>Authentication</td>
                <td>30 days</td>
              </tr>
              <tr>
                <td>cookie-consent</td>
                <td>Stores your cookie preferences</td>
                <td>1 year</td>
              </tr>
            </tbody>
          </table>

          <h3>Analytics Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting and reporting 
            information anonymously.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga</td>
                <td>Google Analytics - distinguishes users</td>
                <td>2 years</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>Google Analytics - distinguishes users</td>
                <td>24 hours</td>
              </tr>
            </tbody>
          </table>

          <h3>Functional Cookies</h3>
          <p>
            These cookies enable enhanced functionality and personalization, such as remembering your preferences 
            and settings.
          </p>
          <table>
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>theme</td>
                <td>Stores your theme preference</td>
                <td>1 year</td>
              </tr>
              <tr>
                <td>language</td>
                <td>Stores your language preference</td>
                <td>1 year</td>
              </tr>
            </tbody>
          </table>

          <h3>Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites to display relevant advertisements. They 
            may be set by our advertising partners.
          </p>

          <h2>3. Managing Cookies</h2>
          <p>You can control and manage cookies in various ways:</p>
          
          <h3>Browser Settings</h3>
          <p>
            Most web browsers allow you to manage cookies through their settings. You can typically find these 
            settings in the "Options" or "Preferences" menu of your browser.
          </p>
          <ul>
            <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
            <li><strong>Edge:</strong> Settings → Privacy & Security → Cookies</li>
          </ul>

          <h3>Our Cookie Banner</h3>
          <p>
            When you first visit our website, you will see a cookie consent banner that allows you to accept or 
            decline non-essential cookies.
          </p>

          <h2>4. Impact of Disabling Cookies</h2>
          <p>
            If you choose to disable cookies, please note that some features of our website may not function 
            properly. Essential cookies cannot be disabled as they are required for the website to function.
          </p>

          <h2>5. Third-Party Cookies</h2>
          <p>
            Some cookies on our website are placed by third parties, such as analytics and advertising providers. 
            We do not control these cookies, and you should check the third party's website for more information.
          </p>

          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology or legal 
            requirements. We will notify you of significant changes by posting a notice on our website.
          </p>

          <h2>7. Contact Us</h2>
          <p>If you have questions about our use of cookies, please contact us at:</p>
          <ul>
            <li>Email: support@awesomealigners.co.in</li>
            <li>Phone: +91 91502 20394</li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CookiePolicy;
