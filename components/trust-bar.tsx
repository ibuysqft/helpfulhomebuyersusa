export function TrustBar() {
  return (
    <section className="bg-amber-500 py-6 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-slate-900">
        <div>
          <p className="text-2xl font-bold">100+</p>
          <p className="text-sm font-medium">Homes Purchased</p>
        </div>
        <div>
          <p className="text-2xl font-bold">7 Days</p>
          <p className="text-sm font-medium">Fastest Close</p>
        </div>
        <div>
          <p className="text-2xl font-bold">4.9★</p>
          <p className="text-sm font-medium">Average Rating</p>
        </div>
        <div>
          <p className="text-2xl font-bold">$0</p>
          <p className="text-sm font-medium">Fees or Commissions</p>
        </div>
      </div>
    </section>
  )
}
