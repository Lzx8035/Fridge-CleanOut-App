import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const CustomButton = styled(Button)`
  font-family: "Second", sans-serif;
  background-color: #87bbb7;
  font-size: 1.4rem;
  &:hover {
    background-color: #6eada8 !important;
  }
`;

export default CustomButton;
