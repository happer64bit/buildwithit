import { read } from '$app/server';

export async function GET({ url }) {
    const id = url.searchParams.get("id");

    const data = import.meta.glob("/src/data/*.png", {
        eager: true,
    }) as Record<string, { default: string }>;

    const imagePath = `/src/data/${id}.png`;
    const imageFile = data[imagePath];

    if (!imageFile) {
        return new Response("Image not found", { status: 404 });
    }

    const imageResponse = await read(imageFile.default);
    const imageData = await imageResponse.arrayBuffer();

    return new Response(imageData, {
        headers: {
            "Content-Type": "image/png",
        },
    });
}
