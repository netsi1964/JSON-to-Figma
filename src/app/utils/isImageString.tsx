export default function isImageString(s: string) {
    if (/.jpg|.gif|.png|.jpeg|.webp/gm.test(s.toLowerCase())) {
        return true;
    } else {
        return false;
    }
}
