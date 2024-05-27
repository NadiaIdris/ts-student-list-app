import styled from "styled-components";
import { Skeleton } from "../../../components/Skeleton";

const StyledSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StudentsSkeleton = () => {
  return (
    <StyledSkeleton>
      <Skeleton width="100%" height="60px" variant="rect" />
      <Skeleton width="100%" height="60px" variant="rect" />
      <Skeleton width="100%" height="60px" variant="rect" />
    </StyledSkeleton>
  );
};

export { StudentsSkeleton };
