"use client";

import BacktoHome from "@/app/_components/layout/BacktoHome";
import React, { useEffect, useState } from "react";

interface TermsData {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const TermsAndConditions = () => {
  const [data, setData] = useState<TermsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/legal/terms`
        );
        if (!res.ok) {
          throw new Error("Terms and Conditions content not found");
        }
        const json = await res.json();
        if (json.success && json.data) {
          setData(json.data);
        } else {
          throw new Error(
            json.message || "Failed to load Terms and Conditions"
          );
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  return (
    <>
      <BacktoHome />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
          <div className="px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-[#8dc720] mt-2">
                TERMS AND CONDITIONS
              </h2>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {loading && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="w-10 h-10 border-4 border-[#8dc720] border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-500 text-sm">
                    Loading Terms and Conditions...
                  </p>
                </div>
              )}

              {!loading && error && (
                <div className="text-center py-16">
                  <p className="text-red-500 font-medium">{error}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Please try again later or contact support.
                  </p>
                </div>
              )}

              {!loading && !error && data && (
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}
            </div>

            {/* Footer note */}
            {!loading && !error && data && (
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 text-center">
                  For any queries or concerns regarding these terms, please
                  contact us at{" "}
                  <a
                    href="mailto:info@towner.taxi"
                    className="text-[#8dc720] hover:underline"
                  >
                    info@towner.taxi
                  </a>{" "}
                  or call +91 9364102995
                </p>
                {data.updated_at && (
                  <div className="mt-4 text-sm text-gray-400 text-center">
                    <p>
                      Last Updated:{" "}
                      {new Date(data.updated_at).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;