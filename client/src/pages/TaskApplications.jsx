import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Users,
  LoaderCircle,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock3,
  FileText,
} from "lucide-react";

import {
  getTaskApplications,
  updateApplicationStatus,
  getApplicationResume,
} from "../services/authService";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  accepted: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const TaskApplications = () => {
  const { taskId } = useParams();

  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const [resumeLoadingId, setResumeLoadingId] = useState(null);

  // Fetch all applications for this task
  const fetchApplications = useCallback(async () => {
    try {
      setError("");

      const response = await getTaskApplications(taskId);

      setApplications(response.applications || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load applications."
      );
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Accept or reject an application
  const handleStatusUpdate = async (applicationId, status) => {
    const confirmationMessage =
      status === "accepted"
        ? "Accept this applicant? The task will move to in progress, and all other pending applications will be rejected."
        : "Reject this application?";

    if (!window.confirm(confirmationMessage)) return;

    try {
      setProcessingId(applicationId);
      setError("");

      await updateApplicationStatus(applicationId, status);

      // Update the selected application and synchronize other applications.
      setApplications((previousApplications) =>
        previousApplications.map((application) => {
          if (application._id === applicationId) {
            return { ...application, status };
          }

          // Accepting one applicant automatically rejects
          // every other pending application on the backend.
          if (
            status === "accepted" &&
            application.status === "pending"
          ) {
            return { ...application, status: "rejected" };
          }

          return application;
        })
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update application status."
      );

      // Re-fetch in case another request changed the data.
      await fetchApplications();
    } finally {
      setProcessingId(null);
    }
  };

  // Securely request and open the applicant's resume
  const handleViewResume = async (applicationId) => {
    // Open the tab immediately to avoid browser popup blocking.
    const resumeWindow = window.open("about:blank", "_blank");

    if (!resumeWindow) {
      setError("Please allow pop-ups to view the resume.");
      return;
    }

    // Prevent the opened page from accessing this page through window.opener.
    resumeWindow.opener = null;

    try {
      setResumeLoadingId(applicationId);
      setError("");

      const response = await getApplicationResume(applicationId);

      const resumeUrl = response.resume?.url;

      if (!resumeUrl) {
        throw new Error("Resume URL was not returned by the server.");
      }

      // Navigate the newly opened tab to the temporary signed URL.
      resumeWindow.location.href = resumeUrl;
    } catch (error) {
      resumeWindow.close();

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to open resume."
      );
    } finally {
      setResumeLoadingId(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const pendingCount = applications.filter(
    (application) => application.status === "pending"
  ).length;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle
          className="animate-spin text-brand"
          size={32}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-page px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back navigation */}
        <Link
          to="/my-tasks"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-brand"
        >
          <ArrowLeft size={17} />
          Back to My Tasks
        </Link>

        {/* Page header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand">
              POSTER DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-heading">
              Task Applications
            </h1>

            <p className="mt-2 text-sm text-muted">
              Review applicants and decide who gets the opportunity.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
            <Users size={20} className="text-brand" />

            <div>
              <p className="text-xl font-bold text-heading">
                {applications.length}
              </p>

              <p className="text-xs text-muted">
                {pendingCount} pending
              </p>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <p>{error}</p>

            <button
              type="button"
              onClick={fetchApplications}
              className="inline-flex shrink-0 items-center gap-2 font-semibold hover:underline"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {applications.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <Users
              size={36}
              className="mx-auto text-muted"
            />

            <h2 className="mt-4 text-lg font-semibold text-heading">
              No applications yet
            </h2>

            <p className="mt-2 text-sm text-muted">
              Applications will appear here when developers apply to your task.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {applications.map((application) => {
              const isPending = application.status === "pending";

              const isProcessing =
                processingId === application._id;

              const isResumeLoading =
                resumeLoadingId === application._id;

              return (
                <article
                  key={application._id}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
                >
                  {/* Applicant information */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-heading">
                        {application.applicantId?.name ||
                          "Unknown applicant"}
                      </h2>

                      <p className="mt-1 text-sm text-muted">
                        Applied on {formatDate(application.createdAt)}
                      </p>
                    </div>

                    {/* Application status */}
                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                        statusStyles[application.status] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {application.status === "accepted" && (
                        <CheckCircle2 size={14} />
                      )}

                      {application.status === "rejected" && (
                        <XCircle size={14} />
                      )}

                      {application.status === "pending" && (
                        <Clock3 size={14} />
                      )}

                      {application.status}
                    </span>
                  </div>

                  {/* Application message */}
                  <div className="mt-5 rounded-xl bg-page p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                      Application message
                    </p>

                    <p className="whitespace-pre-wrap text-sm leading-6 text-body">
                      {application.message}
                    </p>
                  </div>

                  {/* View resume */}
                  <div className="mt-5 flex justify-end">
                    <button
                      type="button"
                      disabled={isResumeLoading}
                      onClick={() =>
                        handleViewResume(application._id)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-brand transition hover:bg-soft-blue disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isResumeLoading ? (
                        <LoaderCircle
                          size={16}
                          className="animate-spin"
                        />
                      ) : (
                        <FileText size={16} />
                      )}

                      {isResumeLoading
                        ? "Opening Resume..."
                        : "View Resume"}
                    </button>
                  </div>

                  {/* Accept / Reject actions */}
                  {isPending && (
                    <div className="mt-4 flex flex-wrap justify-end gap-3">
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() =>
                          handleStatusUpdate(
                            application._id,
                            "rejected"
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>

                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() =>
                          handleStatusUpdate(
                            application._id,
                            "accepted"
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-hover disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <LoaderCircle
                            size={16}
                            className="animate-spin"
                          />
                        ) : (
                          <CheckCircle2 size={16} />
                        )}

                        Accept
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default TaskApplications;