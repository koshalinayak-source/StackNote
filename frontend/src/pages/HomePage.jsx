import React, { useState, useEffect } from "react";
// import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitAlert from "../components/RateLimitAlert";
import axios from "axios";
import api from "../lib/axios"
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        console.log(error.response);
        if (error.response?.status === 429) {
          console.log("Rate limited error detected");
          setIsRateLimited(true);
        } else {
          console.log("Some other error:", error.response?.status);
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      {isRateLimited && <RateLimitAlert />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-purple-599 py-10">
            <LoaderCircle className="mx-auto h-8 w-8 animate-spin" />
          </div>
        )}

        {notes.length === 0 && !isRateLimited && (
          <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-16 text-center z-10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0  from-primary/20 via-primary-glow/10 to-background opacity-30 -z-10 pointer-events-none" />

            {/* Decorative floating particles */}
            <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary-glow rounded-full animate-ping opacity-50" />
              <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary rounded-full animate-pulse opacity-40" />
              <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-primary-glow/50 rounded-full animate-ping opacity-20" />
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-6xl md:text-7xl font-extrabold text-purple-400 drop-shadow-lg animate-fade-in-up">
              StackNote
            </h1>
            <p className="mt-6 text-2xl md:text-3xl text-purple-500 max-w-2xl animate-fade-in-up delay-200">
              Create your notes with{" "}
              <span className="font-semibold text-foreground">
                powerful organization
              </span>
            </p>
          </div>
        )}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
              // <div>
              //   {note.title} | {note.content}
              // </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
