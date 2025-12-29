import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      'https://api.github.com/users/mmuuhmmtt/repos?sort=updated&per_page=10',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch repositories')
    }

    const repos = await response.json()

    // Filter out forks and format the data
    const projects = repos
      .filter((repo: any) => !repo.fork && !repo.archived)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'GitHub repository',
        html_url: repo.html_url,
        language: repo.language,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
      }))

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    )
  }
}

