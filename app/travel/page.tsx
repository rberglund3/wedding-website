const roomBlocks = [
  {
    name: "Hilton Garden Inn Stony Brook",
    location: "Stony Brook, NY",
    bookUrl: "https://group.hiltongardeninn.com/7t362w"
  },
  {
    name: "Residence Inn by Marriott Long Island Hauppauge/Islandia",
    location: "Hauppauge / Islandia, NY",
    bookUrl: "https://www.marriott.com/event-reservations/reservation-link.mi?id=1787258604739&key=GRP&app=resvlink&_branch_match_id=1451761477639974305&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXTywo0MtNLCrKzC8p0UvOz9UvSi0uy0wtN7LPTLE1NLcwNzK1MDMwMTe2VMtOrbR1DwpQA2qxBanKyczLVqsrSk1LBWrPS49PKsovL04tsnXOKMrPTQUAwSI1U2EAAAA%3D"
  }
];

const alternativeHotels = [
  {
    name: "Hyatt Regency Long Island",
    location: "Hauppauge, NY",
    query: "Hyatt+Regency+Long+Island+Hauppauge"
  },
  {
    name: "Holiday Inn Express Hauppauge-Long Island by IHG",
    location: "Hauppauge, NY",
    query: "Holiday+Inn+Express+Hauppauge"
  },
  {
    name: "Hampton Inn Long Island / Islandia",
    location: "Islandia, NY",
    query: "Hampton+Inn+Islandia"
  }
];

const airports = [
  {
    name: "Long Island MacArthur Airport (ISP)",
    distance: "Approx. 15-20 minutes to hotels & venue",
    notes: "The most convenient option. Highly recommended for domestic travel as it avoids major city traffic."
  },
  {
    name: "John F. Kennedy International Airport (JFK)",
    distance: "Approx. 1 hour to hotels & venue",
    notes: "Ideal for international flights. Accessible via the Long Island Rail Road (LIRR) or by car."
  },
  {
    name: "LaGuardia Airport (LGA)",
    distance: "Approx. 1 hour to hotels & venue",
    notes: "Convenient for major domestic airlines. Best accessed by car or rideshare services."
  }
];

export default function TravelPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-stone-50 text-stone-800">

      <header className="max-w-2xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.2em] text-stone-900 mb-6">
          Travel & Stay
        </h1>
        <div className="w-12 h-[1px] bg-emerald-800 mx-auto mb-6"></div>
        <p className="text-sm italic opacity-80">
          Accommodations and travel details for our wedding weekend.
        </p>
      </header>

      <div className="max-w-5xl mx-auto space-y-24">

        <section className="grid md:grid-cols-2 gap-8">
          {roomBlocks.map((hotel) => (
            <div
              key={hotel.name}
              className="relative border border-emerald-900/10 p-8 md:p-12 text-center bg-white shadow-sm overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-800/20"></div>

              <span className="text-xs uppercase tracking-[0.2em] text-emerald-800 font-bold">
                Official Room Block
              </span>

              <h2 className="text-2xl md:text-3xl font-serif mt-6 mb-2 text-stone-900">
                {hotel.name}
              </h2>
              <p className="text-sm opacity-70 mb-8 uppercase tracking-widest">
                {hotel.location}
              </p>

              <p className="mb-10 opacity-80 leading-relaxed flex-1">
                We have secured a block of rooms at a discounted rate. Please use the link below to book your stay, or mention our names when calling the front desk.
              </p>

              <a
                href={hotel.bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 bg-emerald-800 text-white uppercase tracking-widest text-xs hover:bg-emerald-900 transition-colors"
              >
                Book Room Block
              </a>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-2xl font-serif text-center uppercase tracking-[0.2em] mb-12 text-stone-900">
            Alternative Accommodations
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {alternativeHotels.map((hotel, index) => (
              <div
                key={index}
                className="border border-stone-200 p-8 bg-white text-center hover:border-emerald-800/30 transition-colors"
              >
                <h4 className="text-lg font-serif mb-3 text-stone-900">
                  {hotel.name}
                </h4>
                <p className="text-sm opacity-70 mb-6 uppercase tracking-widest">
                  {hotel.location}
                </p>
                <a
                  href={`https://www.google.com/search?q=${hotel.query}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.1em] border-b border-emerald-800 text-emerald-800 pb-1 hover:text-emerald-950 hover:border-emerald-950 transition-colors"
                >
                  Search Rates
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-stone-200 pt-16">
          <h3 className="text-2xl font-serif text-center uppercase tracking-[0.2em] mb-12 text-stone-900">
            Convenient Airports
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {airports.map((airport, index) => (
              <div key={index} className="space-y-3 bg-white p-6 border border-stone-100 rounded-sm shadow-2xs">
                <h4 className="font-serif text-lg text-stone-900 leading-snug">
                  {airport.name}
                </h4>
                <p className="text-xs uppercase tracking-wider text-emerald-800 font-medium">
                  {airport.distance}
                </p>
                <p className="text-sm opacity-70 leading-relaxed">
                  {airport.notes}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
