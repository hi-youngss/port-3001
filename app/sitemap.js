import { mataApi } from "@/apis/meta/meta.api";

export default async function sitemap() {
  //인기 게시판 목록 조회
  const popularBoards = await mataApi.getPopularBoards();

  const boardsSitemap = popularBoards.map((board) => {
    const { boardId = " ", createdAt = new Date() } = board;

    return {
      url: `${process.env.BASE_URL}/board/${boardId}`,
      lastModified: createdAt,
      priority: 0.8,
    };
  });

  //인기 게시글 목록 조회
  const popularPosts = await mataApi.getPopularPosts();

  const postsSitemap = popularPosts.map((post) => {
    const { postId = " ", createdAt = new Date() } = post;

    return {
      url: `${process.env.BASE_URL}/detail/${postId}`,
      lastModified: new Date(createdAt).toISOString(),
      priority: 0.8,
    };
  });

  return [
    {
      url: `${process.env.BASE_URL}`,
      lastModified: new Date(),
      priority: 1,
    },
    ...boardsSitemap,
    ...postsSitemap,
  ];
}
