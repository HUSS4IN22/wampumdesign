import WampumBuilder from "../components/WampumBuilder"

export default function WampumBuilderSection() {
    return (
        <section id="wampum-builder" className='h-full min-h-screen w-full bg-[#051923]'>
            <h1 className="text-xl sm:text-4xl xs:text-2xl md:text-7xl lg:text-8xl xl:text-9xl font-thin text-center text-[#EFFAD1] mt-14 mb-14 p-2">Wampum Builder</h1>
            <WampumBuilder/>
        </section>
    )
}