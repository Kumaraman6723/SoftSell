import { useState, useEffect } from "react";

// Icons
import {
  Upload,
  DollarSign,
  CreditCard,
  Shield,
  Clock,
  Award,
  Users,
  Sun,
  Moon,
  Send,
  MessageCircle,
  X,
  Menu,
  X as Close,
} from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! How can I help you with selling your software licenses today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Handle dark mode toggle and store preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setDarkMode(savedMode === "true");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.company.trim()) {
      errors.company = "Company is required";
    }

    if (!formData.licenseType) {
      errors.licenseType = "Please select a license type";
    }

    return errors;
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Here you would typically send the form data to a backend
    alert("Form submitted successfully! We will contact you soon.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      licenseType: "",
      message: "",
    });
  };

  // AI Chat functionality
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setChatMessages([...chatMessages, { role: "user", content: inputMessage }]);

    // Simulate AI response
    setTimeout(() => {
      let response;
      const lowercaseInput = inputMessage.toLowerCase();

      if (lowercaseInput.includes("how") && lowercaseInput.includes("sell")) {
        response =
          "To sell your license, simply click the 'Get a Quote' button at the top of our page. Fill out the form with your license details, and our team will provide a valuation within 24 hours!";
      } else if (
        lowercaseInput.includes("price") ||
        lowercaseInput.includes("worth") ||
        lowercaseInput.includes("value")
      ) {
        response =
          "License values vary based on software type, remaining validity, and market demand. After submitting your license details, we'll provide a competitive quote based on current market rates.";
      } else if (
        lowercaseInput.includes("payment") ||
        lowercaseInput.includes("paid")
      ) {
        response =
          "We offer multiple payment methods including direct bank transfer, PayPal, and crypto. Once you accept our offer, payment is typically processed within 2-3 business days.";
      } else if (
        lowercaseInput.includes("how long") ||
        lowercaseInput.includes("process") ||
        lowercaseInput.includes("time")
      ) {
        response =
          "Our process is fast! After you submit your license, we'll provide a valuation within 24 hours. Once you accept, payment processing takes 2-3 business days.";
      } else {
        response =
          "Thanks for your message! For this specific question, it might be best to speak with our team directly. Please fill out the contact form above and we'll get back to you promptly!";
      }

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response },
      ]);
    }, 1000);

    setInputMessage("");
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-white text-gray-800"
      } overflow-x-hidden`} // Add overflow-x-hidden here
    >
      {/* Navigation */}
      <nav
        className={`sticky top-0 z-50 ${
          darkMode ? "dark:bg-gray-800" : "bg-white"
        } shadow-md`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">SoftSell</div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 mr-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              {mobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-200 text-gray-700"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a
              href="#features"
              className="hover:text-blue-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-blue-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="hover:text-blue-600 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 py-4 px-4 shadow-lg animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <a
                href="#features"
                className="hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className={`py-16 md:py-24 ${
          darkMode
            ? "dark:bg-gray-800"
            : "bg-gradient-to-r from-blue-50 to-indigo-100"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight animate-fadeIn">
              Turn Unused Software Licenses Into{" "}
              <span className="text-blue-600">Instant Cash</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 opacity-80 max-w-lg mx-auto md:mx-0 animate-slideUp">
              SoftSell helps businesses recover value from inactive or surplus
              software licenses with our secure, efficient resale platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl pulse-animation"
              >
                Get a Quote
              </a>
              <a
                href="#how-it-works"
                className="bg-white hover:bg-gray-100 text-blue-600 font-medium px-6 py-3 rounded-lg border border-blue-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-2xl p-4 md:p-6 transform md:rotate-1 hover:rotate-0 transition-transform duration-300 mx-auto max-w-md">
              <div className="w-full h-48 sm:h-64 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <DollarSign size={60} className="text-white" />
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
                Average Recovery Value
              </div>
              <div className="text-xl sm:text-2xl font-bold mt-1 mb-2">
                Up to 70% of Original Cost
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <span>↗</span>
                <span className="text-sm">
                  Highest payout rates in the industry
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className={`py-16 md:py-20 ${
          darkMode ? "dark:bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto">
              Our streamlined process makes it easy to turn your unused software
              licenses into cash, in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <div
              className={`p-6 md:p-8 rounded-xl ${
                darkMode ? "dark:bg-gray-800" : "bg-blue-50"
              } flex flex-col items-center text-center hover:shadow-lg transition-shadow`}
            >
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Upload className="text-white" size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                Upload Your License
              </h3>
              <p className="opacity-80 text-sm md:text-base">
                Submit your license details through our secure portal. We
                support major software vendors including Microsoft, Adobe, and
                Oracle.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className={`p-6 md:p-8 rounded-xl ${
                darkMode ? "dark:bg-gray-800" : "bg-blue-50"
              } flex flex-col items-center text-center hover:shadow-lg transition-shadow`}
            >
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <DollarSign className="text-white" size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                Get a Valuation
              </h3>
              <p className="opacity-80 text-sm md:text-base">
                Our expert team analyzes your license's market value and
                provides a competitive quote within 24 hours, with no
                obligation.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className={`p-6 md:p-8 rounded-xl ${
                darkMode ? "dark:bg-gray-800" : "bg-blue-50"
              } flex flex-col items-center text-center hover:shadow-lg transition-shadow`}
            >
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <CreditCard className="text-white" size={24} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
                Get Paid
              </h3>
              <p className="opacity-80 text-sm md:text-base">
                Accept our offer and receive payment via your preferred method.
                Funds typically arrive within 2-3 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="features"
        className={`py-16 md:py-20 ${
          darkMode ? "dark:bg-gray-800" : "bg-gray-50"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Why Choose SoftSell
            </h2>
            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto">
              We've built the most trusted platform for software license resale
              with a focus on security, value, and efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div
              className={`p-4 md:p-6 rounded-lg ${
                darkMode ? "dark:bg-gray-700" : "bg-white"
              } shadow-md hover:shadow-xl transition-shadow`}
            >
              <div className="text-blue-600 mb-3 md:mb-4">
                <Shield size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Secure & Compliant
              </h3>
              <p className="opacity-80 text-sm md:text-base">
                Bank-level encryption and full legal compliance with all
                software licensing regulations.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={`p-4 md:p-6 rounded-lg ${
                darkMode ? "dark:bg-gray-700" : "bg-white"
              } shadow-md hover:shadow-xl transition-shadow`}
            >
              <div className="text-blue-600 mb-3 md:mb-4">
                <DollarSign size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Best-in-Market Rates
              </h3>
              <p className="opacity-80 text-sm md:text-base">
                Up to 70% of original value, with transparent pricing and no
                hidden fees.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`p-4 md:p-6 rounded-lg ${
                darkMode ? "dark:bg-gray-700" : "bg-white"
              } shadow-md hover:shadow-xl transition-shadow`}
            >
              <div className="text-blue-600 mb-3 md:mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Fast Processing
              </h3>
              <p className="opacity-80 text-sm md:text-base">
                24-hour valuation turnaround and quick payment processing once
                offers are accepted.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className={`p-4 md:p-6 rounded-lg ${
                darkMode ? "dark:bg-gray-700" : "bg-white"
              } shadow-md hover:shadow-xl transition-shadow`}
            >
              <div className="text-blue-600 mb-3 md:mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Expert Team</h3>
              <p className="opacity-80 text-sm md:text-base">
                Industry veterans with 15+ years of software licensing and
                compliance experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-16 md:py-20 ${
          darkMode ? "dark:bg-gray-900" : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Customer Success Stories
            </h2>
            <p className="text-base sm:text-lg opacity-80 max-w-xl mx-auto">
              See what businesses say about their experience working with
              SoftSell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div
              className={`p-6 md:p-8 rounded-xl ${
                darkMode ? "dark:bg-gray-800" : "bg-blue-50"
              } shadow-md`}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  JD
                </div>
                <div>
                  <h4 className="font-bold">James Davidson</h4>
                  <p className="text-xs md:text-sm opacity-80">
                    CTO, TechGrowth Inc.
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg mb-4 italic">
                "After downsizing our department, we had dozens of unused
                premium software licenses. SoftSell helped us recover over
                $45,000 in just two weeks. The process was impressively smooth."
              </p>
              <div className="flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              className={`p-6 md:p-8 rounded-xl ${
                darkMode ? "dark:bg-gray-800" : "bg-blue-50"
              } shadow-md`}
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  SR
                </div>
                <div>
                  <h4 className="font-bold">Sarah Reynolds</h4>
                  <p className="text-xs md:text-sm opacity-80">
                    Finance Director, Nova Enterprises
                  </p>
                </div>
              </div>
              <p className="text-base md:text-lg mb-4 italic">
                "As we migrated to cloud solutions, our legacy software licenses
                were gathering dust. SoftSell offered 65% of the original cost,
                significantly higher than competitors. Truly impressive
                service."
              </p>
              <div className="flex text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className={`py-16 md:py-20 ${
          darkMode
            ? "dark:bg-gray-800"
            : "bg-gradient-to-r from-blue-50 to-indigo-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl sm:max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Get Your License Valuation
              </h2>
              <p className="text-base sm:text-lg opacity-80">
                Fill out the form below and our team will provide a
                no-obligation quote within 24 hours.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`${
                darkMode ? "dark:bg-gray-700" : "bg-white"
              } rounded-xl shadow-lg p-4 sm:p-6 md:p-8`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 md:mb-2 font-medium text-sm md:text-base"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                      darkMode
                        ? "dark:bg-gray-600 dark:border-gray-500"
                        : "bg-gray-50 border-gray-300"
                    } ${formErrors.name ? "border-red-500" : ""}`}
                    placeholder="John Smith"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 md:mb-2 font-medium text-sm md:text-base"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                      darkMode
                        ? "dark:bg-gray-600 dark:border-gray-500"
                        : "bg-gray-50 border-gray-300"
                    } ${formErrors.email ? "border-red-500" : ""}`}
                    placeholder="john@company.com"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Company Field */}
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-1 md:mb-2 font-medium text-sm md:text-base"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                      darkMode
                        ? "dark:bg-gray-600 dark:border-gray-500"
                        : "bg-gray-50 border-gray-300"
                    } ${formErrors.company ? "border-red-500" : ""}`}
                    placeholder="Your Company"
                  />
                  {formErrors.company && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">
                      {formErrors.company}
                    </p>
                  )}
                </div>

                {/* License Type Field */}
                <div>
                  <label
                    htmlFor="licenseType"
                    className="block mb-1 md:mb-2 font-medium text-sm md:text-base"
                  >
                    License Type
                  </label>
                  <select
                    id="licenseType"
                    name="licenseType"
                    value={formData.licenseType}
                    onChange={handleInputChange}
                    className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                      darkMode
                        ? "dark:bg-gray-600 dark:border-gray-500"
                        : "bg-gray-50 border-gray-300"
                    } ${formErrors.licenseType ? "border-red-500" : ""}`}
                  >
                    <option value="">Select License Type</option>
                    <option value="microsoft">
                      Microsoft (Office, Windows, Server)
                    </option>
                    <option value="adobe">Adobe Creative Suite</option>
                    <option value="autodesk">Autodesk</option>
                    <option value="oracle">Oracle</option>
                    <option value="sap">SAP</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.licenseType && (
                    <p className="text-red-500 text-xs md:text-sm mt-1">
                      {formErrors.licenseType}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="mb-4 md:mb-6">
                <label
                  htmlFor="message"
                  className="block mb-1 md:mb-2 font-medium text-sm md:text-base"
                >
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full p-2 md:p-3 border rounded-lg text-sm md:text-base ${
                    darkMode
                      ? "dark:bg-gray-600 dark:border-gray-500"
                      : "bg-gray-50 border-gray-300"
                  }`}
                  placeholder="Please share any additional details about your licenses (quantity, purchase date, etc.)"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 md:py-3 rounded-lg transition-colors shadow-md hover:shadow-lg text-sm md:text-base"
              >
                Get Your Valuation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-6 md:py-8 ${
          darkMode ? "dark:bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="text-xl font-bold text-blue-600">SoftSell</div>
              <p className="text-xs md:text-sm opacity-70 mt-1">
                The Smart Way to Sell Unused Software Licenses
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                Privacy
              </a>
              <a
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                Terms
              </a>
              <a
                href="#"
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700 text-center text-sm opacity-70">
            © {new Date().getFullYear()} SoftSell. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50`}>
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all hover:shadow-xl"
            aria-label="Open chat"
          >
            <MessageCircle size={24} />
          </button>
        ) : (
          <div
            className={`w-80 sm:w-96 rounded-xl shadow-xl overflow-hidden ${
              darkMode ? "dark:bg-gray-800" : "bg-white"
            } flex flex-col`}
          >
            {/* Chat header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <div className="font-medium">SoftSell Support</div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-blue-700 p-1 rounded"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 h-80 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${msg.role === "user" ? "text-right" : ""}`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : `${
                            darkMode ? "dark:bg-gray-700" : "bg-gray-100"
                          } rounded-bl-none`
                    } max-w-xs sm:max-w-sm`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about selling your licenses..."
                  className={`flex-1 p-2 border rounded-lg ${
                    darkMode
                      ? "dark:bg-gray-700 dark:border-gray-600"
                      : "bg-gray-50 border-gray-300"
                  }`}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="mt-2 text-xs opacity-70 text-center">
                Try asking: "How do I sell my license?" or "How much is my
                license worth?"
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
