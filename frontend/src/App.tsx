import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <Button className="m-4">Hi there</Button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
        Submit
      </button>
      <button className="bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800 sm:px-8 sm:py-3">
        Confirm
      </button>
      <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <img
          className="size-12 shrink-0 rounded-full border-2 border-white/10 object-cover"
          src="/img/logo.jpg"
          alt="ChitChat Logo"
        />
        <div>
          <div className="text-xl font-medium text-black dark:text-white">
            ChitChat
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            You have a new message!
          </p>
        </div>
      </div>
      <div className="max-h-3xs checked::scale-110 m-4 max-w-3xs cursor-pointer rounded-full border-2 border-black transition-all duration-300 hover:scale-75">
        <img
          className="rounded-full bg-black object-cover"
          src="/img/logo.jpg"
          alt="ChitChat Logo"
        />
      </div>
    </>
  );
}

export default App;
