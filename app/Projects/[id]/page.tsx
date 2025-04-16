import { projectsData } from '@/app/data/projects';
import React from 'react'
import DetailedProjectView from './components/MainProjectView';

const page = async (props: { params: { id: string } }) => {
    const { id } = await props.params;
    const projectDetails = projectsData.filter(e => e.repoName === id)[0]
    if (!projectDetails) {
        return (
            <div className="error-page">
                <div className="heading">Project Not Found</div>
                <div className="description">The project you are looking for does not exist.</div>
            </div>
        )
    }
    const { noOfCommits, updatedAt, createdAt, description } = await fetchLatestData(id);
    const newProjectDetails = {
        ...projectDetails,
        noOfCommits: noOfCommits ?? projectDetails.noOfCommits,
        updatedAt: updatedAt ?? projectDetails.updatedAt,
        createdAt: createdAt ?? projectDetails.createdAt,
        description: description ?? projectDetails.description
    }

    return (
        <DetailedProjectView {...newProjectDetails} />
    )
}

export default page;


async function fetchLatestData(repoName: string): Promise<{
    noOfCommits: number | null,
    updatedAt?: string,
    createdAt?: string,
    description?: string
}> {
    // fetching the project details from github
    let description = '';
    const response = await fetch(`https://api.github.com/repos/subrata-chowdhury/${repoName}`, {
        headers: { 'Authorization': 'Bearer ' + process.env.GITHUB_AUTH_TOKEN }
    });
    if (response.status === 200) {
        const body = await response.json();
        description = body.description;
    }

    // calculating the number of commits, createdAt and updatedAt
    let totalNoOfCommits = 0
    let updatedAt, createdAt;

    let pageCount = 1
    let noOfCommits = null;
    while (noOfCommits === null || noOfCommits === 100) {
        const response = await fetch(`https://api.github.com/repos/subrata-chowdhury/${repoName}/commits?per_page=100&page=${pageCount}`, {
            headers: { 'Authorization': 'Bearer ' + process.env.GITHUB_AUTH_TOKEN }
        });
        if (response.status === 200) {
            const commitDetails = await response.json();
            noOfCommits = await commitDetails.length
            if (await noOfCommits === 0) break
            totalNoOfCommits += await noOfCommits;
            if (pageCount === 1)
                updatedAt = new Date(commitDetails[0].commit.committer.date).toUTCString();
            createdAt = new Date(commitDetails[(await noOfCommits - 1)].commit.committer.date).toUTCString();
        } else {
            throw response.body
        }
        pageCount++
    }
    return { noOfCommits: totalNoOfCommits, updatedAt, createdAt, description };
}