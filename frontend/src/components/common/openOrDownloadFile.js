export function openOrDownloadFile({ url, fileName }) {
    const extension = fileName.split('.').pop().toLowerCase();
    const viewableTypes = ["pdf", "png", "jpg", "jpeg", "txt"];

    if (viewableTypes.includes(extension)) {
        window.open(url, "_blank");
    } else {
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
