import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img
              className="h-10"
              src="/placeholder.svg?height=40&width=120"
              alt="DJKnaeckebrot"
            />
            <p className="text-gray-500 dark:text-gray-400 text-base">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Marketing", "Analytics", "Commerce", "Insights"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Pricing", "Documentation", "Guides", "API Status"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  {["About", "Blog", "Jobs", "Press", "Partners"].map(
                    (item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  {["Claim", "Privacy", "Terms"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2024 DJKnaeckebrot, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
