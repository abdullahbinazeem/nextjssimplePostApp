export type AuthPosts = {
  email: string;
  id: string;
  image: string;
  name: string;
  Post: {
    createdAt: string;
    id: string;
    title: string;
    comment?: {
      createdAt: string;
      id: string;
      postId: string;
      title: string;
      userId: string;
    }[];
  }[];
};
