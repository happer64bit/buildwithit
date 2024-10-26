import yaml from 'js-yaml';

export async function load({ params }) {
    const paths = import.meta.glob('/src/data/*.yml', { eager: true, query: "?raw" });

    const formattedPaths = Object.fromEntries(
        Object.entries(paths).map(([path, content]) => {
            const id = path.match(/\/([^/]+)\.yml$/)?.[1];
            return [id, content];
        })
    );

    // Check if projectData is defined and load YAML safely
    const projectData = formattedPaths[params.id];
    if (!projectData) {
        throw new Error(`Project data not found for ID: ${params.id}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = yaml.load(projectData.default) as Record<string, any>;

    return {
        id: params.id,
        ...data
    };
}
