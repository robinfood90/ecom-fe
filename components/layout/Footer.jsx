'use client'

import Link
  from "next/link"
export default function Footer() {
  return (
    <footer className="bg-[#3e770e] text-white flex items-start justify-between px-7 py-6 ">
      <img src="/mock_EGM_Logo.png" alt="EGM mock logo" width={70} height={70} />
      <div className="font-semibold mb-2">Follow us via
        <div className="flex items-center gap-3">
          <a href="https://www.facebook.com/"><img src="/facebook.png" alt="facebook icon" width={20} height={20} /></a>
          <a href="https://www.instagram.com/"><img src="/instagram.png" alt="instagram icon" width={20} height={20} /> </a>
        </div>
      </div>
      <div className="font-semibold mb-2">Or</div> 
      <div className="companyInfo">
        <p className="font-semibold mb-2">Visit us at </p>
        <p>Earlwood Growers Market</p>
        <p>Shop 1, 12-16 Clarke Street, <br />
        Earlwood, NSW, 2206, <br />
        Phone: 02 9558 3517</p>
      </div>
      <div className="tradingHour">
        <p className="font-semibold mb-2">Trading hour</p>
        <p>Mon-Fri: 7am-7pm</p>
        <p>Sat-Sun: 7am-6pm</p>
      </div>
      <div className="helpTab">
        <p className="font-semibold mb-2">Help</p>
        <div>
        <Link href="/FAQ">FAQ</Link> <br />
        <Link href="/contact">Contact us</Link> <br />
        <Link href="/privacyPolicy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}