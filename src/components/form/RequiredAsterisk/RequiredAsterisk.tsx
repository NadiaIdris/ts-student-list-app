import styled from "styled-components";

const StyledAsteriskSpan = styled.span`
  color: var(--color-danger);
  font-family: monospace;
  padding-inline-start: 2px;
  font-size: inherit;
  `;

const RequiredAsterisk = () => {
  return (
    <StyledAsteriskSpan aria-hidden="true" title="required">
      *
    </StyledAsteriskSpan>
  );
};

export { RequiredAsterisk };
