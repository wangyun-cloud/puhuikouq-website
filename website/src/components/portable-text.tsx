import Image from "next/image";
import {
  PortableText as SanityPortableText,
  type PortableTextReactComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

interface PortableTextImage {
  _type: "image";
  asset: { _ref: string; _type: string };
  alt?: string;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-foreground">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>
    ),
    bullet: ({ children }) => <>{children}</>,
    number: ({ children }) => <>{children}</>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-foreground/90">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-foreground/90">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "";
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: PortableTextImage }) => {
      const imageUrl = value?.asset?._ref
        ? urlFor(value).url()
        : "";
      return (
        <figure className="my-8">
          {imageUrl ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={value.alt || "文章配图"}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          ) : (
            <div className="aspect-video w-full rounded-lg bg-muted" />
          )}
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface PortableTextProps {
  value: PortableTextBlock[];
}

export function PortableText({ value }: PortableTextProps) {
  return <SanityPortableText value={value} components={components} />;
}
