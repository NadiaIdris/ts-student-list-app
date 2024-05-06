import styled from "styled-components";

const StyledAsteriskSpan = styled.span`
  color: red;
  font-family: monospace;
  padding-inline-start: 2px;
  `;

const RequiredAsterisk = () => {
  return (
    <StyledAsteriskSpan aria-hidden="true" title="required">
      *
    </StyledAsteriskSpan>
  );
};

export { RequiredAsterisk };
