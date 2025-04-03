import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

export const components = {
  types: {
    image: (props) => (
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
      />
    ),
  },
  block: {
    normal: ({ children }) => <p className="mb-4">{children}</p>,
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
  },
};
