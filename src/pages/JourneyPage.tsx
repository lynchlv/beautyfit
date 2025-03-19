import React, { useState } from 'react';
import { ArrowLeft, Scale, Ruler, ChevronRight, CreditCard, Home, Building2 } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { generateAIProgram } from '../lib/openai';
import { supabase } from '../lib/supabase';

interface JourneyPageProps {
  onBack: () => void;
}

function JourneyPage({ onBack }: JourneyPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    environment: '',
    goal: '',
    height: '',
    weight: '',
    age: '',
    activityLevel: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);
      await createCheckoutSession('price_H5ggYwtDq8jGJe', formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-100 transition mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-12">
            {['Enter Details', 'Review', 'Payment', 'Your Program'].map((text, index) => (
              <div key={text} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step > index ? 'bg-zinc-100 text-zinc-900' : 
                  step === index + 1 ? 'bg-zinc-800 text-zinc-100 border border-zinc-100' : 
                  'bg-zinc-800 text-zinc-500'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && (
                  <div className={`w-24 h-0.5 mx-2 ${
                    step > index ? 'bg-zinc-100' : 'bg-zinc-800'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-zinc-100 mb-4">Your Fitness Profile</h1>
                <p className="text-zinc-400">Help us understand your goals and current fitness level</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Training Environment Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => setFormData({ ...formData, environment: 'indoor' })}
                      className={`bg-zinc-900 p-6 rounded-xl border ${
                        formData.environment === 'indoor' ? 'border-zinc-100' : 'border-zinc-800'
                      } hover:border-zinc-100 transition cursor-pointer group`}
                    >
                      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                        <Home className={`h-6 w-6 ${
                          formData.environment === 'indoor' ? 'text-zinc-100' : 'text-zinc-500'
                        } group-hover:text-zinc-100 transition`} />
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-100 mb-2">Indoor Training</h3>
                      <p className="text-sm text-zinc-400">Workout from home with minimal equipment</p>
                    </div>

                    <div
                      onClick={() => setFormData({ ...formData, environment: 'gym' })}
                      className={`bg-zinc-900 p-6 rounded-xl border ${
                        formData.environment === 'gym' ? 'border-zinc-100' : 'border-zinc-800'
                      } hover:border-zinc-100 transition cursor-pointer group`}
                    >
                      <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4">
                        <Building2 className={`h-6 w-6 ${
                          formData.environment === 'gym' ? 'text-zinc-100' : 'text-zinc-500'
                        } group-hover:text-zinc-100 transition`} />
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-100 mb-2">Gym Training</h3>
                      <p className="text-sm text-zinc-400">Full access to gym equipment and facilities</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="goal" className="block text-sm font-medium text-zinc-400 mb-2">
                      Your Goal
                    </label>
                    <select
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-100 focus:outline-none focus:border-zinc-700"
                    >
                      <option value="">Select your primary goal</option>
                      <option value="weight-loss">Weight Loss</option>
                      <option value="muscle-gain">Muscle Gain</option>
                      <option value="overall-fitness">Overall Fitness</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-zinc-400 mb-2">
                      Height (cm)
                    </label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
                      <input
                        type="number"
                        id="height"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                        placeholder="Enter your height"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-zinc-400 mb-2">
                      Weight (kg)
                    </label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
                      <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                        placeholder="Enter your weight"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-zinc-400 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div>
                    <label htmlFor="activityLevel" className="block text-sm font-medium text-zinc-400 mb-2">
                      Activity Level
                    </label>
                    <select
                      id="activityLevel"
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-4 text-zinc-100 focus:outline-none focus:border-zinc-700"
                    >
                      <option value="">Select your activity level</option>
                      <option value="sedentary">Sedentary (little or no exercise)</option>
                      <option value="light">Lightly active (light exercise 1-3 days/week)</option>
                      <option value="moderate">Moderately active (moderate exercise 3-5 days/week)</option>
                      <option value="very">Very active (hard exercise 6-7 days/week)</option>
                      <option value="extra">Extra active (very hard exercise & physical job)</option>
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900/50 rounded-3xl transform rotate-6"></div>
                  <img
                    src={formData.environment === 'gym' 
                      ? "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80"
                      : "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80"
                    }
                    alt="Fitness environment"
                    className="relative rounded-3xl shadow-xl w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.environment || !formData.goal || !formData.height || !formData.weight || !formData.age || !formData.activityLevel}
                  className={`px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl flex items-center space-x-2 group ${
                    formData.environment && formData.goal && formData.height && formData.weight && formData.age && formData.activityLevel
                      ? 'bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 hover:from-zinc-200 hover:to-zinc-400'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  } transition`}
                >
                  <span>Continue</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-zinc-100 mb-4">Review Your Information</h1>
                <p className="text-zinc-400">Please confirm your details before proceeding to payment</p>
              </div>

              <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-zinc-400">Training Environment</p>
                      <p className="text-zinc-100 font-semibold">{formData.environment === 'indoor' ? 'Indoor Training' : 'Gym Training'}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400">Goal</p>
                      <p className="text-zinc-100 font-semibold">{formData.goal.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400">Height</p>
                      <p className="text-zinc-100 font-semibold">{formData.height} cm</p>
                    </div>
                    <div>
                      <p className="text-zinc-400">Weight</p>
                      <p className="text-zinc-100 font-semibold">{formData.weight} kg</p>
                    </div>
                    <div>
                      <p className="text-zinc-400">Age</p>
                      <p className="text-zinc-100 font-semibold">{formData.age} years</p>
                    </div>
                    <div>
                      <p className="text-zinc-400">Activity Level</p>
                      <p className="text-zinc-100 font-semibold">{formData.activityLevel.charAt(0).toUpperCase() + formData.activityLevel.slice(1)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                <h2 className="text-2xl font-bold text-zinc-100 mb-6">What You'll Get</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-xl">
                      <ChevronRight className="h-6 w-6 text-zinc-100" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">AI-Generated Custom Program</h3>
                      <p className="text-zinc-400">Personalized workout and nutrition plan based on your specific goals and metrics</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-xl">
                      <ChevronRight className="h-6 w-6 text-zinc-100" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">Detailed Exercise Guide</h3>
                      <p className="text-zinc-400">Complete breakdown of exercises, sets, reps, and proper form</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-xl">
                      <ChevronRight className="h-6 w-6 text-zinc-100" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100">Nutrition Recommendations</h3>
                      <p className="text-zinc-400">Customized meal planning and nutritional guidance</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-zinc-400">One-time payment</p>
                      <p className="text-3xl font-bold text-zinc-100">$49.99</p>
                    </div>
                    <button
                      onClick={() => setStep(3)}
                      className="bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 px-8 py-3 rounded-lg font-medium hover:from-zinc-200 hover:to-zinc-400 transition shadow-lg hover:shadow-xl flex items-center space-x-2 group"
                    >
                      <span>Proceed to Payment</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-zinc-100 mb-4">Payment</h1>
                <p className="text-zinc-400">Secure payment processing with Stripe</p>
              </div>

              <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-100">Custom AI Fitness Program</h2>
                    <p className="text-zinc-400">One-time purchase</p>
                  </div>
                  <p className="text-3xl font-bold text-zinc-100">$49.99</p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 px-8 py-4 rounded-lg font-medium hover:from-zinc-200 hover:to-zinc-400 transition shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>{loading ? 'Processing...' : 'Pay with Stripe'}</span>
                </button>

                {error && (
                  <p className="mt-4 text-red-400 text-center">{error}</p>
                )}

                <p className="mt-6 text-sm text-zinc-400 text-center">
                  Your payment is processed securely through Stripe. 
                  We never store your card details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JourneyPage;