'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

interface Guest {
    id: string;
    first_name: string;
    last_name: string;
    rsvp_status: string | null;
    plus_one_status: string | null;
    dietary_restrictions: string | null;
    has_plus_one: boolean;
    plus_one_name: string | null;
}

export default function RSVPPage() {
    const supabase = createClient();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [guest, setGuest] = useState<Guest | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [mainStatus, setMainStatus] = useState('');
    const [plusOneStatus, setPlusOneStatus] = useState('');
    const [dietary, setDietary] = useState('');

    const handleSearch = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { data, error } = await supabase
            .from('guests')
            .select()
            .ilike('first_name', firstName.trim())
            .ilike('last_name', lastName.trim())
            .single();

        if (error || !data) {
            setError("We couldn't find that name on the list. Please check the spelling!");
            setLoading(false);
        } else {
            setGuest(data);
            setMainStatus(data.rsvp_status || '');
            setPlusOneStatus(data.plus_one_status || '');
            setDietary(data.dietary_restrictions || '');
            setLoading(false);
        }
    };

    // update RSVP status
    const submitRSVP = async () => {
        if (!guest) return;
        setLoading(true);
        const { error } = await supabase
            .from('guests')
            .update({
                rsvp_status: mainStatus,
                plus_one_status: plusOneStatus,
                dietary_restrictions: dietary
            })
            .eq('id', guest.id);

        if (error) {
            console.error(error);
            setError("Something went wrong saving your RSVP. Please try again!");
            setLoading(false);
        } else {
            setIsSubmitted(true);
            setLoading(false);
        }
    };

    return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      <div className="fixed inset-0 z-0">
        <Image
          src="/images/363545_KW_221.jpg"
          alt="Us in Asakusa"
          fill
          priority
          className="object-cover object-center opacity-70 md:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20 pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-between min-h-screen p-8 md:p-20">

        <div className="text-left animate-in fade-in slide-in-from-left-8 duration-1000">
          <h1 className="text-6xl md:text-8xl font-light font-serif tracking-[0.2em] uppercase drop-shadow-2xl">
            RSVP
          </h1>
          <div className="w-16 h-[1px] bg-white/40 mt-6 md:w-32"></div>
        </div>

        {/* card sits bottom-left so it doesn't cover faces in the background photo */}
        <div className="flex justify-start md:justify-start items-end pb-10">

          <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">

            {isSubmitted ? (
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-serif tracking-tight leading-tight uppercase font-light tracking-[0.1em]">
                  Thank you!
                </h2>
                <div className="w-12 h-[1px] bg-white/30 mx-auto"></div>
                <p className="text-gray-200 font-light italic leading-relaxed text-lg">
                  {mainStatus === 'attending'
                    ? `See you soon, ${guest?.first_name}! Your spot has been reserved.`
                    : `Thank you, ${guest?.first_name}. We'll miss you, but we are so grateful you let us know!`}
                </p>

                <button onClick={() => window.location.reload()} className="text-xs uppercase tracking-widest border border-white/30 hover:border-white transition-all rounded-full px-6 py-3 mt-10">
                  Back to Invitation
                </button>
              </div>
            ) : !guest ? (
              <form onSubmit={handleSearch} className="space-y-8">
                <div className="space-y-4">
                  <input
                    type="text" placeholder="First Name" required
                    className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-white/40 transition"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text" placeholder="Last Name" required
                    className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl outline-none focus:border-white/40 transition"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <button className="w-full bg-white text-black py-5 rounded-2xl font-bold tracking-[0.2em] uppercase hover:scale-[1.01] transition">
                  {loading ? 'Searching...' : 'Find My Invitation'}
                </button>
                {error && <p className="text-red-300 text-center text-xs font-light italic">{error}</p>}
              </form>
            ) : (
              <div className="space-y-10">
                <div className="text-center">
                  <h2 className="text-2xl font-serif mb-1 italic">Welcome, {guest.first_name}</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em]">Please respond by [Date]</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setMainStatus('attending')} className={`py-4 rounded-xl border transition-all ${mainStatus === 'attending' ? 'bg-white text-black border-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>Accepts</button>
                  <button onClick={() => setMainStatus('declined')} className={`py-4 rounded-xl border transition-all ${mainStatus === 'declined' ? 'bg-red-500/20 text-red-100 border-red-500/50' : 'border-white/10 bg-white/5 text-gray-400'}`}>Declines</button>
                </div>

                {guest.has_plus_one && (
                  <div className="pt-8 border-t border-white/10 space-y-4">
                    <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">{guest.plus_one_name || "Guest"}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => setPlusOneStatus('attending')} className={`py-3 rounded-lg border transition-all ${plusOneStatus === 'attending' ? 'bg-white text-black border-white' : 'border-white/10 bg-white/5 text-gray-400'}`}>Accepts</button>
                      <button onClick={() => setPlusOneStatus('declined')} className={`py-3 rounded-lg border transition-all ${plusOneStatus === 'declined' ? 'bg-red-500/20 text-red-100 border-red-500/50' : 'border-white/10 bg-white/5 text-gray-400'}`}>Declines</button>
                    </div>
                  </div>
                )}

                {(mainStatus === 'attending' || plusOneStatus === 'attending') && (
                  <div className="pt-8 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest block text-center">Dietary Requirements</label>
                    <textarea
                      placeholder="e.g. Vegetarian, Nut Allergy..."
                      className="w-full bg-black/30 border border-white/10 p-5 rounded-2xl h-24 outline-none focus:border-white/30 text-sm font-light"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                    />
                  </div>
                )}

                <button onClick={submitRSVP} disabled={!mainStatus} className="w-full bg-white text-black py-6 rounded-2xl font-bold tracking-[0.3em] uppercase hover:shadow-2xl transition disabled:opacity-20">
                  Confirm RSVP
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
