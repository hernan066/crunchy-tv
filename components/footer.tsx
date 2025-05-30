import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-semibold text-white">Navigation</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/browse" className="transition-colors hover:text-white">
                  Browse Popular
                </Link>
              </li>
              <li>
                <Link href="/simulcasts" className="transition-colors hover:text-white">
                  Simulcasts
                </Link>
              </li>
              <li>
                <Link href="/release-calendar" className="transition-colors hover:text-white">
                  Release Calendar
                </Link>
              </li>
              <li>
                <Link href="/music" className="transition-colors hover:text-white">
                  Music
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Connect With Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/youtube" className="transition-colors hover:text-white">
                  YouTube
                </Link>
              </li>
              <li>
                <Link href="/facebook" className="transition-colors hover:text-white">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="/twitter" className="transition-colors hover:text-white">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/instagram" className="transition-colors hover:text-white">
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Crunchyroll</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="transition-colors hover:text-white">
                  Help/FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Account</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/premium" className="transition-colors hover:text-white">
                  Premium Membership
                </Link>
              </li>
              <li>
                <Link href="/gift" className="transition-colors hover:text-white">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/redeem" className="transition-colors hover:text-white">
                  Redeem Gift Card
                </Link>
              </li>
              <li>
                <Link href="/student" className="transition-colors hover:text-white">
                  Student Discount
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CrunchyTv. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
