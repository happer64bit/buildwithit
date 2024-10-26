import { json } from "@sveltejs/kit";

export async function GET() {
    const paths = import.meta.glob('/src/data/*.yml', { eager: true, query: "?raw" });

    const formattedPaths = Object.fromEntries(
        Object.entries(paths).map(([path, content]) => {
            // Extract the file name (ID) from the path, removing directories and extension
            const id = path.match(/\/([^/]+)\.yml$/)?.[1];
            return [id, content];
        })
    );

    return json(formattedPaths);
}
