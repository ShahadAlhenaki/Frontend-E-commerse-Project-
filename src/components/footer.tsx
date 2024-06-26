import { Facebook, GithubIcon, Instagram, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className=" p-6 md:py-12 w-full bg-gradient-to-l from-gray-50 to-white-50">
      <div className="container max-w-7xl flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">© Copyright 2024 .</p>
        <div className="flex items-center gap-4">
          <Link className="text-gray-500 hover:text-gray-800 dark:text-gray-400 " to="#">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link className="text-gray-500 hover:hover:text-gray-800 dark:text-gray-400" to="#">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link className="text-gray-500 hover:hover:text-gray-800 dark:text-gray-400" to="#">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400"
            to="https://www.linkedin.com/in/shahd-alhenaki-64abbb213/"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link className="text-gray-500 hover:hover:text-gray-800 dark:text-gray-400" to="https://github.com/ShahadAlhenaki">
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHup</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
