import React, { useState, useEffect } from "react";
import {
    MessageCircle,
    Compass,
    Star,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";  

// Main App Component
const Home = () => {
    // State for managing animations and typewriter effect
    const [isVisible, setIsVisible] = useState(false);
    const [currentWord, setCurrentWord] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayText, setDisplayText] = useState("");
     const navigate = useNavigate();

    // Words for the typewriter effect
    const words = ["Your Journey", "One Prompt Away", "Multiple Problems", "One Solution"];

    // Simple navigation function
    // const navigate = (path: string) => {
    //     console.log(`Navigating to ${path}`);
    // };

    // Trigger fade-in animation on component mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Typewriter effect logic
    useEffect(() => {
        const typeSpeed = isDeleting ? 75 : 150;
        const word = words[currentWord];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (currentChar < word.length) {
                    setDisplayText(word.substring(0, currentChar + 1));
                    setCurrentChar((prev) => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (currentChar > 0) {
                    setDisplayText(word.substring(0, currentChar - 1));
                    setCurrentChar((prev) => prev - 1);
                } else {
                    setIsDeleting(false);
                    setCurrentWord((prev) => (prev + 1) % words.length);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [currentChar, isDeleting, currentWord, words]);

    // Pricing Section Component
    const PricingSection = () => {
        const plans = [
            {
                name: "For Travelers",
                priceText: "Freemium",
                description: "Your personal AI trip planner.",
                features: [
                    { text: "AI Itinerary Generation", included: true },
                    { text: "Explore Destinations", included: true },
                    { text: "Basic Trip Planning", included: true },
                    { text: "Premium features available", included: true },
                ],
                buttonText: "Get Started Free",
                isPopular: false,
            },
            {
                name: "For Agencies",
                priceText: "B2B Suite",
                description: "Automate your travel business.",
                features: [
                    { text: "Workforce Automation Suite", included: true },
                    { text: "Auto Itinerary Generation", included: true },
                    { text: "Staff & Fleet Optimization", included: true },
                    { text: "Data Insights & Analytics", included: true },
                ],
                buttonText: "Contact Sales",
                isPopular: true,
            },
            {
                name: "For Partners",
                priceText: "Marketplace",
                description: "Connect with agencies and travelers.",
                features: [
                    { text: "Direct Booking Marketplace", included: true },
                    { text: "Commission-based Bookings", included: true },
                    { text: "Access to Agency Network", included: true },
                    { text: "Performance Analytics", included: true },
                ],
                buttonText: "Become a Partner",
                isPopular: false,
            },
        ];

        return (
            <div className="w-full py-20 px-6 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Plans for Every Need
                    </h2>
                    <p className="text-lg text-gray-600 mb-12">
                        Whether you're a traveler, an agency, or a partner, we
                        have a solution for you.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative border rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 ${
                                    plan.isPopular
                                        ? "bg-blue-600 text-white shadow-2xl scale-105"
                                        : "bg-white shadow-lg"
                                }`}
                            >
                                {plan.isPopular && (
                                    <span className="absolute top-0 -translate-y-1/2 bg-green-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        POPULAR
                                    </span>
                                )}
                                <h3 className="text-2xl font-bold mb-2">
                                    {plan.name}
                                </h3>
                                <p
                                    className={`text-sm mb-6 ${
                                        plan.isPopular
                                            ? "text-blue-200"
                                            : "text-gray-500"
                                    }`}
                                >
                                    {plan.description}
                                </p>
                                <div className="text-4xl font-extrabold mb-6">
                                    {plan.priceText}
                                </div>
                                <ul className="space-y-4 text-left mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center"
                                        >
                                            {feature.included ? (
                                                <CheckCircle2
                                                    className={`w-5 h-5 mr-3 ${
                                                        plan.isPopular
                                                            ? "text-green-300"
                                                            : "text-green-500"
                                                    }`}
                                                />
                                            ) : (
                                                <XCircle
                                                    className={`w-5 h-5 mr-3 ${
                                                        plan.isPopular
                                                            ? "text-blue-300"
                                                            : "text-red-400"
                                                    }`}
                                                />
                                            )}
                                            <span
                                                className={`${
                                                    plan.isPopular
                                                        ? "text-blue-100"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                        plan.isPopular
                                            ? "bg-white text-blue-600 hover:bg-blue-100"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    }`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-fixed font-sans"
            style={{ backgroundImage: "url(/bg2.jpg)" }}
        >
            <div className="min-h-screen w-full bg-slate-50/80">
                <nav
                    className={`relative z-10 p-6 md:p-8 transition-all duration-1000 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div
                            className="flex items-center space-x-3 cursor-pointer"
                            onClick={() => navigate("/chat")}
                        >
                            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                                <Compass className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-900">
                                PromptYatra
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-10">
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-lg"
                            >
                                for Creators
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-lg"
                            >
                                for Business
                            </a>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-lg"
                            >
                                Get inspired
                            </a>
                        </div>
                        <div className="flex items-center space-x-4 md:space-x-6">
                            <button className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-lg hidden sm:block">
                                Log in
                            </button>
                            <button className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg font-semibold">
                                Get started
                            </button>
                        </div>
                    </div>
                </nav>

                <main
                    className={`flex flex-col items-center justify-center max-w-7xl mx-auto px-6 md:px-8 py-20 lg:py-32 text-center transition-all duration-1000 delay-300 ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div className="space-y-8">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 leading-tight">
                            PromptYatra
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 min-h-[6rem] sm:min-h-[7rem] md:min-h-[8rem] inline-block">
                                {displayText}
                                <span className="animate-pulse">|</span>
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                            Discover extraordinary destinations with your
                            personal AI travel companion. Create memories that
                            last a lifetime.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
                        <button
                            onClick={() => navigate("/chat")}
                            className="group bg-gradient-to-r from-sky-500 to-blue-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-3"
                        >
                            <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
                            Start Your Adventure
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-8 sm:gap-12 pt-20">
                        <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
                                2M+
                            </div>
                            <div className="text-gray-600 text-base font-medium">
                                Happy Travelers
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl sm:text-5xl font-bold text-gray-900 mb-1">
                                195+
                            </div>
                            <div className="text-gray-600 text-base font-medium">
                                Countries
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center gap-1 justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current"
                                    />
                                ))}
                            </div>
                            <div className="text-gray-600 text-base font-medium">
                                5.0 Rating
                            </div>
                        </div>
                    </div>
                </main>

                <PricingSection />
            </div>
        </div>
    );
};

export default Home;