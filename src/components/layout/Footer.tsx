import { Link } from "react-router-dom";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "All Products", to: "/" },
      { label: "Categories", to: "/?category=all" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQs", to: "/faqs" },
      { label: "Shipping & Returns", to: "/shipping-returns" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "TikTok", href: "https://tiktok.com" },
];

function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
<<<<<<< HEAD
        
=======
         
>>>>>>> 97ada98a5c715ec4c71c513a714cfe164a5a8bee
          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <h3 className="footer-heading">{section.heading}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow Us */}
          <div>
            <h3 className="footer-heading text">Follow our socials</h3>
            <ul className="space-y-2">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom mt-8 pt-6 text-center">
          © 2026 E-SHOP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;