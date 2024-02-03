
import { CircularProgress } from '@mui/material';

export default function Loader({isLoading, children}: {isLoading: boolean; children: any}) {

  return isLoading ? <CircularProgress /> : children;
}
