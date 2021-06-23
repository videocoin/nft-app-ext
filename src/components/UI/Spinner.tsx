import styled from 'styled-components';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'xl';

interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
}

const sizes: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 24,
  md: 40,
  xl: 52,
};

const borderWidth: Record<SpinnerSize, number> = {
  xs: 1,
  sm: 2,
  md: 4,
  xl: 4,
};

const getBorderWidth = ({ size = 'md' }: SpinnerProps) => borderWidth[size];
const getSize = ({ size = 'md' }: SpinnerProps) => sizes[size];
const Spinner = styled.div<SpinnerProps>`
  transition: all 0.3s linear;
  flex-shrink: 0;
  animation: spinner-spin 1s linear infinite;
  border: 2px solid #ccc;
  border-top: 2px solid #7549d4;
  margin: auto;
  border-radius: 100%;
  width: ${getSize}px;
  height: ${getSize}px;
  @keyframes spinner-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
