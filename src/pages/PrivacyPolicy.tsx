import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui';
import { Header, Footer } from '../components/layout';
import { ShieldCheckIcon, LockClosedIcon, EyeSlashIcon, ServerIcon } from '@heroicons/react/24/outline';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header showAuth={true} />
      
      <main className="py-16">
        <Container>
          {/* Header Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Key Principles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                <LockClosedIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Encrypted Storage</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Your files are encrypted at rest and in transit</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                <EyeSlashIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">No Data Selling</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">We never sell your personal information</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
                <ServerIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure Infrastructure</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Enterprise-grade security standards</p>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Welcome to CloudDrive ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our cloud storage service.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  By using CloudDrive, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.1 Personal Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Name and email address when you create an account</li>
                  <li>Payment information when you subscribe to premium plans</li>
                  <li>Profile information you choose to add</li>
                  <li>Communications you send to our support team</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.2 File Content</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We store the files and content you upload to our service. Your files are encrypted and stored securely on our servers. We do not access, view, or analyze your file content except as necessary to provide the service or as required by law.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2.3 Usage Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We automatically collect certain information about your device and how you interact with our service:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Device information (type, operating system, browser)</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Log data and error reports</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your transactions and manage your subscription</li>
                  <li>Send you technical notices, updates, and security alerts</li>
                  <li>Respond to your comments, questions, and customer service requests</li>
                  <li>Monitor and analyze trends, usage, and activities</li>
                  <li>Detect, prevent, and address technical issues and security threats</li>
                  <li>Comply with legal obligations and enforce our terms</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li><strong>Encryption:</strong> All files are encrypted at rest using AES-256 encryption and in transit using TLS 1.3</li>
                  <li><strong>Access Controls:</strong> Strict access controls and authentication mechanisms</li>
                  <li><strong>Regular Audits:</strong> Regular security audits and vulnerability assessments</li>
                  <li><strong>Secure Infrastructure:</strong> Data centers with physical and network security</li>
                  <li><strong>Backup Systems:</strong> Regular backups to prevent data loss</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Data Sharing and Disclosure</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li><strong>Service Providers:</strong> With third-party vendors who perform services on our behalf (e.g., payment processing, hosting)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Your Rights and Choices</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-4 space-y-2">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong>Export:</strong> Download your files and data at any time</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  To exercise these rights, please contact us at privacy@clouddrive.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Data Retention</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We retain your information for as long as your account is active or as needed to provide services. When you delete your account, we will delete your personal information and files within 30 days, except where we are required to retain it for legal purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. International Data Transfers</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Children's Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Email:</strong> privacy@clouddrive.com
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <strong>Address:</strong> CloudDrive Inc., 123 Cloud Street, San Francisco, CA 94105
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Support:</strong> support@clouddrive.com
                  </p>
                </div>
              </section>
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
