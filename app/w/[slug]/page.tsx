import { WorkflowComposer } from "@/components/console/workflow-composer";
import PageTitle from "@/components/layout/page-title";
import { prisma } from "@/lib/utils/db";
import { getAppBaseUrl } from "@/lib/utils/url";
import { SignedOut, auth } from "@clerk/nextjs/app-beta";
import { Workflow } from "@prisma/client";
import classNames from "classnames";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export default async function PublicWorkflow({ params }: Props) {
  const { userId, orgId } = auth();

  const workflow: Workflow | null = await prisma.workflow.findUnique({
    where: {
      publicUrl: params.slug! as string,
    },
  });

  if (!workflow) {
    throw new Error("Workflow not found");
  }

  if (userId && (workflow?.ownerId === userId || workflow?.ownerId === orgId)) {
    redirect(`/console/workflows/${workflow.id}`);
  }

  return (
    <div className="relative">
      <PageTitle title={workflow.name} backUrl="/console/workflows" />

      <WorkflowComposer workflow={workflow} isPublicPage />

      <SignedOut>
        <div className="ml-8">
          <a
            href={`/sign-up?redirect_url=${encodeURIComponent(
              `${getAppBaseUrl()}/w/${params.slug}}`
            )}`}
            className={classNames(
              "inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              "disabled:bg-gray-400 disabled:cursor-not-allowed"
            )}
          >
            Sign up and copy workflow
          </a>
        </div>
      </SignedOut>
    </div>
  );
}
