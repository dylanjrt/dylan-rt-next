import Link from "next/link";
import { getThoughts } from "@/sanity/queries";

/**
 * Thoughts index page component
 *
 * Returns:
 *   JSX for the thoughts listing page
 */

export const revalidate = 300;

export default async function ThoughtsPage() {
  const thoughts = await getThoughts();

  return (
    <div className="max-w-4xl mx-12">
      <section className="w-max">
        {thoughts.length === 0 ? (
          <p className="text-gray-500 italic">No thoughts published yet.</p>
        ) : (
          <ul className="space-y-8">
            {thoughts.map((thought) => (
              <li key={thought.slug} className="bg-gray-50 p-2 rounded-md">
                <div className="flex flex-col justify-between">
                  <Link href={`/thoughts/${thought.slug}`} className="group">
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                      {thought.title}
                    </h2>
                  </Link>

                  <time className="text-gray-500 block mb-3">
                    {new Date(thought._createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
