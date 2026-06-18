import { projectsData } from "@/app/data/projects";
import React from "react";
import DetailedProjectView from "./components/MainProjectView";
import { Metadata } from "next";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.repoName,
  }));
}

export const revalidate = 604800;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const projectDetails = projectsData.find((e) => e.repoName === id);

  if (!projectDetails) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  const projectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/projects/${id}`;
  const imageUrl = `/${projectDetails.previewImageSrc}`;

  return {
    title: `${projectDetails.name} | Case Study`,
    description: projectDetails.description,
    openGraph: {
      title: projectDetails.name,
      description: projectDetails.description,
      url: projectUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${projectDetails.name} Case Study Preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: projectDetails.name,
      description: projectDetails.description,
      images: [imageUrl],
    },
  };
}

const Page = async (props: PageProps) => {
  const { id } = await props.params;
  const projectDetails = projectsData.find((e) => e.repoName === id);

  if (!projectDetails) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center mt-20 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Project Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The case study you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  // Passing the static data directly. No more slow GitHub API calls.
  return <DetailedProjectView {...projectDetails} />;
};

export default Page;
