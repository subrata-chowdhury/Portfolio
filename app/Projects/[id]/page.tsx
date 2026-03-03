import { projectsData } from "@/app/data/projects";
import React from "react";
import DetailedProjectView from "./components/MainProjectView";

// Strict types for the GitHub API responses
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

// 1. THIS IS THE REQUIRED ADDITION FOR BUILD-TIME STATIC RENDERING
export async function generateStaticParams() {
  // Returns an array of objects containing the 'id' params for every project
  // Next.js will use this to generate a static HTML page for each project at build time.
  return projectsData.map((project) => ({
    id: project.repoName,
  }));
}

// Optional Production Suggestion: Incremental Static Regeneration (ISR)
// Uncomment the line below if you want your static pages to re-fetch GitHub data
// and update in the background every X seconds without needing a full rebuild.
export const revalidate = 604800; // e.g., revalidate once a week

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async (props: PageProps) => {
  const { id } = await props.params;

  // Using .find() instead of .filter()[0] is slightly more performant and idiomatic
  const projectDetails = projectsData.find((e) => e.repoName === id);

  if (!projectDetails) {
    return (
      <div className="error-page">
        <div className="heading">Project Not Found</div>
        <div className="description">
          The project you are looking for does not exist.
        </div>
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
    let description = "";

    const repoResponse = await fetch(
      `https://api.github.com/repos/subrata-chowdhury/${repoName}`,
      {
        headers: { Authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}` },
      },
    );

    if (repoResponse.ok) {
      const body: GitHubRepoResponse = await repoResponse.json();
      description = body.description ?? "";
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
        throw new Error(
          `GitHub API Error: ${commitResponse.status} ${commitResponse.statusText}`,
        );
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
    // Log the error so you can see failures in your build terminal rather than failing silently
    console.error(`[Build Error] Failed to fetch data for ${repoName}:`, error);
    return { noOfCommits: null, updatedAt: "", createdAt: "", description: "" };
  }
}
