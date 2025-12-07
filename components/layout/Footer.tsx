"use client"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">About Task Master</h3>
            <p className="text-sm text-slate-600">
              Your ultimate productivity companion for managing tasks efficiently.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Quick Links</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  My Tasks
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Settings
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Support</h3>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Help & Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Report a Bug
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">
                  Feature Requests
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright and Links */}
          <div className="flex items-center gap-6 text-sm">
            <p className="text-slate-600">© 2025 Task Master. All rights reserved.</p>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Cookie Policy
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
              My Tasks
            </a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Calendar
            </a>
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors">
              Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
