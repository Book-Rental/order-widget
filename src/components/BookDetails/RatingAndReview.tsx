import { useState } from "react";
import {
  Rb_Button,
  Rb_Rating,
  Rb_Text,
} from "@rentbook/rentbook-ui-lib";

const MAX_REVIEW_LENGTH = 500;

const RatingAndReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Rb_Text variant="h4" className="mb-2 font-semibold">
        Write a Review
      </Rb_Text>

      <Rb_Text
        variant="p"
        className="mb-6 text-sm text-gray-500"
      >
        Share your experience with this book.
      </Rb_Text>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Rating Section */}
        <div>
          <Rb_Text
            variant="span"
            className="mb-3 block font-medium"
          >
            Your Rating
          </Rb_Text>

          <Rb_Rating
            value={rating}
            readOnly={false}
            onChange={setRating}
          />
        </div>

        {/* Review Section */}
        <div className="lg:col-span-2">
          <Rb_Text
            variant="span"
            className="mb-3 block font-medium"
          >
            Your Review
          </Rb_Text>

          <textarea
            value={review}
            onChange={(e) =>
              setReview(
                e.target.value.slice(0, MAX_REVIEW_LENGTH)
              )
            }
            placeholder="Write your review here..."
            rows={6}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <div className="mt-2 flex items-center justify-between">
            <Rb_Text
              variant="small"
              className="text-gray-500"
            >
              {review.length}/{MAX_REVIEW_LENGTH}
            </Rb_Text>

            <Rb_Button
              variant="primary"
              onClick={() => {
                console.log({
                  rating,
                  review,
                });
              }}
            >
              Submit Review
            </Rb_Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReview;