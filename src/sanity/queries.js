import { groq } from "next-sanity";
import { client } from "./lib/client";

/**
 * Fetch home page content
 *
 * Returns:
 *   Object containing home page data including title, mainParagraph, and lastUpdated
 *
 * Raises:
 *   Error: If the query fails or no home page is found
 */
export async function getHomePageContent() {
  try {
    const query = groq`
      *[_type == "home"][0] {
        title,
        mainParagraph,
        _updatedAt
      }
    `;

    const homeData = await client.fetch(query);

    if (!homeData) {
      throw new Error("No home page content found");
    }

    return homeData;
  } catch (error) {
    console.error("Error fetching home page content:", error);
    throw error;
  }
}

/**
 * Fetch all thoughts ordered by publication date
 *
 * Returns:
 *   Array of thought objects
 */
export async function getThoughts() {
  try {
    const query = groq`
      *[_type == "thought"] | order(_createdAt desc) {
        _id,
        title,
        "slug": slug.current,
        _createdAt,
        content[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          },
          _type == "block" => {
            ...,
            markDefs[] {
              ...,
              _type == "link" => {
                "href": href
              }
            }
          }
        }
      }
    `;

    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching thoughts: %s", error.message);
    return [];
  }
}

/**
 * Fetch a single thought by slug
 *
 * Args:
 *   slug: The slug of the thought to retrieve
 *
 * Returns:
 *   Thought object or null if not found
 */
export async function getThoughtBySlug(slug) {
  try {
    const query = groq`
      *[_type == "thought" && slug.current == $slug][0] {
        _id,
        title,
        "slug": slug.current,
        _createdAt,
        content[] {
          ...,
          _type == "image" => {
            ...,
            asset->
          },
          _type == "block" => {
            ...,
            markDefs[] {
              ...,
              _type == "link" => {
                "href": href
              }
            }
          }
        }
      }
    `;

    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching thought by slug: %s", error.message);
    return null;
  }
}

export async function getVideos() {
  try {
    const query = `*[_type == "video"] | order(order asc) {
      title,
      description,
      url,
      poster,
      order
    }`;

    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching videos: %s", error.message);
    return [];
  }
}
