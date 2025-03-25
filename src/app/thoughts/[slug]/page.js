import { getThoughts, getThoughtBySlug } from "../../../sanity/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { components } from "@/sanity/portableTextComponents";

/**
 * Generates static params for all thoughts at build time
 *
 * Returns:
 *   Array of objects with slug property for each thought
 */
export async function generateStaticParams() {
  const thoughts = await getThoughts();
  return thoughts.map((thought) => ({
    slug: thought.slug,
  }));
}

/**
 * Individual thought page component
 *
 * Args:
 *   params: Object containing the slug from the URL
 *
 * Returns:
 *   JSX for the individual thought page
 */
export default async function ThoughtPage({ params: { slug } }) {
  try {
    const thought = await getThoughtBySlug(slug);

    if (!thought) {
      notFound();
    }

    return (
      <article className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/thoughts" className="text-blue-500 hover:text-blue-700">
            ← Back to all thoughts
          </Link>
        </div>

        <header className="mb-6">
          <h1 className="text-3xl font-bold">{thought.title}</h1>
          <time className="text-gray-500 block mt-2">
            {new Date(thought._createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div className="prose prose-lg">
          {Array.isArray(thought.content) ? (
            <PortableText value={thought.content} components={components} />
          ) : (
            <p>{thought.content}</p>
          )}
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error rendering thought page: %s", error.message);
    notFound();
  }
}
