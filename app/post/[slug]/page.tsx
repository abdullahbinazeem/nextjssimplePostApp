"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/SinglePost";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType>({
    queryKey: ["details-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <div>
      {data ? (
        <div>
          <Post
            comment={data.comment}
            key={data.id}
            name={data.user.name}
            avatar={data.user.image}
            postTitle={data.title}
            id={data.id}
          />
          <AddComment id={data?.id} />
          {data?.comment?.map((comment) => (
            <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
              <div className="flex items-center gap-4">
                <Image
                  className="rounded-2xl"
                  width={24}
                  height={24}
                  src={comment.user?.image}
                  alt="avatar"
                />
                <h3 className="font-bold">{comment?.user?.name}</h3>
                <h3 className="text-sm">{comment.createdAt}</h3>
              </div>
              <div className="mt-4">{comment.message}</div>
            </div>
          ))}
        </div>
      ) : (
        <h1>
          <b className="text-[4em]">No Post exist :(</b>
          <p className="text-[2em]">
            The URL you put doesn't correlate to a post
          </p>
        </h1>
      )}
    </div>
  );
}
