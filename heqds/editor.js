const executeCodeBtn = document.querySelector(".editor__run");
const resetCodeBtn = document.querySelector(".editor__reset");
const console_ = document.querySelector(".editor__console");

let codeEditor = ace.edit("editorCode");
let defaultCode = 'output "Suck my dick!!"';

let editorLib = {
  init() {

    codeEditor.setTheme("ace/theme/dracula");

    codeEditor.session.setMode("ace/mode/python");
    codeEditor.setFontSize(22);

    codeEditor.setValue(defaultCode);
  },
};

executeCodeBtn.addEventListener("click", () => {

  const userCode = codeEditor.getValue();
  const params = { code: userCode };

  const url = "https://swas.vercel.app/api/run?" + new URLSearchParams(params);

  console.log(url);
  console_.innerText = "Processing....";
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => (console_.innerText = data["stdout"] + data["stderr"]));
  } catch (err) {
    console.error(err);
  }
});

resetCodeBtn.addEventListener("click", () => {
  codeEditor.setValue("");
});

editorLib.init();
