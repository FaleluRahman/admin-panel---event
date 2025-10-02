"use client";

import { AxiosInStance } from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Upload, X, Image } from "lucide-react";

interface FormData {
  title: string;
  place: string;
  time: string;
  type: string;
  description: string;
  image: File | null;
}

interface Errors {
  title?: string;
  place?: string;
  time?: string;
  type?: string;
  description?: string;
  image?: string;
}

function Form() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    place: "",
    time: "",
    type: "",
    description: "",
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
    { label: "Mind Wellness Clinic", value: "Mind Wellness" },
 { label: "Science Orbit", value: "Science Orbit" },
  ];
  // Generate hours (1-12) and minutes (00-59)
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  // Function to parse existing time format and set individual states
  const parseExistingTime = (timeString: string) => {
    if (!timeString) return;
    
    // Handle both "HH:MM" (24-hour) and "HH:MMAM/PM" formats
    const ampmMatch = timeString.match(/^(\d{1,2}):(\d{2})(AM|PM)$/i);
    if (ampmMatch) {
      const [, hour, minute, ampm] = ampmMatch;
      setTimeHour(hour.padStart(2, '0'));
      setTimeMinute(minute);
      setTimeAmPm(ampm.toUpperCase());
      return;
    }
    
    // Handle 24-hour format "HH:MM"
    const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})$/);
    if (timeMatch) {
      const [, hour24, minute] = timeMatch;
      const hour24Int = parseInt(hour24);
      const hour12 = hour24Int === 0 ? 12 : hour24Int > 12 ? hour24Int - 12 : hour24Int;
      const ampm = hour24Int >= 12 ? "PM" : "AM";
      
      setTimeHour(hour12.toString().padStart(2, '0'));
      setTimeMinute(minute);
      setTimeAmPm(ampm);
    }
  };

  // Load existing event data
  useEffect(() => {
    const loadEventData = async () => {
      if (!eventId) {
        router.push("/events");
        return;
      }

      try {
        setIsLoadingData(true);
        const res = await AxiosInStance.get(
          `events/actions.php?api=b1daf1bbc7bbd214045af&id=${eventId}`
        );

        if (res.data.success && res.data.data) {
          const eventData = res.data.data;
          setFormData({
            title: eventData.title || "",
            place: eventData.place || "",
            time: eventData.time || "",
            type: eventData.type || "",
            description: eventData.description || "",
            image: null,
          });
          
          // Parse and set time components
          if (eventData.time) {
            parseExistingTime(eventData.time);
          }
          
          if (eventData.image) {
            setImagePreview(`${AxiosInStance.defaults.baseURL}/${eventData.image}`);
          }
        } else {
          console.error("Event not found");
          router.push("/events");
        }
      } catch (error) {
        console.error("Error loading event:", error);
        router.push("/events");
      } finally {
        setIsLoadingData(false);
      }
    };

    loadEventData();
  }, [eventId, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, image: "Please select a valid image file (JPEG, PNG, GIF, WebP)" }));
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, image: "Image size must be less than 5MB" }));
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: "" }));

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
    // Description is optional, so no validation needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('place', formData.place);
      submitData.append('time', formData.time); // This will now be in "10:00AM" format
      submitData.append('type', formData.type);
      submitData.append('description', formData.description); // Add description to form data
      if (formData.image) submitData.append('image', formData.image);
      submitData.append('_method', 'PUT'); // tell backend this is an update

      const res = await AxiosInStance.post(
        `events/actions.php?api=b1daf1bbc7bbd214045af&id=${eventId}`,
        submitData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (res.data.success) {
        const successEl = document.getElementById("success-animation");
        successEl?.classList.remove("hidden");
        setTimeout(() => {
          router.push("/events");
        }, 2000);
      } else {
        alert("Failed to update event.");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating event. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-black bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* ---- Animations CSS ---- */}
      <style jsx>{`
        @keyframes fade-in-up {from {opacity: 0;transform: translateY(30px);}to {opacity: 1;transform: translateY(0);}}
        @keyframes fade-in {from {opacity: 0;}to {opacity: 1;}}
        @keyframes slide-up {from {opacity: 0;transform: translateY(50px);}to {opacity: 1;transform: translateY(0);}}
        @keyframes shake {0%,100%{transform: translateX(0);}25%{transform: translateX(-5px);}75%{transform: translateX(5px);}}
        .animate-fade-in-up {animation: fade-in-up 0.8s ease-out forwards;}
        .animate-fade-in {animation: fade-in 0.6s ease-out forwards;}
        .animate-slide-up {animation: slide-up 0.8s ease-out forwards;}
        .animate-shake {animation: shake 0.5s ease-in-out;}
        .shadow-3xl {box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);}
      `}</style>

      {/* ---- Background Shapes ---- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 animate-fade-in-up">
          {/* ---- Header ---- */}
          <div className="text-center transition-all duration-500 hover:scale-105">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Edit Event
            </h1>
            <p className="text-gray-600 animate-fade-in delay-200">
              Update event details for professional scheduling
            </p>
          </div>

          {/* ---- Form ---- */}
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/50 transition-all duration-500 hover:shadow-3xl hover:scale-105 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ---- Image Upload ---- */}
              <div className="space-y-2 animate-fade-in delay-300">
                <label className="block text-sm font-semibold text-gray-700">Event Image</label>
                <div className="relative">
                  {!imagePreview ? (
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 transform ${
                        focusedField === "image" ? "border-indigo-400 ring-4 ring-indigo-100 scale-105 shadow-lg bg-indigo-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      } ${errors.image ? "border-red-400 ring-red-100 bg-red-50" : ""}`}
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <input type="file" id="image-upload" name="image" accept="image/*" onChange={handleImageUpload} onFocus={() => setFocusedField("image")} onBlur={() => setFocusedField("")} className="hidden"/>
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium mb-1">Click to upload event image</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <img src={imagePreview} alt="Event preview" className="w-full h-48 object-cover" onError={(e) => (e.currentTarget.src = "/no-image.png")} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-110">
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
                        <Image className="w-4 h-4 inline mr-1" />
                        {formData.image?.name || "Current Image"}
                      </div>
                    </div>
                  )}
                </div>
                {errors.image && (<p className="text-red-500 text-xs animate-shake">{errors.image}</p>)}
              </div>

              {/* ---- Title ---- */}
              <div className="space-y-2 animate-fade-in delay-400">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Event Topic</label>
                <div className="relative">
                  <input type="text" name="title" id="title" required value={formData.title} onChange={handleInputChange} onFocus={() => setFocusedField("title")} onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 transition-all duration-300 transform ${
                      focusedField === "title" ? "border-blue-400 ring-4 ring-blue-100 scale-105 shadow-lg" : "border-gray-300 hover:border-gray-400"
                    } ${errors.title ? "border-red-400 ring-red-100" : ""} focus:outline-none bg-white/70 backdrop-blur-sm`} placeholder="Enter event title" />
                </div>
                {errors.title && (<p className="text-red-500 text-xs animate-shake">{errors.title}</p>)}
              </div>

              {/* ---- Place ---- */}
              <div className="space-y-2 animate-fade-in delay-500">
                <label htmlFor="place" className="block text-sm font-semibold text-gray-700">Location</label>
                <div className="relative">
                  <input type="text" name="place" id="place" required value={formData.place} onChange={handleInputChange} onFocus={() => setFocusedField("place")} onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 transition-all duration-300 transform ${
                      focusedField === "place" ? "border-green-400 ring-4 ring-green-100 scale-105 shadow-lg" : "border-gray-300 hover:border-gray-400"
                    } ${errors.place ? "border-red-400 ring-red-100" : ""} focus:outline-none bg-white/70 backdrop-blur-sm`} placeholder="Enter event location" />
                </div>
                {errors.place && (<p className="text-red-500 text-xs animate-shake">{errors.place}</p>)}
              </div>

              {/* ---- Time Field - Updated to AM/PM format ---- */}
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

              {/* ---- Type ---- */}
              <div className="space-y-2 animate-fade-in delay-700">
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700">Event Type</label>
                <div className="relative">
                  <select name="type" id="type" required value={formData.type} onChange={handleInputChange} onFocus={() => setFocusedField("type")} onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm transition-all duration-300 transform ${
                      focusedField === "type" ? "border-purple-400 ring-4 ring-purple-100 scale-105 shadow-lg" : "border-gray-300 hover:border-gray-400"
                    } ${errors.type ? "border-red-400 ring-red-100" : ""} focus:outline-none bg-white/70 backdrop-blur-sm`}>
                    <option value="">Select event type</option>
                    {types.map((item, index) => (
                      <option value={item.value} key={index}>{item.label}</option>
                    ))}
                  </select>
                </div>
                {errors.type && (<p className="text-red-500 text-xs animate-shake">{errors.type}</p>)}
              </div>

              {/* ---- Description Field - New Optional Field ---- */}
              <div className="space-y-2 animate-fade-in delay-750">
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Description
                  <span className="text-gray-400 font-normal text-xs ml-1">(Optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField("description")}
                    onBlur={() => setFocusedField("")}
                    className={`w-full px-4 py-3 border rounded-xl shadow-sm placeholder-gray-400 transition-all duration-300 transform resize-none ${
                      focusedField === "description"
                        ? "border-teal-400 ring-4 ring-teal-100 scale-105 shadow-lg"
                        : "border-gray-300 hover:border-gray-400"
                    } ${errors.description ? "border-red-400 ring-red-100" : ""} 
                    focus:outline-none bg-white/70 backdrop-blur-sm`}
                    placeholder="Provide additional details about your event (optional)"
                  />
                </div>
                {formData.description.length > 0 && (
                  <div className="text-xs text-gray-500 text-right">
                    {formData.description.length} characters
                  </div>
                )}
                {errors.description && (
                  <p className="text-red-500 text-xs animate-shake">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* ---- Buttons ---- */}
              <div className="pt-6 space-y-3 animate-fade-in delay-800">
                <button type="submit" disabled={isLoading}
                  className={`group relative w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-white font-semibold text-lg transition-all duration-300 transform ${
                    isLoading ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed scale-95"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
                  }`}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Updating...
                    </span>
                  ) : "Update Event"}
                </button>
                <button type="button" onClick={() => router.push("/events")}
                  className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 rounded-xl font-medium text-gray-700 transition-all duration-300 transform hover:scale-105">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ---- Success Animation ---- */}
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
          <p className="text-gray-600">Event updated successfully!</p>
        </div>
      </div>
    </div>
  );
}

export default Form;