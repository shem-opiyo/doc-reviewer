
import ReviewPageClient from "./ReviewPageClient";

export const metadata = {
  title: "Review & Edit | DocReviewer",
  description:
    "Compare original and proofread versions side-by-side and accept or reject AI suggestions.",
};

export default function ReviewPage() {
  return <ReviewPageClient />;
}