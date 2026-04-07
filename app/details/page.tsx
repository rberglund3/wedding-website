// app/details/page.tsx
export default function DetailsPage() {
  return (
    <main className="min-h-screen pt-32 px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-serif mb-8 uppercase tracking-widest text-center">
        Wedding Details
      </h1>
      
      <div className="space-y-12 py-10">
        <section className="text-center">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-4">When & Where</h2>
          <p className="opacity-80">October 24, 2026</p>
          <p className="opacity-80">New York City, NY</p>
        </section>

        <section className="text-center">
          <h2 className="text-xl font-bold uppercase tracking-widest mb-4">Dress Code</h2>
          <p className="opacity-80 italic">Details to follow...</p>
        </section>
      </div>
    </main>
  );
}