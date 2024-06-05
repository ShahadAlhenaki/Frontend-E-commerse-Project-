import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section  className=" w-full h-[80vh] flex mb-10 relative  ">
       <div className="inset-0 w-full h-full pointer-events-none  ">
       <video className="w-full h-full object-cover pointer-events-none items-center justify-center absolute" autoPlay loop muted playsInline>
          <source src="./public/vh.mp4" type="video/mp4"/>
          Your browser does not support HTML video.
        </video>
    {/* // <section className=" w-full h-[80vh] flex items-center justify-center bg-gray-100 mb-9 bg-[url(https://i.imgur.com/pzchkQ7.png)] bg-cover "> */}
      <div className="relative z-10 text-center space-y-6 px-4 md:px-6 mt-40" >
        <h1 className="text-4xl tracking-tight sm:text-5xl md:text-6xl text-[#eeeeeee6] font-semibold font-serif">
        CARDEALS
        </h1>
        {/* <p className="text-lg text-orange-300 max-w-3xl mx-auto font-light font-serif">
          CarDeals is your premier online destination for hassle-free car shopping. With a vast
          selection of vehicles and unbeatable deals, finding your dream car is just a click away.
        </p> */}
        <Link
          className="inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-medium text-gray-900  bg-[#f1ebeba2] shadow-lg shadow-gray-200/50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          to="/"
        >
          Get Started
        </Link>
      </div>
      </div>
    </section>
  )
}
