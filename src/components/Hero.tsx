import SearchBarContainer from './SearchBarContainer';

export default function Hero() {
  return (
    <section className="w-full bg-slate-100 mx-auto relative text-center px-4 sm:px-6 lg:px-8 py-10 md:py-24 rounded-b-xl">
      <div className="flex flex-col text-center py-16 items-center">
        <h1 className="text-5xl font-bold">Starter Pages & Examples</h1>
        <p className="mt-4 md:text-lg text-gray-600 dark:text-gray-400 max-w-[700px]">
          Kick-start your project effortlessly with Preline UI wide range of
          examples, using pre-built UI parts, custom components and layouts
          using Tailwind CSS.
        </p>
        <SearchBarContainer />
      </div>
    </section>
  );
}
