import Head from "next/head";
import { BlogLayout } from "../../components/blog/blog-layout";
import { ReactElement } from "react";
import { BlogArticles } from "../../components/blog/blog-articles";

const Blog = () => {
    return (
        <>
            <Head>
                <title>
                    Articles | Next.js Blog
                </title>
            </Head>
            <BlogArticles />
        </>
    );
};

Blog.getLayout = function getLayout(page: ReactElement) {
    return (
        <BlogLayout>
            {page}
        </BlogLayout>
    );
}

export default Blog;