import WampumBuilder from "../components/WampumBuilder"

export default function WampumBuilderSection() {
    return (
        <section className='h-screen w-full bg-[#051923]'>
            <h1 className="text-8xl font-thin text-center text-[#EFFAD1] mt-14 mb-14">Wampum Builder</h1>
            <WampumBuilder/>
        </section>
    )
}