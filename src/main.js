import "./style.css";
import { mountHome } from "./pages/home.js";
import { mountGenerate } from "./pages/generate.js";
import { mountAvatar2 } from "./pages/avatar2.js";

// Global Error Handler
window.onerror = function (message, source, lineno, colno, error) {
  const div = document.createElement("div");
  Object.assign(div.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(255,0,0,0.8)",
    color: "white",
    padding: "10px",
    fontFamily: "monospace",
  });
  div.innerText = `Error: ${message} (Line ${lineno})`;
  document.body.appendChild(div);
};

// --- ROUTER ---
const appContainerId = "app";
const path = window.location.pathname;

if (path.includes("/generate")) {
  mountGenerate(appContainerId);
} else if (path.includes("/avatar/2")) {
  mountAvatar2(appContainerId);
} else if (path.includes("/avatar/1")) {
  mountHome(appContainerId);
} else {
  // Default Root
  mountHome(appContainerId);
}
