import { createClient, type QueryParams, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-04-13";
const writeToken = process.env.SANITY_API_WRITE_TOKEN || "";

let _client: SanityClient | undefined;
let _writeClient: SanityClient | undefined;

function getSanityClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    });
  }
  return _client;
}

export function getSanityWriteClient(): SanityClient {
  if (!_writeClient) {
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: writeToken,
      perspective: "published",
    });
  }
  return _writeClient;
}

let _imageBuilder: ReturnType<typeof imageUrlBuilder> | undefined;

function getImageBuilder() {
  if (!_imageBuilder) {
    _imageBuilder = imageUrlBuilder(getSanityClient());
  }
  return _imageBuilder;
}

export const sanityClient = new Proxy({} as SanityClient, {
  get(_, prop) {
    const client = getSanityClient();
    const value = client[prop as keyof SanityClient];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export function urlFor(source: Parameters<ReturnType<typeof imageUrlBuilder>["image"]>[0]) {
  return getImageBuilder().image(source);
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  if (!isSanityConfigured()) {
    throw new Error("Sanity project ID is not configured");
  }
  return getSanityClient().fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 3600,
      tags,
    },
  });
}

export function isSanityConfigured(): boolean {
  return Boolean(projectId && projectId !== "YOUR_PROJECT_ID");
}
