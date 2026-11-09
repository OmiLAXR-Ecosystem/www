import {readFileSync} from "node:fs";
import {join} from "node:path";
import {imageSize as probe} from "image-size";

// Pixel size of an image in static/ (src as referenced on the page, e.g. "/get-started/step-0.webp"),
// so <img> gets width/height and the browser reserves its space before the lazy image loads.
// Build time only: the components that use it are never hydrated (see AGENTS.md).
export function imageSize(src: string): {width?: number, height?: number} {
    try {
        const file = readFileSync(join(process.cwd(), "static", src));
        try {
            const {width, height} = probe(file);
            return {width, height};
        } catch {
            // image-size does not detect draw.io SVGs, which start with a long comment and DOCTYPE
            const svg = file.toString("utf8").match(/<svg\b[^>]*>/)?.[0] ?? "";
            const width = parseFloat(svg.match(/\swidth="([\d.]+)/)?.[1]);
            const height = parseFloat(svg.match(/\sheight="([\d.]+)/)?.[1]);
            return width && height ? {width, height} : {};
        }
    } catch {
        return {};
    }
}
