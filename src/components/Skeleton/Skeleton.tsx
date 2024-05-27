import styled from "styled-components";

interface SkeletonProps {
  width: string;
  height: string;
  variant: string;
}

const StyledSkeleton = styled.div<{
  $width: string;
  $height: string;
  $variant: string;
}>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  border-radius: var(--border-radius);
  @keyframes shimmer {
    0% {
      background-position: -500px 0;
    }
    100% {
      background-position: 500px 0;
    }
  }
  background: linear-gradient(
    to right,
    var(--color-gray-400) 0%,
    var(--color-gray-1000) 20%,
    var(--color-gray-400) 40%
  );
  animation: shimmer 2s linear infinite;
`;

const Skeleton = ({ width, height, variant }: SkeletonProps) => {
  return (
    <StyledSkeleton
      $width={width}
      $height={height}
      $variant={variant}
    ></StyledSkeleton>
  );
};
export { Skeleton };
