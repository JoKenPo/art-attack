export const createInfoPanel = () => {
  const infoPanel = document.createElement("div");
  Object.assign(infoPanel.style, {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
    fontFamily: "monospace",
    fontSize: "14px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "15px",
    borderRadius: "8px",
    pointerEvents: "none",
    zIndex: "10",
  });
  document.body.appendChild(infoPanel);
  return infoPanel;
};

export const updateInfoPanel = (infoPanel, id, style) => {
  if (!infoPanel) return;
  infoPanel.innerHTML = `
      <strong>Avatar ID</strong><br>
      <span style="color: #ffff00;">"${id}"</span><br><br>
      <strong>Stats</strong><br>
      Hair: ${style.hair}<br>
      Eyes: ${style.eyes}<br>
      Eyebrows: ${style.eyebrows}<br>
      Nose: ${style.nose}<br>
      Mouth: ${style.mouth}<br>
      <hr style="opacity: 0.3; margin: 8px 0;">
      Glasses: ${style.accessories.glasses}<br>
      Earrings: ${style.accessories.earrings}<br>
      Hat: ${style.accessories.hat}<br>
    `;
};

export const createGeneratorUI = (onGenerate) => {
  // Input Container
  const controls = document.createElement("div");
  Object.assign(controls.style, {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "10px",
    zIndex: "10",
  });
  document.body.appendChild(controls);

  // Input Field
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter ID / Name...";
  inputField.value = "Eduardo"; // Default
  Object.assign(inputField.style, {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    fontFamily: "monospace",
  });
  // Generate on input
  inputField.addEventListener("input", (e) => {
    onGenerate(e.target.value);
  });
  controls.appendChild(inputField);

  // Random Button
  const generateBtn = document.createElement("button");
  generateBtn.innerText = "🎲 Random";
  Object.assign(generateBtn.style, {
    padding: "10px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#fff",
    fontFamily: "monospace",
    fontWeight: "bold",
  });
  generateBtn.addEventListener("click", () => {
    const randomId = Math.random().toString(36).substring(7);
    inputField.value = randomId;
    onGenerate(randomId);
  });
  controls.appendChild(generateBtn);

  return { inputField };
};
