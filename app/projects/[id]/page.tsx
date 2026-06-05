import { projectsData } from "@/app/data/projects";
import React from "react";
import DetailedProjectView from "./components/MainProjectView";
import { Metadata } from "next";

interface GitHubRepoResponse {
  description: string | null;
}

interface GitHubCommit {
  commit: {
    committer: {
      date: string;
    };
  };
}

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
    title: `${projectDetails.name} | Projects`,
    description: projectDetails.description,
    openGraph: {
      title: projectDetails.name,
      description: projectDetails.description,
      url: projectUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${projectDetails.name} Preview Image`,
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
          The project you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const { noOfCommits, updatedAt, createdAt, description } =
    await fetchLatestData(id);

  const newProjectDetails = {
    ...projectDetails,
    noOfCommits: noOfCommits ?? projectDetails.noOfCommits,
    updatedAt: updatedAt ?? projectDetails.updatedAt,
    createdAt: createdAt ?? projectDetails.createdAt,
    description: description ?? projectDetails.description,
  };

  return <DetailedProjectView {...newProjectDetails} />;
};

export default Page;

async function fetchLatestData(repoName: string): Promise<{
  noOfCommits: number | null;
  updatedAt?: string;
  createdAt?: string;
  description?: string;
}> {
  try {
    let description: string | undefined = undefined;

    const repoResponse = await fetch(
      `https://api.github.com/repos/subrata-chowdhury/${repoName}`,
      {
        headers: { Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}` },
      },
    );

    if (repoResponse.ok) {
      const body: GitHubRepoResponse = await repoResponse.json();
      description = body.description ?? undefined;
    }

    let totalNoOfCommits = 0;
    let updatedAt: string | undefined;
    let createdAt: string | undefined;

    let pageCount = 1;
    let noOfCommits: number | null = null;

    while (noOfCommits === null || noOfCommits === 100) {
      const commitResponse = await fetch(
        `https://api.github.com/repos/subrata-chowdhury/${repoName}/commits?per_page=100&page=${pageCount}`,
        {
          headers: { Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}` },
        },
      );

      if (!commitResponse.ok) {
        throw new Error(`GitHub API Error: ${commitResponse.status}`);
      }

      const commitDetails: GitHubCommit[] = await commitResponse.json();
      noOfCommits = commitDetails.length;

      if (noOfCommits === 0) break;

      totalNoOfCommits += noOfCommits;

      if (pageCount === 1) {
        updatedAt = new Date(
          commitDetails[0].commit.committer.date,
        ).toUTCString();
      }

      createdAt = new Date(
        commitDetails[noOfCommits - 1].commit.committer.date,
      ).toUTCString();

      pageCount++;
    }

    return { noOfCommits: totalNoOfCommits, updatedAt, createdAt, description };
  } catch (error) {
    console.error(
      `[Build/Fetch Error] Failed to fetch data for ${repoName}:`,
      error,
    );
    return {
      noOfCommits: null,
      updatedAt: undefined,
      createdAt: undefined,
      description: undefined,
    };
  }
}
