import Head from "next/head";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast"

export default function Home() {
  const [platform, setPlatform] = useState("netflix");
  const [genre, setGenre] = useState("thriller");
  const [type, setType] = useState("movies");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const loading = toast.loading("Finding Movies 🎥 ....")
    const response = await fetch("/api/generate-movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ platform, genre, type }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll("\n", "brzky").split("brzky"));
    toast.success("🔥 Enjoy!! 🔥", {
      id: loading
    })
  }

  return (
    <div className="bg-slate-200 h-screen">
      <Head>
        <title>Let's Find Movies</title>
      </Head>
      <Toaster />

      <main className="max-w-6xl mx-auto py-12 px-4">
        <h3 className="font-bold text-gray-800 text-center mb-2">🔥 Let's Find The Best Movies 🎥 To Watch This Chritmas 🎄!! 🔥</h3>
        <p className="text-slate-800 text-center pb-5 border-b-2 border-red-400">Powered By <span className="text-red-500">"ChatGPT"</span></p>
        <form onSubmit={onSubmit} className="flex flex-col space-y-3 max-w-md mx-auto py-3 mb-5">

          <label className="text-slate-900 font-semibold">What would you like to watch?</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="movies">Movies</option>
            <option value="tv shows">Series</option>
          </select>

          <label className="text-slate-900 font-semibold">What kind of {type} would like to watch?</label>
          <select
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="adventure">Adventure</option>
            <option value="horror">Horror</option>
            <option value="action">Action</option>
            <option value="crime">Crime</option>
            <option value="thriller">Thriller</option>
            <option value="action">Action</option>
            <option value="romance">Romance</option>
            <option value="superhero">Superhero</option>
            <option value="animation">Anime</option>
          </select>

          <label className="text-slate-900 font-semibold">On which platform would you like to watch it?</label>
          <select
            name="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="mb-10"
          >
            <option value="netflix">Netflix</option>
            <option value="disney">Disney Plus</option>
            <option value="amazon prime video">Amazon Prime Video</option>
          </select>

          <input type="submit" value="Find Movies" className="py-2 bg-red-600 rounded text-white hover:bg-red-500"/>
        </form>

        <div className="max-w-md mx-auto space-y-2 text-slate-900 font-semibold py-3 px-2 rounded">
          {result.map((r,i) =>(
            <p key={i}>{r}</p>
          ))}
        </div>
          
      </main>
    </div>
  );
}