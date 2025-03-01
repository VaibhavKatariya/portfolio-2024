import Breadcrumbs from "@/components/Breadcrumbs";
import PostsWithSearch from "@/components/PostsWithSearch";
import { getPosts } from "@/lib/posts";
import path from "path";

const blogDirectory = path.join(process.cwd(), "content");

export default async function BlogPage() {
  const posts = await getPosts(blogDirectory);

  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <h1 className="title">Blog</h1>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}/>
      <PostsWithSearch posts={posts} />
    </article>
  );
}
