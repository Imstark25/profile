import Scene from './components/Scene';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold">Welcome to my Portfolio</h1>
          <p className="mt-3 text-2xl">
            I'm a creative developer.
          </p>
        </div>
      </div>
      <div className="w-full h-96">
        <Scene />
      </div>
    </main>
  );
}

