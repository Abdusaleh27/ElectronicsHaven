import CheckBoxFilter from "./CheckBoxFilter";

const StarRatings = ({ currentQuery }) => {
  return (
    <>
      <CheckBoxFilter
        currentQuery={currentQuery}
        filterOne="customerReviewAverage>=4"
        idOne="customerReviewAverage4"
        rating={true}
        ratingVal={4}
      />
      <CheckBoxFilter
        currentQuery={currentQuery}
        filterOne="customerReviewAverage>=3"
        idOne="customerReviewAverage3"
        rating={true}
        ratingVal={3}
      />
      <CheckBoxFilter
        currentQuery={currentQuery}
        filterOne="customerReviewAverage>=2"
        idOne="customerReviewAverage2"
        rating={true}
        ratingVal={2}
      />
      <CheckBoxFilter
        currentQuery={currentQuery}
        filterOne="customerReviewAverage>=1"
        idOne="customerReviewAverage1"
        rating={true}
        ratingVal={1}
      />
    </>
  );
};

export default StarRatings;
