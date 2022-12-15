import React from 'react'
import { useState } from "react";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast"

function message() {
    const [name, setName] = useState("");
    const [relation, setRealtion] = useState("");
    const [result, setResult] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        const loading = toast.loading("Generating Messages ....")
        const response = await fetch("/api/generate-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, relation }),
        });
        const data = await response.json();
        setResult(data.result);
        toast.success("🔥 Enjoy!! 🔥", {
            id: loading
        })
      }

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-400 h-screen">
        <Head>
            <title>Message</title>
        </Head>
        <Toaster />
        <main className="max-w-6xl mx-auto py-12 px-4">
            <form onSubmit={onSubmit} className="flex flex-col space-y-2 p-5 bg-white rounded-lg shadow-md max-w-lg mx-auto">
                <h3 className="font-bold text-gray-800 text-center mb-2">🔥 Generate Christmas Message For Your Closed Ones 🔥</h3>
                <p className="text-slate-800 text-center pb-4 border-b-2 border-red-400">Powered By <span className="text-red-500">"ChatGPT"</span></p>
                <label className="text-slate-900">Name of the person</label>
                <input
                    type="text"
                    name="name"
                    placeholder="e.g James, Kate, Harry ...."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-50 py-3 px-2 rounded-lg text-gray-700 outline-none"
                />
                 <label className="text-slate-900 mb-4">Relation with the person</label>
                <input
                    type="text"
                    name="relation"
                    placeholder="e.g Boss, Sister, Brother ..."
                    value={relation}
                    onChange={(e) => setRealtion(e.target.value)}
                    className="bg-slate-50 py-3 px-2 rounded-lg text-gray-700 outline-none"
                />
                <input type="submit" value="Generate Message" className='bg-red-500 py-2 rounded-lg text-white hover:bg-rose-500'/>
            </form>
        </main>
        <div className="max-w-lg mx-auto bg-white h-48 p-5 rounded-lg shawow-md">
            <h3 className="font-bold text-gray-800 text-center mb-2">🔥 Ai Genereated Message 🔥</h3>
            <p className="font-semibold text-slate-900">
                {result}
            </p>
        </div>
    </div>
  )
}

export default message