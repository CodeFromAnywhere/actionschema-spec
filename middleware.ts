import * as yaml from "yaml";
import { marked, Parser } from "marked";

// marked.use({
//   renderer: {
//     image: (url) =>
//       `<div style="flex: 1; min-width: 300px"><img src="${url}" ></img></div>`,
//   },
// });

export const config = {
  matcher: ["/:path*.json", "/:path*.yaml", "/:path*.html", "/:path*.ts"],
};

type SupportedFormat = "json" | "yaml" | "md" | "html" | "ts";

const mapperObject: Record<SupportedFormat, SupportedFormat> = {
  json: "yaml",
  yaml: "json",
  md: "html",
  html: "md",
  ts: "json",
};

const convertFormat = async (
  data: any,
  fromFormat: SupportedFormat,
  toFormat: SupportedFormat,
  name: string,
  origin: string,
): Promise<string> => {
  if (fromFormat === "json" && toFormat === "ts") {
    const url = `${origin}/compile?schemaUrl=${origin}/${name}.json`;
    return fetch(url).then((res) => res.text());
  } else if (fromFormat === "json" && toFormat === "yaml") {
    return yaml.stringify(data);
  } else if (fromFormat === "yaml" && toFormat === "json") {
    return JSON.stringify(data, null, 2);
  } else if (fromFormat === "md" && toFormat === "html") {
    return marked(data);
  }
  // For html to md, we don't implement conversion here as it's more complex
  throw new Error(`Unsupported conversion from ${fromFormat} to ${toFormat}`);
};

const parseContent = (content: string, format: SupportedFormat): any => {
  switch (format) {
    case "json":
      return JSON.parse(content);
    case "yaml":
      return yaml.parse(content);
    case "md":
    case "html":
      return content; // No parsing needed for md or html
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default async function middleware(
  request: Request,
): Promise<Response | undefined> {
  const url = new URL(request.url);
  const chunks = url.pathname.split(".");
  const requestedFormat = chunks.pop() as SupportedFormat;
  const name = chunks.join(".");

  if (request.headers.get("X-Original-Format") !== null) {
    // prevent infinite loop
    return;
  }

  if (!(requestedFormat in mapperObject)) {
    return;
  }

  const alternateFormat = mapperObject[requestedFormat];

  const alternateUrl = `${url.origin}${url.pathname.replace(
    "." + requestedFormat,
    "." + alternateFormat,
  )}`;

  const response = await fetch(alternateUrl, {
    headers: { "X-Original-Format": requestedFormat },
  });

  if (!response.ok) {
    return;
  }

  const rawContent = await response.text();
  const content = parseContent(rawContent, alternateFormat);
  const convertedContent = await convertFormat(
    content,
    alternateFormat,
    requestedFormat,
    name,
    url.origin,
  );

  const mediaType = {
    json: "application/json",
    yaml: "text/yaml",
    html: "text/html",
    md: "text/markdown",
    ts: "text/plain",
  }[requestedFormat];

  return new Response(convertedContent, {
    headers: {
      "Content-Type": `${mediaType}; charset=utf-8`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
