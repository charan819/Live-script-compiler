// ✅ app.js (Minimize/Maximize + ACE Editor Theme Fix)

function getCombinedUserCode() {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    const darkOutputStyle = `
        <style>
        body {
            background-color: #1e1e2f;
            color: #f0f0f0;
        }
        </style>
    `;

    const darkCSS = document.body.classList.contains("dark") ? darkOutputStyle : "";

    return `
${htmlCode}
<style>
${cssCode}
</style>
${darkCSS}
<script>
${jsCode}
</script>
`;
}

function renderLivePreview() {
    const outputDocument = document.getElementById('iframe').contentWindow.document;
    outputDocument.open();
    outputDocument.write(getCombinedUserCode());
    outputDocument.close();
}

function initializeHTMLEditor(theme) {
    const initialHTML = `<!DOCTYPE html>\n<html>\n\n  <!-- Start writing your HTML markup here -->\n\n</html>`;
    window.htmlEditor = ace.edit("htmlEditor");
    htmlEditor.setTheme(theme);
    htmlEditor.getSession().setMode("ace/mode/html");
    htmlEditor.setValue(initialHTML, 1);
    htmlEditor.getSession().on('change', renderLivePreview);
    htmlEditor.focus();
    htmlEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible: false,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
    htmlEditor.setShowPrintMargin(false);
}

function initializeCSSEditor(theme) {
    const initialCSS = `/* Style your page using CSS here */`;
    window.cssEditor = ace.edit("cssEditor");
    cssEditor.setTheme(theme);
    cssEditor.getSession().setMode("ace/mode/css");
    cssEditor.setValue(initialCSS, 1);
    cssEditor.getSession().on('change', renderLivePreview);
    cssEditor.focus();
    cssEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible: true
    });
    cssEditor.setShowPrintMargin(false);
}

function initializeJSEditor(theme) {
    const initialJS = `/* Add interactivity with JavaScript here */`;
    window.jsEditor = ace.edit("jsEditor");
    jsEditor.setTheme(theme);
    jsEditor.getSession().setMode("ace/mode/javascript");
    jsEditor.setValue(initialJS, 1);
    jsEditor.getSession().on('change', renderLivePreview);
    jsEditor.focus();
    jsEditor.setOptions({
        fontSize: "12.5pt",
        showLineNumbers: true,
        vScrollBarAlwaysVisible: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false
    });
    jsEditor.setShowPrintMargin(false);
}

function setupScriptCompiler() {
    const isDark = document.body.classList.contains("dark");
    const editorTheme = isDark ? "ace/theme/dracula" : "ace/theme/chrome";
    initializeHTMLEditor(editorTheme);
    initializeCSSEditor(editorTheme);
    initializeJSEditor(editorTheme);
}

function launchCompiler() {
    setupScriptCompiler();
}

function minimizeEditors() {
    document.getElementById("editors").style.height = "50%";

    document.getElementById("htmlEditor").style.height = "90%";
    document.getElementById("htmlEditor").style.width = "32%";
    document.getElementById("cssEditor").style.height = "90%";
    document.getElementById("cssEditor").style.width = "32%";
    document.getElementById("jsEditor").style.height = "90%";
    document.getElementById("jsEditor").style.width = "32%";

    document.getElementById("iframe").style.height = "50%";
}

function maximizeEditors() {
    document.getElementById("editors").style.height = "5%";

    document.getElementById("htmlEditor").style.height = "0";
    document.getElementById("htmlEditor").style.width = "0";
    document.getElementById("cssEditor").style.height = "0";
    document.getElementById("cssEditor").style.width = "0";
    document.getElementById("jsEditor").style.height = "0";
    document.getElementById("jsEditor").style.width = "0";

    document.getElementById("iframe").style.height = "95%";
}

function downloadCompiledCode() {
    const compiledCode = getCombinedUserCode();
    const blob = new Blob([compiledCode], { type: "text/html" });
    triggerCodeDownload(blob, "compiled-code.html");
}

function triggerCodeDownload(blob, fileName) {
    const blobURL = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = blobURL;
    anchor.download = fileName;
    anchor.click();
    anchor.remove();
    document.addEventListener("focus", () => {
        window.URL.revokeObjectURL(blobURL);
    });
}

let currentTheme = "light";

function toggleTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById("themeToggle");
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        currentTheme = "light";
        toggleBtn.innerHTML = "🌙 Dark Mode";
        htmlEditor.setTheme("ace/theme/chrome");
        cssEditor.setTheme("ace/theme/chrome");
        jsEditor.setTheme("ace/theme/chrome");
    } else {
        body.classList.add("dark");
        currentTheme = "dark";
        toggleBtn.innerHTML = "☀️ Light Mode";
        htmlEditor.setTheme("ace/theme/dracula");
        cssEditor.setTheme("ace/theme/dracula");
        jsEditor.setTheme("ace/theme/dracula");
    }
    renderLivePreview();
}
