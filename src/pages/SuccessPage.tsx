import React, { useEffect, useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { generateAIProgram } from '../lib/openai';
import { supabase } from '../lib/supabase';

function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [program, setProgram] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateProgram = async () => {
      try {
        // Get the latest user program data from Supabase
        const { data: programData, error: fetchError } = await supabase
          .from('user_programs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (fetchError) throw fetchError;

        if (!programData) {
          throw new Error('No program data found');
        }

        // Generate the AI program
        const generatedProgram = await generateAIProgram(programData.user_data);
        setProgram(generatedProgram);

        // Update the program in Supabase
        const { error: updateError } = await supabase
          .from('user_programs')
          .update({ ai_program: generatedProgram, status: 'completed' })
          .eq('id', programData.id);

        if (updateError) throw updateError;

      } catch (err) {
        console.error('Error generating program:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate program');
      } finally {
        setLoading(false);
      }
    };

    generateProgram();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-zinc-100 mx-auto mb-8"></div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Generating Your Program</h2>
          <p className="text-zinc-400">Please wait while we create your personalized fitness plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-500/10 p-4 rounded-full w-16 h-16 mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Something Went Wrong</h2>
          <p className="text-zinc-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 px-8 py-3 rounded-lg font-medium hover:from-zinc-200 hover:to-zinc-400 transition shadow-lg hover:shadow-xl inline-flex items-center space-x-2 group"
          >
            <span>Return Home</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-green-500/10 p-4 rounded-full w-16 h-16 mx-auto mb-8 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-100 mb-4">Payment Successful!</h1>
            <p className="text-zinc-400">Your personalized fitness program is ready</p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 mb-8">
            <div className="prose prose-invert max-w-none">
              {program?.split('\n').map((line, index) => (
                <p key={index} className="text-zinc-100">{line}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.print()}
              className="bg-gradient-to-r from-zinc-100 to-zinc-300 text-zinc-900 px-8 py-3 rounded-lg font-medium hover:from-zinc-200 hover:to-zinc-400 transition shadow-lg hover:shadow-xl flex items-center space-x-2 group"
            >
              <span>Download Program</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-zinc-800 text-zinc-100 px-8 py-3 rounded-lg font-medium hover:bg-zinc-700 transition shadow-lg hover:shadow-xl flex items-center space-x-2 group"
            >
              <span>Return Home</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;