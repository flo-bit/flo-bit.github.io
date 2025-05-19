import { getCollection } from 'astro:content';

export const getFeaturedProjects = async () => {
  return (await getCollection("projects"))
    .filter((project: any) => project.data.featured)
    .sort((a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf());
};

export const getProjects = async () => {
  return (await getCollection("projects"))
    .sort(
      (a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf(),
    );
};

export const getBlogPosts = async () => {
  const posts = (await getCollection("blog"))
    .filter((post: any) => post.data.published)
    .sort(
      (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

  return posts;
};


export const getVisibleBlogPosts = async () => {
  const posts = (await getCollection("blog"))
    .filter((post: any) => post.data.published && post.data.visible || import.meta.env.MODE === "development")
    .sort(
      (a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
    );

  return posts;
};