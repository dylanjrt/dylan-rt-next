import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const components = {
  types: {
    image: (props) => (
      <div className="my-6 w-full">
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(600)
            .height(400)
            .quality(80)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width="600"
          height="400"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        {props?.value?.caption && (
          <div className="text-sm italic text-gray-500 mt-2">
            {props.value.caption}
          </div>
        )}
      </div>
    ),
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base sm:text-lg">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl sm:text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-semibold mt-5 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-semibold mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;

      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="underline decoration-1 underline-offset-2 hover:text-blue-600 transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base sm:text-lg">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base sm:text-lg">{children}</li>
    ),
  },
};
