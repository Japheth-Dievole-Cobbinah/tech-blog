import React from 'react'
import assets, { footer_data } from '../assets/assets.js'

const Footer = () => {
  return (
    <footer className="bg-primary/5 text-gray-600">
      {/* Top Section */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 border-b border-gray-300/30">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Logo and Description */}
          <div className="max-w-md">
            <img
              src={assets.logo}
              alt="CommIT Connect logo"
              className="w-32 sm:w-44 mb-5"
            />
            <p className="text-sm leading-relaxed text-gray-700">
              <span className="font-semibold text-gray-900">CommIT Connect</span> is a digital hub where technology, culture, and lifestyle converge —
              inspiring awareness, creativity, and connection in the modern world.
            </p>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-10 w-full md:w-[50%]">
            {footer_data.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-900 mb-3 text-base">
                  {section.title}
                </h3>
                <ul className="space-y-1.5 text-sm">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:text-primary hover:underline transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center py-6 px-4 text-sm text-gray-500 bg-primary/10">
        <p>
          © {new Date().getFullYear()} <span className="font-semibold text-gray-700">CommIT Connect</span>. All rights reserved.
        </p>
        <p className="mt-1 text-xs md:text-sm">
          Developed by <span className="text-primary font-medium">Japheth Dievole Cobbinah</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
