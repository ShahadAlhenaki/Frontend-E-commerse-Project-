import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center bg-gray-50 mb-9">
      <div className="relative z-10 text-center space-y-6 px-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Welcome To CarDeals
        </h1>
        <p className="text-lg text-orange-400 max-w-3xl mx-auto">
          CarDeals is your premier online destination for hassle-free car shopping. With a vast
          selection of vehicles and unbeatable deals, finding your dream car is just a click away.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium text-gray-900 shadow-sm bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          to="/"
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}
