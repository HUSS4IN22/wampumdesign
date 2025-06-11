import { Link } from 'react-scroll';

export default function Header() {
  return (
    <section className='h-screen w-full flex flex-col items-center justify-center'>
        <div className='text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-thin text-center mb-14'>CINT 923 Final Project:</div>
        <div className='text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-400 text-center mb-14'>Custom Wampum Belt Designer</div>
        <div><p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-300 text-center">Create your own creative Wampum Belt designs to honor Indigenous histories and cultures</p></div>
        <Link
          to="wampum-builder"
          smooth={true}
          duration={500}
          className="text-2xl font-300 text-center align-center border-2 border-[#EFFAD1] text-[#320927] bg-[#EFFAD1] px-3 py-2 mt-14 rounded-full hover:bg-[#320927] hover:text-[#EFFAD1] hover:cursor-pointer transition-colors duration-300"
        >
          Get Started
        </Link>
    </section>
  )
}