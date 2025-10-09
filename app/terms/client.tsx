"use client";

import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/metadata";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

function AnimatedWarning({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-500 ease-out ${isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-4 scale-95"
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function TermsPageClient() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`container py-12 md:py-20 transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Back Button */}
      <div className="mb-8 animate-fadeIn">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
          <span className="group-hover:text-primary transition-colors duration-300">Back</span>
        </Button>
      </div>

      <div className="prose prose-zinc mx-auto dark:prose-invert max-w-4xl">
        <div className="text-center mb-12 animate-fadeIn delay-100">
          <h1 className="text-4xl font-bold mb-4 transition-all duration-700 ease-out bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <div className="text-lg font-semibold text-primary mb-2 animate-fadeIn delay-200">
            PrismLinux
          </div>
          <div className="text-sm text-muted-foreground space-y-1 animate-fadeIn delay-300">
            <div>
              <strong>Effective Date:</strong> September 14, 2025
            </div>
            <div>
              <strong>Last Updated:</strong> September 14, 2025
            </div>
          </div>
        </div>

        <section className="mb-8 animate-fadeIn delay-400">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            1. About PrismLinux
          </h2>
          <p className="text-lg leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            PrismLinux is an open-source Linux distribution based on Arch Linux,
            developed and maintained by CrystalNetwork Studio, an open-source
            software organization focused on improving the world through
            security and open-source software that everyone can contribute to.
            Our main repository is hosted at{" "}
            <a
              href={SITE_CONFIG.social.gitlab + "linux/prismlinux/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors duration-300 relative group"
            >
              GitLab PrismLinux
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>{" "}
            and we are committed to providing a free, transparent, secure, and
            privacy-respecting operating system.
          </p>
        </section>

        <section className="mb-8 animate-fadeIn delay-500">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            2. Acceptance of Terms
          </h2>
          <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            By downloading, installing, or using PrismLinux, you acknowledge
            that you have read, understood, and agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use
            PrismLinux.
          </p>
        </section>

        <section className="mb-8 animate-fadeIn delay-600">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            3. Open Source License
          </h2>
          <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            PrismLinux is distributed under open-source licenses. The specific
            licenses for different components are detailed in the documentation
            and source code repositories. By using PrismLinux, you agree to
            comply with the terms of these open-source licenses.
          </p>
        </section>

        <section className="mb-8 animate-fadeIn delay-700">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            4. Privacy and Data Collection
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400 transition-colors duration-300 hover:text-green-700 dark:hover:text-green-300 group">
              4.1 No Data Collection
            </h3>
            <AnimatedWarning delay={200}>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-green-300/50 dark:hover:ring-green-700/50 group">
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
            </AnimatedWarning>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              4.2 Local Data Storage
            </h3>
            <p className="mb-3 transition-all duration-500 hover:pl-2 group-hover:text-primary">The only data stored on your system is:</p>
            <ul className="space-y-2 ml-4">
              {[
                "User account information you create (usernames, encrypted passwords)",
                "System configuration files you modify",
                "Applications and files you choose to install or create"
              ].map((item, idx) => (
                <AnimatedWarning key={idx} delay={300 + idx * 100}>
                  <li className="flex items-start transition-all duration-500 hover:translate-x-1 group">
                    <span className="text-primary mr-2 group-hover:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover:text-primary transition-colors duration-300">{item}</span>
                  </li>
                </AnimatedWarning>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              4.3 Encryption
            </h3>
            <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
              Any sensitive information that must be stored locally (such as
              passwords) is properly encrypted using industry-standard
              encryption methods.
            </p>
          </div>
        </section>

        <section className="mb-8 animate-fadeIn delay-800">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            5. Use of the Software
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 text-green-600 dark:text-green-400 transition-colors duration-300 hover:text-green-700 dark:hover:text-green-300 group">
              5.1 Permitted Use
            </h3>
            <p className="mb-3 transition-all duration-500 hover:pl-2 group-hover:text-primary">You may:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Install and use PrismLinux on any compatible hardware",
                "Modify, customize, and configure the system for your needs",
                "Distribute unmodified copies of PrismLinux",
                "Create and distribute derivative works under the applicable open-source licenses"
              ].map((item, idx) => (
                <AnimatedWarning key={idx} delay={400 + idx * 100}>
                  <li className="flex items-start transition-all duration-500 hover:translate-x-1 group">
                    <span className="text-green-500 mr-2 group-hover:scale-125 transition-transform duration-300">✓</span>
                    <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">{item}</span>
                  </li>
                </AnimatedWarning>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 text-red-600 dark:text-red-400 transition-colors duration-300 hover:text-red-700 dark:hover:text-red-300 group">
              5.2 Prohibited Use
            </h3>
            <p className="mb-3 transition-all duration-500 hover:pl-2 group-hover:text-primary">You may not:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Use PrismLinux for illegal activities",
                "Remove or alter copyright notices or license information",
                "Claim ownership of PrismLinux or its components",
                "Use the PrismLinux name or trademarks without permission"
              ].map((item, idx) => (
                <AnimatedWarning key={idx} delay={500 + idx * 100}>
                  <li className="flex items-start transition-all duration-500 hover:translate-x-1 group">
                    <span className="text-red-500 mr-2 group-hover:scale-125 transition-transform duration-300">✗</span>
                    <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">{item}</span>
                  </li>
                </AnimatedWarning>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-8 animate-fadeIn delay-900">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            6. Disclaimers and Limitations
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              6.1 No Warranty
            </h3>
            <AnimatedWarning delay={200}>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-yellow-300/50 dark:hover:ring-yellow-700/50 group">
                <p className="leading-relaxed">
                  PrismLinux is provided "as is" without any warranty of any kind,
                  either express or implied, including but not limited to
                  warranties of merchantability, fitness for a particular purpose,
                  or non-infringement.
                </p>
              </div>
            </AnimatedWarning>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              6.2 Limitation of Liability
            </h3>
            <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
              CrystalNetwork Studio and PrismLinux contributors shall not be
              liable for any direct, indirect, incidental, special, or
              consequential damages arising from the use or inability to use
              PrismLinux.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              6.3 User Responsibility
            </h3>
            <p className="mb-3 transition-all duration-500 hover:pl-2 group-hover:text-primary">Users are responsible for:</p>
            <ul className="space-y-2 ml-4">
              {[
                "Backing up their data before installation or updates",
                "Understanding the risks of using beta or development versions",
                "Ensuring compatibility with their hardware and use cases"
              ].map((item, idx) => (
                <AnimatedWarning key={idx} delay={600 + idx * 100}>
                  <li className="flex items-start transition-all duration-500 hover:translate-x-1 group">
                    <span className="text-primary mr-2 group-hover:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover:text-primary transition-colors duration-300">{item}</span>
                  </li>
                </AnimatedWarning>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-8 animate-fadeIn delay-1000">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            7. Updates and Modifications
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              7.1 Software Updates
            </h3>
            <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
              PrismLinux may receive updates, patches, and new versions. Users
              are encouraged but not required to install updates.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              7.2 Terms Updates
            </h3>
            <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
              These Terms of Service may be updated from time to time. Continued
              use of PrismLinux after changes constitutes acceptance of the
              revised terms.
            </p>
          </div>
        </section>

        <section className="mb-8 animate-fadeIn delay-1100">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            8. Community and Support
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              8.1 Community Guidelines
            </h3>
            <p className="mb-3 transition-all duration-500 hover:pl-2 group-hover:text-primary">
              Users participating in PrismLinux communities (forums, chat
              channels, issue trackers) are expected to:
            </p>
            <ul className="space-y-2 ml-4">
              {[
                "Be respectful and constructive",
                "Follow the code of conduct",
                "Respect intellectual property rights",
                "Not engage in harassment or discrimination",
                "Contribute to making the world safer and more secure through open-source collaboration"
              ].map((item, idx) => (
                <AnimatedWarning key={idx} delay={700 + idx * 100}>
                  <li className="flex items-start transition-all duration-500 hover:translate-x-1 group">
                    <span className="text-primary mr-2 group-hover:scale-125 transition-transform duration-300">•</span>
                    <span className="group-hover:text-primary transition-colors duration-300">{item}</span>
                  </li>
                </AnimatedWarning>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              8.2 Contributions
            </h3>
            <AnimatedWarning delay={300}>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-300/50 dark:hover:ring-blue-700/50 group">
                <p className="leading-relaxed">
                  PrismLinux welcomes contributions from everyone. By contributing
                  code, documentation, bug reports, or other improvements,
                  contributors help advance our mission of improving world
                  security through accessible open-source software.
                </p>
              </div>
            </AnimatedWarning>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              8.3 Support
            </h3>
            <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
              Support is provided on a best-effort basis by volunteers and the
              community. There is no guarantee of response time or resolution.
            </p>
          </div>
        </section>

        {/* Continue with remaining sections... */}
        <section className="mb-8 animate-fadeIn delay-1200">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            9. Third-Party Software
          </h2>
          <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            PrismLinux includes software packages from third parties, each
            subject to their own licenses and terms. Users are responsible for
            complying with the licenses of all installed software.
          </p>
        </section>

        <section className="mb-8 animate-fadeIn delay-1300">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            10. Intellectual Property
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              10.1 PrismLinux Branding
            </h3>
            <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
              The PrismLinux name, logo, and branding are trademarks of
              CrystalNetwork Studio. Use of these trademarks requires explicit
              permission.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3 transition-colors duration-300 hover:text-foreground group">
              10.2 User Content
            </h3>
            <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
              Users retain ownership of any content they create while using
              PrismLinux. PrismLinux does not claim ownership of user-generated
              content.
            </p>
          </div>
        </section>

        <section className="mb-8 animate-fadeIn delay-1400">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            11. Termination
          </h2>
          <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            These terms remain in effect until terminated. You may terminate
            this agreement by ceasing to use PrismLinux and removing it from
            your systems. CrystalNetwork Studio may terminate this agreement if
            you violate these terms.
          </p>
        </section>

        <section className="mb-8 animate-fadeIn delay-1500">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            12. Governing Law
          </h2>
          <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            These Terms of Service shall be governed by and construed in
            accordance with the laws of Ukraine, without regard to conflict of
            law principles.
          </p>
        </section>

        <section className="mb-8 animate-fadeIn delay-1600">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            13. Severability
          </h2>
          <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            If any provision of these terms is found to be unenforceable, the
            remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="mb-8 animate-fadeIn delay-1700">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            14. Contact Information
          </h2>
          <p className="mb-4 transition-all duration-500 hover:pl-2 group-hover:text-primary">
            For questions about these Terms of Service, please contact:
          </p>
          <AnimatedWarning delay={400}>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg space-y-2 transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-gray-300/50 dark:hover:ring-gray-700/50 group">
              <div>
                <strong>Main Repository:</strong>{" "}
                <a
                  href={SITE_CONFIG.social.gitlab + "linux/prismlinux/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors duration-300 relative group"
                >
                  GitLab
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
              <div>
                <strong>Organization:</strong> CrystalNetwork Studio
              </div>
            </div>
          </AnimatedWarning>
        </section>

        <section className="mb-8 animate-fadeIn delay-1800">
          <h2 className="text-2xl font-semibold mb-4 text-primary border-b pb-2 transition-colors duration-300 hover:text-foreground group">
            15. Acknowledgments
          </h2>
          <p className="mb-4 transition-all duration-500 hover:pl-2 group-hover:text-primary">
            PrismLinux is built upon the excellent work of:
          </p>
          <ul className="space-y-2 ml-4 mb-4">
            {[
              "The Arch Linux project and community",
              "The broader Linux and open-source software communities",
              "Individual contributors and maintainers"
            ].map((item, idx) => (
              <AnimatedWarning key={idx} delay={800 + idx * 100}>
                <li className="flex items-start transition-all duration-500 hover:translate-x-1 group">
                  <span className="text-primary mr-2 group-hover:scale-125 transition-transform duration-300">•</span>
                  <span className="group-hover:text-primary transition-colors duration-300">{item}</span>
                </li>
              </AnimatedWarning>
            ))}
          </ul>
          <p className="leading-relaxed transition-all duration-500 hover:pl-2 group-hover:text-primary">
            We are grateful for their contributions that make PrismLinux
            possible.
          </p>
        </section>

        <div className="border-t pt-8 mt-12 animate-fadeIn delay-1900">
          <AnimatedWarning delay={500}>
            <div className="bg-primary/10 p-6 rounded-lg text-center transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-primary/30 group">
              <p className="text-lg font-semibold transition-all duration-500 hover:scale-105 group-hover:text-primary">
                By using PrismLinux, you acknowledge that you have read and
                understood these Terms of Service and agree to be bound by them.
              </p>
            </div>
          </AnimatedWarning>
        </div>
      </div>
    </div>
  );
}
