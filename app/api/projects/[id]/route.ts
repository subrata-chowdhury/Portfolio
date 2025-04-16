import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // fetching the project details from github
        let description = '';
        const response = await fetch(`https://api.github.com/repos/subrata-chowdhury/${id}`, {
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
            const response = await fetch(`https://api.github.com/repos/subrata-chowdhury/${id}/commits?per_page=100&page=${pageCount}`, {
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
        return NextResponse.json({ noOfCommits: totalNoOfCommits, updatedAt, createdAt, description }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
    }
}