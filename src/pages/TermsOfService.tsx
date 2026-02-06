import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui';
import { Header, Footer } from '../components/layout';
import { DocumentTextIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header showAuth={true} />
      
      <main className="py-16">
        <Container>
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-6">
                <DocumentTextIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Quick Summary */}
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">You own your content and data</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">We respect your privacy</span>
                </div>
                <div className="flex items-start">
                  <XCircleIcon className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">No illegal content allowed</span>
                </div>
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">You're responsible for your account</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Welcome to CloudDrive. By accessing or using our cloud storage service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  These Terms constitute a legally binding agreement between you and CloudDrive Inc. ("CloudDrive," "we," "us," or "our"). We reserve the right to update these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Account Registration and Security</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Account Creation</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  To use our Service, you must create an account by providing accurate and complete information. You must be at least 13 years old to create an account. If you are under 18, you must have permission from a parent or guardian.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.2 Account Security</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You are responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized access</li>
                  <li>Using a strong, unique password</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  We are not liable for any loss or damage arising from your failure to protect your account information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Service Plans and Payment</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.1 Free and Paid Plans</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We offer both free and paid subscription plans. Free plans have storage limitations and may include advertisements. Paid plans offer additional storage, features, and an ad-free experience.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.2 Billing and Payments</h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                  <li>All fees are non-refundable except as required by law</li>
                  <li>We may change our pricing with 30 days' notice</li>
                  <li>You authorize us to charge your payment method automatically</li>
                  <li>Failure to pay may result in service suspension or termination</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3.3 Cancellation</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You may cancel your subscription at any time. Your access to paid features will continue until the end of your current billing period. No refunds will be provided for partial months or unused storage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Your Content and Data</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.1 Ownership</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You retain all ownership rights to the content and files you upload to CloudDrive. We do not claim any ownership over your content.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.2 License to CloudDrive</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  By uploading content, you grant us a limited license to store, backup, and display your content solely for the purpose of providing the Service. This license ends when you delete your content or close your account.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.3 Content Restrictions</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You agree not to upload, store, or share content that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Violates any law or regulation</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains malware, viruses, or harmful code</li>
                  <li>Is defamatory, obscene, or offensive</li>
                  <li>Promotes violence, terrorism, or illegal activities</li>
                  <li>Contains child exploitation material</li>
                  <li>Violates anyone's privacy or publicity rights</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4.4 Content Monitoring</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  While we respect your privacy, we reserve the right to review content if we believe it violates these Terms or applicable law. We may remove content and suspend or terminate accounts that violate our policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Acceptable Use</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You agree to use the Service only for lawful purposes. You must not:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the Service</li>
                  <li>Use automated systems to access the Service without permission</li>
                  <li>Resell or redistribute the Service</li>
                  <li>Reverse engineer or decompile any part of the Service</li>
                  <li>Use the Service to send spam or unsolicited communications</li>
                  <li>Impersonate others or misrepresent your affiliation</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Storage Limits and File Retention</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.1 Storage Quotas</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Each account has a storage limit based on the subscription plan. If you exceed your limit, you must upgrade your plan or delete files to continue uploading.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.2 Inactive Accounts</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Accounts inactive for more than 12 months may be subject to deletion. We will provide notice before deleting any inactive account.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6.3 Data Backup</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  While we maintain regular backups, you are responsible for maintaining your own backup copies of important files. We are not liable for any data loss.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The Service, including its design, features, and functionality, is owned by CloudDrive and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or create derivative works without our permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Third-Party Services</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our Service may integrate with third-party services or contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of these third parties. Your use of third-party services is at your own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Disclaimers and Limitations of Liability</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.1 Service Availability</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The Service is provided "as is" and "as available." We do not guarantee uninterrupted or error-free service. We may suspend or terminate the Service for maintenance or other reasons.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">9.2 Limitation of Liability</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  To the maximum extent permitted by law, CloudDrive shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Your use or inability to use the Service</li>
                  <li>Unauthorized access to your account or data</li>
                  <li>Any conduct or content of third parties</li>
                  <li>Any content obtained from the Service</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Indemnification</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You agree to indemnify and hold CloudDrive harmless from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Your use of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any rights of another party</li>
                  <li>Your content or data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Termination</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may suspend or terminate your account at any time for any reason, including violation of these Terms. Upon termination:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Your right to use the Service immediately ceases</li>
                  <li>You will have 30 days to download your data</li>
                  <li>We may delete your data after the grace period</li>
                  <li>No refunds will be provided for prepaid fees</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Dispute Resolution</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12.1 Governing Law</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  These Terms are governed by the laws of the State of California, without regard to conflict of law principles.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">12.2 Arbitration</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Any disputes arising from these Terms or the Service shall be resolved through binding arbitration, except that either party may seek injunctive relief in court. You waive your right to participate in class action lawsuits.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">13. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may modify these Terms at any time. We will notify you of material changes via email or through the Service. Your continued use after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">14. General Provisions</h2>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and CloudDrive</li>
                  <li><strong>Severability:</strong> If any provision is found invalid, the remaining provisions remain in effect</li>
                  <li><strong>Waiver:</strong> Our failure to enforce any right does not waive that right</li>
                  <li><strong>Assignment:</strong> You may not assign these Terms without our consent</li>
                  <li><strong>Force Majeure:</strong> We are not liable for delays due to circumstances beyond our control</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">15. Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have questions about these Terms, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Email:</strong> legal@clouddrive.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Address:</strong> CloudDrive Inc., 123 Cloud Street, San Francisco, CA 94105
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Support:</strong> support@clouddrive.com
                  </p>
                </div>
              </section>

              <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 mt-8">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Acknowledgment:</strong> By using CloudDrive, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-12 text-center">
              <Link 
                to="/" 
                className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};
