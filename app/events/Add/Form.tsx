"use client";

import { AxiosInStance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  title: string;
  place: string;
  time: string;
  type: string;
}

interface Errors {
  title?: string;
  place?: string;
  time?: string;
  type?: string;
}

function Form() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    place: "",
    time: "",
    type: "",
  });
  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const types = [
    { label: "Expert Conversations", value: "expert" },
    { label: "Educational Login", value: "edu" },
    { label: "WriteWell Clinic", value: "write" },
    { label: "Professional Chat", value: "pro" },
    { label: "Tranquil Wellness Hub", value: "tranquil" },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.place.trim()) newErrors.place = "Location is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.type) newErrors.type = "Event type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await AxiosInStance.post(
        "events/actions.php?api=b1daf1bbc7bbd214045af",
        formData
      );
      if (res.data.success) {
        const successEl = document.getElementById("success-animation");
        successEl?.classList.remove("hidden");

        setTimeout(() => {
          router.push("/events");
        }, 2000);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 animate-fade-in-up">
          {/* Header */}
          <div className="text-center transition-all duration-500 hover:scale-105">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a4 4 0 118 0v4m-4 0v9a4 4 0 01-8 0V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create New Event
            </h1>
            <p className="text-gray-600 animate-fade-in delay-200">
              Configure event details for professional scheduling
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/50 transition-all duration-500 hover:shadow-3xl hover:scale-105 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2 animate-fade-in delay-300">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Event Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("title")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 transition-all duration-300 transform ${
                      focusedField === "title"
                        ? "border-blue-400 ring-4 ring-blue-100 scale-105 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    } ${errors.title ? "border-red-400 ring-red-100" : ""} 
                    focus:outline-none bg-white/70 backdrop-blur-sm`}
                    placeholder="Enter event title"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500 text-xs animate-shake">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Place Field */}
              <div className="space-y-2 animate-fade-in delay-400">
                <label
                  htmlFor="place"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="place"
                    id="place"
                    required
                    value={formData.place}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("place")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 transition-all duration-300 transform ${
                      focusedField === "place"
                        ? "border-green-400 ring-4 ring-green-100 scale-105 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    } ${errors.place ? "border-red-400 ring-red-100" : ""} 
                    focus:outline-none bg-white/70 backdrop-blur-sm`}
                    placeholder="Enter event location"
                  />
                </div>
                {errors.place && (
                  <p className="text-red-500 text-xs animate-shake">
                    {errors.place}
                  </p>
                )}
              </div>

              {/* Time Field */}
              <div className="space-y-2 animate-fade-in delay-500">
                <label
                  htmlFor="time"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Event Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    id="time"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("time")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-300 transform ${
                      focusedField === "time"
                        ? "border-orange-400 ring-4 ring-orange-100 scale-105 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    } ${errors.time ? "border-red-400 ring-red-100" : ""} 
                    focus:outline-none bg-white/70 backdrop-blur-sm`}
                  />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-xs animate-shake">
                    {errors.time}
                  </p>
                )}
              </div>

              {/* Type Field */}
              <div className="space-y-2 animate-fade-in delay-600">
                <label
                  htmlFor="type"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Event Type
                </label>
                <div className="relative">
                  <select
                    name="type"
                    id="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("type")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-300 transform ${
                      focusedField === "type"
                        ? "border-purple-400 ring-4 ring-purple-100 scale-105 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    } ${errors.type ? "border-red-400 ring-red-100" : ""} 
                    focus:outline-none bg-white/70 backdrop-blur-sm`}
                  >
                    <option value="">Select event type</option>
                    {types.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs animate-shake">
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 animate-fade-in delay-700">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-white font-semibold text-lg transition-all duration-300 transform ${
                    isLoading
                      ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed scale-95"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-2xl active:scale-95"
                  } shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200`}
                >
                  <span className="relative z-10 flex items-center">
                    {isLoading ? (
                      <div className="flex items-center animate-pulse">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center transition-transform duration-200">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Create Event
                      </div>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center animate-fade-in delay-800">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your event details are secure and encrypted
            </p>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      <div
        id="success-animation"
        className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
          <div className="text-green-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
          <p className="text-gray-600">Event created successfully!</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default Form;
