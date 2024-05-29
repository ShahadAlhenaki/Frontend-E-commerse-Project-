import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className=" w-full h-[80vh] flex items-center justify-center bg-gray-100 mb-9 bg-[url('public/images/2.png')] bg-cover">
      <div className="relative z-10 text-center space-y-6 px-4 md:px-6 mt-40">
        <h1 className="text-4xl tracking-tight sm:text-5xl md:text-6xl  text-slate-50 font-semibold font-serif">
          Welcome To CarDeals
        </h1>
        <p className="text-lg text-orange-300 max-w-3xl mx-auto font-light font-serif">
          CarDeals is your premier online destination for hassle-free car shopping. With a vast selection of vehicles and unbeatable deals, finding your dream car is just a click away.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-md px-8 py-3 text-base font-medium text-gray-900  bg-gray-300 shadow-lg shadow-gray-200/50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          to="/"
        >
          Get Started
        </Link>
      </div>
    </section>
  )
}
