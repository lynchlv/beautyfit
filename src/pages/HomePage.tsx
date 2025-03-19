import React from 'react';
import { Dumbbell, Heart, Instagram, Facebook, Home, Building2, ArrowRight, Trophy, Target, Clock, Users } from 'lucide-react';

interface HomePageProps {
  onStartJourney: () => void;
}

function HomePage({ onStartJourney }: HomePageProps) {
  return (
    <>
      {/* Hero Section with Grid */}
      <div className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-zinc-100 leading-tight">
                Transform Your Life Through <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">Fitness</span>
              </h1>
              <p className="text-lg text-zinc-400">
                Personalized training programs designed to help you achieve your fitness goals,
                build confidence, and embrace a healthier lifestyle.
              </p>
              <button 
                onClick={onStartJourney}
                className="bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 px-8 py-3 rounded-lg font-medium hover:from-zinc-200 hover:to-zinc-400 transition shadow-lg hover:shadow-xl flex items-center space-x-2 group"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900/50 rounded-3xl transform rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1609899537878-39f6f593b5d6?auto=format&fit=crop&q=80"
                alt="Female fitness coach"
                className="relative rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Programs Grid Section */}
      <div id="programs" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-100 mb-4">Choose Your Program</h2>
            <p className="text-zinc-400">Select the training environment that best suits your lifestyle and goals.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Indoor Program */}
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80"
                  alt="Home workout"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-zinc-900/90 backdrop-blur-sm rounded-full p-3 border border-zinc-700">
                      <Home className="h-6 w-6 text-zinc-100" />
                    </div>
                    <span className="text-zinc-100 font-medium">Indoor Training</span>
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-100 mb-2">Home Workout Program</h3>
                  <p className="text-zinc-300 mb-4">Transform your living space into a personal fitness sanctuary. Our home workout program combines bodyweight exercises, minimal equipment routines, and expert guidance to help you achieve remarkable results from the comfort of your home.</p>
                  <div className="text-2xl font-bold text-zinc-100 mb-4">$49.99<span className="text-sm text-zinc-400">/month</span></div>
                  <button className="bg-zinc-100 text-zinc-900 px-6 py-2 rounded-lg font-medium hover:bg-zinc-200 transition flex items-center space-x-2 group">
                    <span>View Program Details</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <p className="font-semibold text-zinc-100">No Equipment</p>
                  <p className="text-sm text-zinc-400">Required</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <p className="font-semibold text-zinc-100">Flexible</p>
                  <p className="text-sm text-zinc-400">Schedule</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <p className="font-semibold text-zinc-100">Video</p>
                  <p className="text-sm text-zinc-400">Guidance</p>
                </div>
              </div>
            </div>

            {/* Gym Program */}
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80"
                  alt="Gym workout"
                  className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-zinc-900/90 backdrop-blur-sm rounded-full p-3 border border-zinc-700">
                      <Building2 className="h-6 w-6 text-zinc-100" />
                    </div>
                    <span className="text-zinc-100 font-medium">Gym Training</span>
                  </div>
                  <h3 className="text-3xl font-bold text-zinc-100 mb-2">Elite Gym Program</h3>
                  <p className="text-zinc-300 mb-4">Experience the ultimate fitness journey with our comprehensive gym program. Get access to state-of-the-art equipment, personalized workout plans, and one-on-one coaching sessions to maximize your potential.</p>
                  <div className="text-2xl font-bold text-zinc-100 mb-4">$89.99<span className="text-sm text-zinc-400">/month</span></div>
                  <button className="bg-zinc-100 text-zinc-900 px-6 py-2 rounded-lg font-medium hover:bg-zinc-200 transition flex items-center space-x-2 group">
                    <span>View Program Details</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <p className="font-semibold text-zinc-100">Full Access</p>
                  <p className="text-sm text-zinc-400">Equipment</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <p className="font-semibold text-zinc-100">Personal</p>
                  <p className="text-sm text-zinc-400">Training</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-xl border border-zinc-700">
                  <p className="font-semibold text-zinc-100">Progress</p>
                  <p className="text-sm text-zinc-400">Tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div id="offerings" className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-100 mb-4">What We Offer</h2>
            <p className="text-zinc-400">Comprehensive fitness solutions tailored to your needs</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg border border-zinc-800">
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
                <Target className="h-8 w-8 text-zinc-100" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-4">Custom Plans</h3>
              <p className="text-zinc-400">Personalized workout and nutrition plans based on your goals</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg border border-zinc-800">
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
                <Users className="h-8 w-8 text-zinc-100" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-4">1-on-1 Coaching</h3>
              <p className="text-zinc-400">Direct access to experienced fitness professionals</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg border border-zinc-800">
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
                <Heart className="h-8 w-8 text-zinc-100" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-4">Nutrition Guide</h3>
              <p className="text-zinc-400">Detailed meal plans and nutritional guidance</p>
            </div>
            <div className="bg-zinc-900 p-8 rounded-3xl shadow-lg border border-zinc-800">
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700">
                <Clock className="h-8 w-8 text-zinc-100" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mb-4">24/7 Support</h3>
              <p className="text-zinc-400">Round-the-clock assistance and motivation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div id="achievements" className="py-20 bg-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-zinc-100 mb-4">Client Achievements</h2>
            <p className="text-zinc-400">Real results from real people</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?auto=format&fit=crop&q=80"
                alt="Client transformation"
                className="w-full h-[400px] object-cover rounded-3xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <h3 className="text-xl font-bold mb-2">Sarah's Journey</h3>
                <p className="text-zinc-300">Lost 30lbs in 6 months through dedicated training</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80"
                alt="Client transformation"
                className="w-full h-[400px] object-cover rounded-3xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <h3 className="text-xl font-bold mb-2">Mike's Progress</h3>
                <p className="text-zinc-300">Gained 15lbs of muscle mass in 4 months</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80"
                alt="Client transformation"
                className="w-full h-[400px] object-cover rounded-3xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <h3 className="text-xl font-bold mb-2">Emma's Success</h3>
                <p className="text-zinc-300">Completed her first marathon after 8 months of training</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 py-12 border-t border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-5 w-5 text-zinc-100" />
              <span className="text-zinc-100 font-medium">AnnieFit</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-zinc-500 hover:text-zinc-100 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-500 hover:text-zinc-100 transition">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;