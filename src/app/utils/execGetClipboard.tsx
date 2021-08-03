export default function execGetClipboard() {
    const pasteTarget = document.createElement('div');
    pasteTarget.contentEditable = 'true';
    const actElem = document.activeElement.appendChild(pasteTarget).parentNode;
    pasteTarget.focus();
    document.execCommand('Paste', null, null);
    const paste = pasteTarget.innerText;
    actElem.removeChild(pasteTarget);
    return paste;
}
