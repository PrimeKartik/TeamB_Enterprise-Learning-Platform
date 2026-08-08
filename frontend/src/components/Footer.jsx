import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="contact" className="bg-panel/40 border-t border-soft">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <GraduationCap size={16} className="text-white" />
            </div>
            <div>
              <p className="text-heading font-bold text-sm">SkillSphere</p>
              <p className="text-muted text-[10px]">Learning Nexus</p>
            </div>
          </div>
          <p className="text-muted text-xs leading-relaxed">
            Empowering learners to achieve their goals through quality education and continuous learning.
          </p>
        </div>

        <div>
          <p className="text-heading text-sm font-semibold mb-3">Quick Links</p>
          <ul className="space-y-2 text-muted text-xs">
            <li><a href="#home" className="hover:text-heading transition">Home</a></li>
            <li><a href="#courses" className="hover:text-heading transition">Courses</a></li>
            <li><a href="#about" className="hover:text-heading transition">About Us</a></li>
          </ul>
        </div>

        <div>
          <p className="text-heading text-sm font-semibold mb-3">Support</p>
          <ul className="space-y-2 text-muted text-xs">
            <li><Link to="/contact" className="hover:text-heading transition">Help Center</Link></li>
            <li><Link to="/#faq" className="hover:text-heading transition">FAQs</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-heading transition">Privacy Policy</Link></li>
            <li><Link to="/privacy-policy#terms" className="hover:text-heading transition">Terms &amp; Conditions</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-heading text-sm font-semibold mb-3">Contact Us</p>
          <ul className="space-y-3 text-muted text-xs">
            <li className="flex items-center gap-2"><Mail size={14} /> support@skillsphere.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Bengaluru, India</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-muted text-[11px] py-4 border-t border-soft">
        © {new Date().getFullYear()} SkillSphere Learning Nexus. All rights reserved.
      </div>
    </footer>
  )
}
