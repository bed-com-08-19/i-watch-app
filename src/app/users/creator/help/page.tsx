import React from 'react';
import { FiHome } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";

const Help = () => {
  return (
    <div className="min-h-screen bg-black-100 p-6">
         <div className="relative top-4 left-4 flex space-x-4">
                <a href="/users/creator"><FiHome /></a>
                <a href="/users/creator/profile"><BiArrowBack /></a>
            </div>
      <div className="max-w-3xl mx-auto bg-black p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Help Center</h1>
        
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
          <p className="mb-4">
            Welcome to our platform! Here are a few steps to help you get started:
          </p>
          <ol className="list-decimal list-inside pl-4">
            <li>Sign up for an account</li>
            <li>Complete your profile</li>
            <li>Explore our features</li>
            <li>Contact support if you need any help</li>
          </ol>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
          <div>
            <h3 className="text-lg font-medium">How do I reset my password?</h3>
            <p className="mb-4">
              If you forgot your password, click on Forgot password on the login page and follow the instructions.
            </p>
            <h3 className="text-lg font-medium">How do I contact support?</h3>
            <p className="mb-4">
              You can contact our support team via the contact form on the Contact Us page or by emailing iwatch@gmail.com.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            If you have any other questions or need further assistance, please reach out to our support team:
          </p>
          <ul className="list-disc list-inside pl-4">
            <li>Email: iwatch@gmail.com</li>
            <li>Phone: +265996540072 / +265881115705</li>
            <li>Address: Unima Campus, Zomba</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Help;
