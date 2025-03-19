import React, { useState } from 'react';
import { Calendar, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { format, addDays, setHours, setMinutes, isBefore } from 'date-fns';

const trainers = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Weight Loss & HIIT",
    experience: "8+ years",
    price: 75,
    rating: 4.9,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1611672585731-fa10603fb9e0?auto=format&fit=crop&q=80",
    description: "Specializing in high-intensity workouts and nutrition planning for optimal weight loss results."
  },
  {
    id: 2,
    name: "Mike Thompson",
    specialty: "Strength & Conditioning",
    experience: "10+ years",
    price: 85,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80",
    description: "Expert in powerlifting and functional strength training with a focus on proper form and technique."
  },
  {
    id: 3,
    name: "Emma Davis",
    specialty: "Yoga & Flexibility",
    experience: "6+ years",
    price: 70,
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80",
    description: "Certified yoga instructor specializing in flexibility, mindfulness, and body alignment."
  },
  {
    id: 4,
    name: "David Chen",
    specialty: "Calisthenics",
    experience: "7+ years",
    price: 80,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80",
    description: "Bodyweight movement specialist focusing on strength, control, and advanced calisthenics skills."
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    specialty: "Dance Fitness",
    experience: "9+ years",
    price: 75,
    rating: 4.9,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1609952542840-df54cfddc3fb?auto=format&fit=crop&q=80",
    description: "Professional dancer turned fitness trainer, specializing in cardio dance and rhythm-based workouts."
  }
];

function BookingPage() {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [step, setStep] = useState(1);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const getAvailableTimeSlots = () => {
    const slots = [];
    const currentDate = new Date();
    
    for (let hour = 9; hour <= 20; hour++) {
      for (let minute of [0, 30]) {
        const time = setMinutes(setHours(selectedDate, hour), minute);
        if (isBefore(currentDate, time)) {
          slots.push(format(time, 'HH:mm'));
        }
      }
    }
    return slots;
  };

  const getDatesForNextWeek = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  const handlePayment = async () => {
    // Here you would integrate with Stripe
    console.log('Processing payment...');
    setStep(4);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-12">
            {['Select Trainer', 'Choose Time', 'Payment', 'Confirmation'].map((text, index) => (
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
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-zinc-100 mb-4">Choose Your Trainer</h1>
                <p className="text-zinc-400">Select from our expert trainers to begin your fitness journey</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {trainers.map((trainer) => (
                  <div
                    key={trainer.id}
                    onClick={() => setSelectedTrainer(trainer)}
                    className={`bg-zinc-900 rounded-3xl overflow-hidden border ${
                      selectedTrainer?.id === trainer.id ? 'border-zinc-100' : 'border-zinc-800'
                    } hover:border-zinc-100 transition cursor-pointer group`}
                  >
                    <div className="relative h-64">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex justify-between items-end">
                          <div>
                            <h3 className="text-2xl font-bold text-zinc-100 mb-2">{trainer.name}</h3>
                            <p className="text-zinc-300">{trainer.specialty}</p>
                            <p className="text-sm text-zinc-400">{trainer.experience} experience</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-zinc-100">${trainer.price}</p>
                            <p className="text-sm text-zinc-400">per session</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-zinc-300 mb-4">{trainer.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-zinc-100 font-bold">{trainer.rating}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(trainer.rating) ? 'text-yellow-400' : 'text-zinc-600'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-zinc-400">({trainer.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => selectedTrainer && setStep(2)}
                  disabled={!selectedTrainer}
                  className={`px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl flex items-center space-x-2 group ${
                    selectedTrainer
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
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-zinc-100 mb-4">Choose Your Time</h1>
                <p className="text-zinc-400">Select a date and time for your session with {selectedTrainer.name}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-zinc-100">Select Date</h2>
                  <div className="grid grid-cols-7 gap-4">
                    {getDatesForNextWeek().map((date) => (
                      <div
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`bg-zinc-900 p-4 rounded-xl border ${
                          format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                            ? 'border-zinc-100'
                            : 'border-zinc-800'
                        } hover:border-zinc-100 transition cursor-pointer text-center`}
                      >
                        <p className="text-zinc-400 text-sm">{format(date, 'EEE')}</p>
                        <p className="text-zinc-100 font-bold">{format(date, 'd')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-zinc-100">Select Time</h2>
                  <div className="grid grid-cols-4 gap-4">
                    {getAvailableTimeSlots().map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`bg-zinc-900 p-4 rounded-xl border ${
                          selectedTime === time ? 'border-zinc-100' : 'border-zinc-800'
                        } hover:border-zinc-100 transition cursor-pointer text-center`}
                      >
                        <p className="text-zinc-100">{time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => selectedTime && setStep(3)}
                  disabled={!selectedTime}
                  className={`px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl flex items-center space-x-2 group ${
                    selectedTime
                      ? 'bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 hover:from-zinc-200 hover:to-zinc-400'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  } transition`}
                >
                  <span>Continue to Payment</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-zinc-100 mb-4">Payment Details</h1>
                <p className="text-zinc-400">Complete your booking with secure payment</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
                    <h2 className="text-2xl font-bold text-zinc-100 mb-4">Booking Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Trainer:</span>
                        <span className="text-zinc-100">{selectedTrainer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Date:</span>
                        <span className="text-zinc-100">{format(selectedDate, 'MMMM d, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Time:</span>
                        <span className="text-zinc-100">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Session Price:</span>
                        <span className="text-zinc-100">${selectedTrainer.price}</span>
                      </div>
                      <div className="pt-4 border-t border-zinc-800">
                        <div className="flex justify-between">
                          <span className="text-zinc-100 font-bold">Total:</span>
                          <span className="text-zinc-100 font-bold">${selectedTrainer.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800">
                    <h2 className="text-2xl font-bold text-zinc-100 mb-4">Card Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                            value={paymentDetails.expiry}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-2">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                            value={paymentDetails.cvc}
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, cvc: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 px-8 py-3 rounded-lg font-medium hover:from-zinc-200 hover:to-zinc-400 transition shadow-lg hover:shadow-xl flex items-center space-x-2 group"
                >
                  <span>Complete Booking</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-8">
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
                <Calendar className="h-10 w-10 text-zinc-100" />
              </div>
              <h1 className="text-4xl font-bold text-zinc-100 mb-4">Booking Confirmed!</h1>
              <p className="text-zinc-400">
                Your training session has been scheduled with {selectedTrainer.name} for{' '}
                {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}.
                We've sent you a confirmation email with all the details.
              </p>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 px-8 py-3 rounded-lg font-medium hover:from-zinc-200 hover:to-zinc-400 transition shadow-lg hover:shadow-xl inline-flex items-center space-x-2 group"
              >
                <span>Return to Home</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingPage;