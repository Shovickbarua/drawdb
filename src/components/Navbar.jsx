import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_light_160.png";
import { SideSheet, Button, Input } from "@douyinfe/semi-ui";
import { IconMenu } from "@douyinfe/semi-icons";
import { socials } from "../data/socials";
import { setAuthToken } from "../utils/fileSystem";
import axios from "axios";
const API_BASE = (import.meta?.env?.VITE_API_URL ?? "http://localhost:5179").replace(/\/$/, "");

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) setAuthToken(t);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="py-4 px-12 sm:px-4 flex justify-between items-center">
        <div className="flex items-center justify-between w-full">
          <Link to="/">
            <img src={logo} alt="logo" className="h-[48px] sm:h-[32px]" />
          </Link>
          <div className="md:hidden flex gap-12">
            <Link
              className="text-lg font-semibold hover:text-sky-800 transition-colors duration-300"
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Features
            </Link>
            <Link
              to="/editor"
              className="text-lg font-semibold hover:text-sky-800 transition-colors duration-300"
            >
              Editor
            </Link>
            <Link
              to="/templates"
              className="text-lg font-semibold hover:text-sky-800 transition-colors duration-300"
            >
              Templates
            </Link>
            <Link
              to={socials.docs}
              className="text-lg font-semibold hover:text-sky-800 transition-colors duration-300"
            >
              Docs
            </Link>
            {isLoggedIn ? (
              <button
                className="text-lg font-semibold hover:text-sky-800 transition-colors duration-300"
                onClick={logout}
              >
                Logout
              </button>
            ) : (
              <button
                className="text-lg font-semibold hover:text-sky-800 transition-colors duration-300"
                onClick={() => setOpenLogin(true)}
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden block space-x-3 ms-12">
            <a
              title="Jump to Github"
              className="px-2 py-2 hover:opacity-60 transition-all duration-300 rounded-full text-2xl"
              href={socials.github}
              target="_blank"
              rel="noreferrer"
            >
              <i className="opacity-70 bi bi-github" />
            </a>
            <a
              title="Follow us on X"
              className="px-2 py-2 hover:opacity-60 transition-all duration-300 rounded-full text-2xl"
              href={socials.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <i className="opacity-70 bi bi-twitter-x" />
            </a>
            <a
              title="Join the community on Discord"
              className="px-2 py-2 hover:opacity-60 transition-all duration-300 rounded-full text-2xl"
              href={socials.discord}
              target="_blank"
              rel="noreferrer"
            >
              <i className="opacity-70 bi bi-discord" />
            </a>
          </div>
        </div>
        <button
          onClick={() => setOpenMenu((prev) => !prev)}
          className="hidden md:inline-block h-[24px]"
        >
          <IconMenu size="extra-large" />
        </button>
      </div>
      <hr />
      <SideSheet
        title={
          <img src={logo} alt="logo" className="sm:h-[32px] md:h-[42px]" />
        }
        visible={openMenu}
        onCancel={() => setOpenMenu(false)}
        width={window.innerWidth}
      >
        <Link
          className="hover:bg-zinc-100 block p-3 text-base font-semibold"
          onClick={() => {
            document
              .getElementById("features")
              .scrollIntoView({ behavior: "smooth" });
            setOpenMenu(false);
          }}
        >
          Features
        </Link>
        <hr />
        <Link
          to="/editor"
          className="hover:bg-zinc-100 block p-3 text-base font-semibold"
        >
          Editor
        </Link>
        <hr />
        <Link
          to="/templates"
          className="hover:bg-zinc-100 block p-3 text-base font-semibold"
        >
          Templates
        </Link>
        <hr />
        <Link
          to={socials.docs}
          className="hover:bg-zinc-100 block p-3 text-base font-semibold"
        >
          Docs
        </Link>
      </SideSheet>
      <SideSheet
        title="Login"
        visible={openLogin}
        onCancel={() => setOpenLogin(false)}
        width={Math.min(400, window.innerWidth)}
      >
        <div className="p-4 flex flex-col gap-3">
          <Input placeholder="Username" value={username} onChange={setUsername} />
          <Input placeholder="Password" type="password" value={password} onChange={setPassword} />
          <Button
            type="primary"
            onClick={async () => {
              try {
                const r = await axios.post(`${API_BASE}/api/login`, { username, password });
                localStorage.setItem("token", r.data.token);
                setAuthToken(r.data.token);
                setIsLoggedIn(true);
                setOpenLogin(false);
              } catch (e) { return; }
            }}
          >
            Login
          </Button>
        </div>
      </SideSheet>
    </>
  );
}
