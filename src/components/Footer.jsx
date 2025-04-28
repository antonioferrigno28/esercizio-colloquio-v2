import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-0">&copy; 2025 Your Company. All rights reserved.</p>
        <p className="">
          <a href="/privacy" className="text-white text-decoration-none">
            Privacy Policy
          </a>
          {" | "}
          <a href="/terms" className="text-white text-decoration-none">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
}
