"use client";

import { AxiosInStance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

interface FormData {
  title: string;
  place: string;
  time: string;
  type: string;
  image: File | null;
}

interface Errors {
  title?: string;
  place?: string;
  time?: string;
  type?: string;
  image?: string;
}

function Form() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    place: "",
    time: "",
    type: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  // Time state for AM/PM format
  const [timeHour, setTimeHour] = useState("");
  const [timeMinute, setTimeMinute] = useState("");
  const [timeAmPm, setTimeAmPm] = useState("AM");

  const types = [
    { label: "Expert Convos", value: "Expert Convos" },
    { label: "Edu Login", value: "Edu Login" },
    { label: "WriteWell Clinic", value: "WriteWell Clinic" },
    { label: "Pro Chat", value: "Pro Chat" },
    { label: "Tranquil Wellness Hub", value: "Wellness Hub" },
  ];

  // Generate hours (1-12) and minutes (00-59)
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Handle time changes and update formData.time
  const handleTimeChange = (type: 'hour' | 'minute' | 'ampm', value: string) => {
    let newHour = timeHour;
    let newMinute = timeMinute;
    let newAmPm = timeAmPm;

    if (type === 'hour') {
      newHour = value;
      setTimeHour(value);
    } else if (type === 'minute') {
      newMinute = value;
      setTimeMinute(value);
    } else if (type === 'ampm') {
      newAmPm = value;
      setTimeAmPm(value);
    }

    // Update formData.time with AM/PM format
    if (newHour && newMinute) {
      const formattedTime = `${newHour}:${newMinute}${newAmPm}`;
      setFormData(prev => ({ ...prev, time: formattedTime }));
      
      // Clear time error if exists
      if (errors.time) {
        setErrors(prev => ({ ...prev, time: "" }));
      }
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: "Please select a valid image file (JPEG, PNG, GIF, WebP)" }));
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, image: "Image size must be less than 5MB" }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: "" }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview("");
    setErrors(prev => ({ ...prev, image: "" }));
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Create FormData for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('place', formData.place);
      submitData.append('time', formData.time); // This will now be in "10:00AM" format
      submitData.append('type', formData.type);
      
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const res = await AxiosInStance.post(
        "events/actions.php?api=b1daf1bbc7bbd214045af",
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
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
  };

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
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
              {/* Image Upload Field */}
              <div className="space-y-2 animate-fade-in delay-300">
                <label className="block text-sm font-semibold text-gray-700">
                  Event Image
                </label>
                <div className="relative">
                  {!imagePreview ? (
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 transform ${
                        focusedField === "image"
                          ? "border-indigo-400 ring-4 ring-indigo-100 scale-105 shadow-lg bg-indigo-50"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      } ${errors.image ? "border-red-400 ring-red-100 bg-red-50" : ""}`}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <input
                        type="file"
                        id="image-upload"
                        name="image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        onFocus={() => setFocusedField("image")}
                        onBlur={() => setFocusedField("")}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium mb-1">
                          Click to upload event image
                        </p>
                        <p className="text-sm text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={imagePreview}
                          alt="Event preview"
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-110"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                        <ImageIcon className="w-4 h-4 inline mr-1" />
                        {formData.image?.name}
                      </div>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="text-red-500 text-xs animate-shake">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Title Field */}
              <div className="space-y-2 animate-fade-in delay-400">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Event Topic
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
              <div className="space-y-2 animate-fade-in delay-500">
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

              {/* Time Field - Updated to AM/PM format */}
              <div className="space-y-2 animate-fade-in delay-600">
                <label className="block text-sm font-semibold text-gray-700">
                  Event Time
                </label>
                <div className="flex gap-2">
                  {/* Hour */}
                  <div className="flex-1">
                    <select
                      value={timeHour}
                      onChange={(e) => handleTimeChange('hour', e.target.value)}
                      onFocus={() => setFocusedField("time")}
                      onBlur={() => setFocusedField("")}
                      className={`w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-300 transform ${
                        focusedField === "time"
                          ? "border-orange-400 ring-4 ring-orange-100 scale-105 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      } ${errors.time ? "border-red-400 ring-red-100" : ""} 
                      focus:outline-none bg-white/70 backdrop-blur-sm`}
                    >
                      <option value="">Hour</option>
                      {hours.map(hour => (
                        <option key={hour} value={hour}>{hour}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Colon */}
                  <div className="flex items-center justify-center px-2">
                    <span className="text-2xl font-bold text-gray-400">:</span>
                  </div>
                  
                  {/* Minute */}
                  <div className="flex-1">
                    <select
                      value={timeMinute}
                      onChange={(e) => handleTimeChange('minute', e.target.value)}
                      onFocus={() => setFocusedField("time")}
                      onBlur={() => setFocusedField("")}
                      className={`w-full px-3 py-3 border rounded-xl shadow-sm transition-all duration-300 transform ${
                        focusedField === "time"
                          ? "border-orange-400 ring-4 ring-orange-100 scale-105 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      } ${errors.time ? "border-red-400 ring-red-100" : ""} 
                      focus:outline-none bg-white/70 backdrop-blur-sm`}
                    >
                      <option value="">Min</option>
                      {minutes.map(minute => (
                        <option key={minute} value={minute}>{minute}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* AM/PM */}
                  <div className="flex-shrink-0">
                    <select
                      value={timeAmPm}
                      onChange={(e) => handleTimeChange('ampm', e.target.value)}
                      onFocus={() => setFocusedField("time")}
                      onBlur={() => setFocusedField("")}
                      className={`px-3 py-3 border rounded-xl shadow-sm transition-all duration-300 transform ${
                        focusedField === "time"
                          ? "border-orange-400 ring-4 ring-orange-100 scale-105 shadow-lg"
                          : "border-gray-300 hover:border-gray-400"
                      } ${errors.time ? "border-red-400 ring-red-100" : ""} 
                      focus:outline-none bg-white/70 backdrop-blur-sm`}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                
                {/* Display selected time */}
                {formData.time && (
                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                    Selected time: <span className="font-semibold">{formData.time}</span>
                  </div>
                )}
                
                {errors.time && (
                  <p className="text-red-500 text-xs animate-shake">
                    {errors.time}
                  </p>
                )}
              </div>

              {/* Type Field */}
              <div className="space-y-2 animate-fade-in delay-700">
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
              <div className="pt-6 animate-fade-in delay-800">
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
          <div className="text-center animate-fade-in delay-900">
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
    </div>
  );
}

export default Form;