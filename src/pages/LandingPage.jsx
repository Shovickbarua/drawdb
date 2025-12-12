import { useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleCanvas from "../components/SimpleCanvas";
import Navbar from "../components/Navbar";
import { diagram } from "../data/heroDiagram";
import mysql_icon from "../assets/mysql.png";
import postgres_icon from "../assets/postgres.png";
import sqlite_icon from "../assets/sqlite.png";
import mariadb_icon from "../assets/mariadb.png";
import oraclesql_icon from "../assets/oraclesql.png";
import sql_server_icon from "../assets/sql-server.png";
import github from "../assets/github.png";
import screenshot from "../assets/screenshot.png";
import FadeIn from "../animations/FadeIn";
import { socials } from "../data/socials";

export default function LandingPage() {
  useEffect(() => {
    document.body.setAttribute("theme-mode", "light");
    document.title =
      "drawDB Fork by Shovick Barua | Database diagram editor";
  }, []);

  return (
    <div>
      <div className="flex flex-col h-screen bg-zinc-100">
        <div className="text-white font-semibold py-1 text-sm text-center bg-linear-to-r from-[#12495e] from-10% via-slate-500 to-[#12495e]" />

        <FadeIn duration={0.6}>
          <Navbar />
        </FadeIn>

        {/* Hero section */}
        <div className="flex-1 flex-col relative mx-4 md:mx-0 mb-4 rounded-3xl bg-white">
          <div className="h-full md:hidden">
            <SimpleCanvas diagram={diagram} zoom={0.85} />
          </div>
          <div className="hidden md:block h-full bg-dots" />
          <div className="absolute left-12 w-[45%] top-[50%] translate-y-[-54%] md:left-[50%] md:translate-x-[-50%] p-8 md:p-3 md:w-full text-zinc-800">
            <FadeIn duration={0.75}>
              <div className="md:px-3">
                <h1 className="text-[42px] md:text-3xl font-bold tracking-wide bg-linear-to-r from-sky-900 from-10% via-slate-500 to-[#12495e] inline-block text-transparent bg-clip-text">
                  drawDB Fork by Shovick Barua
                </h1>
                <div className="text-lg font-medium mt-2">
                  Login-based, multi-project, persistent backend storage.
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">Login</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">Multiple Projects</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">Persistent Storage</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">Free & Open Source</span>
                  <span className="px-3 py-1 rounded-full bg-zinc-100 text-sm">Draw, Copy, and Paste</span>
                </div>
              </div>
            </FadeIn>
            <div className="mt-6 font-semibold md:mt-12">
              <Link
                to="/editor"
                className="inline-block py-3 text-white transition-all duration-300 rounded-full shadow-lg bg-sky-900 ps-7 pe-6 hover:bg-sky-800 mr-3"
              >
                Open Editor <i className="bi bi-arrow-right ms-1"></i>
              </Link>
              <Link
                to="/templates"
                className="inline-block py-3 transition-all duration-300 bg-white border rounded-full shadow-lg px-9 border-zinc-200 hover:bg-zinc-100"
              >
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Learn more */}
      <div id="learn-more">
        <div className="bg-zinc-100 py-10 px-28 md:px-8">
          <div className="text-center mb-16">
            <div className="text-2xl md:text-xl font-bold text-sky-800 mb-3">
              Demo Credentials
            </div>
            <div className="mx-auto max-w-xl shadow-xs rounded-2xl border p-6 bg-white">
              <div className="text-sm">
                <div className="flex gap-4 justify-center">
                  <div>Username: <span className="font-mono">admin</span></div>
                  <div>Password: <span className="font-mono">admin</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 w-[75%] text-center sm:w-full mx-auto shadow-xs rounded-2xl border p-6 bg-white space-y-3 mb-12">
            <div className="text-lg font-medium">
              Build diagrams with a few clicks, see the full picture, export SQL
              scripts, customize your editor, and more.
            </div>
            <img src={screenshot} className="mx-auto" />
          </div>
          {/* Stats section removed as requested */}
          <div className="text-lg font-medium text-center mt-12 mb-6">
            Design for your database
          </div>
          <div className="grid grid-cols-3 place-items-center sm:grid-cols-1 sm:gap-10">
            {dbs.map((s, i) => (
              <img
                key={"icon-" + i}
                src={s.icon}
                style={{ height: s.height }}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 md:scale-[0.7] md:mx-auto"
              />
            ))}
          </div>
        </div>
        <svg
          viewBox="0 0 1440 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          className="bg-transparent"
        >
          <path
            d="M0 54C0 54 320 0 720 0C1080 0 1440 54 1440 54V0H0V100Z"
            fill="#f4f4f5"
          />
        </svg>
      </div>

      <div id="features" className="py-8 px-36 md:px-8">
        <FadeIn duration={1}>
          <div className="text-base font-medium text-center text-sky-900">Features</div>
          <div className="text-2xl mt-1 font-medium text-center">Original drawDB features</div>
          <div className="grid grid-cols-3 gap-8 mt-10 md:grid-cols-2 sm:grid-cols-1">
            {originalFeatures.map((f, i) => (
              <div
                key={"feature" + i}
                className="flex rounded-xl hover:bg-zinc-100 border border-zinc-100 shadow-xs hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-sky-700 px-0.5 rounded-l-xl" />
                <div className="px-8 py-4 ">
                  <div className="text-lg font-semibold mb-3">{f.title}</div>
                  {f.content}
                  <div className="mt-2 text-xs opacity-60">{f.footer}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div id="fork-features" className="py-4 px-36 md:px-8">
        <FadeIn duration={1}>
          <div className="text-2xl mt-1 font-medium text-center">Fork additions</div>
          <div className="grid grid-cols-3 gap-8 mt-10 md:grid-cols-2 sm:grid-cols-1">
            {forkFeatures.map((f, i) => (
              <div
                key={"fork-feature" + i}
                className="flex rounded-xl hover:bg-zinc-100 border border-zinc-100 shadow-xs hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-sky-700 px-0.5 rounded-l-xl" />
                <div className="px-8 py-4 ">
                  <div className="text-lg font-semibold mb-3">{f.title}</div>
                  {f.content}
                  <div className="mt-2 text-xs opacity-60">{f.footer}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      

      <svg
        viewBox="0 0 1440 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        className="bg-transparent -scale-100"
      >
        <path
          d="M0 48 C0 48 320 0 720 0C1080 0 1440 48 1440 48V0H0V100Z"
          fill="#f4f4f5"
        />
      </svg>
      <div className="bg-zinc-100 py-8 px-32 md:px-8">
        <div className="px-36 text-center md:px-8 flex justify-center items-center gap-6 md:block">
          <a
            className="inline-block"
            href={socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-zinc-800 hover:opacity-90 transition-all duration-300 flex items-center gap-4 px-14 py-4 rounded-lg">
              <img src={github} className="h-8" />
              <div className="text-lg text-white font-bold">Source code on GitHub</div>
            </div>
          </a>
          <a
            className="inline-block"
            href="https://github.com/Shovickbarua/drawdb"
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-zinc-800 hover:opacity-90 transition-all duration-300 flex items-center gap-4 px-14 py-4 rounded-lg">
              <i className="bi bi-github text-white text-2xl" />
              <div className="text-lg text-white font-bold">Fork source (Shovick)</div>
            </div>
          </a>
          <a
            className="inline-block"
            href="https://drawdb.app"
            target="_blank"
            rel="noreferrer"
          >
            <div className="bg-white border border-zinc-300 hover:bg-zinc-100 transition-all duration-300 flex items-center gap-4 px-14 py-4 rounded-lg">
              <div className="text-lg font-bold">Open drawdb.app</div>
            </div>
          </a>
        </div>
      </div>

      <div className="bg-red-700 py-1 text-center text-white text-xs font-semibold px-3">
        Projects are saved on the server when logged in. If not logged in, data is saved in your browser; back up before clearing it.
      </div>
      <hr className="border-zinc-300" />
      <div className="text-center text-sm py-3">
        &copy; {new Date().getFullYear()} <strong>drawDB Fork by Shovick Barua</strong> - All rights reserved.
      </div>
    </div>
  );
}

const dbs = [
  { icon: mysql_icon, height: 80 },
  { icon: postgres_icon, height: 48 },
  { icon: sqlite_icon, height: 64 },
  { icon: mariadb_icon, height: 64 },
  { icon: sql_server_icon, height: 64 },
  { icon: oraclesql_icon, height: 172 },
];

const originalFeatures = [
  {
    title: "Export",
    content: (
      <div>
        Export the DDL script to run on your database or export the diagram as a
        JSON or an image.
      </div>
    ),
    footer: "",
  },
  {
    title: "Reverse engineer",
    content: (
      <div>
        Already have a schema? Import a DDL script to generate a diagram.
      </div>
    ),
    footer: "",
  },
  {
    title: "Customizable workspace",
    content: (
      <div>
        Customize the UI to fit your preferences. Select the components you want
        in your view.
      </div>
    ),
    footer: "",
  },
  {
    title: "Keyboard shortcuts",
    content: (
      <div>
        Speed up development with keyboard shortcuts. See all available
        shortcuts
        <Link
          to={`${socials.docs}/shortcuts`}
          className="ms-1.5 text-blue-500 hover:underline"
        >
          here
        </Link>
        .
      </div>
    ),
    footer: "",
  },
  {
    title: "Templates",
    content: (
      <div>
        Start off with pre-built templates. Get a quick start or get inspiration
        for your design.
      </div>
    ),
    footer: "",
  },
  {
    title: "Custom Templates",
    content: (
      <div>
        Have boilerplate structures? Save time by saving them as templates and
        load them when needed.
      </div>
    ),
    footer: "",
  },
  {
    title: "Robust editor",
    content: (
      <div>
        Undo, redo, copy, paste, duplicate and more. Add tables, subject areas,
        and notes.
      </div>
    ),
    footer: "",
  },
  {
    title: "Issue detection",
    content: (
      <div>
        Detect and tackle errors in the diagram to make sure the scripts are
        correct.
      </div>
    ),
    footer: "",
  },
  {
    title: "Relational databases",
    content: (
      <div>
        We support 5 relational databases - MySQL, PostgreSQL, SQLite, MariaDB,
        SQL Server.
      </div>
    ),
    footer: "",
  },
  {
    title: "Object-Relational databases",
    content: (
      <div>
        Add custom types for object-relational databases, or create custom JSON
        schemes.
      </div>
    ),
    footer: "",
  },
  {
    title: "Presentation mode",
    content: (
      <div>
        Present your diagrams on a big screen during team meetings and
        discussions.
      </div>
    ),
    footer: "",
  },
  {
    title: "Track todos",
    content: <div>Keep track of tasks and mark them done when finished.</div>,
    footer: "",
  },
];

const forkFeatures = [
  {
    title: "Login",
    content: <div>Authenticate to save and manage projects on the backend.</div>,
    footer: "",
  },
  {
    title: "Multiple projects",
    content: <div>Create, open, and manage multiple diagrams per account.</div>,
    footer: "",
  },
  {
    title: "Delete projects",
    content: <div>Remove projects safely; the editor clears associated data.</div>,
    footer: "",
  },
  {
    title: "Persistent storage",
    content: <div>Diagrams are stored as JSON on the backend after login.</div>,
    footer: "",
  },
  {
    title: "Self-host",
    content: <div>Deploy your own backend for full control and sovereignty.</div>,
    footer: "",
  },
  {
    title: "Free & open source",
    content: <div>Use it freely and extend it as you wish.</div>,
    footer: "",
  },
];
