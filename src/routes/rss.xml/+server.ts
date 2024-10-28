import { load } from 'js-yaml';

interface ParsedSite {
    name: string;
    category: string;
    link: string;
    description: string;
    'build-with': string;
}

export async function GET({ fetch }) {
    const response = await fetch('/api/getAllData')
    const yamlText = await response.text()

    const parsedData: Record<string, { default: string }> = load(yamlText) as Record<
        string,
        { default: string }
    >;

    const headers = { 'Content-Type': 'application/xml' }


    const websiteData = Object.entries(parsedData).map(([key, value]) => {
        const yamlString = value.default;

        const site: ParsedSite = load(yamlString) as ParsedSite;

        return {
            id: key,
            name: site.name,
            description: site.description,
            category: site.category,
            url: site.link,
            buildWith: site['build-with']
        };
    });
    const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>BuildWithIt</title>
				<description></description>
				<link>https://buildwithit.vercel.app</link>
				<atom:link href="https://buildwithit.vercel.app/rss.xml" rel="self" type="application/rss+xml"/>
				${websiteData
            .map(
                (item) => `
						<item>
							<title>${item.name}</title>
							<description>${item.description}</description>
							<link>${item.url}/${item.id}</link>
							<guid isPermaLink="true">https://buildwithit.vercel.app/${item.id}</guid>
						</item>
					`
            )
            .join('')}
			</channel>
		</rss>
	`.trim()

    return new Response(xml, { headers })
}
