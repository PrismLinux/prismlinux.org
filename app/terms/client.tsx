"use client";

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/metadata";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="container py-12 md:py-20">
      {/* Back Button */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>

      <div className="prose prose-zinc mx-auto dark:prose-invert max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <div className="text-lg font-semibold text-primary mb-2">
            PrismLinux
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              <strong>Effective Date:</strong> September 14, 2025
            </div>
            <div>
              <strong>Last Updated:</strong> September 14, 2025
            </div>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            1. About PrismLinux
          </h2>
          <p className="text-lg leading-relaxed">
            PrismLinux is an open-source Linux distribution based on Arch Linux,
            developed and maintained by CrystalNetwork Studio, an open-source
            software organization focused on improving the world through
            security and open-source software that everyone can contribute to.
            Our main repository is hosted at{" "}
            <a
              href={SITE_CONFIG.social.gitlab + "linux/prismlinux/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://gitlab.com/crystalnetwork-studio/linux/prismlinux/
            </a>{" "}
            and we are committed to providing a free, transparent, secure, and
            privacy-respecting operating system.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            2. Acceptance of Terms
          </h2>
          <p className="leading-relaxed">
            By downloading, installing, or using PrismLinux, you acknowledge
            that you have read, understood, and agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use
            PrismLinux.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            3. Open Source License
          </h2>
          <p className="leading-relaxed">
            PrismLinux is distributed under open-source licenses. The specific
            licenses for different components are detailed in the documentation
            and source code repositories. By using PrismLinux, you agree to
            comply with the terms of these open-source licenses.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            4. Privacy and Data Collection
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
              4.1 No Data Collection
            </h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="leading-relaxed">
                PrismLinux{" "}
                <strong className="text-green-700 dark:text-green-300">
                  does not collect, store, or transmit any personal data, usage
                  statistics, telemetry, or analytics
                </strong>{" "}
                from users. We are committed to absolute privacy and user
                autonomy.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">4.2 Local Data Storage</h3>
            <p className="mb-3">The only data stored on your system is:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                User account information you create (usernames, encrypted
                passwords)
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                System configuration files you modify
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Applications and files you choose to install or create
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">4.3 Encryption</h3>
            <p className="leading-relaxed">
              Any sensitive information that must be stored locally (such as
              passwords) is properly encrypted using industry-standard
              encryption methods.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            5. Use of the Software
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400">
              5.1 Permitted Use
            </h3>
            <p className="mb-3">You may:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Install and use PrismLinux on any compatible hardware
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Modify, customize, and configure the system for your needs
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Distribute unmodified copies of PrismLinux
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Create and distribute derivative works under the applicable
                open-source licenses
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 text-red-600 dark:text-red-400">
              5.2 Prohibited Use
            </h3>
            <p className="mb-3">You may not:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Use PrismLinux for illegal activities
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Remove or alter copyright notices or license information
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Claim ownership of PrismLinux or its components
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                Use the PrismLinux name or trademarks without permission
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            6. Disclaimers and Limitations
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">6.1 No Warranty</h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="leading-relaxed">
                PrismLinux is provided "as is" without any warranty of any kind,
                either express or implied, including but not limited to
                warranties of merchantability, fitness for a particular purpose,
                or non-infringement.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">
              6.2 Limitation of Liability
            </h3>
            <p className="leading-relaxed">
              CrystalNetwork Studio and PrismLinux contributors shall not be
              liable for any direct, indirect, incidental, special, or
              consequential damages arising from the use or inability to use
              PrismLinux.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">
              6.3 User Responsibility
            </h3>
            <p className="mb-3">Users are responsible for:</p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Backing up their data before installation or updates
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Understanding the risks of using beta or development versions
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Ensuring compatibility with their hardware and use cases
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            7. Updates and Modifications
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">7.1 Software Updates</h3>
            <p className="leading-relaxed">
              PrismLinux may receive updates, patches, and new versions. Users
              are encouraged but not required to install updates.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">7.2 Terms Updates</h3>
            <p className="leading-relaxed">
              These Terms of Service may be updated from time to time. Continued
              use of PrismLinux after changes constitutes acceptance of the
              revised terms.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            8. Community and Support
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">
              8.1 Community Guidelines
            </h3>
            <p className="mb-3">
              Users participating in PrismLinux communities (forums, chat
              channels, issue trackers) are expected to:
            </p>
            <ul className="space-y-2 ml-4">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Be respectful and constructive
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Follow the code of conduct
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Respect intellectual property rights
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Not engage in harassment or discrimination
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Contribute to making the world safer and more secure through
                open-source collaboration
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">8.2 Contributions</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="leading-relaxed">
                PrismLinux welcomes contributions from everyone. By contributing
                code, documentation, bug reports, or other improvements,
                contributors help advance our mission of improving world
                security through accessible open-source software.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">8.3 Support</h3>
            <p className="leading-relaxed">
              Support is provided on a best-effort basis by volunteers and the
              community. There is no guarantee of response time or resolution.
            </p>
          </div>
        </section>

        {/* Continue with remaining sections... */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            9. Third-Party Software
          </h2>
          <p className="leading-relaxed">
            PrismLinux includes software packages from third parties, each
            subject to their own licenses and terms. Users are responsible for
            complying with the licenses of all installed software.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            10. Intellectual Property
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3">
              10.1 PrismLinux Branding
            </h3>
            <p className="leading-relaxed">
              The PrismLinux name, logo, and branding are trademarks of
              CrystalNetwork Studio. Use of these trademarks requires explicit
              permission.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">10.2 User Content</h3>
            <p className="leading-relaxed">
              Users retain ownership of any content they create while using
              PrismLinux. PrismLinux does not claim ownership of user-generated
              content.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            11. Termination
          </h2>
          <p className="leading-relaxed">
            These terms remain in effect until terminated. You may terminate
            this agreement by ceasing to use PrismLinux and removing it from
            your systems. CrystalNetwork Studio may terminate this agreement if
            you violate these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            12. Governing Law
          </h2>
          <p className="leading-relaxed">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of Ukraine, without regard to conflict of
            law principles.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            13. Severability
          </h2>
          <p className="leading-relaxed">
            If any provision of these terms is found to be unenforceable, the
            remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            14. Contact Information
          </h2>
          <p className="mb-4">
            For questions about these Terms of Service, please contact:
          </p>
          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2">
            <div>
              <strong>Main Repository:</strong>{" "}
              <a
                href={SITE_CONFIG.social.gitlab + "linux/prismlinux/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://gitlab.com/crystalnetwork-studio/linux/prismlinux/
              </a>
            </div>
            <div>
              <strong>Organization:</strong> CrystalNetwork Studio
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2">
            15. Acknowledgments
          </h2>
          <p className="mb-4">
            PrismLinux is built upon the excellent work of:
          </p>
          <ul className="space-y-2 ml-4 mb-4">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              The Arch Linux project and community
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              The broader Linux and open-source software communities
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              Individual contributors and maintainers
            </li>
          </ul>
          <p className="leading-relaxed">
            We are grateful for their contributions that make PrismLinux
            possible.
          </p>
        </section>

        <div className="border-t pt-8 mt-12">
          <div className="bg-primary/10 p-6 rounded-lg text-center">
            <p className="text-lg font-semibold">
              By using PrismLinux, you acknowledge that you have read and
              understood these Terms of Service and agree to be bound by them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
