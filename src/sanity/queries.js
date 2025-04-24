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
      {
        "homeData": *[_type == "home"][0] {
          title,
          mainParagraph,
          image {
            caption,
            asset-> {
              _id,
              url,
              metadata {
                dimensions
              }
            }
          },
          _updatedAt
        },
        "lastUpdated": *[_type in ["home", "thought", "music", "video"]] | order(_updatedAt desc)[0]._updatedAt
      }
    `;

    const result = await client.fetch(query);

    if (!result.homeData) {
      throw new Error("No home page content found");
    }

    return {
      ...result.homeData,
      lastUpdated: result.lastUpdated,
    };
  } catch (error) {
    console.error("Error fetching home page content: %s", error.message);
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

/**
 * Fetch all music entries ordered by release date (newest first)
 *
 * Returns:
 *   Array of music objects with all fields including album cover and supplementary photos
 *
 * Raises:
 *   Error: If the query fails
 */
export async function getMusic() {
  try {
    const query = groq`
      *[_type == "music"] | order(releaseDate desc) {
        _id,
        title,
        artist,
        releaseDate,
        bandcampEmbed,
        albumCover {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          }
        },
        description,
        credits,
        supplementaryPhotos[] {
          asset-> {
            _id,
            url,
            metadata {
              dimensions
            }
          },
          caption,
          alt
        }
      }
    `;

    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching music: %s", error.message);
    return [];
  }
}

export async function getVideos() {
  try {
    const query = `*[_type == "visual"] | order(order asc) {
      title,
      caption,
      url,
      thumbnail {
        asset-> {
          _id,
          url,
          metadata {
            dimensions
          }
        }
      },
      order
    }`;
    const response = await client.fetch(query);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching videos: %s", error.message);
    return [];
  }
}
